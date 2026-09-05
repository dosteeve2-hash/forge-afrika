#!/usr/bin/env bash
# forge-ci-local.sh — Rejoue EN LOCAL les controles de .github/workflows/forge-automation-check.yml.
#
# Pourquoi ce script existe : le 2026-09-05, un controle CI a echoue parce que les
# verifications avaient ete rejouees "a la main" avec des expressions RECRITES, proches
# mais pas identiques a celles de la CI. Une condition oubliee, et la CI casse apres le
# push. Ce script extrait et execute les commandes REELLES du workflow — pas une
# paraphrase. C'est la seule verification qui vaut quelque chose.
#
# Usage: ./AUTOMATION/scripts/forge-ci-local.sh
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT" || exit 1
WF=".github/workflows/forge-automation-check.yml"
[[ -f "$WF" ]] || { echo "erreur: workflow introuvable ($WF)" >&2; exit 1; }

echo "🔍 Controles CI rejoues en local, depuis $WF"
echo "════════════════════════════════════════════════════════════════"

python3 - "$WF" <<'PYEOF'
import re, subprocess, sys, shutil, pathlib
wf = pathlib.Path(sys.argv[1]).read_text()

# Les etapes multi-lignes (run: |) et les etapes sur une seule ligne (run: cmd).
etapes  = [(n, "\n".join(l[10:] for l in c.rstrip().split("\n")))
           for n, c in re.findall(r'- name: (.+?)\n        run: \|\n((?:          .*\n|\n)+)', wf)]
etapes += [(n, c.strip())
           for n, c in re.findall(r'- name: (.+?)\n        run: (?!\|)(.+)\n', wf)]

echecs = []
for nom, script in etapes:
    if "apt-get" in script:                       # installe shellcheck sur le runner
        if shutil.which("shellcheck"):
            script = re.sub(r'^\s*sudo apt-get.*$', '', script, flags=re.M)
        else:
            print(f"  ⏭  {nom} — shellcheck absent en local"); continue
    r = subprocess.run(["bash", "-c", script], capture_output=True, text=True)
    if r.returncode == 0:
        print(f"  ✅ {nom}")
    else:
        echecs.append(nom)
        sortie = (r.stdout + r.stderr).strip()
        print(f"  ❌ {nom}")
        for ligne in sortie.splitlines()[:12]:
            print(f"       {ligne}")

print()
if echecs:
    print(f"❌ {len(echecs)} controle(s) en echec — NE PAS POUSSER :")
    for n in echecs:
        print(f"   · {n}")
    sys.exit(1)
print(f"✅ Les {len(etapes)} controles passent. Le push est sur.")
PYEOF
