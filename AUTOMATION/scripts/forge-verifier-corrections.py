#!/usr/bin/env python3
# forge-verifier-corrections.py — Verifie qu'une affirmation refutee ne survit pas
# dans le fichier qui la refute.
#
# Pourquoi ce script existe : le 15 septembre 2026 j'ai prouve faux mon propre
# diagnostic de TAAMA (« tronc orphelin, 17 PR sur 18 infusionnables ») et j'ai ajoute
# un bloc CORRECTION_MAJEURE au fichier d'etat. Mais j'ai laisse les champs `verdict`,
# `tronc`, `constat_central` et `prochain_chantier` porter l'affirmation refutee. Le
# haut du fichier — ce qu'on lit en premier — racontait donc toujours l'erreur, avec
# la correction enterree plus bas. Une correction que le fichier contredit lui-meme
# n'est pas une correction.
#
# La regle : tout bloc CORRECTION_* doit nommer, sous la cle `affirmation_refutee`, la
# phrase exacte qu'il refute. Cette phrase ne doit apparaitre NULLE PART AILLEURS dans
# le fichier que dans le bloc de correction lui-meme.
#
# Usage: python3 AUTOMATION/scripts/forge-verifier-corrections.py
import json
import pathlib
import sys

RACINE = pathlib.Path(__file__).resolve().parents[1]
PROJETS = RACINE / 'etat' / 'projets'

erreurs = []
controles = 0

for fichier in sorted(PROJETS.glob('*.json')):
    donnees = json.loads(fichier.read_text(encoding='utf-8'))
    # Tout bloc CORRECTION* DOIT refuter quelque chose ; mais la verification du
    # survivant s'applique a TOUT bloc portant `affirmation_refutee`, quel que soit son
    # nom. Le 20 septembre 2026 j'ai pose quatre affirmations refutees dans des blocs
    # nommes MESURE_* : l'ancienne version, qui ne regardait que les CORRECTION*, ne les
    # voyait pas du tout. Un garde-fou qu'on contourne en renommant son bloc n'en est pas
    # un — et je l'ai contourne sans le vouloir, ce qui est la pire facon de l'apprendre.
    blocs = {k: v for k, v in donnees.items()
             if isinstance(v, dict) and (k.startswith('CORRECTION') or 'affirmation_refutee' in v)}
    if not blocs:
        continue

    for nom, bloc in blocs.items():
        refutee = bloc.get('affirmation_refutee')
        if not refutee:
            erreurs.append(
                "%s → %s ne dit pas quelle affirmation il refute. Ajoute "
                "`affirmation_refutee` avec la phrase exacte, sinon rien ne peut verifier "
                "qu'elle a bien disparu du reste du fichier." % (fichier.name, nom))
            continue

        controles += 1
        # On compte les occurrences PARTOUT sauf dans le bloc de correction : c'est le
        # seul endroit ou l'affirmation a le droit d'etre citee.
        reste = {k: v for k, v in donnees.items() if k != nom}
        texte_reste = json.dumps(reste, ensure_ascii=False)
        if refutee in texte_reste:
            champs = [k for k, v in reste.items()
                      if refutee in json.dumps(v, ensure_ascii=False)]
            erreurs.append(
                "%s → l'affirmation refutee par %s survit dans : %s. "
                "Le haut du fichier raconte encore l'erreur." % (
                    fichier.name, nom, ', '.join(champs)))

if erreurs:
    print("::error::Corrections — une affirmation refutee survit dans son propre fichier :")
    for e in erreurs:
        print("  - %s" % e)
    sys.exit(1)

print("✅ %d correction(s) verifiee(s) — aucune affirmation refutee ne survit ailleurs"
      % controles)
