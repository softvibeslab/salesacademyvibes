"""Run once as root on the VPS; writes credentials only to a private file."""
import json
import os
from pathlib import Path
import secrets
import subprocess

base = Path("/srv/salesacademy-cloud")
destination = Path("/root/salesacademy-cloud-access.json")
if destination.exists():
    raise SystemExit("Credential file already exists; refusing to replace owners.")
entries = []
code = """
import json,sys
from growth.server.app import create_app,create_staff
entry=json.load(sys.stdin)
app=create_app({'DATA_ROOT':entry['dataRoot'],'COOKIE_SECURE':True,'PUBLIC_CONTACT_ENABLED':False})
create_staff(entry['dataRoot'],entry['username'],entry['password'])
"""
for n in range(1, 6):
    entry = {"version": f"v{n}", "url": f"https://v{n}.salesacademy.softvibes.cloud/cms/",
             "username": "roger", "password": secrets.token_urlsafe(24),
             "dataRoot": f"/var/lib/salesacademy-cloud/v{n}"}
    entries.append(entry)
# Save before creating owners: interrupted bootstrap remains recoverable privately.
fd = os.open(destination, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
with os.fdopen(fd, "w") as f:
    json.dump(entries, f, indent=2)
for entry in entries:
    result = subprocess.run(
        ["runuser", "-u", f"sa-cloud-{entry['version']}", "--", str(base / "venv/bin/python"), "-c", code],
        cwd=base / "current" / entry["version"],
        input=json.dumps(entry), text=True, capture_output=True,
        env={**os.environ, "PYTHONDONTWRITEBYTECODE": "1"},
    )
    if result.returncode:
        raise SystemExit(f"Owner bootstrap failed for {entry['version']}; inspect privately on server.")
    print(f"Created owner for {entry['version']}; credentials remain private.")
