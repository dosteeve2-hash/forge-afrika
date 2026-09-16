# ❓ Questions ouvertes pour Steeve

> **Comment ça marche.** Claude n'attend jamais ta réponse pour avancer (`CLAUDE.md`,
> Partie II). Quand il rencontre un choix qui t'appartient, il écrit la question ici,
> **tranche avec l'hypothèse la plus raisonnable**, et continue à construire dessus.
>
> **Ce que tu as à faire :** quand tu passes, remplis `**Réponse de Steeve :**`.
> La routine du lendemain matin lit ce fichier en premier et applique ta décision —
> y compris si cela veut dire défaire ce qui a été construit sur l'hypothèse.
>
> Un simple « ok » ou « non, plutôt X » suffit. Pas besoin d'être long.

---

---

## 📋 Les 19 questions en un coup d'œil

Trois d'entre elles commandent tout le reste : **Q1** (quel tronc fait foi), **Q2**
(les métriques sont-elles réelles) et **Q19** (quelle architecture d'automatisation).
Trois urgences techniques : **Q21**, AgroTrack BF répond **500 en production depuis
vingt-cinq jours** et seul toi peux le remettre en service ; **Q20**, la surveillance de
production est elle-même en panne, ce qui explique que personne ne l'ait vu ; et **Q15**,
le CompTrack livré n'a aucune page de connexion. Les autres peuvent attendre sans rien bloquer.

| # | Sujet | Ce qu'elle décide | Hypothèse appliquée en attendant |
|---|---|---|---|
| **Q1** | 🚨 `forge-afrika` : trois troncs divergents | ce qu'un `git clone` récupère, et donc ce que tout loop lit | `master` fait foi |
| **Q2** | 📊 Les métriques de `lib/constants.ts` | tout l'ordre des priorités de la Phase 1 | illustratives, pas réelles |
| Q3 | ⏰ 05h00 Turquie ou Burkina ? | l'heure des 27 routines | Turquie (02h00 UTC) |
| Q4 | 🐄 `livestockos` vs `livestock-os` | lequel des deux est le produit | `livestockos` — **contredite depuis par Q18** |
| Q5 | 🤖 Fusionner `LLM-africain-agent-AI` ? | le sort d'un dépôt vide | `african-hybrid-agent` est le vivant |
| Q6 | 🎯 25 dépôts, une seule personne | concentrer ou tout garder | la rotation couvre tout, l'ordre reste ouvert |
| Q7 | 🧹 Construire quand 5 PR attendent déjà ? | le mode triage — **modification du protocole, non appliquée** | seuil à 5, en attente de ton accord |
| Q10 | ☕ FORJA fait-il encore de l'export de café ? | 11 PR à fermer plutôt qu'à fusionner | le tronc a raison |
| Q11 | 🔑 African Hybrid Agent est-il déployé ? | si 6 PR sont encore bonnes à fusionner | non déployé |
| Q12 | 📄 Le README de BurkinaCollect décrit un produit absent | réécrire le README ou construire le produit | README d'abord, rien modifié |
| Q13 | 🌿 Problem to Projects Africa : `main` ou `master` ? | deux apps sans ancêtre commun | `main` |
| Q14 | 🏭 TAAMA : le site public doit-il revenir ? | restaurer `/tarifs` et `/demo` depuis les PR #10/#12 | oui, à restaurer |
| **Q15** | 🧾 CompTrack : GitHub et Vercel se contredisent | quel tronc fait foi, et où vont 21 PR | aucune — je ne tranche pas |
| Q16 | 🔐 Sahel Commerce AI : qui peut modifier le stock ? | l'authentification du seul endpoint qui écrit | démo → limite de débit seule |
| Q17 | 🎓 UEEMT-Tokat : `dev` est-elle vivante ? | garder ou laisser mourir une branche | `main` fait foi |
| Q18 | 🐄 Lequel des deux produits d'élevage est le bon ? | le tier de `livestock-os` au registre | `livestock-os`, plus récent et plus complet |
| **Q19** | ⚙️ Rallumer les 26 loops, ou garder la session vivante ? | le débit réel du système : 2 projets/jour contre 25/semaine | statu quo, rien rallumé |
| **Q21** | 🌾 AgroTrack BF : `/dashboard` répond 500 en production | remettre en service un tier 1 mort depuis 25 jours | aucune — poser une variable est une action de production |
| **Q20** | 🚨 La veille de production échoue chaque matin | la seule surveillance des 13 URLs en production | aucune action — le modèle d'une Routine ne se change pas sans toi |

> **Q4 et Q18 se contredisent.** Q4 (5 septembre) supposait `livestockos` vivant ; Q18
> (13 septembre) a établi par lecture du code que `livestock-os` est plus récent, sans
> ancêtre commun avec l'autre, et porte une fonction que `livestockos` n'a pas — le
> **passeport de cheptel vérifiable par un prêteur**. Q18 remplace Q4. Une seule réponse
> suffit pour les deux.

> **Où sont Q8 et Q9 ?** Nulle part : la numérotation a sauté de Q7 à Q10 le 8 septembre.
> Le trou est laissé tel quel — dix fichiers d'état et de rapports pointent déjà vers
> `Q10`…`Q18`, et les renuméroter casserait ces renvois pour rien.

---

## 🔴 En attente de réponse

### Q1 — 🚨 DÉPÔT — Trois troncs divergents, et le défaut pointe vers le plus vieux (2026-09-05)
**Contexte :** `forge-afrika` a trois branches longues qui ont divergé le 28 juin :

| Branche | Commits | Dernier commit | Contenu |
|---|---|---|---|
| `docs/readme-premium` ← **branche par défaut** | 5 | **28 juin** | documentation seule |
| `main` | 15 | 26 juillet | app Next.js, périmée |
| `master` | 35 | **2 septembre** | app Next.js complète, CI, PRD, specs |

Le travail vivant est sur `master`. Mais la **branche par défaut du dépôt** est
`docs/readme-premium`, gelée depuis 69 jours. Conséquences concrètes : un visiteur de
ton GitHub voit la vieille version, un `git clone` récupère la vieille version, et une
session Claude démarre sur la vieille version — c'est exactement ce qui m'est arrivé :
j'ai construit tout ce système sur la mauvaise branche avant de m'en apercevoir.

**Enjeu :** tant que ce n'est pas réglé, chaque nouvelle session repartira du mauvais
pied, et `main` continuera de diverger silencieusement.

**Hypothèse retenue :** `master` est le tronc. Tout le travail d'automatisation a été
refait dessus et la PR le cible.

**Ce que je n'ai pas fait, et qui t'appartient :** changer la branche par défaut du dépôt
(réglage GitHub, `00-protocole-forge.md §3`) et décider du sort de `main` et
`docs/readme-premium` — les fusionner dans `master` ou les archiver. Je peux préparer
la fusion si tu me le dis, mais je ne supprimerai rien.

**Réponse de Steeve :** _(en attente)_

---

### Q2 — 📊 PRODUIT — Les métriques de `lib/constants.ts` sont-elles réelles ? (2026-09-05)
**Contexte :** `FILIALES_FORGE` affiche des chiffres précis sur le site du QG :
TAAMA 1 240 utilisateurs et 45 M FCFA, MIFA Life 3 400 utilisateurs et 78 M FCFA,
CompTrack 890 utilisateurs, FORJA 560 utilisateurs et 120 M FCFA, AgroTrack 127…
En face, LivestockOS, MillTrack, ValueChain Connect et Indubot Afrika sont à zéro.

**Enjeu :** c'est **la** question qui décide de tout l'ordre des priorités. Le KPI de
sortie de Phase 1 est « 3 logiciels utilisés par des entreprises africaines réelles ».
Si ces chiffres sont réels, la Phase 1 est presque gagnée et il faut consolider.
S'ils sont illustratifs, la priorité absolue n'est pas technique — c'est d'obtenir le
premier vrai utilisateur.

C'est aussi une question de risque : des chiffres illustratifs affichés sans mention sur
une page vue par des investisseurs (`/roadmap` a une section investisseurs) t'exposent.

**Hypothèse retenue :** ces métriques sont **illustratives** en attendant ta confirmation.
Le travail se concentre donc sur « rendre adoptable » — robustesse, simplicité, doctrine
terrain — plutôt que sur l'ajout de fonctionnalités. Je n'ai touché à aucun de ces
chiffres et je ne les ai pas repris dans le registre.

**C'est la correction la plus utile que tu puisses m'apporter.**

**Réponse de Steeve :** _(en attente)_

---

### Q3 — ⏰ SYSTÈME — 05h00 heure de Turquie ou du Burkina ? (2026-09-05)
**Contexte :** tu as demandé « tous les jours à partir de cinq heures du matin ». Tu vis
à Tokat (UTC+3), tes projets et ton pays sont au Burkina Faso (UTC+0). 3 heures d'écart.
**Enjeu :** le rapport doit t'attendre quand *tu* te réveilles.
**Hypothèse retenue :** **05h00 heure de Turquie** (là où tu es physiquement) = 02h00 UTC.
**Pour changer :** dis-le, la modification prend une minute.
**Réponse de Steeve :** _(en attente)_

---

### Q4 — 🐄 REGISTRE — `livestockos` et `livestock-os` : lequel est le vrai ? (2026-09-05)
**Contexte :** deux dépôts au nom quasi identique. `livestockos` (public, commit du
3 septembre) semble le plus actif ; `livestock-os` (privé, 27 août) semble antérieur.
Mais l'URL déclarée dans `lib/constants.ts` est `livestock-os.vercel.app` — avec le
tiret, donc côté ancien dépôt. L'un des deux est probablement du travail perdu.
**Hypothèse retenue :** `livestockos` est le projet vivant (tier 1, jeudi).
`livestock-os` est en tier 3, scanné mais jamais modifié. Rien ne sera supprimé.
**Réponse de Steeve :** _(en attente)_

---

### Q5 — 🤖 REGISTRE — `LLM-africain-agent-AI` et `african-hybrid-agent` : fusion ? (2026-09-05)
**Contexte :** les deux visent un agent IA africain. Le premier date de mai 2026, le
second de septembre — le second semble être la suite. Ni l'un ni l'autre n'apparaît dans
les filiales officielles de `lib/constants.ts`.
**Enjeu :** disperser l'effort sur deux agents au lieu d'en finir un.
**Hypothèse retenue :** `african-hybrid-agent` est le projet vivant (tier 1, vendredi),
l'ancien est en tier 3. Une fusion sera proposée en revue du dimanche.
**Réponse de Steeve :** _(en attente)_

---

### Q6 — 🎯 STRATÉGIE — 25 dépôts, une seule personne. On concentre ? (2026-09-05)
**Contexte :** le site du QG annonce 10 filiales dont 6 « Actif ». Le registre compte
25 dépôts. Le KPI de Phase 1 en demande **3 vraiment finis**.
**Enjeu :** c'est la décision la plus lourde du projet. Le modèle Dangote comme le modèle
coréen disent la même chose : concentrer d'abord, répliquer ensuite. Étaler l'effort sur
13 projets tier 1 risque de n'en finir aucun.
**Hypothèse retenue :** la rotation couvre tous les tier 1, **mais** l'ordre de priorité
(`00-protocole-forge.md §5`) fait passer ce qui est cassé ou proche de la production avant
les nouvelles fonctionnalités. En pratique, les projets les plus avancés avanceront le
plus vite. La revue du dimanche te proposera une concentration explicite dès que les
données de terrain le justifieront.
**Réponse de Steeve :** _(en attente)_

---

### Q7 — Un loop doit-il construire quand le dépôt a déjà 5 PR en attente ? (2026-09-07)

**Posée le** 2026-09-07 · **Statut** : en attente

Recensement du jour : **52 PR ouvertes** sur les dépôts joignables, dont **37 sur TAAMA et
CompTrack seuls**, les plus anciennes du 29 juin — soixante-dix jours. Aucune fusionnée.

Sur CompTrack, 17 des 20 PR ouvertes ajoutent des pages **qui existent déjà dans le tronc**.
Elles ont été reconstruites plus tard, autrement. C'est le coût direct de la pile : chaque
session repart d'un doute sur ce qui existe déjà.

Le registre fait tourner 13 loops quotidiens qui **construisent**. À ce rythme, ils
ajoutent à la pile au lieu de la réduire.

**Proposition — le mode triage.** Tant qu'un dépôt dépasse **5 PR ouvertes**, son loop ne
construit rien : il lit les PR ouvertes, détecte les doublons et les périmées, produit une
recommandation de tri. Il ne repasse en construction qu'une fois la pile redescendue.

| | Pour | Contre |
|---|---|---|
| **A. Mode triage** (proposé) | arrête l'accumulation, rend les dépôts lisibles | plus aucune fonctionnalité neuve sur TAAMA et CompTrack pendant un moment |
| **B. Continuer à construire** | l'élan est là | on écrit une 21ᵉ PR sur un dépôt qui en a 20 |
| **C. Seuil plus haut (15 ?)** | compromis | ne change rien à court terme : TAAMA et CompTrack dépassent déjà |

**Hypothèse retenue : A**, seuil à 5. C'est une modification du protocole, donc elle
attend ton accord — je ne l'ai pas appliquée.

**Réponse de Steeve :** _(en attente)_

---

### Q10 — FORJA fait-il encore de l'export de café ? (2026-09-08)

FORJA a douze PR ouvertes. Neuf d'entre elles (#1 à #9, toutes de juillet) construisent un
produit d'**export de café** : `lots`, `exportations`, `acheteurs`, `finances`, `contrats`,
avec les migrations `004_lots` → `008_finances`.

Le tronc, lui, a continué sans elles jusqu'au 10 août et il est aujourd'hui **autre chose** :
un ERP PME + tontine — `clients`, `commandes`, `devis`, `produits`, `qualite`, `planning`,
`rapports`, `statistiques`, `partenaires`, plus une section `tontine/`. Une seule migration :
`001_waitlist.sql`.

Ce ne sont pas deux versions du même produit, ce sont deux produits. Elles écrivent même dans
deux arborescences différentes (`src/app/dashboard/` contre `src/app/(dashboard)/`), donc les
fusionner produirait deux tableaux de bord dans la même application.

| | Pour | Contre |
|---|---|---|
| **A. L'export de café est abandonné** — fermer les 9 PR | le dépôt redevient lisible, le tronc fait autorité | trois semaines de travail de juillet parties à la poubelle |
| **B. Il revient** — les réécrire sur l'arborescence actuelle | le domaine export est la promesse d'origine de FORJA | c'est un chantier neuf, pas une fusion : les PR se ferment quand même |
| **C. Les deux domaines cohabitent** | rien n'est perdu | deux tableaux de bord, deux barres latérales, une suite de migrations trouée (002 et 003 manquent) — c'est le pire des trois |

**Hypothèse retenue : A.** Le tronc a raison — c'est lui qui a bougé en août, pendant que ces
branches dormaient. Je n'ai **rien fermé** : fermer neuf PR est irréversible pour toi, et la
question est produit, pas technique. En attendant ta réponse, je considère simplement qu'aucune
de ces neuf PR ne sera fusionnée en l'état, et je ne construis rien dans ce domaine.

⚠️ **Indépendamment de Q10, une action est urgente et sans risque** : le tronc de FORJA est
**rouge** (12 erreurs de lint, 5 tests en échec) et le dépôt n'a **aucune CI**. La PR **#27**
répare exactement cela — je l'ai vérifiée moi-même : lint 0 erreur, 148/148 tests, build OK.
Elle se fusionne sans rien décider d'autre.

**Réponse de Steeve :** _(en attente)_

---

### Q11 — African Hybrid Agent est-il déployé avec une clé d'API ? (2026-09-08)

Sur `main`, l'endpoint `/api/chat` n'a **ni limite de débit ni authentification**. Et
`src/lib/llm/generate.ts` route vers **Anthropic ou OpenAI** dès que `ANTHROPIC_API_KEY` ou
`OPENAI_API_KEY` est défini — à défaut il tombe sur Ollama en local, qui ne coûte rien.

Le dépôt est **public**. Donc : si une instance de cette application tourne quelque part avec une
clé renseignée, n'importe qui peut boucler sur `/api/chat` et facturer cette clé.

**Je n'ai pas vérifié si c'est le cas, et je ne le ferai pas** : lire les variables
d'environnement d'un déploiement est une action de production, exclue par
`00-protocole-forge.md §3`. Le README ne mentionne aucune URL de production pour ce dépôt-ci
(il en cite pour BurkinaCollect et Problem to Projects Africa).

| | Situation | Ce qu'il faut faire |
|---|---|---|
| **A** | Pas déployé, ou déployé sans clé (Ollama seul) | Aucune urgence. Fusionner la #7 quand même : la limite doit exister avant le premier déploiement, pas après. |
| **B** | Déployé avec `ANTHROPIC_API_KEY` ou `OPENAI_API_KEY` | **Urgent.** Retirer la clé du déploiement *maintenant*, puis fusionner la #7 avant de la remettre. |

**Hypothèse retenue : A**, parce que rien dans le dépôt n'atteste d'un déploiement de ce projet.
Mais c'est une hypothèse, pas une vérification — et si c'est B, elle coûte de l'argent chaque
jour où elle reste fausse.

Dans les deux cas la conclusion est la même : **la PR #7 borne cette dépense et attend depuis le
2 septembre.** Elle mérite d'être reprise sans son dossier `coverage/` (39 124 lignes ajoutées
pour ~240 utiles) puis fusionnée.

