#!/usr/bin/env python3
"""Daily retention job. Uses the same lock and atomic write as the API; prints no PII."""
from ops_api import mutate
from tour_registration import purge


if __name__ == "__main__":
    mutate(lambda data: {"status": 200, "save": purge(data), "body": {"ok": True}})
    print("Tour registration retention completed.")
