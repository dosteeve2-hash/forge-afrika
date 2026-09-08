# 📓 Journal de la Forge

> Une ligne par exécution. Le fil chronologique de ce qui a été fait, jour après jour.
> Les rapports détaillés sont dans les fichiers `AAAA-MM-JJ-*.md` de ce dossier.

| Date | Routine | En une ligne | Rapport |
|---|---|---|---|
| 2026-09-05 | amorçage | Système installé et programmé. Découvert au passage : 3 troncs divergents, branche par défaut gelée depuis 69 jours, et 6 hypothèses du registre confirmées par `lib/constants.ts`. | [rapport](./2026-09-05-amorcage.md) |
| 2026-09-07 | forge quotidien | Matinée perdue sur TAAMA (PR #36 = doublon de #35, fermée) ; règle ajoutée au playbook. Après-midi : AgroTrack BF rendu utilisable sur téléphone (#17), puis doté d'un vrai noyau de données — 6 tables, RLS, page Membres branchée (#18). Aucune base créée : c'est la décision de Steeve. | [digest](./2026-09-07-digest.md) · [taama](./taama/2026-09-07.md) · [agrotrack-bf](./agrotrack-bf/2026-09-07.md) · [agrotrack-bf/données](./agrotrack-bf/2026-09-07-donnees.md) |
| 2026-09-07 | forge quotidien | CompTrack : 20 PR ouvertes, 0 fusionnée, la plus ancienne a 69 jours — **17 ajoutent des pages qui existent déjà au tronc**. Rien construit, et c'est la décision. Troisième dépôt du jour où le blocage est décisionnel. | [comptrack](./comptrack/2026-09-07.md) |
| 2026-09-07 | recensement | **52 PR ouvertes** sur les dépôts joignables, 37 sur TAAMA+CompTrack seuls, les plus anciennes du 29 juin. Correction : mon état TAAMA annonçait 5 PR, il y en a **18**. Proposition du mode triage. | [recensement](./../machine/recensement-pr-2026-09-07.md) |
| 2026-09-07 | forge quotidien | LivestockOS : **17 tests en échec sur `main`**, que les deux PR ouvertes déclaraient hors périmètre. Réparés — 133/133. Accents français restaurés, `role="dialog"` posé. PR #10. | [livestockos](./livestockos/2026-09-07.md) |
| 2026-09-08 | forge quotidien | ValueChain Connect : « NaN FCFA » sur le total d'un devis (la virgule décimale française). Indubot Afrika : divergence d'hydratation sur la locale des chiffres. Les deux dépôts avaient **zéro test**, ils en ont 20. Recensement complété : **69 PR ouvertes**, pas 52. | [digest](./2026-09-08-digest.md) · [valuechain](./valuechain-connect/2026-09-08.md) · [indubot](./indubot-afrika/2026-09-08.md) |
| 2026-09-08 | forge quotidien — triage | FORJA, 12 PR ouvertes, **premier mode triage** : rien construit. Le tronc est **rouge** (12 lint, 5 tests) et le dépôt n'a **aucune CI** depuis toujours. La PR #27 le répare — vérifiée par moi : 0 lint, 148/148, build OK. Les 11 autres : 2 périmées, 1 doublon strict, 8 qui décrivent un produit (export de café) que le tronc a abandonné en août. | [forja](./forja/2026-09-08.md) |