**Réponse de Steeve :** _(en attente)_

---

### Q12 — Le README de BurkinaCollect décrit un produit qui n'existe pas (2026-09-08)

Le dépôt est **public**. Sa branche par défaut contient **deux fichiers** : `README.md` et
`hooks/useOfflineSync.ts`. Pas de `package.json`, pas d'application.

Ce README présente pourtant un produit fini — badges Next.js 16 / React 19 / TypeScript /
Tailwind, un lien « 🌍 Voir le site live » vers `burkinacollect.vercel.app`, et six
fonctionnalités : dashboard opérationnel, form builder, sync queue offline, gestion des agents,
carte des zones, dashboard superviseur. **Aucune des six n'existe dans aucune branche.** La plus
avancée (PR #4) a deux routes : `/` et `/about`.

Ce n'est pas une question technique, c'est une question de parole publique — donc la tienne.

| | Quoi | Effet |
|---|---|---|
| **A. Corriger le README** | décrire ce qui existe, et déplacer les six fonctionnalités dans une section « feuille de route » | le dépôt redevient honnête tout de suite ; la promesse reste lisible, mais datée |
| **B. Construire ce que le README annonce** | six fonctionnalités à écrire | c'est un vrai chantier, pas une correction ; entre-temps le décalage reste public |
| **C. Rendre le dépôt privé le temps de rattraper** | | tu perds la vitrine, qui est peut-être ce à quoi elle sert |

**Hypothèse retenue : A**, puis B au rythme des loops. **Je n'ai rien modifié** : réécrire la
promesse publique d'un projet est ta parole, pas la mienne — même limite que `PROJECT.md` et
`VISION.md` (`00-protocole-forge.md §3`, règle 10).

⚠️ **Indépendamment de Q12, deux choses sont urgentes et sans ambiguïté :**

1. Le seul code de `main`, `useOfflineSync.ts`, **perd des soumissions terrain en silence** — un
   item qui épuise ses `MAX_RETRIES` est effacé de `localStorage` sans avoir été envoyé et sans
   trace. Pour un outil de collecte offline-first, c'est le pire défaut possible.
2. La **PR #4** corrige exactement cela, publie l'application et ajoute une CI. Je l'ai vérifiée :
   lint 0, 6/6 tests, build 3 routes. **Elle est en brouillon depuis le 2 septembre** — c'est
   probablement la seule raison pour laquelle personne ne l'a regardée.

**Réponse de Steeve :** _(en attente)_

---

### Q13 — Problem to Projects Africa : `main` ou `master` ? (2026-09-08)

```
$ git merge-base origin/main origin/master
→ aucun ancêtre commun
```

Le dépôt contient **deux applications sans un seul commit en commun**. Ce ne sont pas deux
versions d'un même produit qui ont divergé — ce sont deux implémentations séparées de la même
idée, dans le même dépôt. Git ne peut pas les réconcilier : il n'y a rien à quoi se rattacher.

| | `main` (par défaut) | `master` |
|---|---|---|
| Commits · fichiers | 32 · 105 | 7 · 80 |
| Dernier commit | 25 juillet | 13 juillet |
| Parcours | `intake` → `modes` → `results` / `results-enhanced` → `roadmap/[id]` → `project/[id]`, + `explore`, `profile`, `signup` | `start` → `problem` → `skills` → `idea` → `results/[id]`, + `about`, `how-it-works` |
| API | `analyze-project`, `recommend`, `sync` | `generate`, `save-project` |
| En propre | `docs/` — Blueprint, PRD MVP, architecture technique | **`CLAUDE.md`**, `AGENTS.md`, charte SDC dark premium, **logo officiel** |

`dashboard`, `login` et `auth/callback` existent des deux côtés, écrits deux fois.

**Et les deux PR ouvertes visent des troncs différents** : la #10 vise `main`, la #9 vise
`master`. Autrement dit, le travail continue en parallèle sur les deux, et chaque jour qui passe
rend l'abandon de l'une plus coûteux.

| | Pour | Contre |
|---|---|---|
| **A. `main` est le produit** | c'est la branche par défaut, la plus avancée (32 commits contre 7), elle porte le Blueprint et le PRD, et sa PR #10 est vérifiée verte | on perd la charte SDC et le logo officiel — **récupérables : 3 fichiers à copier** |
| **B. `master` est le produit** | il porte la charte visuelle finalisée, le logo, et le `CLAUDE.md` que `main` n'a pas | 7 commits contre 32, arrêté depuis le 13 juillet, et il faudrait re-cibler la branche par défaut |
| **C. Les garder tous les deux** | rien à trancher tout de suite | c'est la situation actuelle : deux apps, deux PR, deux troncs, et personne ne sait laquelle livrer |

**Hypothèse retenue : A.** `main` est la branche par défaut et la plus construite ; ce que
`master` a en propre tient en trois fichiers (`CLAUDE.md`, `AGENTS.md`,
`public/brand/logo-ppa.svg`) qui se copient à la main.

**Je n'ai rien fait** : ni fermé la #9, ni re-ciblé quoi que ce soit, ni touché à `master`. Et
je n'ai **rien construit** sur `main` non plus — développer avant que tu tranches, c'est risquer
de développer l'application qui sera abandonnée.

⚠️ **Indépendamment de Q13** : sur `main`, `npx tsc --noEmit` **échoue**, il y a **91
avertissements** de lint, **deux `@ts-nocheck`** — dont un sur le moteur de recommandation, le
cœur du produit — et un fichier de tests que rien ne peut exécuter (aucun script `test` dans
`package.json`). Aucune CI ne l'a jamais signalé. La **PR #10** corrige tout : vérifiée ici,
lint 0 problème, `tsc` passe, 30/30 tests, build 18 routes.

**Réponse de Steeve :** _(en attente)_

---

### Q14 — TAAMA : le site public doit-il revenir ? (2026-09-09)

Le tronc de TAAMA est **un commit orphelin**. `main` ne contient qu'un seul commit, `3f8318d` du
10 août, et il n'a pas de parent : l'historique de juin-juillet a été remplacé, pas continué.

Ce remplacement a **gardé le tableau de bord et l'a enrichi** — `main` a toutes les pages de
l'ancienne histoire plus sept nouvelles, et en plus complet (`inventaire/page.tsx` : 591 lignes
contre 29).

