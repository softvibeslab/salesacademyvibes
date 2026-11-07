#!/usr/bin/env python3
"""Read-only HTTPS smoke checks for the SalesAcademy Cloud version origins.

Uses only GET, no credentials, cookies, analytics submissions or external links.
TLS certificates are verified and redirects are inspected, never followed.
Run after DNS and TLS are provisioned; no dependency installation is required.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import ssl
import sys
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlsplit
from urllib.request import (
    HTTPRedirectHandler,
    HTTPSHandler,
    ProxyHandler,
    Request,
    build_opener,
)


DEFAULT_DOMAIN = "salesacademy.softvibes.cloud"
VERSIONS = tuple(f"v{number}" for number in range(1, 6))
REDIRECTS = {301, 302, 307, 308}
LOCAL_ADDRESS = re.compile(
    r"(?:localhost|127\.0\.0\.1|\[::1\]|0\.0\.0\.0)", re.IGNORECASE
)
FILMS = (
    "conocimiento-en-practica",
    "infraestructura-comercial",
    "menos-caos",
    "sistema-conectado",
    "smart-agent",
)


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


@dataclass
class Response:
    url: str
    status: int
    headers: dict[str, str]
    body: bytes
    error: str = ""
    truncated: bool = False


class Markup(HTMLParser):
    """Collect navigation and resource URLs without executing page scripts."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links: set[str] = set()
        self.assets: set[str] = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "a" and attrs.get("href"):
            self.links.add(attrs["href"])
        if tag in {"img", "source", "video", "audio", "script"}:
            for key in ("src", "data-src", "poster"):
                if attrs.get(key):
                    self.assets.add(attrs[key])
            if attrs.get("srcset"):
                for candidate in attrs["srcset"].split(","):
                    if candidate.strip():
                        self.assets.add(candidate.strip().split()[0])
        if tag == "link" and attrs.get("href"):
            if set(attrs.get("rel", "").split()) & {"stylesheet", "icon"}:
                self.assets.add(attrs["href"])


