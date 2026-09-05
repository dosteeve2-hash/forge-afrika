# 🧭 Playbook — Revue Stratégique (dimanche)

> Le dimanche, on ne code pas. On prend de la hauteur.
> Objectif : vérifier que la semaine écoulée a servi la vision à 25 ans, et corriger le cap.

---

## 1. Relire la boussole

Relis `PROJECT.md`, `VISION.md` et la section de `ROADMAP.md` correspondant à l'année
en cours. Pas en diagonale — vraiment.

`README.md` le dit : *« Ce dépôt est une boussole. Quand tu doutes, relis-le. »*
La revue du dimanche est le moment institutionnalisé de ce doute.

---

## 2. Mesurer la semaine contre les KPIs de la Phase 1

Les KPIs de sortie de Phase 1 (`PROJECT.md`) :

| KPI | Cible 2028 | État réel aujourd'hui |
|---|---|---|
| Logiciels en production utilisés par des entreprises africaines **réelles** | 3 | à mesurer honnêtement |
| Revenu annuel via licences / contrats | > 15 000 USD | à mesurer |
| Contacts dans l'industrie africaine | 50+ | à mesurer |

**Sois impitoyablement honnête sur le premier.** « Déployé sur Vercel » ≠ « utilisé par
une entreprise réelle ». Un produit sans utilisateur est un prototype, quel que soit son
niveau de finition. C'est la distinction la plus importante de toute la Phase 1, et c'est
celle qu'il est le plus tentant de brouiller.

Si aucun produit n'a d'utilisateur réel, alors la question stratégique de la semaine
n'est pas technique — elle est : *comment obtient-on le premier utilisateur ?*
Et le chantier de la semaine suivante doit en découler.

---

## 3. Bilan de la semaine

À partir des 6 rapports quotidiens et de `JOURNAL.md` :

- Combien de PR ouvertes ? Combien mergées par Steeve ? Combien abandonnées ?
  *(Un fort taux d'abandon = le Forge Quotidien travaille sur les mauvais sujets.
  Corriger la rotation ou la grille de choix du playbook 01.)*
- Quels projets ont réellement progressé ? Lesquels stagnent depuis 3 semaines ?
- Quelles hypothèses ont été prises sans réponse de Steeve ? Lesquelles deviennent
  risquées à mesure qu'on construit dessus ?
- Quelle est la dette accumulée qu'on repousse chaque jour ?

---

## 4. Arbitrages stratégiques

Le dimanche est le seul moment où l'on a le droit de proposer d'**arrêter** quelque chose.

- Un projet du registre doit-il descendre de tier ? Être archivé ? Être fusionné avec
  un autre ? *(Les doublons présumés `livestockos` / `livestock-os` et
  `african-hybrid-agent` / `LLM-africain-agent-AI` sont en attente d'arbitrage.)*
- 25 dépôts pour une personne, c'est beaucoup. Concentrer les forces sur 3 produits
  vraiment finis vaut mieux que 10 produits à 60 %. La Phase 1 demande **3** logiciels
  en production, pas dix.
- Y a-t-il un produit du backlog `LOGICIELS/idees-produits.md` qui mérite de démarrer,
  ou qui répond mieux au marché qu'un projet existant ?
- Le contexte a-t-il changé ? (Actualité Burkina Faso / CEDEAO / financement / concurrence
  africaine sur les mêmes créneaux.)

---

## 5. Mettre à jour la ROADMAP

Dans `ROADMAP.md`, pour l'année en cours :

- Cocher `[x]` ce qui est **réellement** fait — preuve à l'appui, pas d'optimisme.
- Ajouter les objectifs atteints qui n'étaient pas prévus.
- **Ne jamais supprimer un objectif non atteint.** On le laisse visible et on écrit
  pourquoi il n'a pas avancé. Une roadmap qui efface ses échecs ne sert plus à rien.

C'est la seule modification autorisée sur les documents de vision
(`00-protocole-forge.md §3.10`).

---

## 6. Livrable

`AUTOMATION/rapports/AAAA-MM-JJ-revue.md` :

```markdown
# 🧭 Revue Stratégique — semaine du … au …

## Le cap est-il tenu ?  (oui / non / partiellement — et pourquoi)
## KPIs Phase 1
## Ce qui a avancé
## Ce qui stagne — et ce que je propose d'en faire
## Arbitrages proposés à Steeve  (il tranche, pas moi)
## Le chantier prioritaire de la semaine qui vient
```

Termine toujours par **une seule question**, la plus importante de la semaine, posée
clairement à Steeve. Une seule. S'il n'en lit qu'une, ce doit être celle qui compte.