Mais il a **perdu tout le site public**. `main` n'a que `src/app/page.tsx`. Ces cinq pages
n'existent nulle part ailleurs que dans des PR devenues infusionnables :

| Page | Où elle survit |
|---|---|
| `/pricing`, `/demo`, `/contact`, `/tarifs` | PR **#10** (`feat/contact-leads`) |
| `/blog` | PR **#12** (`feat/blog`) |

| | Quoi | Conséquence |
|---|---|---|
| **A. Oui, les restaurer** | extraire les fichiers de #10 et #12 sur une branche partant de `main` | TAAMA retrouve une vitrine — tarifs, démo, contact : c'est par là qu'arrivent les prospects d'un SaaS B2B |
| **B. Non, elles étaient périmées** | fermer #10 et #12 avec les autres | le site se limite à sa page d'accueil ; à réécrire un jour de zéro |
| **C. Les réécrire plutôt que les restaurer** | | plus coûteux, mais le contenu de juin ne reflète peut-être plus l'offre |

**Hypothèse retenue : A.** Une page `/tarifs` et une page `/demo` sont l'entrée d'un tunnel de
vente B2B ; les perdre par accident de branche n'est pas une décision produit, c'est un dégât
collatéral. **Je n'ai rien extrait ni fermé** — récupérer suppose de savoir si tu veux ces pages,
et fermer quinze PR est irréversible pour toi.

