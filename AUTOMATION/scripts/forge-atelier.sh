#!/usr/bin/env bash
# forge-atelier.sh — Le travail mecanique, celui qu'on dispatche.
#
# Clone chaque projet du registre, installe ses dependances, et lance ses propres
# controles (lint, tests, build). Ecrit un JSON par projet et un tableau de synthese.
#
# Ce script existe pour etre execute AILLEURS que dans la session d'orchestration :
# sur le PC de Steeve, par la session Claude Code CLI qui y tourne. Elle n'a alors
# rien a improviser — elle lance une commande et pousse le resultat. C'est la
# difference entre depenser des tokens et depenser du temps machine.
#
# Il ne MODIFIE aucun depot : il clone en lecture, il mesure, il rapporte.
#
# Usage:
#   forge-atelier.sh                 # tous les projets tier 1
#   forge-atelier.sh --tier 2        # les projets tier 2
#   forge-atelier.sh --projet taama  # un seul projet
#
# Variables:
#   FORGE_ATELIER   repertoire de travail (defaut: /tmp/forge-atelier)
#   FORGE_TIMEOUT   secondes par etape   (defaut: 600)

set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
REG="$ROOT/AUTOMATION/registry.json"
WORK="${FORGE_ATELIER:-/tmp/forge-atelier}"
TIMEOUT="${FORGE_TIMEOUT:-600}"
DATE="$(date -u +%F)"
SORTIE="$ROOT/AUTOMATION/machine/atelier/$DATE"

TIER=1
PROJET=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --tier)   TIER="${2:-1}"; shift 2 ;;
    --projet) PROJET="${2:-}"; shift 2 ;;
    -h|--help) sed -n '2,25p' "$0"; exit 0 ;;
    *) echo "option inconnue: $1" >&2; exit 2 ;;
  esac
done

command -v jq >/dev/null || { echo "jq est requis" >&2; exit 1; }
mkdir -p "$WORK" "$SORTIE"

# Lance une commande avec un plafond de temps. Renvoie le code de sortie, et
# "124" si le plafond a ete atteint — une etape qui ne finit jamais est un
# resultat, pas une raison de bloquer l'atelier entier.
etape() {
  local titre="$1" journal="$2"; shift 2
  local debut fin code
  debut="$(date +%s)"
  timeout "$TIMEOUT" "$@" >>"$journal" 2>&1
  code=$?
  fin="$(date +%s)"
  printf '%s|%s|%s\n' "$titre" "$code" "$((fin - debut))"
}

# Le gestionnaire de paquets se lit dans le depot, il ne se devine pas.
detecter_install() {
  local d="$1"
  if   [[ -f "$d/pnpm-lock.yaml" ]];      then echo "pnpm install --frozen-lockfile"
  elif [[ -f "$d/yarn.lock" ]];           then echo "yarn install --frozen-lockfile"
  elif [[ -f "$d/package-lock.json" ]];   then echo "npm ci"
  elif [[ -f "$d/package.json" ]];        then echo "npm install"
  elif [[ -f "$d/requirements.txt" ]];    then echo "pip install -r requirements.txt"
  else echo ""
  fi
}

# Un script absent n'est pas un echec : c'est une absence, et elle se dit.
a_le_script() {
  [[ -f "$1/package.json" ]] && jq -e --arg s "$2" '.scripts[$s] // empty' "$1/package.json" >/dev/null 2>&1
}

selection() {
  if [[ -n "$PROJET" ]]; then
    jq -r --arg p "$PROJET" '.projets[] | select(.id==$p) | "\(.id)\t\(.repo)\t\(.nom)"' "$REG"
  else
    jq -r --argjson t "$TIER" '.projets[] | select(.tier==$t) | "\(.id)\t\(.repo)\t\(.nom)"' "$REG"
  fi
}

echo "🔧 Atelier FORGE — $DATE"
echo "   travail   : $WORK"
echo "   resultats : $SORTIE"
echo "   plafond   : ${TIMEOUT}s par etape"
echo "═══════════════════════════════════════════════════════════════════════"

