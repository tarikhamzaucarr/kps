#!/usr/bin/env python3
"""
Kindergarten Photo Studio — Fotoğraf Yönetim & R2 Yükleme Aracı
================================================================

BU SCRIPT ÜÇ ŞEY YAPAR:
  1. Çocuk klasörlerindeki fotoğrafları tarar
  2. Otomatik thumbnail oluşturur (macOS sips ile)
  3. Cloudflare R2'ye yükler (opsiyonel)
  4. teslimat-config.json ve teslimat.js'i günceller

KLASÖR YAPISI:
  assets/photos/
  └── okul-slug/               ← Okul klasörü
      ├── ayse-yilmaz/          ← Çocuk klasörü (isim-soyisim formatı)
      │   ├── IMG_001.jpg
      │   └── IMG_002.jpg
      ├── mehmet-demir/
      │   └── IMG_003.jpg
      └── ...

KULLANIM:
  # 1) Sadece lokal (thumbnail oluştur + config güncelle)
  python3 foto_yukle.py

  # 2) R2'ye yükle (önce .env dosyasını doldurun)
  python3 foto_yukle.py --r2

  # 3) Belirli bir okul
  python3 foto_yukle.py --okul gunes-anaokulu

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

# ── Config ──
PHOTOS_DIR = Path("assets/photos")
CONFIG_FILE = Path("teslimat-config.json")
JS_FILE = Path("teslimat.js")
ENV_FILE = Path(".env")
THUMB_WIDTH = 400
SUPPORTED_EXTS = {'.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp', '.heic'}


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
    content_type = 'image/webp'
    ext = local_path.suffix.lower()
    if ext in {'.jpg', '.jpeg'}:
        content_type = 'image/jpeg'
    elif ext == '.png':
        content_type = 'image/png'

    client.upload_file(
        str(local_path),
        bucket,
        r2_key,
        ExtraArgs={'ContentType': content_type}
    )


# ══════════════════════════════════════════════
# THUMBNAIL OLUŞTURMA (macOS sips)
# ══════════════════════════════════════════════
def create_thumbnail(src_path, thumb_path, width=THUMB_WIDTH):
    """macOS sips ile thumbnail oluştur"""
    thumb_path.parent.mkdir(parents=True, exist_ok=True)

    if src_path.suffix.lower() in {'.heic', '.tiff', '.bmp'}:
        temp = thumb_path.with_suffix('.jpg')
        subprocess.run(["sips", "-s", "format", "jpeg", str(src_path), "--out", str(temp)],
                       capture_output=True)
        subprocess.run(["sips", "--resampleWidth", str(width), str(temp), "--out", str(temp)],
                       capture_output=True)
        if shutil.which("cwebp"):
            subprocess.run(["cwebp", "-q", "80", str(temp), "-o", str(thumb_path)],
                           capture_output=True)
        else:
            shutil.copy2(temp, thumb_path)
        temp.unlink(missing_ok=True)
    else:
        subprocess.run(["sips", "--resampleWidth", str(width), str(src_path), "--out", str(thumb_path)],
                       capture_output=True)


def copy_to_originals(src_path, orig_path):
    """Orijinal fotoğrafı originals/ klasörüne kopyala"""
    orig_path.parent.mkdir(parents=True, exist_ok=True)
    if not orig_path.exists():
        shutil.copy2(src_path, orig_path)


# ══════════════════════════════════════════════
# OKUL TARAMA
# ══════════════════════════════════════════════
def scan_school(school_dir, use_r2=False, r2_client=None, r2_bucket=None):
    """Bir okul klasörünü tara, thumbnail oluştur, opsiyonel R2 yükle"""
    children = []
    child_dirs = sorted([d for d in school_dir.iterdir()
                         if d.is_dir() and d.name not in {'thumbs', 'originals'}])

    if not child_dirs:
        return children

    for idx, child_dir in enumerate(child_dirs, 1):
        photos = []
        photo_files = sorted([f for f in child_dir.iterdir()
                              if f.is_file() and f.suffix.lower() in SUPPORTED_EXTS])

        if not photo_files:
            print(f"  ⚠️  {child_dir.name}: Fotoğraf yok, atlanıyor.")
            continue

        for pidx, photo_file in enumerate(photo_files, 1):
            photo_id = f"IMG_{idx:02d}_{pidx:03d}"
            thumb_name = f"{photo_file.stem}.webp"
            orig_name = photo_file.name

            orig_dest = school_dir / "originals" / orig_name
            thumb_dest = school_dir / "thumbs" / thumb_name

            # Orijinali kopyala
            copy_to_originals(photo_file, orig_dest)

            # Thumbnail oluştur
            if not thumb_dest.exists():
                print(f"    📸 Thumbnail: {photo_file.name}")
                create_thumbnail(photo_file, thumb_dest)

            # R2'ye yükle
            if use_r2 and r2_client:
                school_slug = school_dir.name
                r2_orig_key = f"{school_slug}/originals/{orig_name}"
                r2_thumb_key = f"{school_slug}/thumbs/{thumb_name}"
                try:
                    print(f"    ☁️  R2 yükleniyor: {orig_name}")
                    upload_to_r2(r2_client, r2_bucket, orig_dest, r2_orig_key)
                    upload_to_r2(r2_client, r2_bucket, thumb_dest, r2_thumb_key)
                except Exception as e:
                    print(f"    ❌ R2 yükleme hatası: {e}")

            photos.append({
                "id": photo_id,
                "thumb": f"thumbs/{thumb_name}",
                "original": f"originals/{orig_name}"
            })

        child_name = child_dir.name.replace("-", " ").replace("_", " ").title()
        pin = f"{idx:04d}"

        children.append({
            "id": f"child-{idx}",
            "name": child_name,
            "pin": pin,
            "folder": child_dir.name,
            "photos": photos
        })
        print(f"  ✅ {child_name}: {len(photos)} fotoğraf (PIN: {pin})")

    return children


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


def update_photo_base_url(r2_public_url):
    """teslimat.js'deki PHOTO_BASE_URL'yi R2 URL'si ile değiştir"""
    if not JS_FILE.exists():
        return
    js = JS_FILE.read_text(encoding='utf-8')
    old = "const PHOTO_BASE_URL = './assets/photos/';"
    new = f"const PHOTO_BASE_URL = '{r2_public_url}';"
    if old in js:
        JS_FILE.write_text(js.replace(old, new), encoding='utf-8')
        print(f"📄 PHOTO_BASE_URL → {r2_public_url}")


