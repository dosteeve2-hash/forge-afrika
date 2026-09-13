#!/usr/bin/env python3
# forge-verifier-questions.py — Verifie que AUTOMATION/QUESTIONS.md reste lisible.
#
# Pourquoi ce script existe : du 8 au 13 septembre 2026, douze questions en attente
# ont vecu SOUS le titre "## ✅ Questions résolues". Chaque loop ajoutait sa question
# a la fin du fichier, et la fin du fichier etait la section des questions resolues.
# Le fichier dont le seul role est de montrer a Steeve ce qui attend sa reponse en
# classait les deux tiers comme deja traitees. Aucun controle ne regardait ce fichier.
#
# Usage: python3 AUTOMATION/scripts/forge-verifier-questions.py
import re
import sys
import pathlib

# Resolu depuis l'emplacement du script, pas depuis le repertoire courant : la CI et
# les loops ne l'appellent pas toujours depuis la racine du depot.
FICHIER = pathlib.Path(__file__).resolve().parents[1] / 'QUESTIONS.md'

texte = FICHIER.read_text(encoding='utf-8')
erreurs = []

# Chaque question doit vivre sous l'une des deux sections, et on doit savoir laquelle.
section, en_attente, resolues, sommaire = None, [], [], []
for ligne in texte.splitlines():
    if ligne.startswith('## 🔴'):
        section = 'attente'
    elif ligne.startswith('## ✅'):
        section = 'resolue'
    elif ligne.startswith('## 📋'):
        section = 'sommaire'
        m = re.search(r'Les (\d+) questions', ligne)
        annonce = int(m.group(1)) if m else None
    elif ligne.startswith('###'):
        m = re.match(r'### (Q\d+) —', ligne)
        if section == 'attente':
            if not m:
                erreurs.append("question en attente sans numéro : %s" % ligne[:70])
            else:
                en_attente.append(m.group(1))
        elif section == 'resolue':
            resolues.append(m.group(1) if m else ligne[4:40])
        elif section is None:
            erreurs.append("question hors section : %s" % ligne[:70])
    elif section == 'sommaire':
        m = re.match(r'\|\s*\*{0,2}(Q\d+)\*{0,2}\s*\|', ligne)
        if m:
            sommaire.append(m.group(1))

if not en_attente:
    erreurs.append("aucune question sous '## 🔴 En attente de réponse'")

i_res = texte.find('## ✅')
if i_res != -1 and '_(en attente)_' in texte[i_res:]:
    for m in re.finditer(r'^#{2,3} (.+)$', texte[i_res:], re.M):
        deb = i_res + m.start()
        fin = texte.find('\n###', deb + 1)
        if '_(en attente)_' in texte[deb:fin if fin != -1 else len(texte)]:
            erreurs.append("classée « résolue » mais attend toujours ta réponse : %s"
                           % m.group(1)[:60])

# Pas deux fois le même numéro.
for num in set(en_attente + resolues):
    if (en_attente + resolues).count(num) > 1:
        erreurs.append("numéro en double : %s" % num)

# Le sommaire doit décrire exactement les questions en attente — sinon il ment.
if sommaire:
    if sorted(set(sommaire)) != sorted(set(en_attente)):
        manque = sorted(set(en_attente) - set(sommaire))
        trop = sorted(set(sommaire) - set(en_attente))
        if manque:
            erreurs.append("absentes du sommaire : %s" % ', '.join(manque))
        if trop:
            erreurs.append("au sommaire mais plus en attente : %s" % ', '.join(trop))
    if annonce is not None and annonce != len(en_attente):
        erreurs.append("le sommaire annonce %d questions, il y en a %d" % (annonce, len(en_attente)))

# Chaque question en attente porte sa marque de réponse et son hypothèse : le
# protocole veut qu'aucune question ne bloque le travail (CLAUDE.md, Partie II).
blocs = re.split(r'^### (Q\d+) —', texte, flags=re.M)
for i in range(1, len(blocs), 2):
    num, corps = blocs[i], blocs[i + 1]
    if num not in en_attente:
        continue
    if 'Réponse de Steeve' not in corps:
        erreurs.append("%s n'a pas de '**Réponse de Steeve :**'" % num)
    if not re.search(r'ypothèse retenue', corps):
        erreurs.append("%s ne dit pas quelle hypothèse a été retenue" % num)

if erreurs:
    print("::error::QUESTIONS.md — le fichier ne se lit plus correctement :")
    for e in erreurs:
        print("  - %s" % e)
    sys.exit(1)

print("✅ %d questions en attente, %d résolue(s), sommaire à jour"
      % (len(en_attente), len(resolues)))
