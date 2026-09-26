# Digest — 26 septembre 2026

**Tes huit règles sont entrées dans le protocole. La première qu'elles mesurent : le KPI de sortie de Phase 1 est à 0/3, et 63 % des PR ouvertes portent sur des produits sans acheteur nommé.**

---

## Ce que tu as demandé

Tu as envoyé huit règles de fondateur en disant que tu voulais les intégrer « dans notre
manière d'opérer ». Elles sont dans `playbooks/00-protocole-forge.md §5 bis`, chacune
traduite en décision que la routine prend ou refuse — pas en citation encadrée.

**Trois d'entre elles mordent tout de suite.**

### Règle 2 — « ne construis pas avant de savoir à qui tu vends »

J'ai cherché un premier utilisateur réel sur les **25 fichiers d'état et sur le registre** :
« premier client », « client pilote », « utilisateur réel », « entreprise cliente ».
**Une seule occurrence** dans tout le système — et elle désignait du *« mouvement piloté en
JavaScript »*. Sans rapport.

**Aucun des 21 projets réels n'a d'utilisateur nommé.** Le KPI de sortie de la Phase 1
(« 3 logiciels en production **utilisés** par des entreprises africaines réelles ») est donc
à **0/3**. Ce n'est pas une régression : c'était déjà vrai, rien ne l'affichait. C'est
maintenant affiché, projet par projet, dans `etat/premier-utilisateur.json`.

### Règle 7 — « n'insiste pas parce que tu as déjà passé du temps dessus »

Les chiffres, tous déjà au dossier, que la règle rend lisibles :

| Mesure | Chiffre |
|---|---|
| PR ouvertes dans le portefeuille | **91** |
| dont sur comptrack + taama + mifa-life-shop | **57 — soit 63 %** |
| …utilisateurs réels nommés sur ces trois-là | **0** |
| PR ouvertes sur BurkinaCollect et Problem-to-Projects, **les deux seuls produits publiés** | **0** |

**L'effort est inversement corrélé à l'usage.** C'est la phrase la plus dure de la journée
et elle se vérifie en une ligne de calcul.

### Règle 6 — « fondateur technique : apprends à avancer sans coder »

Elle décrit exactement les trois dernières semaines. Le goulot n'a jamais été le code : il
est le bouton de fusion. Donc **je n'ai écrit aucun script aujourd'hui** — pas de 19ᵉ
contrôle CI, pas de nouvel outil. La bonne réponse à cette règle, c'est une mesure et une
question, pas de la machinerie de plus.

---

## Ce que je ne peux pas faire, et la question que ça te renvoie

Nommer l'acheteur et abandonner un projet. Les deux sont à toi : le §3 m'interdit de fermer
une PR, d'abandonner un dépôt ou de réécrire la vision — et c'est bien la bonne frontière,
puisque ce sont les deux seules décisions de tout ce système qui ne s'annulent pas.

→ **Q6 est réécrite**, et réduite à trois lignes à remplir : trois produits, trois premiers
utilisateurs visés, et ce qu'on fait des 18 autres (gel / abandon / statu quo). Elle prend
la tête du fichier, devant Q1 et Q19.

**Hypothèse appliquée en attendant, et elle ne gèle rien de ce qui est en cours :**

> Sur un projet sans premier utilisateur réel nommé, je ne descends plus au niveau 6 du §5
> (nouvelles fonctionnalités). Réparer, documenter, mettre en CI : toujours ouvert.

Aucune PR fermée, aucun dépôt touché.

---

## Ce que j'ai corrigé dans mes propres fichiers

L'en-tête de `QUESTIONS.md` annonçait depuis dix jours : *« AgroTrack BF répond 500 en
production depuis vingt-cinq jours »*. **C'est faux depuis la fusion du 16 septembre** — il
ne casse plus, il attend deux variables d'environnement. La prose contredisait sa propre
ligne de tableau. C'est la règle 32 (une recommandation honorée pourrit comme une
affirmation réfutée) appliquée à moi-même, et elle a mis dix jours à être vue.

---

## ⚠️ Trois jours sans digest — mais le portefeuille a bougé sans moi

