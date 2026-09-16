#!/usr/bin/env bash
# forge-scan.sh — Scan de sante d'un projet clone localement.
# Applique le playbook AUTOMATION/playbooks/02-sentinelle-sante.md.
#
# Usage:
#   forge-scan.sh <chemin-du-clone>      # scan d'un projet (sortie JSON)
#   forge-scan.sh --urls                 # verifie les deploiements de production
#   forge-scan.sh --tous [racine]        # scan de tous les clones presents (defaut: /tmp/forge)
#
# Le scan ne modifie RIEN. Il lit et il rapporte.
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
REG="$ROOT/AUTOMATION/registry.json"
WORKDIR="${FORGE_WORKDIR:-/tmp/forge}"

# ─── Verification des deploiements de production ─────────────────────────
# ATTENTION : certains environnements d'execution passent par un proxy sortant qui
# bloque les domaines externes. Dans ce cas curl renvoie 000 et ce n'est PAS une panne
# du site. On distingue explicitement les deux cas : une fausse alerte "site mort"
# chaque matin detruirait la confiance dans le rapport.
verifier_urls() {
  local tmp; tmp="$(mktemp)"; trap 'rm -f "$tmp"' RETURN
  echo "🌐 Déploiements de production"
  echo "───────────────────────────────────────────────────────────────────────"
  printf '  %-30s %-6s %-8s %s\n' "PROJET" "CODE" "TEMPS" "VERDICT"
  jq -r '.projets[] | select(.url) | "\(.nom)\t\(.url)"' "$REG" | while IFS=$'\t' read -r nom url; do
    local code tps taille verdict err
    err="$(curl -s -o "$tmp" -w '%{http_code} %{time_total} %{size_download}' -m 25 -L "$url" 2>&1)"
    code="$(awk '{print $1}' <<< "$err")"; tps="$(awk '{print $2}' <<< "$err")"
    taille="$(awk '{print $3}' <<< "$err")"
    [[ "$code" =~ ^[0-9]{3}$ ]] || { code="000"; tps="-"; taille=0; }

    if [[ "$code" == "000" ]]; then
      verdict="⚪ non vérifiable ici (réseau sortant restreint) — utiliser l'outil WebFetch"
    elif [[ "$code" == "200" ]]; then
      if [[ "${taille:-0}" -lt 500 ]]; then
        verdict="🟠 200 mais page quasi vide (${taille} o)"
      elif grep -qiE '(application error|deployment not found|404: not_found|could not be found)' "$tmp" 2>/dev/null; then
        verdict="🔴 200 mais contenu d'erreur"
      else
        verdict="✅ en ligne"
      fi
    elif [[ "$code" =~ ^3 ]]; then
      verdict="🟡 redirection non suivie ($code)"
    else
      verdict="🔴 HS ($code)"
    fi
    printf '  %-30s %-6s %-8s %s\n' "$nom" "$code" "${tps}s" "$verdict"
  done
  echo
  echo "  ⚪ = indéterminé, jamais compté comme une panne. Vérifier avec WebFetch avant d'alerter."
}