⚠️ **Indépendamment de Q14** : sur `main`, `npx eslint` donne **9 erreurs**, une **suite de tests
entière** ne se charge pas (`__tests__/InventairePage.test.tsx` — les 110 tests « au vert »
masquaient ce trou), et il n'y a **aucune CI**. La **PR #35** corrige tout : vérifiée ici,
0 erreur de lint, **169/169** tests, build 20 routes.

**Réponse de Steeve :** _(en attente)_

---

### Q15 — CompTrack : `feat/comptrack-v1` ou `main` ? (2026-09-09, réécrite le 15)

⚠️ **Ce que je t'ai dit le 9 septembre était incomplet, et l'incomplet penchait du mauvais côté.**
Je t'avais présenté `feat/comptrack-v1` comme le tronc parce que c'est la branche par défaut sur
GitHub. Je n'avais pas regardé Vercel. Vercel dit l'inverse.

**Les deux réglages se contredisent :**

| | GitHub | Vercel |
|---|---|---|
| Branche désignée | `feat/comptrack-v1` (branche par défaut) | `main` (branche de production) |
| Ce que ça commande | la base par défaut d'une PR, ce qu'un `git clone` récupère | **ce qui est réellement livré** |

Les six déploiements `target: "production"` du projet viennent **tous** de `main`, sans exception.
Tous ceux de `feat/comptrack-v1` sont des previews (`target: null`). Le dernier déploiement en
production est `69d3ff7` — la pointe actuelle de `main`, du 10 août.

