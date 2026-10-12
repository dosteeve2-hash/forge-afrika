# Cinq recommandations déjà honorées, et un jeton que personne ne suivait

**19 septembre 2026, après-midi.** Contrôle de routine : les neuf bases surveillées n'ont
pas bougé, `ecrireLocal` est toujours absent de `duka-boutique/master`. Rien à signaler.
Le temps a servi au chantier que `rotation.json` posait en priorité : **relire les fichiers
d'état contre le recensement**, parce qu'ils pouvaient encore décrire un tronc d'avant le
16 septembre.

Ils le pouvaient. Mais pas de la façon que j'attendais.

---

## Ce que je cherchais, et ce que j'ai trouvé à la place

Je cherchais des **affirmations devenues fausses**. Le 16ᵉ contrôle CI traque déjà ça :
une affirmation réfutée qui survit dans le fichier qui la réfute.

Ce que j'ai trouvé est le défaut **symétrique**, que rien ne couvrait. Cinq fichiers
portaient encore, en toutes lettres :

| fichier | ce qu'il disait | la PR |
|---|---|---|
| `mifa-life-shop.json` | « **à fusionner AVANT tout le reste** » | #46 — fusionnée le 16 à 14:59:53 |
| `burkinacollect.json` | « fusionnable en l'état ; elle est seulement en BROUILLON » | #4 — 15:00:12 |
| `ueemt-tokat.json` | « à fusionner ; sans elle rien ne peut vérifier ce dépôt » | #14 — 15:00:21 |
| `problem-to-projects-africa.json` | « fusionnable en l'état, base = HEAD de main » | #10 — 15:03:28 |
| `phone-showcase.json` | « à fusionner — seule PR du dépôt » | #1 — 15:03:35 |

**Aucune de ces phrases n'est fausse.** Elles étaient vraies le jour où je les ai écrites.
Trois jours plus tard elles se lisent comme du travail en attente — et le vrai état du
portefeuille devient illisible sous une liste de choses déjà faites.

Une recommandation sans son résultat est une dette de lecture. **Règle 32.**

Chaque bloc `verification_pr_NN` porte désormais un `SUITE_DONNEE` : état réel de la PR,
date de la vérification, méthode. État lu dans l'**API GitHub** (`merged`, `merged_at`),
pas dans le tableau du recensement — un tableau recopié n'est pas une mesure (règle 30).

---

## Les trois qui étaient encore ouvertes — et la vérification m'a retenu

`comptrack#38`, `forja#27` et `taama#35` semblaient relever du même nettoyage. **Elles sont
ouvertes.** Les « nettoyer » aurait effacé trois recommandations valides.

Leurs bases avaient bougé, donc la règle 28 s'appliquait : une fusion en lot transforme
mécaniquement les PR sœurs en conflits. Vérifié en fusionnant, pas en interrogeant GitHub
(règle 27), sur des clones **complets** (règle 21) :

| PR | base | retard | fusion à blanc |
|---|---|---|---|
| `forja#27` | `master` 5abfc3c → 6e16536 | 4 commits | **propre** |
| `taama#35` | `main` 3f8318d → afb5f4c | 2 commits | **propre** |
| `comptrack#38` | `feat/comptrack-v1` dc65248 → 143fdb5 | 2 commits | **propre** |

Les fusions du 16 ne les ont pas cassées. Rien à réparer.

**Une réserve sur `comptrack#38`** : verte et fusionnable n'est pas la même chose qu'utile.
Elle vise `feat/comptrack-v1`, la branche qui n'a jamais produit un déploiement
`target: production` — `main` en a 38 commits d'avance, `v1` 14. La fusionner ne livrerait
rien. C'est la règle 29 **par anticipation**, et ça reste suspendu à **Q15**.

**Précision au passage** sur `taama.json` : la correction du 15 dit « 3f8318d n'est pas une
racine, c'est la **tête** de main ». Le fond reste exact — ce commit a un parent, `main` a
une seule racine. Mais 3f8318d n'est plus la tête depuis le 16 : c'est `afb5f4c`. Précision,
pas réfutation.

---

## Le jeton que personne ne suivait

La PR `ueemt-tokat#14` se terminait par : **« ⚠️ À faire de ton côté : révoquer un jeton »**.
`.env.production` était suivi par git et contenait un `VERCEL_OIDC_TOKEN`, commité dans
`3f75d8d`.

Elle a été fusionnée le 16. **La consigne est partie avec elle.** Elle n'était ni dans
`QUESTIONS.md`, ni dans le fichier d'état, nulle part ailleurs que dans le corps d'une PR
close — donc suivie par personne.

Ce que la fusion a fermé : `.env.production` est **absent** de l'arbre de `main` aujourd'hui.
Ce qu'elle n'a pas fermé : `git rm --cached` ne réécrit pas l'historique, et `3f75d8d` est
un **ancêtre de `main`** sur un dépôt public.

La PR disait « très probablement déjà expiré — **à vérifier plutôt qu'à supposer** ».
Personne n'a vérifié pendant trois jours. Vérifié aujourd'hui, en lisant **la seule
revendication `exp`** du JWT, en local, sans jamais écrire le jeton sur disque, sans jamais
l'afficher, sans contacter aucun service :

```
iat = 2026-06-13T17:06:26Z
exp = 2026-06-14T05:06:26Z     ← durée de vie : 12 heures
```

**Expiré depuis 97 jours. Aucune révocation nécessaire.** L'action demandée à Steeve est
sans objet.

**Règle 33 : une PR fusionnée n'est pas un porte-consignes.** Ce qu'une PR laisse *à faire*
doit sortir de son corps avant qu'elle ne soit fusionnée. Et le corollaire vaut dans les
deux sens : ne pas suivre une action, c'est aussi ne pas savoir qu'on peut **la fermer**.

---

## 17ᵉ contrôle CI

`forge-verifier-suites.py` refuse tout bloc `verification_pr_NN` sans `SUITE_DONNEE` daté.

Il ne vérifie **pas** que l'état déclaré est vrai — il n'a pas le réseau. Il vérifie qu'on
s'est posé la question et qu'on a daté la réponse.

Trois provocations, trois rouges (règle 24 — un garde-fou qu'on n'exécute pas n'existe pas) :

| sabotage | résultat |
|---|---|
| `SUITE_DONNEE` retiré | ✅ attrapé |
| `etat_de_la_pr` = « probablement fusionnée » | ✅ attrapé |
| `verifie_le` = « la semaine dernière » | ✅ attrapé |

Puis retour à l'état sain : les 8 blocs passent.

---

## Ce qui n'a pas changé

Neuf bases inchangées. **Neuf PR à moi, toutes vertes, toutes fusionnables, en attente.**
**Dix-neuf questions, zéro réponse.** `ecrireLocal` toujours absent de `duka-boutique/master`
— la vente perdue n'est toujours pas corrigée pour les commerçants.

Le goulot n'est toujours pas le code.
