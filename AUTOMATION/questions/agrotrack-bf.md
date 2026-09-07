# ❓ Questions — AgroTrack BF

## Q1. AgroTrack BF doit-il devenir un vrai logiciel, ou rester une maquette ?

**Posée le** 2026-09-07 · **Statut** : en attente

Aujourd'hui, les 16 pages affichent des constantes `MOCK` écrites en dur. Supabase n'est
utilisé que pour l'authentification : aucune lecture ni écriture de table nulle part.
Rien n'est enregistré, rien n'est synchronisé, et « offline-first » — affiché dans la
description du dépôt et dans les métadonnées de l'application — n'existe pas dans le code.

Le KPI de sortie de la Phase 1 est « 3 logiciels en production utilisés par des entreprises
africaines réelles ». AgroTrack BF est désigné par la ROADMAP comme le premier MVP.

Trois chemins possibles :

| | Ce que ça veut dire | Coût |
|---|---|---|
| **A. Vrai logiciel** | Schéma Supabase, persistance, puis synchro offline | Plusieurs semaines |
| **B. Maquette assumée** | On retire « offline-first » des promesses, on garde une démo | Une journée |
| **C. Gel** | On ne touche plus au projet, on concentre sur un autre | — |

**Hypothèse retenue en attendant : A.** C'est le premier MVP de la ROADMAP, et B contredit
la Phase 1. La prochaine session attaquera le schéma de données, en commençant par le noyau
(membres, parcelles, collectes, paiements) et une seule page branchée de bout en bout.

Si l'hypothèse est fausse, dis-le : le travail est sur une branche, rien n'est fusionné.

**Réponse de Steeve :** _(en attente)_

---

## Q2. Les 4 composants orphelins : à supprimer ou à brancher ?

**Posée le** 2026-09-07 · **Statut** : en attente

`CollectesClient.tsx`, `ParcelleTable.tsx`, `MembresClient.tsx`, `DashboardClient.tsx` ne
sont importés par aucun fichier. Ils ressemblent à une refonte commencée puis abandonnée —
`CollectesClient` est d'ailleurs mieux fait que la page `collectes` en service (ses tableaux
défilent déjà correctement).

**Hypothèse retenue : ne rien supprimer.** Du code mort ne casse rien, alors qu'une
suppression peut effacer une intention. À trancher quand la couche de données arrivera.

**Réponse de Steeve :** _(en attente)_
