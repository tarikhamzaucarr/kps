import os
import json
import boto3
from pathlib import Path

ENV_FILE = Path(".env")
def load_env():
    env = {}
    if ENV_FILE.exists():
        for line in ENV_FILE.read_text().strip().splitlines():
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, val = line.split('=', 1)
                env[key.strip()] = val.strip().strip('"').strip("'")
    return env

env = load_env()

s3 = boto3.client(
    's3',
    endpoint_url=f"https://{env.get('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com",
    aws_access_key_id=env.get('R2_ACCESS_KEY_ID'),
    aws_secret_access_key=env.get('R2_SECRET_ACCESS_KEY'),
    region_name='auto'
)

cors_configuration = {
    'CORSRules': [{
        'AllowedHeaders': ['*'],
        'AllowedMethods': ['GET', 'HEAD'],
        'AllowedOrigins': ['*'],
        'ExposeHeaders': ['Content-Length', 'Content-Type', 'Content-Disposition'],
        'MaxAgeSeconds': 86400
    }]
}

try:
    print("Applying CORS policy to R2 bucket...")
    s3.put_bucket_cors(
        Bucket=env.get('R2_BUCKET_NAME'),
        CORSConfiguration=cors_configuration
    )
    print("✅ CORS policy successfully applied!")
except Exception as e:
    print(f"❌ Failed to apply CORS: {e}")
