#!/usr/bin/env bash
# forge-rotation.sh — Determine les projets a travailler aujourd'hui.
# Lit AUTOMATION/registry.json et AUTOMATION/etat/rotation.json.
#
# Usage:
#   forge-rotation.sh                 # cibles du jour (lisible)
#   forge-rotation.sh --json          # cibles du jour (machine)
#   forge-rotation.sh --jour 3        # forcer un jour (1=lundi .. 7=dimanche)
#   forge-rotation.sh --tous          # tout le registre par tier
#   forge-rotation.sh --repos         # juste les "owner/repo" du jour
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
REG="$ROOT/AUTOMATION/registry.json"
ETAT="$ROOT/AUTOMATION/etat/rotation.json"

command -v jq >/dev/null || { echo "erreur: jq est requis" >&2; exit 1; }
[[ -f "$REG" ]] || { echo "erreur: registre introuvable ($REG)" >&2; exit 1; }

JOUR="$(date +%u)"
MODE="humain"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --json)  MODE="json"; shift ;;
    --repos) MODE="repos"; shift ;;
    --tous)  MODE="tous"; shift ;;
    --jour)  JOUR="$2"; shift 2 ;;
    -h|--help) sed -n '2,12p' "$0"; exit 0 ;;
    *) echo "option inconnue: $1" >&2; exit 1 ;;
  esac
done

NOMS_JOUR=(_ lundi mardi mercredi jeudi vendredi samedi dimanche)

# Projets reportes par la session precedente : ils passent en tete.
REPORTES='[]'
if [[ -f "$ETAT" ]]; then
  REPORTES="$(jq -c '.reportes // []' "$ETAT" 2>/dev/null || echo '[]')"
fi

SEL="$(jq -c --argjson j "$JOUR" --argjson rep "$REPORTES" '
  [ .projets[] | select(.jour == $j or (.id as $i | $rep | index($i))) ]
  | sort_by(.tier, .nom)
' "$REG")"

case "$MODE" in
  json)  echo "$SEL" | jq . ;;
  repos) echo "$SEL" | jq -r '.[].repo' ;;
  tous)
    for t in 1 2 3; do
      echo "── Tier $t ──────────────────────────────────────────"
      jq -r --argjson t "$t" '
        .projets[] | select(.tier==$t)
        | "  \(.nom)  [\(.repo)]  jour=\(.jour)\(if .a_confirmer then "  ⚠ a_confirmer" else "" end)"
      ' "$REG"
      echo
    done
    ;;
  humain)
    echo "🔨 FORGE — rotation du $(date +%Y-%m-%d) (${NOMS_JOUR[$JOUR]})"
    echo "══════════════════════════════════════════════════════════"
    if [[ "$JOUR" == "7" ]]; then
      echo
      echo "  🧭 DIMANCHE — Revue Stratégique."
      echo "     → suivre AUTOMATION/playbooks/03-revue-strategique.md"
      echo "     → pas de développement profond aujourd'hui."
      echo
    fi
    n="$(echo "$SEL" | jq 'length')"
    if [[ "$n" == "0" ]]; then
      echo "  (aucun projet en rotation profonde aujourd'hui)"
    else
      echo
      echo "$SEL" | jq -r '.[] |
        "  ▸ \(.nom)  —  \(.repo)\n      mission  : \(.mission)\n      ambition : \(.ambition)\n"'
    fi
    if [[ "$REPORTES" != "[]" ]]; then
      echo "  ⏭  Reporté(s) de la veille, à traiter en priorité :"
      echo "$REPORTES" | jq -r '.[] | "      - \(.)"'
      echo
    fi
    if [[ -f "$ETAT" ]]; then
      pp="$(jq -r '.prochaine_priorite // ""' "$ETAT")"
      [[ -n "$pp" ]] && { echo "  🎯 Priorité laissée par la session précédente :"; echo "      $pp"; echo; }
    fi
    echo "  Rappel : scan de santé de TOUS les projets avant tout développement."
    echo "  → AUTOMATION/playbooks/02-sentinelle-sante.md"
    ;;
esac
