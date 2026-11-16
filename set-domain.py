#!/usr/bin/env python3
"""Replace the placeholder web address everywhere with your real one.

Usage:  python3 set-domain.py https://yourname.github.io/your-repo
        (no slash at the end; use your custom domain if you have one)
"""
import sys, pathlib

if len(sys.argv) != 2 or not sys.argv[1].startswith("https://"):
    sys.exit("Usage: python3 set-domain.py https://your-real-address  (must start with https://)")
new = sys.argv[1].rstrip("/")
old = "https://YOUR-SITE-URL"
changed = 0
for name in ("index.html", "sitemap.xml", "robots.txt"):
    path = pathlib.Path(__file__).parent / name
    text = path.read_text(encoding="utf-8")
    if old in text:
        path.write_text(text.replace(old, new), encoding="utf-8")
        print("updated", name); changed += 1
print(f"Done: {changed} file(s) now use {new}")
