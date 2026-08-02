#!/usr/bin/env python3
"""Publish outcome-led changelog entries from validated Git commit trailers.

Visitor-facing releases can carry Changelog-Title, Changelog-Summary, and two
or three Changelog-Benefit trailers. The refresh is deterministic, free, and
does not depend on an inference provider staying online.
"""
import datetime
import json
import os
import re
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, '_data', 'site_updates.json')
MAX_COMMITS = 40
MAX_PATCH_CHARS = 7000

SELF_COMMIT = re.compile(r'^chore: refresh visitor changelog$', re.I)
ENCRYPTED_NOTE = re.compile(r'^notes/[a-f0-9]{6,}/', re.I)
INTERNAL_PREFIXES = (
    '.agents/',
    '.github/',
    '_scripts/',
)
INTERNAL_FILES = {
    '.gitignore',
    'DESIGN.md',
    'Gemfile',
    'Gemfile.lock',
    'README.md',
    '_data/quest_releases.yml',
    '_data/site_updates.json',
    'skills-lock.json',
}
BANNED_WORDS = {
    'cutting-edge',
    'enhance',
    'game-changing',
    'leverage',
    'optimize',
    'revolutionary',
    'robust',
    'seamless',
    'supercharge',
    'unlock',
    'world-class',
}


def git(*args, check=True):
    result = subprocess.run(
        ['git', *args],
        cwd=ROOT,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )
    if check and result.returncode:
        raise RuntimeError(result.stderr.strip() or 'git command failed')
    return result


def read_data():
    with open(DATA) as source:
        return json.load(source)


def write_data(data):
    directory = os.path.dirname(DATA)
    with tempfile.NamedTemporaryFile(
        'w', dir=directory, delete=False, prefix='site_updates.', suffix='.json'
    ) as handle:
        json.dump(data, handle, indent=2, ensure_ascii=False)
        handle.write('\n')
        temporary = handle.name
    os.replace(temporary, DATA)


def commit_record(sha):
    metadata = git(
        'show', '-s', '--format=%H%x00%cs%x00%s%x00%b', sha
    ).stdout.split('\x00', 3)
    files = [
        line for line in git(
            'diff-tree', '--no-commit-id', '--name-only', '-r', sha
        ).stdout.splitlines() if line
    ]
    patch = git(
        'show',
        '--format=',
        '--no-color',
        '--unified=1',
        sha,
        '--',
        '.',
        ':(exclude)assets/images/**',
    ).stdout[:MAX_PATCH_CHARS]
    return {
        'sha': metadata[0].strip(),
        'date': metadata[1].strip(),
        'subject': metadata[2].strip(),
        'body': metadata[3].strip(),
        'files': files,
        'patch': patch,
    }


def collect_commits(last_processed, head):
    if last_processed and git(
        'merge-base', '--is-ancestor', last_processed, head, check=False
    ).returncode == 0:
        revision = f'{last_processed}..{head}'
        shas = git('rev-list', '--reverse', revision).stdout.splitlines()
    else:
        print(
            'warning: changelog marker is not an ancestor; scanning recent history',
            file=sys.stderr,
        )
        shas = list(reversed(
            git('rev-list', f'--max-count={MAX_COMMITS}', head).stdout.splitlines()
        ))
    return [commit_record(sha) for sha in shas[-MAX_COMMITS:]]


def internal_path(path):
    return (
        path in INTERNAL_FILES
        or any(path.startswith(prefix) for prefix in INTERNAL_PREFIXES)
    )


def visitor_candidate(commit):
    if SELF_COMMIT.match(commit['subject']):
        return False
    visible = [path for path in commit['files'] if not internal_path(path)]
    if not visible:
        return False
    if all(ENCRYPTED_NOTE.match(path) for path in visible):
        return False
    return True


def trailer_payload(commit):
    """Return one changelog payload, or None when the commit opts out."""
    title = None
    summary = None
    benefits = []
    saw_changelog_trailer = False
    for line in commit['body'].splitlines():
        match = re.match(
            r'^Changelog-(Title|Summary|Benefit):\s*(.+?)\s*$',
            line,
            flags=re.I,
        )
        if not match:
            continue
        saw_changelog_trailer = True
        field, value = match.groups()
        if field.lower() == 'title':
            title = value
        elif field.lower() == 'summary':
            summary = value
        else:
            label, separator, text = value.partition('|')
            if not separator:
                raise ValueError(
                    'Changelog-Benefit must use "label | concrete sentence"'
                )
            benefits.append({'label': label.strip(), 'text': text.strip()})
    if not saw_changelog_trailer:
        return None
    return {
        'updates': [{
            'title': title,
            'summary': summary,
            'benefits': benefits,
            'commit_shas': [commit['sha']],
        }]
    }


