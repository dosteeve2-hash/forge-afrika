#!/usr/bin/env python3
# forge-pr-empilees.py — Dit quelles PR ouvertes n'atteindraient PAS le tronc si on les fusionnait.
#
# Pourquoi ce script existe : le 16 septembre 2026, Steeve a fusionne `duka-boutique#12`,
# qui corrigeait une vente perdue chez les commercants. Elle est partie dans la branche de
# la #11, pas dans `master`. Quatre jours plus tard le correctif n'est toujours pas livre.
# Une fusion a bien eu lieu ; elle n'a rien change. C'est la regle 29.
#
# Le clic est la ressource rare de ce portefeuille. Une PR qui ne livre pas depense un clic
# pour rien, et fait croire que le probleme est regle. Ce script se lance AVANT de cliquer.
#
# Il lit etat/recensement-pr.json — une mesure datee, pas une supposition — et classe chaque
# PR dont la base n'est pas le tronc :
#
#   EMPILEE          la base est la tete d'une AUTRE PR ouverte. La fusionner la verse dans
#                    cette PR-la. Il faut fusionner la parente d'abord, ou la recibler.
#   BRANCHE MORTE    la base est une branche qui ne va nulle part (voir les questions
#                    ouvertes). La fusionner ne livre rien et n'en livrera jamais.
#
# Usage: python3 AUTOMATION/scripts/forge-pr-empilees.py
import json
import pathlib
import sys

RACINE = pathlib.Path(__file__).resolve().parents[1]
CENSUS = RACINE / 'etat' / 'recensement-pr.json'

d = json.loads(CENSUS.read_text(encoding='utf-8'))
depots = d['depots']

print(f"Recensement mesure le {d['mesure_le']} — {d['total_pr_ouvertes']} PR ouvertes "
      f"sur {d['total_depots']} depots.\n")

empilees, mortes, directes = [], [], 0

for pid, info in depots.items():
    tronc = info['tronc']
    par_base = info['par_base']
    # tete_de -> numero de PR, pour reperer une base qui est la tete d'une autre PR
    for base, numeros in par_base.items():
        if base == tronc:
            directes += len(numeros)
            continue
        # la base est-elle la branche d'une PR ouverte du meme depot ?
        parente = info.get('tetes', {}).get(base)
        for n in sorted(numeros, reverse=True):
            if parente:
                empilees.append((pid, n, base, parente))
            else:
                mortes.append((pid, n, base, tronc))

if empilees:
    print("⚠️  EMPILEES — fusionner la parente d'abord, sinon la fusion se perd :")
    for pid, n, base, parente in empilees:
        print(f"   {pid}#{n}  → base `{base}` = la tete de #{parente}")
    print()

if mortes:
    print("⛔ NE VISENT PAS LE TRONC — la fusion ne livrerait rien :")
    for pid, n, base, tronc in mortes:
        print(f"   {pid}#{n}  → base `{base}`, alors que le tronc est `{tronc}`")
    print()

perdues = len(empilees) + len(mortes)
print(f"Bilan : {directes} PR visent leur tronc · {perdues} ne livreraient rien "
      f"({perdues * 100 // d['total_pr_ouvertes']} % des PR ouvertes).")
