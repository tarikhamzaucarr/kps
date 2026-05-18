#!/usr/bin/env python3
"""
Kindergarten Photo Studio — Toplu Fotoğraf Yükleme Aracı v2
=============================================================

KULLANIM:
  # Dış klasörden fotoğraf al, thumbnail oluştur + R2'ye yükle:
  python3 foto_yukle.py --kaynak "/Users/tarikhamzaucar/Desktop/Nice Kindergarten/LR" --okul nicekindergarten --r2

  # Sadece thumbnail oluştur (R2 yükleme olmadan):
  python3 foto_yukle.py --kaynak "/path/to/photos" --okul okul-slug

  # Mevcut assets/photos/ klasöründen (eski davranış):
  python3 foto_yukle.py --r2

GEREKSINIMLER:
  - macOS (sips komutu)
  - R2 yükleme için: pip3 install boto3
"""

import os
import sys
import json
import subprocess
import shutil
import argparse
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
import time

# ── Config ──
PHOTOS_DIR = Path("assets/photos")
CONFIG_FILE = Path("teslimat-config.json")
JS_FILE = Path("teslimat.js")
ENV_FILE = Path(".env")
THUMB_WIDTH = 400
SUPPORTED_EXTS = {'.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp', '.heic'}
R2_PARALLEL_UPLOADS = 10  # Paralel yükleme sayısı


# ══════════════════════════════════════════════
# R2 AYARLARI (.env dosyasından okunur)
# ══════════════════════════════════════════════
def load_env():
    """R2 bilgilerini .env dosyasından oku"""
    env = {}
    if ENV_FILE.exists():
        for line in ENV_FILE.read_text().strip().splitlines():
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, val = line.split('=', 1)
                env[key.strip()] = val.strip().strip('"').strip("'")
    return env


def get_r2_client(env):
    """Cloudflare R2 S3 client oluştur"""
    try:
        import boto3
    except ImportError:
        print("❌ boto3 yüklü değil. Kurun: pip3 install boto3")
        sys.exit(1)

    account_id = env.get('R2_ACCOUNT_ID', '')
    access_key = env.get('R2_ACCESS_KEY_ID', '')
    secret_key = env.get('R2_SECRET_ACCESS_KEY', '')
    bucket = env.get('R2_BUCKET_NAME', 'kps-photos')

    if not all([account_id, access_key, secret_key]):
        print("❌ .env dosyasında R2 bilgileri eksik.")
        print("   Gerekli: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY")
        sys.exit(1)

    client = boto3.client(
        's3',
        endpoint_url=f'https://{account_id}.r2.cloudflarestorage.com',
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
        region_name='auto'
    )
    return client, bucket


def upload_to_r2(client, bucket, local_path, r2_key):
    """Dosyayı R2'ye yükle"""
    content_type = 'image/jpeg'
    ext = Path(local_path).suffix.lower()
    if ext == '.png':
        content_type = 'image/png'
    elif ext == '.webp':
        content_type = 'image/webp'

    client.upload_file(
        str(local_path),
        bucket,
        r2_key,
        ExtraArgs={'ContentType': content_type}
    )


def r2_key_exists(client, bucket, key):
    """R2'de dosya var mı kontrol et"""
    try:
        client.head_object(Bucket=bucket, Key=key)
        return True
    except:
        return False


# ══════════════════════════════════════════════
# THUMBNAIL OLUŞTURMA (macOS sips)
# ══════════════════════════════════════════════
def create_thumbnail(src_path, thumb_path, width=THUMB_WIDTH):
    """macOS sips ile thumbnail oluştur (Daima JPEG çıktı verir)"""
    thumb_path.parent.mkdir(parents=True, exist_ok=True)
    
    # HEIC/TIFF gibi formatlar varsa önce JPEG'e çevir
    src_path = Path(src_path)
    if src_path.suffix.lower() in {'.heic', '.tiff', '.bmp'}:
        temp = thumb_path.with_suffix('.jpg')
        subprocess.run([
            "sips", "-s", "format", "jpeg",
            str(src_path), "--out", str(temp)
        ], capture_output=True)
        src_path = temp

    subprocess.run([
        "sips",
        "-s", "format", "jpeg",
        "--setProperty", "formatOptions", "80",
        "--resampleWidth", str(width),
        str(src_path),
        "--out", str(thumb_path)
    ], capture_output=True)