**Je n'ai produit aucun Forge Quotidien les 24, 25 et 26 septembre.** Pas de digest, aucun
projet traité. Le cron a sonné correctement chaque matin (`3 2 * * *`, dernier réveil livré
aujourd'hui à 02h03 UTC) : la Routine n'est pas en cause, c'est cette session qui n'a pas
traité ses réveils.

**Mais j'allais écrire « rien n'a bougé », et c'est faux.** Mesuré chez l'hébergeur
aujourd'hui :

- `ambition` — poussé le **26 septembre à 00h30**
- le dépôt de profil `dosteeve2-hash` — poussé le **26 septembre à 02h12**, soit **neuf
  minutes après** le réveil du Forge Quotidien
- `combine` — poussé le 23 septembre à 21h03
- et `livestock-os#5`, ouverte le 22, porte la signature d'une **autre session** que celle-ci
  et cite un répertoire `autopilot/reports/` que ce dépôt ne connaît pas

Donc une autre lignée d'automatisation écrit dans ton portefeuille, et mon silence n'est pas
son immobilité. **Règle 39** ajoutée : avant de déclarer un jour perdu, mesurer les push du
portefeuille, pas ses propres commits.

### Et un compte que je répétais faux depuis trois semaines

**29 dépôts chez l'hébergeur. 25 au registre.** Trois n'y figurent nulle part : `ambition`,
`combine`, `dosteeve2-hash`. J'allais écrire « 25 dépôts » pour la vingtième fois — un
registre est un instantané du jour où on l'a écrit. **Règle 38.**

Je n'ai **pas lu** `ambition` ni `combine` : ils sont hors du périmètre GitHub de cette
session, et je n'ajoute pas un dépôt que tu n'as pas demandé. Je constate leur existence et
leurs dates, rien de plus — et je ne juge pas si ce sont de bonnes idées.

Mais le chiffre, lui, parle : **trois dépôts apparus ou remués en quatre jours pendant que
91 PR attendaient un clic.** C'est ta règle 7 et ta règle 3 prises en flagrant délit par la
mesure, et c'est l'argument le plus dur du dossier Q6.

### Ce qui tient, vérifié aujourd'hui

- 🔨 **Forge Quotidien** — actif, réveil livré le 26 à 02h03 UTC, prochain le 27.
- 🔍 **Veille des troncs (4 h)** — active, réveil livré le 26 à 00h05 UTC. C'est le cron
  récurrent qui a remplacé la chaîne de check-ins cassée le 22.
- 🚨 **Veille quotidienne de production** — **en échec**, encore : dernier passage `FAILED`
  le 25 septembre à 06h16. C'est **Q20**, toujours ouverte. La seule surveillance des
  13 URLs en production ne surveille rien depuis douze jours.

---

## Ce qui attend un clic — et mon propre compte était faux

Je portais **« 12 PR à moi, toutes vertes »**. Une recherche par auteur en donne
**20 ouvertes depuis le 2 septembre**, dont **trois que je ne suivais pas du tout** :
`livestock-os#5`, `ambition#1` (non-draft) et `Mifa#47`/`#48`. Le chiffre le plus facile à
ne jamais revérifier est celui dont on est l'auteur — **règle 40**.

Vérifié aujourd'hui, une par une, sur l'état de fusion : `forge-afrika#10` **clean** ·
`livestock-os#5` **clean**. Les dix-huit autres, je les ai **listées** aujourd'hui mais leur
CI a été vérifiée les 16-23 septembre, pas ce matin — je ne les annonce donc pas « vertes
aujourd'hui ».

| | |
|---|---|
| **20 PR ouvertes de la série** | forge-afrika #10 et #8 · livestock-os #5 · ambition #1 · forja #27 et #28 · Mifa #47 #48 #49 · sahel #2 · agrotrack #20 · indubot #4 et #5 · Portfolio #11 · milltrack #15 · valuechain #10 · livestockos #9 · duka #11 · comptrack #38 · taama #35 |
| **La seule qui livrerait `ecrireLocal`** | `duka-boutique#11`, vérifiée verte 80/80 le 16. Un clic. |
| **Ordre TAAMA** | **#35 d'abord** (seule propre, apporte la première CI) ; puis trancher **#10**, qui commande sept autres ; **#18** est le plus gros apport restant ; **ne pas fusionner #26** — plus ancienne que le tronc, elle écraserait du travail livré |

---

## 🔧 Et un chantier fini : CompTrack — PR #41

La règle 6 dit que le goulot n'est pas le code. Une fois les mesures écrites, restait à
trouver le seul travail de code **non bloqué et non déjà fait** du portefeuille. Il y en
avait exactement un.

**Le tronc de CompTrack qui livre la production n'avait aucun filet.** `git remote show origin`
donne `HEAD branch: feat/comptrack-v1` — la règle 22 en direct — mais `main` la dépasse de
**38 commits** et c'est de `main` que partent les déploiements. Et `main` n'a **aucun fichier
`.github`** : zéro run de CI depuis la création du dépôt, sur 23 routes en service.

Ma #38 apportait bien une CI, mais sur `feat/comptrack-v1`. **Même fusionnée, le tronc qui
livre resterait sans filet.** C'était le seul des cinq troncs sans CI dont la PR visait la
mauvaise branche — forja a la #27, taama la #35, livestockos la #9, duka-boutique la #11.

**`next lint` était inutilisable en CI** : sans configuration ESLint, il ouvre un
questionnaire interactif et attend le clavier. Ce n'est pas un lint qui échoue, c'est un lint
qui n'a jamais tourné. Une fois branché, il trouve **6 erreurs** — cinq `any` (que `CLAUDE.md`
interdit) et une apostrophe droite en JSX, corrigée avec l'apostrophe française `’`. Aucune
règle désactivée.

Et typer le tooltip a révélé un défaut que `any` masquait : `fcfa(e.value)` pouvait recevoir
`undefined`. Les entrées sans valeur numérique sont écartées, **sans `?? 0`** — afficher
« 0 FCFA » pour une valeur absente est le défaut de FORJA du 22, et un chiffre faux est pire
qu'un chiffre absent.

**PR #41** vers `main` : lint 6 → 0, `tsc` 0, **64/64 tests**, build 0, 23 routes. Trois
sabotages, trois rouges. **Elle ne tranche pas Q15** : elle ne choisit pas quel tronc est le
produit, elle protège celui qui est déjà en ligne.

### Une erreur de mesure, à mon compte

Mon premier `tsc` affichait huit erreurs et j'ai lu « code 0 » — qui était l'état de sortie de
**`tail`**, pas de `tsc`, parce que j'avais mis la commande dans un tube. Les huit erreurs
venaient d'un `.next/` laissé par un build d'un autre jour dans ce clone ; `.next` n'est pas
suivi par git, donc une CI sur checkout neuf ne les voit jamais. Deux fautes en une mesure :
lire l'état de sortie d'un tube, et prendre un artefact local pour l'état du dépôt.

---

## Demain

Reprendre la rotation là où elle s'est arrêtée — **comptrack** et **ueemt-tokat** sont les
deux prochains, et tous deux sont bloqués sur une question à toi (**Q15**, **Q17**). Je les
traiterai sans y toucher, comme TAAMA le 23.