# ─── Scan d'un clone ─────────────────────────────────────────────────────
scanner_projet() {
  local dir="$1"
  [[ -d "$dir/.git" ]] || { echo "{\"erreur\":\"pas un depot git: $dir\"}"; return 1; }
  cd "$dir" || return 1

  local nom dernier_commit jours_inactif branche nb_commits
  nom="$(basename "$dir")"
  branche="$(git symbolic-ref --short HEAD 2>/dev/null || echo '?')"
  dernier_commit="$(git log -1 --format=%cI 2>/dev/null || echo '')"
  nb_commits="$(git rev-list --count HEAD 2>/dev/null || echo 0)"
  if [[ -n "$dernier_commit" ]]; then
    jours_inactif=$(( ( $(date +%s) - $(date -d "$dernier_commit" +%s) ) / 86400 ))
  else
    jours_inactif=-1
  fi

  # Ecosysteme
  local eco="inconnu"
  [[ -f package.json ]]      && eco="node"
  [[ -f requirements.txt || -f pyproject.toml ]] && eco="python"
  [[ -f pom.xml ]]           && eco="java"
  [[ -f go.mod ]]            && eco="go"

  # Presence des elements structurants
  local a_readme a_tests a_ci a_licence a_gitignore a_env_exemple
  a_readme=$(   [[ -n "$(ls README* 2>/dev/null)" ]] && echo true || echo false )
  a_ci=$(       [[ -d .github/workflows ]] && echo true || echo false )
  a_licence=$(  [[ -n "$(ls LICENSE* 2>/dev/null)" ]] && echo true || echo false )
  a_gitignore=$([[ -f .gitignore ]] && echo true || echo false )
  a_env_exemple=$([[ -n "$(ls .env.example .env.sample 2>/dev/null)" ]] && echo true || echo false )
  a_tests=$( [[ -n "$(find . -path ./node_modules -prune -o \( -name '*.test.*' -o -name '*.spec.*' -o -name 'test_*.py' -o -name 'tests' -type d \) -print -quit 2>/dev/null)" ]] && echo true || echo false )

  # ── Securite : secrets potentiellement committes ──
  local env_versionne fuites
  env_versionne=$( git ls-files | grep -qE '^\.env$|/\.env$' && echo true || echo false )
  fuites="$(git grep -InE '(AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{30,}|-----BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY-----|(api[_-]?key|secret|password|token)[[:space:]]*[:=][[:space:]]*["'"'"'][A-Za-z0-9_\-]{16,}["'"'"'])' \
      -- . ':(exclude)*.lock' ':(exclude)*lock.json' ':(exclude)node_modules' 2>/dev/null | head -5 | wc -l)"

  # ── Doctrine FORGE (CLAUDE.md §3) ──
  local d_offline d_i18n_fr d_xof d_mobile
  d_offline=$( grep -rilE 'service-?worker|workbox|indexeddb|offline|pouchdb|sqlite' --include='*.js' --include='*.ts' --include='*.tsx' --include='*.jsx' --include='*.json' --exclude-dir=node_modules . 2>/dev/null | head -1 | grep -q . && echo true || echo false )
  d_i18n_fr=$( grep -rilE 'i18n|locale|fr-FR|français' --include='*.js' --include='*.ts' --include='*.tsx' --include='*.json' --exclude-dir=node_modules . 2>/dev/null | head -1 | grep -q . && echo true || echo false )
  d_xof=$( grep -rilE 'XOF|CFA|FCFA' --exclude-dir=node_modules --exclude-dir=.git . 2>/dev/null | head -1 | grep -q . && echo true || echo false )
  d_mobile=$( grep -rilE 'viewport|responsive|@media|sm:|md:' --include='*.html' --include='*.css' --include='*.tsx' --include='*.jsx' --exclude-dir=node_modules . 2>/dev/null | head -1 | grep -q . && echo true || echo false )

  jq -n \
    --arg nom "$nom" --arg branche "$branche" --arg dernier "$dernier_commit" \
    --arg eco "$eco" \
    --argjson jours "$jours_inactif" --argjson commits "$nb_commits" \
    --argjson readme "$a_readme" --argjson tests "$a_tests" --argjson ci "$a_ci" \
    --argjson licence "$a_licence" --argjson gitignore "$a_gitignore" --argjson envex "$a_env_exemple" \
    --argjson envv "$env_versionne" --argjson fuites "$fuites" \
    --argjson off "$d_offline" --argjson fr "$d_i18n_fr" --argjson xof "$d_xof" --argjson mob "$d_mobile" \
    '{
      projet: $nom, branche: $branche, ecosysteme: $eco,
      vitalite:  { dernier_commit: $dernier, jours_inactif: $jours, nb_commits: $commits },
      structure: { readme: $readme, tests: $tests, ci: $ci, licence: $licence,
                   gitignore: $gitignore, env_exemple: $envex },
      securite:  { env_versionne: $envv, secrets_suspects: $fuites },
      doctrine:  { offline_first: $off, i18n_fr: $fr, devise_xof: $xof, mobile: $mob }
    }'
}

# ─── Point d'entree ──────────────────────────────────────────────────────
case "${1:---aide}" in
  --urls) verifier_urls ;;
  --tous)
    racine="${2:-$WORKDIR}"
    echo "["
    premier=1
    for d in "$racine"/*/; do
      [[ -d "$d/.git" ]] || continue
      [[ $premier -eq 1 ]] || echo ","
      premier=0
      ( scanner_projet "$d" )
    done
    echo "]"
    ;;
  --aide|-h|--help) sed -n '2,12p' "$0" ;;
  *) scanner_projet "$1" ;;
esac
