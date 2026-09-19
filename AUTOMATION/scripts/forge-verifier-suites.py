#!/usr/bin/env python3
# forge-verifier-suites.py — Verifie qu'une recommandation de fusion porte son resultat.
#
# Pourquoi ce script existe : le 19 septembre 2026, cinq fichiers d'etat recommandaient
# encore de fusionner des PR fusionnees le 16 — « a fusionner », « fusionnable en l'etat »,
# « a fusionner AVANT tout le reste ». Aucune de ces phrases n'etait fausse : elles etaient
# vraies le jour ou je les ai ecrites. Mais trois jours plus tard elles se lisaient comme
# du travail en attente, et le vrai etat du portefeuille etait illisible.
#
# C'est le defaut SYMETRIQUE de celui que couvre forge-verifier-corrections.py. Celui-la
# traque l'affirmation REFUTEE qui survit ; celui-ci traque la recommandation HONOREE qui
# survit. Meme effet : un lecteur repart avec une image fausse de ce qui reste a faire.
#
# La regle : tout bloc `verification_pr_NN` porte un sous-bloc `SUITE_DONNEE` disant
# l'etat REEL de la PR (FUSIONNEE / OUVERTE / FERMEE) et la date de cette verification.
#
# Ce controle ne verifie PAS que l'etat declare est vrai — il n'a pas le reseau. Il
# verifie qu'on s'est pose la question et qu'on a date la reponse. La verite, elle, se
# mesure contre l'API GitHub, jamais contre un tableau recopie (regle 30).
#
# Usage: python3 AUTOMATION/scripts/forge-verifier-suites.py
import json
import pathlib
import re
import sys

RACINE = pathlib.Path(__file__).resolve().parents[1]
PROJETS = RACINE / 'etat' / 'projets'

ETATS_ADMIS = {'FUSIONNEE', 'OUVERTE', 'FERMEE'}
MOTIF_BLOC = re.compile(r'^verification_pr_\d+$')
MOTIF_DATE = re.compile(r'^\d{4}-\d{2}-\d{2}$')

erreurs = []
controles = 0

for fichier in sorted(PROJETS.glob('*.json')):
    donnees = json.loads(fichier.read_text(encoding='utf-8'))
    for cle, bloc in donnees.items():
        if not MOTIF_BLOC.match(cle) or not isinstance(bloc, dict):
            continue
        controles += 1
        ou = f'{fichier.name} → {cle}'

        suite = bloc.get('SUITE_DONNEE')
        if suite is None:
            erreurs.append(
                f'{ou} : recommande une fusion sans dire ce qu\'elle est devenue.\n'
                f'    Ajouter un sous-bloc SUITE_DONNEE avec etat_de_la_pr et verifie_le.'
            )
            continue
        if not isinstance(suite, dict):
            erreurs.append(f'{ou} : SUITE_DONNEE doit etre un objet, pas un {type(suite).__name__}.')
            continue

        etat = suite.get('etat_de_la_pr')
        if etat not in ETATS_ADMIS:
            erreurs.append(
                f'{ou} : etat_de_la_pr vaut {etat!r}, attendu l\'un de '
                f'{", ".join(sorted(ETATS_ADMIS))}.'
            )

        verifie = suite.get('verifie_le')
        if not isinstance(verifie, str) or not MOTIF_DATE.match(verifie):
            erreurs.append(
                f'{ou} : verifie_le vaut {verifie!r}, attendu une date AAAA-MM-JJ. '
                f'Un etat sans date ne dit pas s\'il est encore vrai.'
            )

if erreurs:
    print(f'❌ {len(erreurs)} probleme(s) sur {controles} bloc(s) de verification :')
    for e in erreurs:
        print(f'  · {e}')
    sys.exit(1)

print(f'✅ Les {controles} blocs de verification portent leur resultat, date.')