class Verifier:
    def __init__(self, domain=DEFAULT_DOMAIN, timeout=15.0):
        self.domain = domain
        self.timeout = timeout
        self.hosts = {domain, *(f"{version}.{domain}" for version in VERSIONS)}
        self.opener = build_opener(
            ProxyHandler({}),
            HTTPSHandler(context=ssl.create_default_context()),
            NoRedirect(),
        )
        self.checks: list[dict] = []
        self.asset_urls: set[str] = set()

    def record(self, name, url, ok, detail):
        self.checks.append(
            {"check": name, "url": url, "ok": bool(ok), "detail": detail}
        )

    def get(self, url, *, headers=None, limit=2 * 1024 * 1024):
        parts = urlsplit(url)
        if (
            parts.hostname not in self.hosts
            or parts.scheme not in {"https", "http"}
            or parts.username is not None
            or parts.password is not None
            or parts.port not in {None, 80, 443}
        ):
            raise ValueError(f"Request outside the six allowed origins: {url}")
        request_headers = {"User-Agent": "SalesAcademy-Public-Smoke/1.0"}
        request_headers.update(headers or {})
        request = Request(url, headers=request_headers, method="GET")
        try:
            try:
                response = self.opener.open(request, timeout=self.timeout)
            except HTTPError as error:
                response = error
            with response:
                body = response.read(limit + 1)
                return Response(
                    url=url,
                    status=response.code,
                    headers={key.lower(): value for key, value in response.headers.items()},
                    body=body[:limit],
                    truncated=len(body) > limit,
                )
        except (URLError, OSError, ValueError) as error:
            return Response(url, 0, {}, b"", f"{type(error).__name__}: {error}")

    def security(self, response, *, private=False):
        headers = response.headers
        failures = []
        hsts = re.search(r"(?:^|;)\s*max-age=(\d+)", headers.get("strict-transport-security", ""))
        if not hsts or int(hsts.group(1)) <= 0:
            failures.append("HSTS missing or disabled")
        if headers.get("x-content-type-options", "").lower() != "nosniff":
            failures.append("X-Content-Type-Options must be nosniff")
        if not headers.get("referrer-policy"):
            failures.append("Referrer-Policy missing")
        if "default-src" not in headers.get("content-security-policy", ""):
            failures.append("Content-Security-Policy missing default-src")
        if private:
            if "no-store" not in headers.get("cache-control", "").lower():
                failures.append("private response must have Cache-Control: no-store")
            if "noindex" not in headers.get("x-robots-tag", "").lower():
                failures.append("private response must have X-Robots-Tag: noindex")
        if "set-cookie" in headers:
            failures.append("anonymous GET unexpectedly sets a cookie")
        self.record("security_headers", response.url, not failures, "; ".join(failures) or "HTTPS hardening present")

    def page(self, url, *, private=False):
        response = self.get(url)
        valid = response.status == 200 and "text/html" in response.headers.get("content-type", "")
        self.record("html", url, valid, response.error or f"HTTP {response.status}")
        self.security(response, private=private)
        markup = Markup()
        if valid:
            text = response.body.decode("utf-8", errors="replace")
            self.record("complete_html", url, not response.truncated, "HTML read limit: 2 MiB")
            matches = sorted(set(LOCAL_ADDRESS.findall(text)))
            self.record("no_localhost", url, not matches, "Local addresses: " + ", ".join(matches) if matches else "No local addresses in markup")
            markup.feed(text)
            for asset in markup.assets:
                resolved = urljoin(url, asset)
                parsed = urlsplit(resolved)
                # Never follow links to WhatsApp, the operational app or third parties.
                if parsed.hostname == urlsplit(url).hostname and parsed.scheme == "https":
                    self.asset_urls.add(resolved.split("#", 1)[0])
        return markup

    def redirect(self, url, expected):
        response = self.get(url, limit=4096)
        location = urljoin(url, response.headers.get("location", ""))
        self.record("redirect", url, response.status in REDIRECTS and location == expected,
                    response.error or f"HTTP {response.status}; destination {location}")

    def unauthorized(self, url):
        response = self.get(url, limit=16384)
        try:
            code = json.loads(response.body).get("error", {}).get("code")
        except (ValueError, AttributeError):
            code = None
        self.record("anonymous_cms_denied", url, response.status == 401 and code == "unauthorized",
                    response.error or f"HTTP {response.status}; error code {code}")
        self.security(response, private=True)

    def missing(self, origin):
        url = origin + "/__salesacademy_verify_missing__/"
        response = self.get(url, limit=16384)
        self.record("unknown_route", url, response.status == 404, response.error or f"HTTP {response.status}")

    def asset(self, url):
        is_video = urlsplit(url).path.lower().endswith(".mp4")
        response = self.get(url, headers={"Range": "bytes=0-1023"}, limit=1024)
        content_range = response.headers.get("content-range", "")
        content_type = response.headers.get("content-type", "").lower()
        if is_video:
            matched = re.fullmatch(r"bytes 0-(\d+)/(\d+)", content_range)
            valid = (
                response.status == 206 and matched is not None
                and int(matched.group(1)) == 1023 and int(matched.group(2)) > 1023
                and len(response.body) == 1024 and not response.truncated
                and content_type.startswith("video/mp4")
            )
            self.record("video_range", url, valid,
                        response.error or f"HTTP {response.status}; {content_type}; {content_range}; read {len(response.body)} bytes")
        else:
            self.record("referenced_asset", url,
                        response.status in {200, 206} and bool(response.body) and "text/html" not in content_type,
                        response.error or f"HTTP {response.status}; {content_type}")
        cache = response.headers.get("cache-control", "")
        validators = bool(response.headers.get("etag") or response.headers.get("last-modified"))
        self.record("asset_cache", url, bool(cache) and validators,
                    f"Cache-Control: {cache or '(missing)'}; validator present: {validators}")

    def run(self):
        origin = f"https://{self.domain}"
        index = self.page(origin + "/")
        index_links = {urljoin(origin + "/", href) for href in index.links}
        self.missing(origin)
        for host in sorted(self.hosts):
            self.redirect(f"http://{host}/", f"https://{host}/")
        for version in VERSIONS:
            version_origin = f"https://{version}.{self.domain}"
            valid_entries = {
                f"{origin}/{version}/", f"{version_origin}/", f"{version_origin}/descubre/"
            }
            self.record("index_version_link", origin + "/", bool(index_links & valid_entries), f"Index links to {version}")
            self.redirect(f"{origin}/{version}/", f"{version_origin}/descubre/")
            self.redirect(f"{origin}/{version}/mediahub/?q=agentes", f"{version_origin}/mediahub/?q=agentes")
            self.redirect(version_origin + "/", version_origin + "/descubre/")
            for path in ("/descubre/", "/descubre/diagnostico/", "/descubre/privacidad/", "/descubre/analisis/", "/mediahub/"):
                self.page(version_origin + path)
            self.page(version_origin + "/cms/", private=True)
            for path in ("/cms/api/session", "/cms/api/draft", "/cms/api/resources", "/cms/api/revisions", "/cms/api/media", "/cms/preview/", "/cms/preview/?page=hub"):
                self.unauthorized(version_origin + path)
            health = self.get(version_origin + "/growth-api/health", limit=16384)
            try:
                healthy = json.loads(health.body) == {"ok": True}
            except ValueError:
                healthy = False
            self.record("health", health.url, health.status == 200 and healthy, health.error or f"HTTP {health.status}; ok={healthy}")
            self.security(health, private=True)
            self.missing(version_origin)
            if version in {"v4", "v5"}:
                self.page(version_origin + "/growth-assets/scenarios/index.html")
            if version in {"v3", "v4", "v5"}:
                self.asset_urls.update(f"{version_origin}/growth-assets/films/{film}.mp4" for film in FILMS)
        for url in sorted(self.asset_urls):
            self.asset(url)
        return {
            "checkedAt": dt.datetime.now(dt.timezone.utc).isoformat(),
            "domain": self.domain,
            "method": "GET only; verified TLS; redirects and external links never followed; no credentials",
            "passed": sum(item["ok"] for item in self.checks),
            "failed": sum(not item["ok"] for item in self.checks),
            "checks": self.checks,
        }


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--domain", default=DEFAULT_DOMAIN, help="Parent DNS name; HTTPS and v1–v5 subdomains are required")
    parser.add_argument("--timeout", type=float, default=15.0, help="Timeout per request in seconds (default: 15)")
    parser.add_argument("--json", type=Path, help="Optional JSON evidence file; contains no response bodies or cookies")
    args = parser.parse_args(argv)
    if not re.fullmatch(r"[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?", args.domain) or "." not in args.domain or ".." in args.domain:
        parser.error("--domain must be a DNS hostname without scheme, path or port")
    if args.timeout <= 0:
        parser.error("--timeout must be positive")
    report = Verifier(args.domain.lower(), args.timeout).run()
    if args.json:
        args.json.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for check in report["checks"]:
        if not check["ok"]:
            print(f"FAIL {check['check']} {check['url']}: {check['detail']}", file=sys.stderr)
    print(f"Public smoke: {report['passed']} passed, {report['failed']} failed across six HTTPS origins.")
    return 1 if report["failed"] else 0


if __name__ == "__main__":
    raise SystemExit(main())