# ══════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════
def main():
    parser = argparse.ArgumentParser(description='Fotoğraf Yönetim Aracı')
    parser.add_argument('--r2', action='store_true', help='Cloudflare R2 ye yükle')
    parser.add_argument('--okul', type=str, help='Belirli bir okul slug')
    args = parser.parse_args()

    print("=" * 55)
    print("  📸 Kindergarten Photo Studio")
    print("  Fotoğraf Yönetim & R2 Yükleme Aracı")
    print("=" * 55)

    if not shutil.which("sips"):
        print("❌ 'sips' bulunamadı. macOS gerektirir.")
        sys.exit(1)

    if not PHOTOS_DIR.exists():
        PHOTOS_DIR.mkdir(parents=True)
        print(f"📁 {PHOTOS_DIR} klasörü oluşturuldu.")
        print(f"   Okul klasörlerini buraya ekleyin.")
        sys.exit(0)

    # R2 client
    r2_client, r2_bucket = None, None
    if args.r2:
        env = load_env()
        r2_client, r2_bucket = get_r2_client(env)
        print(f"☁️  R2 Bucket: {r2_bucket}")

    # Okul klasörlerini tara
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
        print("-" * 40)

        children = scan_school(school_dir, args.r2, r2_client, r2_bucket)

        if not children:
            print(f"  ⚠️  Çocuk klasörü bulunamadı.")
            print(f"  Kullanım: {school_dir}/<cocuk-adi>/ altına fotoğrafları koyun.")
            continue

        # PIN'leri sor
        try:
            veli_pin = input(f"  Veli PIN (varsayılan 1234): ").strip() or "1234"
            admin_pin = input(f"  Admin şifresi (varsayılan admin2026): ").strip() or "admin2026"
        except EOFError:
            veli_pin, admin_pin = "1234", "admin2026"

        all_schools.append({
            "slug": school_slug,
            "name": school_name,
            "veliPin": veli_pin,
            "adminPin": admin_pin,
            "basePath": f"{school_slug}/",
            "children": children
        })

    if all_schools:
        generate_config(all_schools)
        update_inline_config(all_schools)

        if args.r2:
            env = load_env()
            public_url = env.get('R2_PUBLIC_URL', '')
            if public_url:
                update_photo_base_url(public_url)

        print("\n" + "=" * 55)
        print("✅ TAMAMLANDI!")
        print("=" * 55)
        for school in all_schools:
            print(f"\n  🏫 {school['name']}")
            print(f"     Veli PIN: {school['veliPin']}")
            print(f"     Admin: {school['adminPin']}")
            print(f"     URL: teslimat.html?okul={school['slug']}")
            for child in school['children']:
                print(f"     📁 {child['name']}: {len(child['photos'])} foto (PIN: {child['pin']})")


if __name__ == "__main__":
    main()
