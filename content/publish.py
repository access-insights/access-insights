#!/usr/bin/env python3
"""Publish the Access Insights website from the content Word document.

Reads content/website-content.docx (the team's single source of truth),
fills content/site-template.html, and writes index.html at the repo root.

Uses only the Python standard library. Usage, from the repo root:

    python3 content/publish.py            # writes index.html
    python3 content/publish.py --check    # dry run: validate + show changes

Rules the document must follow (see the doc's "How this works" page):
- one table row per field; the first cell is the field key, the second
  cell is the content; the third (Notes) column is ignored
- accept all tracked changes in Word before publishing
"""
import argparse
import hashlib
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
KEY_RE = re.compile(r"^[a-z][a-z0-9]*(\.[a-z0-9]+)+$")
PLACEHOLDER_RE = re.compile(r"\{\{([a-z0-9._]+)\}\}")

HERE = Path(__file__).resolve().parent
DOCX = HERE / "website-content.docx"
TEMPLATE = HERE / "site-template.html"
OUTPUT = HERE.parent / "index.html"


def cell_text(tc):
    """Text of a table cell; paragraphs joined with a space."""
    paras = []
    for p in tc.iter(W + "p"):
        runs = [t.text or "" for t in p.iter(W + "t")]
        txt = "".join(runs).strip()
        if txt:
            paras.append(txt)
    return " ".join(paras).strip()


def read_content(docx_path):
    with zipfile.ZipFile(docx_path) as z:
        xml = z.read("word/document.xml")
    root = ET.fromstring(xml)
    content, order = {}, []
    for tbl in root.iter(W + "tbl"):
        for tr in tbl.iter(W + "tr"):
            cells = tr.findall(W + "tc")
            if len(cells) < 2:
                continue
            key = cell_text(cells[0])
            if not KEY_RE.match(key):
                continue  # header row or stray text
            value = cell_text(cells[1])
            if key in content:
                print(f"WARNING: field '{key}' appears more than once; "
                      f"using the last occurrence.", file=sys.stderr)
            else:
                order.append(key)
            content[key] = value
    return content, order


def escape_html(text):
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true",
                    help="validate and report changes without writing")
    ap.add_argument("--docx", type=Path, default=DOCX)
    ap.add_argument("--template", type=Path, default=TEMPLATE)
    ap.add_argument("--out", type=Path, default=OUTPUT)
    args = ap.parse_args()

    for p in (args.docx, args.template):
        if not p.exists():
            sys.exit(f"ERROR: {p} not found")

    content, order = read_content(args.docx)
    template = args.template.read_text(encoding="utf-8")
    needed = set(PLACEHOLDER_RE.findall(template)) - {"__version__"}

    missing = sorted(needed - set(content))
    extra = sorted(set(content) - needed)
    empty = sorted(k for k in needed & set(content) if not content[k])
    if missing:
        sys.exit("ERROR: the document is missing these fields "
                 "(was a row deleted or a key edited?):\n  " + "\n  ".join(missing))
    if extra:
        print("WARNING: ignoring unknown fields (key edited by accident?):\n  "
              + "\n  ".join(extra), file=sys.stderr)
    if empty:
        sys.exit("ERROR: these fields are empty in the document:\n  "
                 + "\n  ".join(empty))

    version = hashlib.sha1(
        "\n".join(f"{k}\t{content[k]}" for k in sorted(needed)).encode("utf-8")
    ).hexdigest()[:12]

    html = template
    for key in needed:
        html = html.replace("{{" + key + "}}", escape_html(content[key]))
    html = html.replace("{{__version__}}", version)

    leftovers = PLACEHOLDER_RE.findall(html)
    if leftovers:
        sys.exit("ERROR: unfilled placeholders remain: " + ", ".join(leftovers))

    # report changes vs the current published file
    if args.out.exists():
        current = args.out.read_text(encoding="utf-8")
        m = re.search(r'content-version" content="([0-9a-f]+)"', current)
        if m and m.group(1) == version:
            print("No content changes (version %s)." % version)
        else:
            changed = []
            for key in sorted(needed):
                if escape_html(content[key]) not in current:
                    changed.append(key)
            if changed:
                print("Changed fields:")
                for k in changed:
                    print("  " + k)

    if args.check:
        print("Check passed: %d fields, version %s. Nothing written." % (len(needed), version))
        return

    args.out.write_text(html, encoding="utf-8")
    print("Published %s (%d fields, content version %s)." % (args.out, len(needed), version))
    print("Now commit and push:  git add -A && git commit -m 'Publish content' && git push origin staging")


if __name__ == "__main__":
    main()