# ══════════════════════════════════════════════
# OKUL TARAMA — DIŞARIDAN KLASÖR DESTEĞİ
# ══════════════════════════════════════════════
def scan_and_process(source_dir, school_slug, use_r2=False, r2_client=None, r2_bucket=None):
    """
    Kaynak klasörden fotoğrafları tarar, thumbnail oluşturur, R2'ye yükler.
    Kaynak klasördeki fotoğrafları assets/photos/okul-slug/ altına kopyalar.
    """
    source_dir = Path(source_dir)
    dest_dir = PHOTOS_DIR / school_slug
    dest_dir.mkdir(parents=True, exist_ok=True)
    (dest_dir / "originals").mkdir(exist_ok=True)
    (dest_dir / "thumbs").mkdir(exist_ok=True)

    # Fotoğrafları tara
    photo_files = sorted([
        f for f in source_dir.iterdir()
        if f.is_file() and f.suffix.lower() in SUPPORTED_EXTS
    ])

    if not photo_files:
        print(f"  ⚠️  {source_dir}: Fotoğraf yok!")
        return []

    total = len(photo_files)
    print(f"  📸 {total} fotoğraf bulundu.\n")

    photos = []
    r2_upload_queue = []

    # ── ADIM 1: Thumbnail oluşturma ──
    print("  ─── ADIM 1/3: Thumbnail Oluşturma ───")
    start_time = time.time()
    created = 0
    skipped = 0
    
    for pidx, photo_file in enumerate(photo_files, 1):
        photo_id = f"IMG_{pidx:04d}"
        
        # Dosya adını temizle (boşlukları ve özel karakterleri koru)
        orig_name = photo_file.name
        thumb_name = photo_file.stem + ".jpg"

        orig_dest = dest_dir / "originals" / orig_name
        thumb_dest = dest_dir / "thumbs" / thumb_name

        # Orijinali kopyala
        if not orig_dest.exists():
            shutil.copy2(photo_file, orig_dest)

        # Thumbnail oluştur
        if not thumb_dest.exists():
            create_thumbnail(photo_file, thumb_dest)
            created += 1
        else:
            skipped += 1

        # İlerleme göster
        pct = int(pidx / total * 100)
        if pidx % 50 == 0 or pidx == total:
            elapsed = time.time() - start_time
            speed = pidx / elapsed if elapsed > 0 else 0
            remaining = (total - pidx) / speed if speed > 0 else 0
            print(f"    [{pct:3d}%] {pidx}/{total}  ({speed:.1f} foto/s, kalan: {remaining:.0f}s)")

        photos.append({
            "id": photo_id,
            "thumb": f"thumbs/{thumb_name}",
            "original": f"originals/{orig_name}"
        })

        if use_r2 and r2_client:
            r2_upload_queue.append({
                "orig_local": str(orig_dest),
                "orig_key": f"{school_slug}/originals/{orig_name}",
                "thumb_local": str(thumb_dest),
                "thumb_key": f"{school_slug}/thumbs/{thumb_name}"
            })

    print(f"  ✅ Thumbnail: {created} oluşturuldu, {skipped} zaten vardı.\n")

    # ── ADIM 2: R2 Yükleme ──
    if use_r2 and r2_client and r2_upload_queue:
        print("  ─── ADIM 2/3: R2 Yükleme ───")
        start_time = time.time()
        uploaded = 0
        r2_skipped = 0
        failed = 0

        def upload_pair(item):
            """Tek bir fotoğraf + thumbnail çiftini yükle"""
            results = {"uploaded": 0, "skipped": 0, "failed": 0}
            for local, key in [(item["orig_local"], item["orig_key"]), 
                               (item["thumb_local"], item["thumb_key"])]:
                try:
                    if r2_key_exists(r2_client, r2_bucket, key):
                        results["skipped"] += 1
                    else:
                        upload_to_r2(r2_client, r2_bucket, local, key)
                        results["uploaded"] += 1
                except Exception as e:
                    results["failed"] += 1
                    print(f"    ❌ {key}: {e}")
            return results

        with ThreadPoolExecutor(max_workers=R2_PARALLEL_UPLOADS) as executor:
            futures = {executor.submit(upload_pair, item): i 
                      for i, item in enumerate(r2_upload_queue)}
            
            for done_count, future in enumerate(as_completed(futures), 1):
                result = future.result()
                uploaded += result["uploaded"]
                r2_skipped += result["skipped"]
                failed += result["failed"]
                
                if done_count % 25 == 0 or done_count == len(futures):
                    pct = int(done_count / len(futures) * 100)
                    elapsed = time.time() - start_time
                    speed = done_count / elapsed if elapsed > 0 else 0
                    remaining = (len(futures) - done_count) / speed if speed > 0 else 0
                    print(f"    [{pct:3d}%] {done_count}/{len(futures)} çift  "
                          f"(☁️ {uploaded} yüklendi, ⏭️ {r2_skipped} atlandı, ❌ {failed} hata, "
                          f"kalan: {remaining:.0f}s)")

        print(f"  ✅ R2: {uploaded} dosya yüklendi, {r2_skipped} zaten vardı, {failed} hata.\n")
    else:
        print("  ⏭️  R2 yükleme atlandı (--r2 parametresi verilmedi).\n")

    # ── ADIM 3: Config güncelleme ──
    print(f"  ✅ Toplam: {len(photos)} fotoğraf işlendi.")
    return photos


