#!/usr/bin/env python3
"""Build an ePub and a printable PDF for every essay, after Jekyll has run.

The files are never committed. Jekyll writes _site, this writes
_site/downloads/<name>/<name>.{epub,pdf} beside it, and the Pages artifact
carries both, so a download can never drift from the prose it was cut from:
there is no stored copy to go stale, only the one the current build made.

Two outside programs do the conversion, and both are already on the runner:
pandoc for the ePub, and headless Chrome for the PDF. Chrome rather than a
dedicated PDF engine because it needs no system libraries on either side, and
because it is the same engine a reader would print the page with.

The essay layout writes the hrefs; _scripts/check-built-site.rb resolves every
internal href against _site. So running this before that check is what proves
the generator ran: a file this script failed to write fails the build instead
of shipping as a dead link.

Usage:
  python3 _scripts/generate_downloads.py              # every essay
  python3 _scripts/generate_downloads.py --only name  # one, while iterating
"""
import argparse
import html
import json
import os
import re
import pathlib
import posixpath
import shutil
import subprocess
import sys
import tempfile
import urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, '_site')
AUTHOR = 'Varun Choraria'
PROSE_OPEN = re.compile(r'<div\b[^>]*\bclass="[^"]*\bprose--essay\b[^"]*"[^>]*>')
DIV_TAG = re.compile(r'<(/?)div\b', re.IGNORECASE)
# Root-relative references in the prose. They are correct on the site and
# wrong everywhere else, so every one of them is rewritten before conversion.
ROOT_REFERENCE = re.compile(r'(\b(?:src|href|srcset)=")(/[^"]*)(")')
# How long one conversion may take before the deploy is considered stuck.
CONVERT_TIMEOUT = 120
# Chrome ships on the GitHub runner and on the author's machine. CHROME_BIN
# wins so a container with it somewhere else needs no change here.
CHROME_CANDIDATES = (
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    'google-chrome',
    'google-chrome-stable',
    'chromium',
    'chromium-browser',
)

# Print styling lives here rather than in _sass/main.scss because no reader
# ever downloads the stylesheet: shipping @page rules to every visitor to
# serve a file built once at deploy would be the site paying for the PDF.
PRINT_CSS = '''
@page { size: A4; margin: 20mm 18mm; }
body {
  margin: 0;
  color: #111;
  font: 11pt/1.5 "Helvetica Neue", helvetica, sans-serif;
}
h1 { font-size: 20pt; letter-spacing: -.02em; margin: 0 0 .25em; }
h2 { font-size: 14pt; letter-spacing: -.02em; margin: 1.4em 0 .4em; }
h3 { font-size: 12pt; margin: 1.2em 0 .4em; }
h1, h2, h3 { break-after: avoid; }
p { margin: 0 0 .8em; text-align: justify; hyphens: auto; }
a { color: #002f9e; }
blockquote {
  margin: 1em 0 1em 1.2em;
  padding-left: .9em;
  border-left: 1px solid #ddd;
  color: #444;
}
pre, code { font-family: "SFMono-Regular", Consolas, Menlo, monospace; font-size: 9.5pt; }
pre { padding: .7em .9em; border: 1px solid #ddd; overflow-wrap: break-word; white-space: pre-wrap; }
img { max-width: 100%; height: auto; }
figure { margin: 1.2em 0; }
.meta { margin: 0 0 1.6em; padding-bottom: 1em; border-bottom: 1px solid #ddd; color: #666; font-size: 9.5pt; }
.meta a { color: #666; }
'''


class BuildError(Exception):
    """A page could not be turned into a download."""


def article_body(page_html):
    """Return the inner HTML of an essay's prose, with the page chrome dropped.

    Counts div depth rather than stopping at the first closing tag, because a
    post that wraps anything in a div would otherwise be cut off mid-essay.
    """
    opening = PROSE_OPEN.search(page_html)
    if not opening:
        raise BuildError('no .prose--essay wrapper in page')

    depth = 1
    cursor = opening.end()
    for tag in DIV_TAG.finditer(page_html, cursor):
        depth += -1 if tag.group(1) else 1
        if depth == 0:
            return page_html[cursor:tag.start()].strip()
    raise BuildError('unclosed .prose--essay wrapper in page')