total=0; verts=0
while IFS=$'\t' read -r id repo nom; do
  [[ -n "$id" ]] || continue
  total=$((total + 1))
  echo ""
  echo "▶ $nom ($repo)"
  clone="$WORK/$id"
  journal="$SORTIE/$id.log"
  : >"$journal"
  etapes=()

  if [[ -d "$clone/.git" ]]; then
    etapes+=("$(etape "fetch" "$journal" git -C "$clone" fetch --depth 1 origin HEAD)")
    etapes+=("$(etape "reset" "$journal" git -C "$clone" reset --hard FETCH_HEAD)")
  else
    rm -rf "$clone"
    etapes+=("$(etape "clone" "$journal" git clone --depth 1 "https://github.com/$repo" "$clone")")
  fi

  if [[ ! -d "$clone/.git" ]]; then
    echo "   ⚪ clone impossible — voir $journal"
    jq -n --arg id "$id" --arg repo "$repo" --arg nom "$nom" \
      '{projet:$id, depot:$repo, nom:$nom, verdict:"clone_impossible", etapes:[]}' \
      >"$SORTIE/$id.json"
    continue
  fi

  tronc="$(git -C "$clone" rev-parse --abbrev-ref HEAD 2>/dev/null || echo '?')"
  tete="$(git -C "$clone" log -1 --format='%h %ad' --date=short 2>/dev/null || echo '?')"

  install_cmd="$(detecter_install "$clone")"
  if [[ -n "$install_cmd" ]]; then
    # shellcheck disable=SC2086
    etapes+=("$(cd "$clone" && etape "install" "$journal" $install_cmd)")
  fi

  for s in lint test build; do
    if a_le_script "$clone" "$s"; then
      etapes+=("$(cd "$clone" && etape "$s" "$journal" npm run "$s" --silent)")
    else
      etapes+=("$s|absent|0")
    fi
  done

  json_etapes="$(printf '%s\n' "${etapes[@]}" | jq -R -s -c '
    split("\n") | map(select(length>0)) | map(split("|")) |
    map({etape: .[0], code: .[1], secondes: (.[2]|tonumber)})')"

  echec="$(jq -r '[.[] | select(.code != "0" and .code != "absent")] | length' <<<"$json_etapes")"
  if [[ "$echec" == "0" ]]; then verdict="vert"; verts=$((verts + 1)); else verdict="rouge"; fi

  jq -n --arg id "$id" --arg repo "$repo" --arg nom "$nom" --arg tronc "$tronc" \
        --arg tete "$tete" --arg verdict "$verdict" --argjson etapes "$json_etapes" \
    '{projet:$id, depot:$repo, nom:$nom, tronc:$tronc, tete:$tete,
      verdict:$verdict, etapes:$etapes}' >"$SORTIE/$id.json"

  if [[ "$verdict" == "vert" ]]; then
    echo "   ✅ vert — $tronc @ $tete"
  else
    echo "   🔴 $echec étape(s) en échec — $tronc @ $tete"
    jq -r '.[] | select(.code != "0" and .code != "absent") | "      • \(.etape) → code \(.code) (\(.secondes)s)"' <<<"$json_etapes"
  fi
done < <(selection)

# ─── Synthese ──────────────────────────────────────────────────────────────
{
  echo "# 🔧 Atelier FORGE — $DATE"
  echo ""
  echo "$verts projets verts sur $total. Plafond ${TIMEOUT}s par étape."
  echo ""
  echo "| Projet | Verdict | Tronc | Tête | Étapes en échec |"
  echo "|---|---|---|---|---|"
  for f in "$SORTIE"/*.json; do
    [[ -e "$f" ]] || continue
    jq -r '[.etapes[]? | select(.code != "0" and .code != "absent") | "\(.etape) (\(.code))"] as $ko |
           "| \(.nom) | \(if .verdict=="vert" then "✅" else "🔴" end) | \(.tronc // "?") | \(.tete // "?") | " +
           (if ($ko|length) == 0 then "—" else ($ko|join(", ")) end) + " |"' "$f"
  done
  echo ""
  echo "Les journaux complets sont dans \`AUTOMATION/machine/atelier/$DATE/<projet>.log\`."
  echo "Un \`code\` de 124 signifie que l'étape a dépassé le plafond de temps — c'est un"
  echo "résultat, pas une panne de l'atelier."
} >"$SORTIE/synthese.md"

echo ""
echo "═══════════════════════════════════════════════════════════════════════"
echo "✅ $verts vert(s) sur $total — synthèse : $SORTIE/synthese.md"