# ══════════════════════════════════════════════
# CONFIG GÜNCELLEME
# ══════════════════════════════════════════════
def generate_config(schools_data):
    """teslimat-config.json güncelle"""
    config = {"schools": schools_data}
    with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
        json.dump(config, f, ensure_ascii=False, indent=2)
    print(f"\n📄 {CONFIG_FILE} güncellendi.")


def update_inline_config(schools_data):
    """teslimat.js INLINE_CONFIG güncelle"""
    if not JS_FILE.exists():
        return

    js = JS_FILE.read_text(encoding='utf-8')
    marker = "const INLINE_CONFIG = "
    start = js.find(marker)
    if start == -1:
        print(f"⚠️  INLINE_CONFIG bulunamadı.")
        return

    json_start = start + len(marker)
    depth = 0
    json_end = json_start
    for i in range(json_start, len(js)):
        if js[i] == '{': depth += 1
        elif js[i] == '}':
            depth -= 1
            if depth == 0:
                json_end = i + 1
                break

    new_json = json.dumps({"schools": schools_data}, ensure_ascii=False, indent=8)
    JS_FILE.write_text(js[:json_start] + new_json + js[json_end:], encoding='utf-8')
    print(f"📄 {JS_FILE} INLINE_CONFIG güncellendi.")


# ══════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════
def main():
    parser = argparse.ArgumentParser(description='Fotoğraf Yönetim Aracı v2')
    parser.add_argument('--r2', action='store_true', help='Cloudflare R2 ye yükle')
    parser.add_argument('--okul', type=str, help='Okul slug (örn: nicekindergarten)')
    parser.add_argument('--kaynak', type=str, help='Fotoğraf kaynak klasörü (dış klasör)')
    parser.add_argument('--pin', type=str, default='1234', help='Veli PIN (varsayılan: 1234)')
    parser.add_argument('--admin', type=str, default='admin2026', help='Admin şifresi')
    parser.add_argument('--workers', type=int, default=10, help='Paralel R2 yükleme sayısı')
    args = parser.parse_args()

    global R2_PARALLEL_UPLOADS
    R2_PARALLEL_UPLOADS = args.workers

    print("=" * 60)
    print("  📸 Kindergarten Photo Studio — Toplu Yükleme v2")
    print("=" * 60)

    if not shutil.which("sips"):
        print("❌ 'sips' bulunamadı. macOS gerektirir.")
        sys.exit(1)

    PHOTOS_DIR.mkdir(parents=True, exist_ok=True)

    # R2 client
    r2_client, r2_bucket = None, None
    if args.r2:
        env = load_env()
        r2_client, r2_bucket = get_r2_client(env)
        print(f"☁️  R2 Bucket: {r2_bucket}")

    # Kaynak klasörden mi yoksa mevcut assets/photos/ dan mı?
    if args.kaynak:
        if not args.okul:
            print("❌ --kaynak kullanırken --okul parametresi de gerekli.")
            print("   Örnek: python3 foto_yukle.py --kaynak '/path/to/photos' --okul nicekindergarten --r2")
            sys.exit(1)
        
        source = Path(args.kaynak)
        if not source.exists():
            print(f"❌ Kaynak klasör bulunamadı: {source}")
            sys.exit(1)

        school_slug = args.okul
        school_name = school_slug.replace("-", " ").replace("_", " ").title()
        
        print(f"\n🏫 {school_name} ({school_slug})")
        print(f"📂 Kaynak: {source}")
        print("-" * 60)

        photos = scan_and_process(source, school_slug, args.r2, r2_client, r2_bucket)

        if photos:
            all_schools = [{
                "slug": school_slug,
                "name": school_name,
                "veliPin": args.pin,
                "adminPin": args.admin,
                "basePath": f"{school_slug}/",
                "photos": photos
            }]
            generate_config(all_schools)
            update_inline_config(all_schools)
    else:
        # Eski davranış — assets/photos/ içindeki klasörleri tara
        if args.okul:
            school_dirs = [PHOTOS_DIR / args.okul]
            if not school_dirs[0].exists():
                print(f"❌ {school_dirs[0]} bulunamadı.")
                sys.exit(1)
        else:
            school_dirs = sorted([d for d in PHOTOS_DIR.iterdir() if d.is_dir()])

        all_schools = []
        for school_dir in school_dirs:
            school_slug = school_dir.name
            school_name = school_slug.replace("-", " ").replace("_", " ").title()
            
            print(f"\n🏫 {school_name} ({school_slug})")
            print("-" * 60)

            photos = scan_and_process(school_dir, school_slug, args.r2, r2_client, r2_bucket)
            if photos:
                all_schools.append({
                    "slug": school_slug,
                    "name": school_name,
                    "veliPin": args.pin,
                    "adminPin": args.admin,
                    "basePath": f"{school_slug}/",
                    "photos": photos
                })

        if all_schools:
            generate_config(all_schools)
            update_inline_config(all_schools)

    print("\n" + "=" * 60)
    print("✅ TAMAMLANDI!")
    print("=" * 60)


if __name__ == "__main__":
    main()