def document(title, date, url, body):
    """Wrap an essay body as one standalone HTML file, for pandoc and Chrome."""
    safe_title = html.escape(title)
    return f'''<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<title>{safe_title}</title>
<meta name="author" content="{AUTHOR}">
<meta name="date" content="{date}">
<style>{PRINT_CSS}</style>
</head>
<body>
<h1>{safe_title}</h1>
<p class="meta">{AUTHOR} &middot; {date} &middot; <a href="{html.escape(url)}">{html.escape(url)}</a></p>
{body}
</body>
</html>
'''


def download_name(url):
    """The last segment of a post's published URL.

    Not the slug: a post may set its own `permalink`, and then Jekyll writes
    the slug directory as a `redirect_from` stub with no prose in it. The URL
    is what the reader lands on and what the essay layout builds its hrefs
    from, so both sides key off the same string.
    """
    name = posixpath.basename(urllib.parse.urlparse(url).path.rstrip('/'))
    if not name:
        raise BuildError(f'no name in URL {url}')
    return name


def page_path(site_dir, url, baseurl=''):
    """The built page for a post's published URL.

    The feed carries `absolute_url`, which includes the baseurl, while _site
    has no baseurl directory in it. The site runs on its own domain and builds
    with an empty baseurl today; stripping it here means that staying true is
    not a condition of this script working.
    """
    path = urllib.parse.urlparse(url).path
    if baseurl and path.startswith(baseurl.rstrip('/') + '/'):
        path = path[len(baseurl.rstrip('/')):]
    segments = [segment for segment in path.split('/') if segment]
    return os.path.join(site_dir, *segments, 'index.html')


def resolve_references(body, site_dir, site_url):
    """Make the prose's root-relative references work outside the web server.

    An essay links images as `/assets/...` and other essays as `/slug/`. Both
    are correct on the site and broken in a file a reader has downloaded: under
    `file://` a leading slash is the filesystem root, so Chrome prints a
    broken-image icon and pandoc embeds nothing — and pandoc warns about it
    while still exiting 0, so neither failure fails the build.

    Images therefore point at the built file on disk, which both converters
    read, and links point at the live site, which is where a reader following
    one wants to end up.
    """
    absolute_site = os.path.abspath(site_dir)

    def rewrite(match):
        attribute, value, close = match.groups()
        if attribute.startswith('href'):
            return f'{attribute}{site_url.rstrip("/")}{value}{close}'
        # srcset is a comma-separated list of candidates, each of which may
        # carry a descriptor after the URL.
        candidates = []
        for candidate in value.split(','):
            parts = candidate.strip().split(' ', 1)
            parts[0] = absolute_site + parts[0] if parts[0].startswith('/') else parts[0]
            candidates.append(' '.join(parts))
        return f'{attribute}{", ".join(candidates)}{close}'

    return ROOT_REFERENCE.sub(rewrite, body)


def post_targets(site_dir, name):
    """Where the two files go, matching the hrefs _includes/downloads.html writes."""
    directory = os.path.join(site_dir, 'downloads', name)
    return {
        'dir': directory,
        'epub': os.path.join(directory, f'{name}.epub'),
        'pdf': os.path.join(directory, f'{name}.pdf'),
    }


def chrome_binary():
    for candidate in (os.environ.get('CHROME_BIN'),) + CHROME_CANDIDATES:
        if not candidate:
            continue
        found = candidate if os.path.isfile(candidate) else shutil.which(candidate)
        if found:
            return found
    raise BuildError('no Chrome binary found; set CHROME_BIN')


