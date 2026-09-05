# 🛡️ Playbook — Sentinelle (santé du système, chaque matin)

> Exécuté au début du Forge Quotidien, avant tout développement.
> Objectif : qu'aucun projet de Steeve ne soit cassé sans qu'il le sache le matin même.

---

## Ce que la Sentinelle vérifie

Pour **chacun des 25 projets** du registre, sans exception, y compris les archives.

### A. Vitalité du dépôt
- Date du dernier commit. Un projet tier 1 sans commit depuis **30 jours** est signalé
  comme *en sommeil* — ce n'est pas une erreur, c'est un signal stratégique.
- Branches non fusionnées qui divergent depuis longtemps.
- PR ouvertes : combien, depuis quand, en conflit ou non.

### B. Intégrité technique
- La CI passe-t-elle sur la branche par défaut ?
- Le projet build-t-il ?
- Les tests passent-ils ? Y en a-t-il seulement ?
- Le lint et le typecheck sont-ils configurés et verts ?

### C. Sécurité
- Dépendances vulnérables (`npm audit`, `pip-audit`, selon l'écosystème).
- **Secrets committés** : clés d'API, tokens, mots de passe, `.env` versionné par erreur.
  C'est le seul point qui justifie de réveiller Steeve immédiatement.
- Fichiers sensibles exposés (`.env`, dumps SQL, clés privées).

### D. Déploiements en production
Les trois produits publics doivent répondre :

| Produit | URL |
|---|---|
| TAAMA | https://taama.vercel.app |
| Problem to Projects Africa | https://problem-to-projects-africa.vercel.app |
| African Hybrid Agent / BurkinaCollect | https://burkinacollect.vercel.app |
| Portfolio | https://steeve-portfolio-mocha.vercel.app |

Vérifier : code HTTP, temps de réponse, et que la page rendue n'est pas une page
d'erreur déguisée en 200. Un site mort est une vitrine morte — donc un contrat perdu.

### E. Conformité à la doctrine (`CLAUDE.md §3`)
Pour les outils destinés au terrain africain uniquement (tier 1, catégories métier) :

| Critère | Comment le vérifier |
|---|---|
| Offline-first | Service worker, cache local, file de synchronisation |
| Mobile | Viewport, responsive, poids du bundle JS |
| Français | Chaînes en dur en anglais dans l'UI, présence d'i18n |
| XOF | Devise codée en dur en EUR/USD, arrondi à 2 décimales |
| Simplicité | Nombre de champs obligatoires par formulaire |

Un écart ici n'est pas cosmétique : c'est ce qui décide si l'outil est adoptable
à Ouagadougou ou seulement à Tokat.

### F. Cohérence documentaire
- Les liens du `README.md` de `forge-afrika` pointent-ils vers des pages vivantes ?
- Les URLs annoncées dans le registre répondent-elles ?
- Un projet du registre a-t-il été renommé ou supprimé sur GitHub ?
- Un nouveau dépôt existe-t-il sans être au registre ?

---

## Niveaux de gravité et réaction

| Niveau | Exemple | Réaction |
|---|---|---|
| 🔴 **Critique** | Secret committé, site de prod HS, faille exploitable | Corriger **immédiatement**, avant toute autre tâche du jour. Le signaler en tête du rapport. |
| 🟠 **Majeur** | Build cassé, CI rouge, dépendance vulnérable | Corriger dans la session du jour. |
| 🟡 **Mineur** | Pas de tests, README pauvre, dépendance vieillissante | Inscrire au backlog du projet, traiter le jour de sa rotation. |
| 🔵 **Info** | Projet en sommeil, doublon présumé | Signaler dans le rapport, poser la question si nécessaire. |

**Un secret committé ne se corrige pas seulement en supprimant le fichier.** La clé est
dans l'historique Git : elle est compromise. Procédure : retirer le fichier, ajouter au
`.gitignore`, et écrire en 🔴 dans le rapport que **Steeve doit révoquer et régénérer la
clé lui-même** chez le fournisseur. Ne jamais réécrire l'historique pour la masquer —
cela donne une fausse impression de sécurité et casse les clones existants.

---

## Sortie attendue

Un tableau de synthèse dans le rapport quotidien :

```markdown
## 🛡️ État de santé — 25 projets

🔴 0   🟠 2   🟡 7   🔵 3

| Projet | Dernier commit | Build | Tests | CI | Prod | Doctrine | Verdict |
|---|---|---|---|---|---|---|---|
| TAAMA | il y a 3 j | ✅ | ⚠️ 12% | ✅ | ✅ 200 | ⚠️ pas offline | 🟡 |
```

Et, dans `AUTOMATION/etat/sante.json`, l'état machine du jour — pour permettre à la
session du lendemain de comparer et de détecter une **régression** plutôt qu'un simple
état. Une régression est toujours plus urgente qu'un défaut ancien : quelque chose a
cassé récemment, donc quelqu'un peut encore s'en souvenir.