**Conséquence sur la pile de PR, exactement à l'envers de ce que j'avais écrit :** les 17 PR qui
visent `main` visent ce qui est réellement livré. Les 4 qui visent `v1` — dont **ma propre #38** —
visent une branche qui n'a jamais rien mis en production.

**Et le fond du problème, qu'aucun des deux troncs ne résout :**

| | `feat/comptrack-v1` | `main` ← **en production** |
|---|---|---|
| Commits depuis la divergence (`ddf6add`, 27 juin) | 12 | 36 |
| Pages | 24 | 20 |
| Page de connexion | oui, `signInWithPassword` réel | **aucune** |
| Le tableau de bord est-il protégé ? | **non** — `middleware.ts` ne fait que limiter le débit de `/api/*` | **non** |

Autrement dit : un logiciel de comptabilité SYSCOHADA, livré, dont **tout le tableau de bord
s'ouvre à qui connaît l'adresse** — salaires, déclarations fiscales, trésorerie, bilan. Ce n'est
pas une conséquence de la question du tronc : c'est vrai des deux côtés. La différence est que
`v1` a déjà la porte et qu'il n'y manque que le mur ; `main` n'a ni l'un ni l'autre.

| | Pour | Contre |
|---|---|---|
| **A. `main` devient le tronc partout** | c'est déjà ce qui est livré ; 36 commits contre 12 ; 17 PR sont déjà bien ciblées | il faut y porter connexion, inscription, paie, déclarations, bilan — et changer la branche par défaut GitHub |
| **B. `feat/comptrack-v1` devient le tronc partout** | il porte l'authentification, la paie, les déclarations, le bilan : le cœur d'un SaaS de comptabilité | il faut re-cibler ou fermer 17 PR **et** changer la branche de production Vercel, donc toucher à la production |
| **C. Réconcilier les deux** | rien n'est perdu — la seule option qui garde `catalogue` / `vente-rapide` **et** la paie | 36 et 12 commits divergents sur les mêmes fichiers : un chantier à part entière, pas une manipulation |

