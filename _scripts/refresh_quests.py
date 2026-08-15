#!/usr/bin/env python3
"""Refresh _data/quest_releases.yml with meaningful GitHub project updates.

Releases are already curated, so they win. Repositories without releases fall
back to commits whose changed files match that quest's `changelog_include`
paths. Same-day commits are combined into one contextual update. README fixes,
link changes, and repository housekeeping therefore never become product news.

Reads repository rules from _data/quests.yml. Add `repo:` and a comma-separated
`changelog_include:` value to opt a quest in:

    repo: example
    changelog_include: "src/,skills/,package.json"

    python3 _scripts/refresh_quests.py

Auth: uses GH_TOKEN or GITHUB_TOKEN if set. Private repos need a token that can
read them; repos that return 403/404 are skipped with a warning rather than
failing the run.
"""
import collections
import datetime
import fnmatch
import json
import os
import re
import sys
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUESTS = os.path.join(ROOT, '_data/quests.yml')
OUT = os.path.join(ROOT, '_data/quest_releases.yml')
OWNER = 'vcxcvii'
MAX_ENTRIES = 5
COMMIT_SCAN_LIMIT = 25
TOKEN = os.environ.get('GH_TOKEN') or os.environ.get('GITHUB_TOKEN') or ''


def sync_timestamp():
    return (
        datetime.datetime.now(datetime.timezone.utc)
        .replace(microsecond=0)
        .isoformat()
        .replace('+00:00', 'Z')
    )


def api(path):
    req = urllib.request.Request(f'https://api.github.com/{path}',
                                 headers={'Accept': 'application/vnd.github+json',
                                          'User-Agent': 'quest-refresh'})
    if TOKEN:
        req.add_header('Authorization', f'Bearer {TOKEN}')
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        print(f'  skip {path}: HTTP {e.code}', file=sys.stderr)
        return None
    except Exception as e:  # network, timeout
        print(f'  skip {path}: {e}', file=sys.stderr)
        return None


def scalar(value):
    """Read the simple scalar values used by _data/quests.yml."""
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in "'\"":
        return value[1:-1]
    return value


def quest_rules():
    """Return repo-specific changelog rules without requiring PyYAML."""
    quests, current = [], None
    with open(QUESTS) as source:
        for line in source:
            if re.match(r'^-\s+', line):
                if current and current.get('repo'):
                    quests.append(current)
                current = {}
            if current is None:
                continue
            match = re.match(r'^\s{2}([a-z_]+):\s*(.*?)\s*$', line)
            if match:
                current[match.group(1)] = scalar(match.group(2))
    if current and current.get('repo'):
        quests.append(current)

    rules = []
    for quest in quests:
        include = tuple(
            item.strip() for item in quest.get('changelog_include', '').split(',')
            if item.strip()
        )
        if not include:
            print(f'  skip {quest["repo"]}: no changelog_include rule',
                  file=sys.stderr)
            continue
        rules.append({'repo': quest['repo'], 'include': include})
    return rules


TRAILER = re.compile(r'^\s*(co-authored-by|signed-off-by|generated with|🤖)', re.I)


def first_line(text, limit=180):
    """Collapse a commit or release body to one clean line, minus git trailers."""
    if not text:
        return ''
    kept = [ln for ln in text.splitlines() if ln.strip() and not TRAILER.match(ln)]
    body = re.sub(
        r'\s+', ' ', re.sub(r'[#*`<>\r]', '', ' '.join(kept))
    ).strip()
    if len(body) <= limit:
        return body
    clipped = body[:limit - 3].rsplit(' ', 1)[0].rstrip(' ,;:-')
    return clipped + '...'


PREFIX = re.compile(
    r'^(feat|fix|docs|test|refactor|perf|build|ci|chore|init)'
    r'(?:\([^)]+\))?[!:]\s*',
    re.I
)


def clean_title(text, limit=110):
    """Turn a conventional commit subject into reader-facing update copy."""
    title = first_line(text, limit + 40)
    title = PREFIX.sub('', title).strip()
    title = re.sub(
        r'^Rename (?:the )?repo(?:sitory)? to [^,]+,\s*',
        '',
        title,
        flags=re.I,
    )
    title = re.sub(r'^interview-recon\b', 'Interview Recon', title, flags=re.I)
    title = re.sub(
        r'\s+(?:and|&)\s+(?:polish|update|refresh|fix)\s+'
        r'(?:the\s+)?README\b.*$',
        '',
        title,
        flags=re.I,
    )
    if title:
        title = title[0].upper() + title[1:]
    return first_line(title, limit)


def path_matches(path, pattern):
    if any(char in pattern for char in '*?['):
        return fnmatch.fnmatch(path, pattern)
    if pattern.endswith('/'):
        return path.startswith(pattern)
    return path == pattern


def relevant_files(files, include):
    """Keep product changes; ignore repository-only maintenance."""
    paths = [item.get('filename', '') for item in files]
    return [
        path for path in paths
        if any(path_matches(path, pattern) for pattern in include)
    ]


