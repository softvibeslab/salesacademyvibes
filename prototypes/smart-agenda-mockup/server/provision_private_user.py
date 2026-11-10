#!/usr/bin/env python3
"""Provision/rotate one private account from stdin. Never print passwords or hashes."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import secrets
import stat
import sys
import tempfile
import fcntl


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--file", required=True, help="Credential file outside the repository")
    parser.add_argument("--user", required=True, help="Existing directory id or admin")
    parser.add_argument("--delete", action="store_true", help="Revoke the user's credential and sessions")
    args = parser.parse_args()
    if not re.fullmatch(r"[a-z]{2,12}", args.user):
        parser.error("Invalid user id.")
    path = Path(args.file).resolve()
    original = Path(args.file)
    if original.is_symlink():
        parser.error("Credential symlinks are not allowed.")
    password = ""
    if not args.delete:
        if sys.stdin.isatty():
            import getpass
            password = getpass.getpass("Private password: ")
        else:
            password = sys.stdin.readline(202).rstrip("\r\n")
        if not 12 <= len(password) <= 200:
            parser.error("Use a private password of 12 to 200 characters via stdin.")
    path.parent.mkdir(mode=0o700, parents=True, exist_ok=True)
    lock_fd = os.open(str(path) + ".lock", os.O_CREAT | os.O_RDWR, 0o600)
    with os.fdopen(lock_fd, "a") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        data = {"users": {}}
        if path.exists():
            info = path.stat()
            if not stat.S_ISREG(info.st_mode) or info.st_mode & 0o077:
                parser.error("Existing credential file must have restricted permissions (0600).")
            try:
                data = json.loads(path.read_text())
            except (OSError, ValueError):
                parser.error("Invalid credential file; no changes made.")
            if not isinstance(data, dict) or not isinstance(data.get("users"), dict):
                parser.error("Invalid credential file; no changes made.")
        if args.delete:
            data["users"].pop(args.user, None)
        else:
            salt = secrets.token_bytes(24)
            digest = hashlib.scrypt(password.encode(), salt=salt, n=16384, r=8, p=1, dklen=32)
            data["users"][args.user] = {"version": secrets.token_hex(16), "salt": salt.hex(), "hash": digest.hex(), "n": 16384, "r": 8, "p": 1}
        fd, temporary = tempfile.mkstemp(dir=path.parent, prefix=".credential-", suffix=".tmp")
        try:
            with os.fdopen(fd, "w") as handle:
                json.dump(data, handle)
                handle.flush()
                os.fsync(handle.fileno())
            os.replace(temporary, path)
        finally:
            if os.path.exists(temporary):
                os.unlink(temporary)
    print("Private credential updated. No credential material was printed.")


if __name__ == "__main__":
    main()