def run(command):
    name = os.path.basename(command[0])
    try:
        result = subprocess.run(command, capture_output=True, text=True, timeout=CONVERT_TIMEOUT)
    except FileNotFoundError:
        raise BuildError(f'{name} is not installed') from None
    except subprocess.TimeoutExpired:
        raise BuildError(f'{name} hung for over {CONVERT_TIMEOUT}s') from None
    if result.returncode != 0:
        raise BuildError(f'{name} failed: {result.stderr.strip()[:400]}')
    return result


def write_epub(source_html, target, title, date):
    result = run([
        'pandoc', source_html,
        '--from=html', '--to=epub',
        '--standalone',
        f'--metadata=title:{title}',
        f'--metadata=author:{AUTHOR}',
        f'--metadata=date:{date}',
        '--metadata=lang:en-IN',
        '--output', target,
    ])
    # pandoc reports a resource it could not embed on stderr and still exits 0.
    # Nothing downstream would ever notice, so say it out loud.
    if result.stderr.strip():
        print(f'    pandoc: {result.stderr.strip()[:200]}')


def write_pdf(source_html, target, chrome, profile):
    # Removed first so the existence check below cannot pass on a PDF left by
    # an earlier run: Chrome can exit 0 without writing anything.
    if os.path.exists(target):
        os.remove(target)
    run([
        chrome, '--headless', '--disable-gpu', '--no-sandbox',
        # /dev/shm is small on a CI container and a Chrome that runs out of it
        # hangs rather than failing.
        '--disable-dev-shm-usage',
        '--no-first-run',
        f'--user-data-dir={profile}',
        '--no-pdf-header-footer',
        f'--print-to-pdf={target}',
        pathlib.Path(source_html).as_uri(),
    ])
    if not os.path.exists(target) or os.path.getsize(target) == 0:
        raise BuildError('Chrome produced no PDF')


def feed(site_dir):
    """The MCP feed, which is already the list of every published post."""
    path = os.path.join(site_dir, 'api', 'site.json')
    try:
        with open(path) as source:
            return json.load(source)
    except FileNotFoundError:
        raise BuildError(f'{path} missing; build the site first') from None


def build(site_dir, only=None):
    chrome = chrome_binary()
    site = feed(site_dir)
    site_url = site.get('site', {}).get('url', '')
    baseurl = urllib.parse.urlparse(site_url).path
    built = 0
    seen = {}
    for post in site.get('posts', []):
        name = download_name(post['url'])
        if name in seen:
            raise BuildError(f'{post["url"]} and {seen[name]} both end in /{name}/, so one download would overwrite the other')
        seen[name] = post['url']
        if only and only not in (name, post['slug']):
            continue
        page = page_path(site_dir, post['url'], baseurl)
        try:
            with open(page) as source:
                body = article_body(source.read())
        except FileNotFoundError:
            raise BuildError(f'{page} missing for post {name}') from None
        body = resolve_references(body, site_dir, site_url)
        standalone = document(post['title'], post['date'], post['url'], body)

        targets = post_targets(site_dir, name)
        os.makedirs(targets['dir'], exist_ok=True)
        with tempfile.TemporaryDirectory() as workspace:
            source_html = os.path.join(workspace, f'{name}.html')
            with open(source_html, 'w') as handle:
                handle.write(standalone)
            write_epub(source_html, targets['epub'], post['title'], post['date'])
            write_pdf(source_html, targets['pdf'], chrome, os.path.join(workspace, 'chrome'))
        built += 1
        print(f'  {name}: epub + pdf')
    return built


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--site', default=SITE, help='built site directory')
    parser.add_argument('--only', help='build one name or slug while iterating')
    arguments = parser.parse_args()
    try:
        built = build(arguments.site, arguments.only)
    except BuildError as error:
        sys.exit(f'Downloads build failed: {error}')
    if not built:
        sys.exit('Downloads build failed: no posts matched')
    print(f'Downloads built for {built} essays.')


if __name__ == '__main__':
    main()
