"""Render dedicated Cloud vhosts; never discover or rewrite other sites."""
from pathlib import Path
import argparse

DOMAIN = "salesacademy.softvibes.cloud"
NAMES = [DOMAIN, *[f"v{n}.{DOMAIN}" for n in range(1, 6)]]
CERT = f"/etc/letsencrypt/live/{DOMAIN}"


def render(tls=False):
    text = "# Dedicated Sales Academy Cloud deployment.\n"
    text += f"""server {{
    listen 80;
    listen [::]:80;
    server_name {' '.join(NAMES)};
    access_log off;
    location ^~ /.well-known/acme-challenge/ {{
        root /var/www/softvibes-recovery-acme;
        try_files $uri =404;
    }}
    location / {{ return 301 https://$host$request_uri; }}
}}
"""
    if not tls:
        return text
    common = f"""    listen 443 ssl;
    listen [::]:443 ssl;
    ssl_certificate {CERT}/fullchain.pem;
    ssl_certificate_key {CERT}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    access_log off;
"""
    text += "server {\n" + common + f"""    server_name {DOMAIN};
    root /srv/salesacademy-cloud/current/index;
    index index.html;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'none'; style-src 'self'; img-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'" always;
    add_header Cache-Control "no-cache" always;
    location ~ ^/v([1-5])/?$ {{
        return 302 https://v$1.{DOMAIN}/descubre/$is_args$args;
    }}
    location ~ ^/v([1-5])(?:/(.*))?$ {{
        return 302 https://v$1.{DOMAIN}/$2$is_args$args;
    }}
    location / {{ try_files $uri $uri/ =404; }}
}}
"""
    for n in range(1, 6):
        text += "server {\n" + common + f"""    server_name v{n}.{DOMAIN};
    client_max_body_size 11m;
    client_body_timeout 30s;
    location = / {{ return 302 /descubre/; }}
    location / {{
        proxy_pass http://127.0.0.1:{18480+n};
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Connection "";
        proxy_http_version 1.1;
        proxy_connect_timeout 5s;
        proxy_read_timeout 65s;
        proxy_send_timeout 65s;
    }}
}}
"""
    return text


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--tls", action="store_true")
    parser.add_argument("--output", required=True, type=Path)
    args = parser.parse_args()
    args.output.write_text(render(args.tls))
