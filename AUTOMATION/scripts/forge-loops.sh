#!/usr/bin/env bash
# forge-loops.sh — Le planning des loops : un loop dedie par depot.
# Lit AUTOMATION/registry.json (champ "loop" de chaque projet).
#
# Usage:
#   forge-loops.sh                    # ce qui tourne aujourd'hui
#   forge-loops.sh --planning         # le planning complet, par frequence
#   forge-loops.sh --projet <id>      # la fiche d'un projet
#   forge-loops.sh --cron             # id + cron UTC (pour verifier les Routines)
#   forge-loops.sh --json             # les loops du jour, en machine
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
REG="$ROOT/AUTOMATION/registry.json"

command -v jq >/dev/null || { echo "erreur: jq est requis" >&2; exit 1; }
[[ -f "$REG" ]] || { echo "erreur: registre introuvable ($REG)" >&2; exit 1; }

MODE="jour"; PROJET=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --planning) MODE="planning"; shift ;;
    --cron)     MODE="cron"; shift ;;
    --json)     MODE="json"; shift ;;
    --projet)   MODE="projet"; PROJET="${2:-}"; shift 2 ;;
    -h|--help)  sed -n '2,11p' "$0"; exit 0 ;;
    *) echo "option inconnue: $1" >&2; exit 1 ;;
  esac
done

DOW="$(date -u +%u)"    # 1=lundi .. 7=dimanche
DOM="$(date -u +%-d)"   # jour du mois, sans zero initial

# Les loops qui se declenchent aujourd'hui, selon leur frequence.
loops_du_jour() {
  jq -c --argjson dow "$DOW" --argjson dom "$DOM" '
    [ .projets[] | select(.loop)
      | select(
          .loop.frequence == "quotidien"
          or (.loop.frequence == "hebdomadaire"
              and ((.loop.cron_utc | split(" ") | .[4] | tonumber)
                   == (if $dow == 7 then 0 else $dow end)))
          or (.loop.frequence == "mensuel" and .loop.jour_du_mois == $dom)
        ) ]
    | sort_by(.loop.heure_utc)
  ' "$REG"
}

case "$MODE" in
  json) loops_du_jour | jq . ;;

  cron) jq -r '.projets[] | select(.loop) | "\(.loop.cron_utc)\t\(.id)\t(\(.loop.frequence))"' "$REG" ;;

  projet)
    [[ -n "$PROJET" ]] || { echo "erreur: --projet attend un identifiant" >&2; exit 1; }
    jq -e --arg p "$PROJET" '.projets[] | select(.id == $p)' "$REG" \
      || { echo "erreur: projet inconnu '$PROJET'" >&2; exit 1; }
    ;;

  planning)
    echo "🔁 Planning des loops — un loop dédié par dépôt"
    echo "══════════════════════════════════════════════════════════════════"
    echo "   Horaires en heure de Turquie (UTC+3), là où vit Steeve."
    echo
    for f in quotidien hebdomadaire mensuel; do
      n="$(jq -r --arg f "$f" '[.projets[]|select(.loop.frequence==$f)]|length' "$REG")"
      echo "── ${f^^} ($n projets) ─────────────────────────────────────"
      jq -r --arg f "$f" '
        [.projets[] | select(.loop.frequence == $f)] | sort_by(.loop.heure_utc)[]
        | "  \(.loop.heure_turquie)  \(.nom)"
          + (if .loop.jour_semaine then "  (\(.loop.jour_semaine))" else "" end)
          + (if .loop.jour_du_mois then "  (le \(.loop.jour_du_mois) du mois)" else "" end)
          + "\n            \(.repo)"
      ' "$REG"
      echo
    done
    echo "── AGRÉGATION ────────────────────────────────────────────────"
    jq -r '"  \(._planning.digest_quotidien)\n  \(._planning.revue_strategique)"' "$REG"
    ;;

  jour)
    SEL="$(loops_du_jour)"
    n="$(echo "$SEL" | jq 'length')"
    echo "🔁 Loops du $(date -u +%Y-%m-%d) — $n session(s) dédiée(s)"
    echo "══════════════════════════════════════════════════════════════════"
    echo
    echo "$SEL" | jq -r '.[] |
      "  \(.loop.heure_turquie) (TR)  ▸ \(.nom)   [\(.loop.frequence)]\n      \(.repo)\n      \(.mission)\n"'
    echo "  Chaque loop suit AUTOMATION/playbooks/01-loop-projet.md sur SON seul dépôt."
    echo "  Le digest de 08h33 (TR) agrège tous leurs rapports en un seul."
    ;;
esac
