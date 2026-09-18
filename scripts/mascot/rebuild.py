"""Rebuild the four mascots from the retained image-generator outputs.

Run from the project root: python scripts/mascot/rebuild.py
The alignment/keying scripts are adapted from nilbuild/page-mascot (MIT).
"""
from pathlib import Path
import os
import re
import shutil
import subprocess
import sys

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
COLORS = ('orange', 'teal', 'blue', 'yellow')
ENV = {**os.environ, 'PYTHONIOENCODING': 'utf-8', 'MASCOT_ROOT': str(ROOT)}


def run(script, *args):
    result = subprocess.run(
        [sys.executable, str(HERE / script), *map(str, args)],
        cwd=ROOT, env=ENV, capture_output=True, text=True, encoding='utf-8',
        check=True,
    )
    print(result.stdout, end='')
    return result.stdout


for color in COLORS:
    name = f'novodip-{color}'
    character = ROOT / 'characters' / name
    for sheet in ('directions', 'reactions'):
        source = character / f'{sheet}.png'
        shutil.copyfile(character / 'raw' / f'{sheet}.png', source)
        run('key.py', source, '--in-place')
        screening = run('screen.py', source)
        if 'alpha: MISSING' in screening or '-> REJECT' in screening:
            raise SystemExit(f'{name}/{sheet}: source screening failed')
    run('build.py', name, '--anchor', 'shoulders')
    report = run('verify.py', name)
    shift = float(re.search(r'moves ([\d.]+) rendered px', report)[1])
    palette = float(re.search(r'weakest palette match: \S+ at ([\d.]+)%', report)[1])
    width = float(re.search(r'worst width change: \S+ at ([\d.]+)%', report)[1])
    if shift > 2 or palette < 22 or width > 12:
        raise SystemExit(f'{name}: atlas verification failed')
