#!/usr/bin/env python3
"""Refresh _data/github_contributions.json from the jogruber contributions API.

The homepage graph used to fetch this from the client on every cold load,
which meant it waited on a third-party API round trip before painting: a
visible few-second delay with nothing on screen. Pulling it at build time
instead, on the same daily cron already used for the quest changelog, lets
the graph render synchronously from embedded data with zero network wait.

Failure is safe: an unreachable API leaves the existing file untouched, so a
transient outage never breaks the build or blanks the graph.
"""
import datetime
import json
import os
import sys
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, '_data', 'github_contributions.json')
USER = 'vcxcvii'
ENDPOINT = f'https://github-contributions-api.jogruber.de/v4/{USER}?y=last'


def sync_timestamp():
    return (
        datetime.datetime.now(datetime.timezone.utc)
        .replace(microsecond=0)
        .isoformat()
        .replace('+00:00', 'Z')
    )


def main():
    req = urllib.request.Request(ENDPOINT, headers={'User-Agent': 'github-graph-refresh'})
    try:
        with urllib.request.urlopen(req, timeout=20) as response:
            data = json.load(response)
    except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, ValueError) as error:
        print(f'skip: {error}', file=sys.stderr)
        return 0

    if not data.get('contributions'):
        print('skip: response had no contributions', file=sys.stderr)
        return 0

    data['_meta'] = {'updated_at': sync_timestamp()}
    with open(OUT, 'w') as f:
        json.dump(data, f, indent=2)
        f.write('\n')
    print(f'wrote {OUT}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