def synthesize_commits(repo, commits, public):
    """Combine same-day related commits into one concise project update."""
    grouped = collections.OrderedDict()
    for commit in commits:
        grouped.setdefault(commit['date'], []).append(commit)

    entries = []
    for date, group in grouped.items():
        primary = group[0]
        other_titles = [
            item['title'] for item in group
            if item['sha'] != primary['sha'] and item['title'] != primary['title']
        ]
        body_parts = []
        if (
            len(group) == 1
            and primary['body']
            and primary['body'].lower() != primary['title'].lower()
        ):
            body_parts.append(primary['body'])
        if other_titles:
            body_parts.append('Also: ' + '; '.join(other_titles))
        url = ''
        if public:
            url = (
                primary['url'] if len(group) == 1
                else f'https://github.com/{OWNER}/{repo}/commits'
            )
        entries.append({
            'date': date,
            'title': primary['title'],
            'body': first_line(' '.join(body_parts), 240),
            'url': url,
            'source': 'commit' if len(group) == 1 else 'commits',
            'commit_count': len(group),
        })
    return entries[:MAX_ENTRIES]


def entries_for(rule):
    repo, include = rule['repo'], rule['include']
    # private repos still get a changelog, but their commit URLs would 404 for
    # visitors, so links are dropped rather than published
    meta = api(f'repos/{OWNER}/{repo}')
    if meta is None:
        return None
    # GitHub keeps a renamed repository's old name as a permanent redirect, so
    # a stale repo: value does not 404. It quietly returns whichever project
    # now owns that name, and its releases get published under the wrong quest.
    # full_name is the canonical name, so compare and refuse the mismatch.
    canonical = str(meta.get('full_name', '')).lower()
    expected = f'{OWNER}/{repo}'.lower()
    if canonical and canonical != expected:
        print(f'  skip {repo}: GitHub redirects it to {meta["full_name"]}. '
              f'The repo was renamed or never existed under this name; fix '
              f'repo: in _data/quests.yml.', file=sys.stderr)
        return []
    public = not meta.get('private', False)
    rel = api(f'repos/{OWNER}/{repo}/releases?per_page={MAX_ENTRIES}')
    if rel is None:
        return None
    if rel:
        return [{'date': r['published_at'][:10],
                 'title': r.get('name') or r['tag_name'],
                 'body': first_line(r.get('body')),
                 'url': r['html_url'] if public else '',
                 'source': 'release'} for r in rel]
    summaries = api(
        f'repos/{OWNER}/{repo}/commits?per_page={COMMIT_SCAN_LIMIT}'
    )
    if summaries is None:
        return None
    if not summaries:
        return []
    commits = []
    inspected = 0
    for summary in summaries:
        detail = api(f'repos/{OWNER}/{repo}/commits/{summary["sha"]}')
        if not detail:
            continue
        inspected += 1
        files = relevant_files(detail.get('files', []), include)
        if not files:
            continue
        message = detail['commit']['message'].split('\n')
        commits.append({
            'sha': detail['sha'],
            'date': detail['commit']['committer']['date'][:10],
            'title': clean_title(message[0]),
            'body': first_line('\n'.join(message[1:])),
            'url': detail['html_url'],
            'files': files,
        })
    if summaries and inspected == 0:
        return None
    return synthesize_commits(repo, commits, public)


def yaml_str(s):
    return '"' + str(s).replace('\\', '\\\\').replace('"', '\\"') + '"'


def existing_sections():
    """Preserve last-known-good data when a repo is temporarily inaccessible."""
    sections, current = {}, None
    if not os.path.exists(OUT):
        return sections
    with open(OUT) as source:
        for line in source:
            match = re.match(r'^([A-Za-z0-9_.-]+):\s*$', line)
            if match:
                current = match.group(1)
                sections[current] = [line.rstrip('\n')]
            elif current:
                sections[current].append(line.rstrip('\n'))
    return sections


def existing_generated_data():
    """Return prior sync timestamp and repository body without metadata."""
    if not os.path.exists(OUT):
        return '', []
    timestamp, body, in_meta = '', [], False
    with open(OUT) as source:
        for raw_line in source:
            line = raw_line.rstrip('\n')
            if line.startswith('# Generated by '):
                continue
            if line == '_meta:':
                in_meta = True
                continue
            if in_meta and line.startswith('  updated_at:'):
                timestamp = scalar(line.split(':', 1)[1])
                continue
            if in_meta and not line.startswith(' '):
                in_meta = False
            body.append(line)
    return timestamp, body


def main():
    lines = []
    previous = existing_sections()
    previous_timestamp, previous_body = existing_generated_data()
    total = 0
    for rule in quest_rules():
        repo = rule['repo']
        print(f'{repo}...', file=sys.stderr)
        items = entries_for(rule)
        if items is None:
            if repo in previous:
                print(f'  preserve {repo}: GitHub data unavailable',
                      file=sys.stderr)
                lines.extend(previous[repo])
                total += sum(
                    line.startswith('  - date:') for line in previous[repo]
                )
            continue
        if not items:
            continue
        lines.append(f'{repo}:')
        for e in items:
            lines.append(f'  - date: {yaml_str(e["date"])}')
            lines.append(f'    title: {yaml_str(e["title"])}')
            if e['body']:
                lines.append(f'    body: {yaml_str(e["body"])}')
            if e['url']:
                lines.append(f'    url: {yaml_str(e["url"])}')
            lines.append(f'    source: {yaml_str(e["source"])}')
            if e.get('commit_count', 1) > 1:
                lines.append(f'    commit_count: {e["commit_count"]}')
        total += len(items)
    timestamp = (
        previous_timestamp
        if previous_timestamp and lines == previous_body
        else sync_timestamp()
    )
    output = [
        '# Generated by _scripts/refresh_quests.py. Do not edit by hand.',
        '_meta:',
        f'  updated_at: {yaml_str(timestamp)}',
        *lines,
    ]
    with open(OUT, 'w') as fh:
        fh.write('\n'.join(output) + '\n')
    print(f'wrote {OUT} — {total} entries')


if __name__ == '__main__':
    main()
