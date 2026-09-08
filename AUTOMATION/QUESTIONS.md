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

## 🔴 En attente de réponse

### [2026-09-05] 🚨 DÉPÔT — Trois troncs divergents, et le défaut pointe vers le plus vieux
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

### [2026-09-05] 📊 PRODUIT — Les métriques de `lib/constants.ts` sont-elles réelles ?
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

### [2026-09-05] ⏰ SYSTÈME — 05h00 heure de Turquie ou du Burkina ?
**Contexte :** tu as demandé « tous les jours à partir de cinq heures du matin ». Tu vis
à Tokat (UTC+3), tes projets et ton pays sont au Burkina Faso (UTC+0). 3 heures d'écart.
**Enjeu :** le rapport doit t'attendre quand *tu* te réveilles.
**Hypothèse retenue :** **05h00 heure de Turquie** (là où tu es physiquement) = 02h00 UTC.
**Pour changer :** dis-le, la modification prend une minute.
**Réponse de Steeve :** _(en attente)_

---

### [2026-09-05] 🐄 REGISTRE — `livestockos` et `livestock-os` : lequel est le vrai ?
**Contexte :** deux dépôts au nom quasi identique. `livestockos` (public, commit du
3 septembre) semble le plus actif ; `livestock-os` (privé, 27 août) semble antérieur.
Mais l'URL déclarée dans `lib/constants.ts` est `livestock-os.vercel.app` — avec le
tiret, donc côté ancien dépôt. L'un des deux est probablement du travail perdu.
**Hypothèse retenue :** `livestockos` est le projet vivant (tier 1, jeudi).
`livestock-os` est en tier 3, scanné mais jamais modifié. Rien ne sera supprimé.
**Réponse de Steeve :** _(en attente)_

---

### [2026-09-05] 🤖 REGISTRE — `LLM-africain-agent-AI` et `african-hybrid-agent` : fusion ?
**Contexte :** les deux visent un agent IA africain. Le premier date de mai 2026, le
second de septembre — le second semble être la suite. Ni l'un ni l'autre n'apparaît dans
les filiales officielles de `lib/constants.ts`.
**Enjeu :** disperser l'effort sur deux agents au lieu d'en finir un.
**Hypothèse retenue :** `african-hybrid-agent` est le projet vivant (tier 1, vendredi),
l'ancien est en tier 3. Une fusion sera proposée en revue du dimanche.
**Réponse de Steeve :** _(en attente)_

---

### [2026-09-05] 🎯 STRATÉGIE — 25 dépôts, une seule personne. On concentre ?
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

---

## Q7. Un loop doit-il construire quand le dépôt a déjà 5 PR en attente ?

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

## Q10 — FORJA fait-il encore de l'export de café ? (2026-09-08)

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

## Q11 — African Hybrid Agent est-il déployé avec une clé d'API ? (2026-09-08)

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

## Q12 — Le README de BurkinaCollect décrit un produit qui n'existe pas (2026-09-08)

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