**Hypothèse retenue : je ne tranche pas, et j'arrête de construire à l'aveugle sur CompTrack.**
Changer une branche de production Vercel est une action de production — le protocole me l'interdit
(§3). Changer la branche par défaut GitHub re-base 17 PR d'un coup. Les deux t'appartiennent.
En attendant, je continue de baser mes PR sur `feat/comptrack-v1`, parce que c'est la branche par
défaut et que ma #38 y vit déjà — mais **je sais désormais que cela ne va nulle part en
production**, et je préfère te le dire que laisser l'ambiguïté travailler pour moi.

Ce que j'ai quand même fait, parce que c'est vrai quelle que soit ta réponse : **PR #39** sur `v1`
— le tableau de bord ne s'ouvre plus sans connexion. Liste blanche (une page ajoutée demain est
protégée sans que personne y pense), `getUser()` et jamais `getSession()`, et la distinction entre
« personne n'est connecté » et « ce déploiement n'a pas de Supabase », que le repli sur
`http://placeholder.supabase.co` rendait invisible. 15 tests, dont quatre sabotages délibérés du
garde qui les font bien échouer.

**Réponse de Steeve :** _(en attente)_

---

### Q16 — Sahel Commerce AI : qui a le droit de modifier le stock ? (2026-09-12)

`/api/chat` n'a **aucune authentification**. Ma PR #1 y pose une limite de débit — 20 requêtes
par heure et par IP — mais une limite borne l'abus, elle ne dit pas **qui** agit.

Or l'agent derrière cet endpoint dispose d'outils qui écrivent : `add_product`, `adjust_stock`,
`record_sale`, `reconcile_momo`. Vingt requêtes par heure suffisent largement à fausser
l'inventaire d'une boutique.

| | Quoi | Pour / contre |
|---|---|---|
| **A. Une clé d'API partagée** (`AGENT_API_KEY` en en-tête) | quelques lignes, aucune base | protège d'Internet, pas entre commerçants ; suffisant si le service reste mono-boutique |
| **B. Supabase Auth + rattachement du commerçant** | chaque requête porte un utilisateur, les données sont cloisonnées | c'est le vrai geste ; le schéma `supabase/schema.sql` n'a pas encore de colonne propriétaire |
| **C. Rien de plus pour l'instant** | la limite de débit suffit en démo | acceptable tant que rien de réel n'y est saisi — à trancher avant le premier commerçant |

**Hypothèse retenue : C tant que c'est une démo, B dès qu'un commerçant réel s'en sert.**
Je n'ai **pas** ajouté d'authentification : c'est une décision d'architecture, pas un correctif,
et B suppose de toucher au schéma.

**Réponse de Steeve :** _(en attente)_

---

### Q17 — UEEMT-Tokat : `dev` est-elle encore vivante ? (2026-09-12)

