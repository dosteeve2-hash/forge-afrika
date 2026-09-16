# ❓ Questions — CompTrack

## Q1. Que fait-on des 17 PR périmées ?

**Posée le** 2026-09-07 · **Statut** : en attente

Vérification faite branche par branche : 17 des 20 PR ouvertes ajoutent des pages qui
existent déjà dans le tronc `feat/comptrack-v1`. Aucune n'a jamais été fusionnée. La plus
ancienne a 69 jours.

| | Ce que ça veut dire | Risque |
|---|---|---|
| **A. Fermer les 17** | On assume que le tronc est la vérité | Perdre une migration SQL ou un utilitaire présent nulle part ailleurs |
| **B. Lire chacune avant** | Sûr | ~2 h de travail, dispatchable sur le PC |
| **C. Les laisser** | Rien à faire | Le dépôt reste illisible et chaque nouveau chantier repart d'un doute |

**Hypothèse retenue : B.** L'extraction est mécanique et vérifiable — exactement le genre
de tâche à dispatcher. Je ne ferme rien tant que ce n'est pas fait : une fermeture est
irréversible, une lecture ne l'est pas.

**Réponse de Steeve :** _(en attente)_

---

## Q2. Quel tronc pour CompTrack ?

**Posée le** 2026-09-07 · **Statut** : en attente

`main` et `feat/comptrack-v1` ont tous deux leur dernier commit le 10 août et divergent.
La branche par défaut est `feat/comptrack-v1`, la plus complète. Mais **11 des 20 PR
ciblent `main`** : fusionnées telles quelles, elles n'arriveraient jamais dans le code
vivant.

C'est le même problème que `forge-afrika`, où la branche par défaut est gelée depuis juin.
Deux dépôts sur deux.

**Hypothèse retenue :** `feat/comptrack-v1` est le tronc. Il mériterait d'être renommé
`main` — un tronc qui s'appelle `feat/…` invite tout le monde à se tromper.

**Réponse de Steeve :** _(en attente)_
