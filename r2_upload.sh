#!/bin/bash
# ═══════════════════════════════════════════════════
# Kindergarten Photo Studio — R2 Fotoğraf Yükleme
# ═══════════════════════════════════════════════════
# Kullanım: ./r2_upload.sh
# 
# Bu script assets/photos/ altındaki tüm fotoğrafları
# Cloudflare R2'ye yükler.
# ═══════════════════════════════════════════════════

set -e

# .env dosyasını oku
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

BUCKET="kps-photos"
ACCOUNT_ID="${R2_ACCOUNT_ID}"
ACCESS_KEY="${R2_ACCESS_KEY_ID}"
SECRET_KEY="${R2_SECRET_ACCESS_KEY}"
PUBLIC_URL="${R2_PUBLIC_URL}"
PHOTOS_DIR="assets/photos"

if [ -z "$ACCOUNT_ID" ] || [ -z "$ACCESS_KEY" ] || [ -z "$SECRET_KEY" ]; then
    echo "❌ .env dosyasında R2 bilgileri eksik!"
    exit 1
fi

R2_ENDPOINT="https://${ACCOUNT_ID}.r2.cloudflarestorage.com"

echo "═══════════════════════════════════════════════"
echo "  📸 R2 Fotoğraf Yükleme Aracı"
echo "═══════════════════════════════════════════════"
echo "  Bucket: $BUCKET"
echo "  Public: $PUBLIC_URL"
echo ""

# S3 imzalama fonksiyonu (AWS Signature v4)
upload_file() {
    local file="$1"
    local key="$2"
    local content_type="$3"
    
    local date=$(date -u +"%Y%m%dT%H%M%SZ")
    local datestamp=$(date -u +"%Y%m%d")
    local region="auto"
    local service="s3"
    
    # Canonical request
    local method="PUT"
    local canonical_uri="/${BUCKET}/${key}"
    local payload_hash=$(shasum -a 256 "$file" | cut -d' ' -f1)
    
    local canonical_headers="content-type:${content_type}\nhost:${ACCOUNT_ID}.r2.cloudflarestorage.com\nx-amz-content-sha256:${payload_hash}\nx-amz-date:${date}\n"
    local signed_headers="content-type;host;x-amz-content-sha256;x-amz-date"
    
    local canonical_request="${method}\n${canonical_uri}\n\n${canonical_headers}\n${signed_headers}\n${payload_hash}"
    local canonical_request_hash=$(echo -ne "$canonical_request" | shasum -a 256 | cut -d' ' -f1)
    
    # String to sign
    local credential_scope="${datestamp}/${region}/${service}/aws4_request"
    local string_to_sign="AWS4-HMAC-SHA256\n${date}\n${credential_scope}\n${canonical_request_hash}"
    
    # Signing key
    local k_date=$(echo -ne "${datestamp}" | openssl dgst -sha256 -hex -mac HMAC -macopt key:"AWS4${SECRET_KEY}" | cut -d' ' -f2)
    local k_region=$(echo -ne "${region}" | openssl dgst -sha256 -hex -mac HMAC -macopt hexkey:"${k_date}" | cut -d' ' -f2)
    local k_service=$(echo -ne "${service}" | openssl dgst -sha256 -hex -mac HMAC -macopt hexkey:"${k_region}" | cut -d' ' -f2)
    local k_signing=$(echo -ne "aws4_request" | openssl dgst -sha256 -hex -mac HMAC -macopt hexkey:"${k_service}" | cut -d' ' -f2)
    
    local signature=$(echo -ne "$string_to_sign" | openssl dgst -sha256 -hex -mac HMAC -macopt hexkey:"${k_signing}" | cut -d' ' -f2)
    
    local authorization="AWS4-HMAC-SHA256 Credential=${ACCESS_KEY}/${credential_scope}, SignedHeaders=${signed_headers}, Signature=${signature}"
    
    curl -s -X PUT "${R2_ENDPOINT}/${BUCKET}/${key}" \
        -H "Content-Type: ${content_type}" \
        -H "x-amz-date: ${date}" \
        -H "x-amz-content-sha256: ${payload_hash}" \
        -H "Authorization: ${authorization}" \
        --data-binary "@${file}" \
        -o /dev/null -w "%{http_code}"
}

get_content_type() {
    local ext="${1##*.}"
    ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
    case "$ext" in
        webp) echo "image/webp" ;;
        jpg|jpeg) echo "image/jpeg" ;;
        png) echo "image/png" ;;
        *) echo "application/octet-stream" ;;
    esac
}

# Fotoğrafları tara ve yükle
total=0
success=0
failed=0

echo "📂 Taranıyor: ${PHOTOS_DIR}/"
echo ""

for school_dir in "${PHOTOS_DIR}"/*/; do
    school_slug=$(basename "$school_dir")
    echo "🏫 ${school_slug}"
    
    # Originals
    if [ -d "${school_dir}originals" ]; then
        for file in "${school_dir}originals/"*; do
            [ -f "$file" ] || continue
            filename=$(basename "$file")
            key="${school_slug}/originals/${filename}"
            ct=$(get_content_type "$filename")
            
            total=$((total + 1))
            echo -n "  ☁️  originals/${filename} ... "
            
            status=$(upload_file "$file" "$key" "$ct")
            if [ "$status" = "200" ]; then
                echo "✅"
                success=$((success + 1))
            else
                echo "❌ (HTTP $status)"
                failed=$((failed + 1))
            fi
        done
    fi
    
    # Thumbs
    if [ -d "${school_dir}thumbs" ]; then
        for file in "${school_dir}thumbs/"*; do
            [ -f "$file" ] || continue
            filename=$(basename "$file")
            key="${school_slug}/thumbs/${filename}"
            ct=$(get_content_type "$filename")
            
            total=$((total + 1))
            echo -n "  ☁️  thumbs/${filename} ... "
            
            status=$(upload_file "$file" "$key" "$ct")
            if [ "$status" = "200" ]; then
                echo "✅"
                success=$((success + 1))
            else
                echo "❌ (HTTP $status)"
                failed=$((failed + 1))
            fi
        done
    fi
done

echo ""
echo "═══════════════════════════════════════════════"
echo "✅ Tamamlandı: ${success}/${total} yüklendi"
[ $failed -gt 0 ] && echo "❌ Başarısız: ${failed}"
echo ""
echo "Public URL: ${PUBLIC_URL}demo-okul/originals/TRK04859.webp"
echo "═══════════════════════════════════════════════"