Quatre des sept PR ouvertes — **#8, #7, #6, #5**, toutes de juin-juillet — visent la branche
`dev`, pas `main`. Les trois autres (#14, #12, #11) visent `main`, qui est la branche par défaut
et a avancé jusqu'au 29 juillet.

C'est le motif déjà rencontré chez CompTrack : des PR qui pointent vers une branche que le
produit n'utilise peut-être plus.

| | Si… | Alors |
|---|---|---|
| **A. `dev` est un vestige** | `main` est la seule branche vivante | re-cibler les 4 PR sur `main`, ou les fermer si leur contenu y est déjà |
| **B. `dev` est une branche d'intégration active** | le flux est `feature → dev → main` | les 4 PR sont légitimes ; c'est `main` qui doit recevoir `dev` régulièrement |

**Hypothèse retenue : A.** `main` porte les commits les plus récents et c'est la branche par
défaut. **Je n'ai ni re-ciblé ni fermé** — re-cibler quatre PR est un geste qui t'appartient.

⚠️ **Indépendamment de Q17** : `npm run build` **échoue** sur `main` sans `RESEND_API_KEY` —
`src/lib/email.ts` construisait le client Resend au chargement du module. Aucune CI ne peut donc
construire ce dépôt. La **PR #14** corrige cela et les 131 erreurs de lint : vérifiée ici,
0 erreur, build 38 pages.

**Réponse de Steeve :** _(en attente)_

---

### Q18 — Lequel des deux produits d'élevage est le bon ? (2026-09-13)

Le registre classe `livestock-os` en **tier 3**, avec la mention *« doublon présumé »*. Le
contrôle de santé d'aujourd'hui montre que **les deux affirmations sont fausses** :

```
$ git merge-base livestock-os/master livestockos/main
→ AUCUN ancêtre commun
```

| | `livestockos` — tier 1 | `livestock-os` — tier 3 |
|---|---|---|
| Dernier commit | 11 août | **27 août** |
| Authentification | aucune | **Better Auth** |
| Base | Supabase | **Neon** |
| Persistance | — | **offline-first** |
| En propre | stocks, transactions, alimentation | **passeport de cheptel**, `verifier/[code]`, marché, mouvements |

`livestock-os` est **plus récent, plus complet, et fait autre chose**. Là où `livestockos` gère un
cheptel, celui-ci le rend **lisible par un prêteur** : un éleveur publie un passeport, un prêteur
le vérifie par un code public. C'est littéralement la chaîne de valeur de `VISION.md` — rendre un
actif informel finançable.

**Le produit le plus avancé du portefeuille est classé comme une archive à contrôler une fois par
mois.**

| | Décision | Conséquence |
|---|---|---|
| **A. `livestock-os` devient le produit d'élevage** | tier 1, loop quotidien ; `livestockos` passe en archive | il faut récupérer de `livestockos` ce qui n'existe pas ici — `stocks`, `transactions`, `alimentation` |
| **B. `livestockos` reste le produit** | on garde le tier 1 actuel | on abandonne le passeport, l'auth, Neon et l'offline-first — soit trois semaines d'août |
| **C. Ce sont deux produits distincts** | gestion de cheptel **et** passeport de financement | deux tier 1, deux loops, et il faut le dire dans `PROJECT.md` |

**Hypothèse retenue : A.** Plus récent, plus complet, et sa fonction distinctive est celle que la
vision met au centre. **Je n'ai pas changé le tier** — c'est ta décision. J'ai seulement corrigé
dans `registry.json` la mention « doublon présumé », qui est une erreur constatable.

⚠️ **Au passage, non résolu depuis le 5 septembre** : `livestockos` a toujours sa branche par
défaut sur `feat/animaux-rapports` — 3 commits arrêtés au 1ᵉʳ août, alors que son `main` en a 19
jusqu'au 11 août. Un `git clone` récupère la mauvaise.

**Et une ligne sur `LLM-africain-agent-AI`** : le dépôt est **entièrement vide** — aucun commit,
aucune branche. Ce n'est pas un risque, c'est un nom réservé. Le garder, ou le rendre ?

**Réponse de Steeve :** _(en attente)_

---

### Q19 — Faut-il rallumer les 26 loops, ou garder la session vivante ? (2026-09-14)

**Constat.** Sur les 29 Routines récurrentes du compte, **3 seulement sont actives**.
Les 26 loops par dépôt — 13 quotidiens, 4 hebdomadaires, 8 mensuels, plus le digest et
la revue stratégique — ont été créés le 5 septembre, ont tourné les 5 et 6, et sont
**éteints depuis le 6 septembre**. Leur `next_run_at` est resté figé au 7 septembre.

Ce qui fait le travail depuis est **une seule Routine** : `🔨 Forge Quotidien — session
vivante`, créée le 6 septembre à 14h45, qui réveille **cette session-ci** et lui demande
de traiter **2 projets par jour**.

Autrement dit : l'architecture décrite dans la PR #9, dans `AUTOMATION/README.md` et dans
`CLAUDE.md` Partie II a été remplacée **le lendemain de son écriture**, et la
documentation ne l'a jamais dit. Elle vient d'être corrigée.

**Ce que chaque option coûte.**

| | Pour | Contre |
|---|---|---|
| **A. Garder la session vivante** (actuel) | Elle se souvient de la veille — c'est ce qui a permis de corriger mes propres erreurs (le chiffre « neuf dépôts », la fausse panne CompTrack, l'hypothèse mobile SUGU). Un seul rapport à lire. | **2 projets/jour** : un tour du portefeuille prend deux semaines. **Un seul point de défaillance** — le 11 septembre la session dormait, la journée entière a été perdue. Et son contexte se remplit. |
| **B. Rallumer les 26 loops** | 25 projets touchés par semaine. Une panne ne coûte qu'un projet. | Aucune mémoire d'un jour à l'autre : chaque session repart d'un doute sur ce qui existe déjà — c'est exactement ce qui a produit les 17 PR redondantes de CompTrack. 13 rapports par matin. Et un coût 13 fois supérieur. |
| **C. Les deux** — session vivante + loops mensuels pour les archives | La mémoire là où elle sert, le balayage là où il suffit | Plus compliqué à suivre |

**Hypothèse retenue : A**, statu quo — parce que rallumer 26 Routines quotidiennes est
une dépense et un changement de comportement sur tout le portefeuille, et que ni l'un ni
l'autre ne se décide sans toi. La Q7 va dans le même sens : un dépôt à 20 PR ouvertes n'a
pas besoin d'un loop qui construit tous les matins.

Je n'ai **rien rallumé ni éteint**. J'ai seulement corrigé la documentation pour qu'elle
décrive ce qui tourne vraiment.

**Réponse de Steeve :** _(en attente)_

---