def validate_text(text, field, minimum, maximum):
    if not isinstance(text, str):
        raise ValueError(f'{field} must be text')
    clean = re.sub(r'\s+', ' ', text).strip()
    if not minimum <= len(clean) <= maximum:
        raise ValueError(f'{field} length {len(clean)} outside {minimum}-{maximum}')
    lowered = clean.lower()
    banned = sorted(word for word in BANNED_WORDS if word in lowered)
    if banned:
        raise ValueError(f'{field} contains banned language: {", ".join(banned)}')
    if '—' in clean or '!' in clean:
        raise ValueError(f'{field} breaks voice punctuation rules')
    if re.search(r'[<>]|\{\{|\{%|\[[^\]]+\]\(', clean):
        raise ValueError(f'{field} must be plain text without markup')
    return clean


def validate_updates(payload, commits):
    if not isinstance(payload, dict) or not isinstance(payload.get('updates'), list):
        raise ValueError('changelog payload must contain an updates array')
    if len(payload['updates']) > 3:
        raise ValueError('a commit may publish at most three updates')
    allowed = {commit['sha'] for commit in commits}
    clean_updates = []
    for index, update in enumerate(payload['updates']):
        if not isinstance(update, dict):
            raise ValueError(f'update {index} must be an object')
        title = validate_text(update.get('title'), 'title', 20, 110)
        summary = validate_text(update.get('summary'), 'summary', 60, 420)
        benefits = update.get('benefits')
        if not isinstance(benefits, list) or not 2 <= len(benefits) <= 3:
            raise ValueError('each update needs two or three benefits')
        clean_benefits = []
        for benefit in benefits:
            if not isinstance(benefit, dict):
                raise ValueError('benefit must be an object')
            clean_benefits.append({
                'label': validate_text(benefit.get('label'), 'benefit label', 3, 36),
                'text': validate_text(benefit.get('text'), 'benefit text', 20, 220),
            })
        shas = update.get('commit_shas')
        if (
            not isinstance(shas, list)
            or not shas
            or any(sha not in allowed for sha in shas)
        ):
            raise ValueError('update cites an unknown or missing commit SHA')
        clean_updates.append({
            'title': title,
            'summary': summary,
            'benefits': clean_benefits,
            'commit_shas': list(dict.fromkeys(shas)),
        })
    return clean_updates


def update_records(clean_updates, commits, existing_updates):
    by_sha = {commit['sha']: commit for commit in commits}
    existing_shas = {
        sha for update in existing_updates for sha in update.get('commit_shas', [])
    }
    used_ids = {
        update['id'] for update in existing_updates if update.get('id')
    }
    records = []
    for update in clean_updates:
        if any(sha in existing_shas for sha in update['commit_shas']):
            continue
        newest = max(
            (by_sha[sha] for sha in update['commit_shas']),
            key=lambda commit: (commit['date'], commit['sha']),
        )
        base_id = f'{newest["date"]}-{newest["sha"][:7]}'
        record_id = base_id
        suffix = 2
        while record_id in used_ids:
            record_id = f'{base_id}-{suffix}'
            suffix += 1
        used_ids.add(record_id)
        records.append({
            'id': record_id,
            'date': newest['date'],
            'title': update['title'],
            'summary': update['summary'],
            'benefits': update['benefits'],
            'commit_shas': update['commit_shas'],
            'source': 'git-trailer',
        })
    return records


def main():
    data = read_data()
    head = git('rev-parse', 'HEAD').stdout.strip()
    if data.get('last_processed_commit') == head:
        print('site changelog already current')
        return 0

    commits = collect_commits(data.get('last_processed_commit'), head)
    candidates = [commit for commit in commits if visitor_candidate(commit)]
    if not candidates:
        data['last_processed_commit'] = head
        data['updated_at'] = datetime.date.today().isoformat()
        write_data(data)
        print(f'advanced changelog marker; ignored {len(commits)} internal commit(s)')
        return 0

    clean = []
    skipped = 0
    try:
        for commit in candidates:
            payload = trailer_payload(commit)
            if payload is None:
                skipped += 1
                continue
            clean.extend(validate_updates(payload, [commit]))
    except (KeyError, ValueError) as error:
        print(f'error: {error}', file=sys.stderr)
        return 1

    records = update_records(clean, candidates, data['updates'])
    data['last_processed_commit'] = head
    data['updated_at'] = datetime.date.today().isoformat()
    data['updates'] = records + data['updates']
    write_data(data)
    print(
        f'wrote {len(records)} visitor update(s); '
        f'processed {len(commits)} commit(s); '
        f'skipped {skipped} candidate(s) without changelog trailers'
    )
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
