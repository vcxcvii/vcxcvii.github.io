#!/usr/bin/env python3
"""Generate 1200x630 Open Graph banners for every post (and a site default).

Social scrapers (LinkedIn, WhatsApp, Slack, X) want a landscape image around
1200x630. A portrait image gets cropped badly or dropped entirely, which kills
the whole preview card. This renders one banner per post using headless Chrome
so the type matches the site exactly.

Usage:
    python3 _scripts/generate-og.py            # only missing banners
    python3 _scripts/generate-og.py --force    # regenerate everything
"""

import html
import pathlib
import re
import subprocess
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
POSTS = ROOT / "_posts"
OUT = ROOT / "assets" / "images" / "og"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

TEMPLATE = """<!doctype html><html><head><meta charset="utf-8"><style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{
    width: 1200px; height: 630px; background: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    padding: 84px 90px; display: flex; flex-direction: column;
    justify-content: space-between; color: #111111;
  }}
  .eyebrow {{
    font-family: ui-monospace, "SF Mono", Menlo, monospace;
    font-size: 22px; letter-spacing: 0.14em; text-transform: uppercase;
    color: #0057ff; font-weight: 600;
  }}
  h1 {{
    font-size: {size}px; line-height: 1.08; letter-spacing: -0.025em;
    font-weight: 800; max-width: 1010px;
  }}
  .foot {{ border-top: 1px solid #dddddd; padding-top: 26px;
    display: flex; justify-content: space-between; align-items: baseline; }}
  .name {{ font-size: 27px; font-weight: 700; }}
  .meta {{ font-size: 22px; color: #666666;
    font-family: ui-monospace, "SF Mono", Menlo, monospace; }}
</style></head><body>
  <p class="eyebrow">{eyebrow}</p>
  <h1>{title}</h1>
  <div class="foot">
    <span class="name">Varun Choraria</span>
    <span class="meta">{meta}</span>
  </div>
</body></html>"""


def title_size(title):
    """Shrink the type as titles get longer so nothing overflows."""
    n = len(title)
    if n <= 28:
        return 96
    if n <= 45:
        return 82
    if n <= 65:
        return 70
    return 60


def front_matter(path):
    text = path.read_text(encoding="utf-8")
    match = re.match(r"---\n(.*?)\n---", text, re.S)
    if not match:
        return {}
    data = {}
    for line in match.group(1).splitlines():
        m = re.match(r"^(\w[\w_]*):\s*(.*)$", line)
        if m:
            data[m.group(1)] = m.group(2).strip().strip('"').strip("'")
    return data


def render(out_path, title, eyebrow, meta):
    page = TEMPLATE.format(
        title=html.escape(title),
        eyebrow=html.escape(eyebrow),
        meta=html.escape(meta),
        size=title_size(title),
    )
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as fh:
        fh.write(page)
        tmp = fh.name
    subprocess.run(
        [CHROME, "--headless", "--disable-gpu", "--hide-scrollbars",
         f"--screenshot={out_path}", "--window-size=1200,630", f"file://{tmp}"],
        check=True, capture_output=True,
    )
    pathlib.Path(tmp).unlink(missing_ok=True)
    print(f"  {out_path.relative_to(ROOT)}")


def main():
    force = "--force" in sys.argv
    OUT.mkdir(parents=True, exist_ok=True)
    print("Generating Open Graph banners (1200x630)")

    default = OUT / "default.png"
    if force or not default.exists():
        render(default, "Essays on AI, GTM, management and careers",
               "varunchoraria.com", "notes since 2025")

    for path in sorted(POSTS.glob("*.md")):
        slug = re.sub(r"^\d{4}-\d{2}-\d{2}-", "", path.stem)
        out_path = OUT / f"{slug}.png"
        if out_path.exists() and not force:
            continue
        fm = front_matter(path)
        title = fm.get("title", slug.replace("-", " "))
        date = (fm.get("date", "") or "")[:10]
        render(out_path, title, "varunchoraria.com", date)


if __name__ == "__main__":
    main()