### Q20 — La veille quotidienne échoue chaque matin, et elle te notifie (2026-09-14)

**Constat.** La Routine `Veille quotidienne — écosystème FORGE` (cron `0 6 * * *` UTC)
est **active** et **en échec** : son dernier passage, le 13 septembre à 06h04 UTC, s'est
terminé en `FAILED` au bout de **9 secondes**. Neuf secondes, c'est trop court pour un
échec de tâche — elle n'a pas eu le temps de tester une seule URL. C'est un échec au
démarrage.

Le candidat le plus probable est son modèle : la Routine est fixée sur `claude-fable-5`,
un identifiant qui n'existe plus sous cette forme. Une Routine dont le modèle est
introuvable échoue immédiatement, exactement comme ici.

Ça compte pour deux raisons. C'est la seule surveillance de **production** du
portefeuille — 13 URLs, les déploiements Vercel, les alertes de sécurité Supabase — et
elle est muette depuis au moins un jour. Et elle a les notifications **push et e-mail**
activées : tu reçois peut-être un échec tous les matins sans savoir d'où il vient.

**Je n'ai pas touché au modèle.** Changer le modèle d'une Routine demande ta demande
explicite, dans tes mots — ce n'est pas quelque chose que je décide.

| | |
|---|---|
| **A** | Tu me dis « change le modèle de la veille », et je le passe à un identifiant valide |
| **B** | Tu le corriges toi-même dans l'interface des Routines |
| **C** | On la laisse éteinte et la session vivante reprend cette veille une fois par jour |

**Hypothèse retenue :** aucune action — la Routine reste telle quelle jusqu'à ta réponse.
C'est la seule question de ce fichier où l'hypothèse est de **ne rien faire**, parce que
la règle sur le modèle des Routines ne me laisse pas d'autre choix.

**Réponse de Steeve :** _(en attente)_

---

### Q21 — AgroTrack BF : `/dashboard` répond 500 en production (2026-09-16)

`https://agrotrack-bf.vercel.app/dashboard` renvoie **HTTP 500**. Vérifié ce matin à
02h19 UTC. Le relevé du **22 août** signalait déjà la même panne : **vingt-cinq jours**
qu'un de tes produits tier 1 est inutilisable, et personne ne l'a vu — parce que la
veille de production qui aurait dû le dire est elle-même morte depuis le 14 (**Q20**).

**La cause, établie en la reproduisant et non en la déduisant.** Application lancée sans
les deux variables Supabase :

```
GET /            → 200
GET /dashboard   → 500
serveur : Error: Your project's URL and Key are required to create a Supabase client!
```

Deux occurrences, layout et page — correspondant exactement aux deux digests renvoyés par
la production. `lib/supabase/{client,server}.ts` écrivaient `process.env.X!` : l'assertion
ne ment qu'au vérificateur de types, et à l'exécution `@supabase/ssr` lève **dans**
`createClient()`, donc **avant** que le layout ait pu appeler `getUser()` et rediriger.
Une variable oubliée n'a pas dégradé la connexion : elle a emporté **les seize pages**.

**Ce que j'ai fait, et sa limite.** La **PR #19** fait fermer le produit au lieu de le
casser : `/dashboard` redirige vers `/auth/login?raison=non-configure`, et la page de
connexion dit ce qui manque. Prouvé dans les deux sens, y compris l'absence de faux
positif quand les variables sont présentes.

**Mais elle ne remet pas AgroTrack en service.** Le remède est de poser
`NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans Vercel. C'est une
**action de production**, que le protocole §3 m'interdit — et à raison : je ne sais pas
quelle base Supabase tu veux brancher, ni si `agrotrack-bf` doit pointer vers un projet
existant ou un nouveau.

| | |
|---|---|
| **A. Tu poses les deux variables** | trente secondes dans Vercel, et le produit revit |
| **B. AgroTrack n'est plus une priorité** | alors dis-le : je cesse d'y consacrer des passages, et le registre le sort du tier 1 |

**Hypothèse retenue : je ne touche à rien en production, et je ne construis plus sur
AgroTrack tant que tu n'as pas répondu.** Construire par-dessus une production morte
n'aurait pas de sens. La PR #19 attend, et elle est utile quelle que soit ta réponse :
le jour où une variable sera oubliée à nouveau, le produit fermera au lieu de tomber.

**Réponse de Steeve :** _(en attente)_

---

## ✅ Questions résolues

### [2026-09-05] REGISTRE — Que sont réellement ComptTrack, Forja, InduBot, Duka, Mifa, UEEMT ?
**Résolu sans toi**, par lecture de `lib/constants.ts` sur `master` — la source de vérité
du site QG. Les descriptions déduites ont été remplacées par les vraies, et les URLs de
production ajoutées au registre :

| Dépôt | Vrai nom | Ce que c'est |
|---|---|---|
| `comptrack` | CompTrack | Comptabilité B2B conforme **SYSCOHADA** |
| `forja` | FORJA | Filières agricoles d'export, de la parcelle au conteneur |
| `indubot-afrika` | Indubot Afrika | Automation industrielle — machines, production, alertes |
| `duka-boutique` | **SUGU** | Gestion de boutique pour commerçants du secteur informel |
| `Mifa_Life_shop` | **MIFA Life** | Marketplace mode africaine et artisanat premium |
| `ueemt-tokat` | UEEMT-Tokat | Plateforme des étudiants africains à Tokat |

SUGU et MIFA Life, déclarées « Actif » sur le site, sont passées en **tier 1**.

_Rien à faire de ton côté — c'est ici pour trace._
