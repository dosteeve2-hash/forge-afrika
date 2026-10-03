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

## 📋 Les 23 questions en un coup d'œil

**Au 3 octobre, trois choses passent devant.** **Q26** d'abord, parce qu'elle concerne un
défaut servi en production à cette minute et que le correctif est écrit : il lui manque une
permission, pas du travail. **Q24** ensuite, parce qu'un système qui dort quatre jours ne
rattrape pas les autres questions. **Q23** enfin : plus aucun déploiement de production
n'aboutit depuis le 26 septembre, donc fusionner ne met plus rien en ligne — tant qu'elle
tient, les autres réponses changent le dépôt et pas le service.

**Celle qui compte le plus sur le fond reste Q6** — trois lignes à remplir, et elle décide de tout ce
que le système fabrique. Le 26 septembre tes huit règles l'ont tranchée : le KPI de sortie
de Phase 1 est mesuré à **0/3**, et 63 % des PR ouvertes portent sur des produits sans
acheteur nommé.

Trois autres commandent la mécanique : **Q1** (quel tronc fait foi), **Q2** (les métriques
sont-elles réelles) et **Q19** (quelle architecture d'automatisation). Deux urgences
techniques restent : **Q20**, la surveillance de production échoue encore chaque matin
(vérifié : dernier passage en échec le 25 septembre) ; et **Q15**, le CompTrack livré n'a
aucune page de connexion. Les autres peuvent attendre sans rien bloquer.

> **Corrigé le 26 septembre.** Ce paragraphe annonçait « AgroTrack BF répond 500 en
> production depuis vingt-cinq jours ». C'est faux depuis la fusion du 16 septembre :
> il ne casse plus, il attend seulement deux variables d'environnement. La prose
> contredisait sa propre ligne de tableau depuis dix jours.

| # | Sujet | Ce qu'elle décide | Hypothèse appliquée en attendant |
|---|---|---|---|
| **Q1** | 🚨 `forge-afrika` : trois troncs divergents | ce qu'un `git clone` récupère, et donc ce que tout loop lit | `master` fait foi |
| **Q2** | 📊 Les métriques de `lib/constants.ts` | tout l'ordre des priorités de la Phase 1 | illustratives, pas réelles |
| Q3 | ⏰ 05h00 Turquie ou Burkina ? | l'heure des 27 routines | Turquie (02h00 UTC) |
| Q4 | 🐄 `livestockos` vs `livestock-os` | lequel des deux est le produit | `livestockos` — **contredite depuis par Q18** |
| Q5 | 🤖 Fusionner `LLM-africain-agent-AI` ? | le sort d'un dépôt vide | `african-hybrid-agent` est le vivant |
| **Q6** | 🎯 **Trois produits, trois acheteurs — trois lignes à remplir** | le KPI de sortie de Phase 1, mesuré à **0/3** le 26 septembre | pas de nouvelle fonctionnalité sur un projet sans utilisateur nommé ; rien fermé, rien abandonné |
| Q7 | 🧹 Construire quand 5 PR attendent déjà ? | le mode triage — **modification du protocole, non appliquée** | seuil à 5, en attente de ton accord |
| Q10 | ☕ FORJA fait-il encore de l'export de café ? | 11 PR à fermer plutôt qu'à fusionner | le tronc a raison |
| **Q12** | 📄 **BurkinaCollect ne collecte rien** — zéro `<form>`, zéro `<input>`, zéro `fetch` dans tout `src/` | aligner le site sur la réalité, ou construire le produit | site inchangé, rien modifié |
| **Q13** | 🌿 Problem to Projects Africa : la branche livrée n'a pas l'intelligence | 61 fichiers dormants, dont toute la génération IA et 4 contextes pays | `main` reste le tronc, **rien porté** |
| Q14 | 🏭 TAAMA : le site public doit-il revenir ? | restaurer `/tarifs` et `/demo` depuis les PR #10/#12 | oui, à restaurer |
| **Q15** | 🧾 CompTrack : une vitrine tourne, le produit non | faire servir `v1`, ou assumer que c'est un prototype | aucune — je ne tranche pas |
| Q16 | 🔐 Sahel Commerce AI : qui peut modifier le stock ? | l'authentification du seul endpoint qui écrit | démo → limite de débit seule |
| Q17 | 🎓 UEEMT-Tokat : `dev` est **morte**, mesuré | fermer la #8, recibler la #11, 4 PR en conflit | je ne touche à rien |
| Q18 | 🐄 Lequel des deux produits d'élevage est le bon ? | le tier de `livestock-os` au registre | `livestock-os`, plus récent et plus complet |
| **Q19** | ⚙️ Rallumer les 26 loops, ou garder la session vivante ? | le débit réel du système : 2 projets/jour contre 25/semaine | statu quo, rien rallumé |
| **Q21** | 🌾 AgroTrack BF : il ne casse plus, il n'est pas en service | poser deux variables — et en changer une troisième avant | aucune — poser une variable est une action de production |
| **Q20** | 🚨 La veille de production échoue chaque matin | la seule surveillance des 13 URLs en production | aucune action — le modèle d'une Routine ne se change pas sans toi |
| Q22 | 📶 Sahel : ce qui est écrit hors ligne ne remonte jamais | la moitié « se synchronise » de la doctrine | C tant que c'est une démo — se répond avec Q16 |
| **Q23** | 🚨 Depuis le 26 septembre, rien ne monte en production | si une fusion met quelque chose en ligne, ou rien du tout | réglage de compte à toi ; je ne tente aucun redéploiement |
| **Q24** | 🚨 La session a dormi 4 jours, 4 matins perdus | le débit réel du système : 2 projets en 9 jours | A, statu quo — B et C sont des actions sur des Routines |
| **Q25** | 📱 Le QG sert 278 Ko de JS et cache son texte | ce que voit un investisseur sur un Android en 2G | je garde les 3 bibliothèques, je ne touche pas au rendu |
| **Q26** | 🔑 Deux correctifs prêts, je ne peux pousser ni l'un ni l'autre | un vaccin périmé affiché « ⚠ 24j », et MIFA Life figée depuis 17 jours | les deux patchs attendent dans `AUTOMATION/correctifs-en-attente/` |

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

### Q6 — 🎯 STRATÉGIE — 29 dépôts, une seule personne. On concentre ? (2026-09-05, **réécrite le 26 septembre avec tes huit règles**)

**Ce qui a changé.** Le 5 septembre, cette question disait : « la revue du dimanche te
proposera une concentration explicite dès que les données de terrain le justifieront ».
Les données sont là, et tes propres règles la tranchent — « ne construis pas avant de
savoir à qui tu vends » et « n'insiste pas parce que tu as déjà passé du temps dessus ».

**Les quatre mesures.**

1. **91 PR ouvertes ; 57 (63 %) sur trois dépôts** — comptrack 21, taama 18,
   mifa-life-shop 18. Aucun des trois n'a d'utilisateur réel nommé.
2. **Les deux produits réellement publiés ont zéro PR ouverte** — BurkinaCollect et
   Problem-to-Projects. L'effort est inversement corrélé à l'usage.
3. **29 dépôts existent ; le registre en décrit 25.** `ambition` a reçu un push le
   26 septembre à 00h30, `combine` le 23, le dépôt de profil le 26 à 02h12. Trois dépôts
   apparus ou remués **en quatre jours**, pendant que 91 PR attendaient un clic. Je ne les
   ai pas lus — ils sont hors du périmètre de cette session et je n'ajoute pas un dépôt que
   tu n'as pas demandé — et je ne juge pas s'ils sont de bonnes idées. Je constate le nombre.
4. **Aucun des 25 fichiers d'état ne nomme un premier utilisateur réel.** Cherché le
   26 septembre sur les 25 fichiers et sur le registre. Le KPI de sortie de Phase 1
   est à **0/3** — il l'était déjà, rien ne l'affichait. C'est désormais affiché dans
   `etat/premier-utilisateur.json`.

**Ce que je ne peux pas faire à ta place, et pourquoi.** Nommer l'acheteur, et abandonner
un projet. Le §3 du protocole m'interdit de fermer une PR, d'abandonner un dépôt ou de
réécrire la vision — et c'est bien ainsi : ces deux décisions sont irréversibles là où
tout le reste de mon travail est annulable.

**Ce que je te demande, concrètement — trois lignes à remplir.** Pas un choix de
stratégie, juste trois noms :

```
Produit 1 : __________  →  premier utilisateur visé : __________
Produit 2 : __________  →  premier utilisateur visé : __________
Produit 3 : __________  →  premier utilisateur visé : __________
Et pour les 18 autres : gel (rien de neuf, réparations seulement) / abandon / statu quo ?
```

**Classement par proximité mesurée** — pour t'aider, pas pour décider :

| Projet | Où il en est | Ce qui manque pour un premier utilisateur |
|---|---|---|
| **BurkinaCollect** | publié, joignable, 0 PR ouverte | le README promet 9 fonctionnalités pour 2 pages (**Q12**) |
| **Problem-to-Projects** | publié, 0 PR ouverte | la branche livrée n'a pas l'IA ; celle qui l'a dort (**Q13**) |
| **AgroTrack BF** | ne casse plus depuis le 16 | deux variables d'environnement — action de production, donc toi (**Q21**) |
| **TAAMA** | déclaré en production | 18 PR dont une seule fusionnable, et le site public perdu (**Q14**) |
| CompTrack | 21 PR, tronc contesté | on ne sait pas quel tronc fait foi (**Q15**) |

**Hypothèse retenue** — elle n'abandonne rien et ne gèle aucune réparation :

> Sur tout projet dont `premier_utilisateur_reel` est `null`, je ne descends plus au
> niveau 6 du §5 (nouvelles fonctionnalités). Je répare, je documente, je mets en CI.
> Je n'ajoute rien.

Aucune PR n'est fermée, aucun dépôt n'est touché, et le travail en cours continue :
les niveaux 1 à 5 restent ouverts partout.

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

> **🔬 Mesuré le 2026-09-22 — la question n'est pas celle que je croyais.**
>
> Je demandais si FORJA fait *encore* du café. La mesure dit autre chose : **le café va bien, et le dépôt contient un second produit.**
>
> **Le café est vivant et cohérent.** `forja-pied.vercel.app` répond **200** avec une page d'accueil complète — traçabilité lot-par-lot, certification EUDR, mise en relation acheteurs, témoignages de coopératives ivoiriennes. Les treize pages du tableau de bord (`clients`, `commandes`, `devis`, `qualite`, `rapports`…) font **3 959 lignes**. Le `DocumentExport` génère des documents d'export en dollars. Rien n'a dérivé.
>
> **Mais `src/app/tontine/` existe : 8 fichiers, 1 420 lignes.** Et ce n'est pas du café :
>
> | mesure | résultat |
> |---|---|
> | provenance | `types/tontine.ts:1` — « **UEEMT** Tontine Groupes Privés » ; `nav.tsx:56` affiche « UEEMT » ; la page dit « Bienvenue dans votre espace tontine **UEEMT** » |
> | le vrai propriétaire | `ueemt-tokat/main` porte le module complet — **13 fichiers + 2 migrations Supabase** (`20260712_tontine_elections.sql`, `20260718_tontine_groupes_prives.sql`) |
> | accessible ? | **aucun lien vers `/tontine` dans tout le dépôt** — grep exhaustif, hors du module lui-même |
> | peut-il fonctionner ? | il interroge `tontine_groups`, `tontine_members`, `tontine_contributions`, `tontine_payouts`. Les migrations de FORJA sont `001_waitlist`, `004_lots`, `005_profils`. **Aucune table tontine.** |
> | et il redirige vers | `redirect('/connexion')` — **route qui n'existe pas dans FORJA**, elle existe chez UEEMT |
> | en production | **`forja-pied.vercel.app/tontine` → 500**, `x-matched-path: /tontine` |
>
> **Ce que ça ne casse PAS, vérifié :** seuls ces 5 fichiers importent le client Supabase serveur. Le reste du produit café n'en dépend pas — contrairement à AgroTrack le 16 septembre, où le même `process.env.X!` avait emporté seize pages. **Le café n'est pas en panne. Seul le module étranger l'est.**
>
> **Ce qui reste à trancher, et qui est à toi :**
> 1. **Le module part-il ?** C'est du code d'UEEMT, injoignable, non fonctionnel ici. Mais une coopérative de café *peut* légitimement vouloir une tontine — je ne supprime pas 1 420 lignes sur une supposition.
> 2. **Ou reste-t-il et devient réel ?** Il faudrait alors les deux migrations, une route `/connexion`, et un lien depuis la navigation.
>
> **Hypothèse retenue en attendant : on ne touche à rien.** Je n'ai ni supprimé ni masqué le module. Le 500 reste — il est sur une route que rien ne référence, donc personne ne l'atteint sans la taper à la main.
>
> **Au passage, `src/lib/supabase/server.ts` porte le motif d'AgroTrack** : `process.env.NEXT_PUBLIC_SUPABASE_URL!` ment au vérificateur de types, et `@supabase/ssr` lève **dans** `createServerClient()`, avant tout garde-fou. Aujourd'hui ça ne touche que la tontine. **Le jour où une page café utilisera ce client, elle tombera de la même façon.**


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

### Q12 — BurkinaCollect ne collecte rien (2026-09-08, **remesurée le 27 septembre**)

> **Cette question sous-estimait le problème, et de loin.** Elle parlait du README. Le
> décalage n'est pas dans le README : il est dans le site lui-même, qui est public.

**Mesuré le 27 septembre sur `main` (a4ec55b), pas supposé :**

| Ce que j'ai cherché | Ce que j'ai trouvé |
|---|---|
| `<form>` dans tout `src/` | **aucun** |
| `<input>`, `<textarea>` | **aucun** |
| `fetch(` | **aucun** |
| pages | **deux** — `/` et `/about` |
| qui importe `useOfflineSync` | **personne** — seulement les tests |

**BurkinaCollect ne collecte rien.** Les deux pages sont une plaquette commerciale. Le
seul code métier du dépôt, le hook de synchronisation hors-ligne, est testé (8 tests),
annoncé sur `/about` — « Offline — Hook useOfflineSync maison » — et **branché à rien**.

C'est le motif de la tontine de FORJA, en pire : là-bas le module mort était injoignable
et personne ne l'annonçait. Ici, la page d'à-propos le présente aux visiteurs.

**Les trois chiffres de la page d'accueil.**

```
500+     Collecteurs formés
1 200+   Formulaires créés
35       Régions couvertes
```

Ils sont en dur dans `src/app/page.tsx` et affichés comme des faits sur un site public,
pour un produit qui n'a **aucun formulaire**. C'est **Q2** (les métriques sont
illustratives) appliqué non plus à une vitrine interne mais à la promesse publique d'un
produit.

⚠️ **Un point à vérifier de ton côté :** « 35 régions couvertes » ne correspond à aucun
découpage administratif du Burkina Faso que je connaisse — le pays compte 13 régions
(17 depuis la réforme de 2024) et 45 provinces. Je ne peux pas vérifier depuis cette
session, mais le chiffre semble ne renvoyer à rien.

**Ce que ça change pour la Phase 1.**

BurkinaCollect était, avec Problem-to-Projects, l'un des **deux seuls produits publiés** et
donc l'un des plus proches du KPI de sortie. La mesure le retire de cette liste : un
produit qui ne collecte rien n'aura pas d'utilisateur réel, quelle que soit sa vitrine.

| | Quoi | Effet |
|---|---|---|
| **A** | Aligner le site sur ce qui existe, et déplacer les promesses dans une feuille de route datée | honnête tout de suite ; la vision reste lisible |
| **B** | Construire le formulaire de collecte et brancher `useOfflineSync` | c'est **le produit**, pas une correction. Une semaine de travail au moins |
| **C** | Rendre le dépôt privé le temps de rattraper | tu perds la vitrine, qui est peut-être son seul rôle aujourd'hui |

**Hypothèse retenue : A**, et **je n'ai rien modifié**. Réécrire la promesse publique d'un
produit est ta parole, pas la mienne (`00-protocole-forge.md §3`, règle 10). Les trois
chiffres et la mention « Offline » sur `/about` sont du contenu public : je les signale,
je ne les touche pas.

**Ce que j'ai corrigé, parce que ce n'est pas du contenu public :** le hook se terminait
par « `// v1.1 - exponential backoff retry` » alors qu'aucun backoff n'existe. Note
retirée, pas de fonctionnalité ajoutée — **PR #5**, lint/types/8 tests/build verts.

**Réponse de Steeve :** _(en attente)_

---

### Q13 — Problem to Projects Africa : la branche livrée n'a pas l'intelligence (2026-09-08, **réécrite le 16**)

⚠️ **Ce que j'avais écrit était faux sur le point décisif.** Mon état disait qu'il ne restait
sur `master` que **« trois fichiers qui n'existent nulle part ailleurs »** — `CLAUDE.md`,
`AGENTS.md`, un logo. Compté ce matin fichier par fichier : **61 des 80 fichiers de `master`
sont absents de `main`**, et 86 de `main` absents de `master`.

**La topologie, elle, tient** — vérifiée en clone complet (règle 21) : deux racines réelles,
aucun ancêtre commun. Contrairement à TAAMA, ce diagnostic-là était juste.

**Ce qui est livré.** Tous les déploiements `target: production` viennent de **`main`**, y
compris la pointe actuelle `94d1962`. Les déploiements de `master` sont tous des previews.
GitHub et Vercel sont d'accord ici (règle 22 vérifiée, pas supposée).

| | `main` — **en production** | `master` — jamais livré |
|---|---|---|
| Commits · dernier | 32 · 25 juillet | 7 · 13 juillet |
| Fichiers | 105 | 80 |
| Absents de l'autre branche | 86 | **61** |
| Génération de projets | moteur **local** (`EnhancedProjectAnalyzer`) | **API Anthropic**, `claude-opus-4-5` |
| `@anthropic-ai/sdk` dans `package.json` | **non** | oui |
| Contextes pays | — | **Burkina, Mali, Sénégal, Côte d'Ivoire** |
| Comptes, tableau de bord, profil | oui | page de connexion seulement |
| Tests, config eslint, docs | oui | non |
| `CLAUDE.md`, `AGENTS.md` | **absents** | présents |

**Le point qui change tout.** `main` a bien un dossier `src/lib/ai/` — mais c'est une
**interface vide** : `registerProvider()` n'est jamais appelé, personne n'importe `@/lib/ai`,
et `package.json` ne contient aucun SDK d'IA. `getActiveProvider()` rend `null` par
construction. Les recommandations viennent d'un moteur heuristique local.

Autrement dit : **la branche qui tourne n'a aucune intelligence, et la branche qui l'a n'a
jamais été livrée.** Pour un produit qui s'appelle « Problem to Project », c'est le cœur.

**Bonne nouvelle, et vérifiée :** la couche IA de `master` est correcte. `/api/generate`
limite le débit (5 req/min par IP), valide l'entrée par un schéma Zod, et met le texte de
l'utilisateur dans le prompt **utilisateur** — le `SYSTEM_PROMPT` est une constante. La règle
de `CLAUDE.md` « ne jamais concaténer l'input utilisateur dans un system prompt » est donc
respectée. Deux réserves mineures : le compteur est en mémoire, donc par instance sur
serverless ; et le texte libre n'est pas entouré de délimiteurs `<user_input>`.

| | Pour | Contre |
|---|---|---|
| **A. `main` reste le tronc, on y porte `src/lib/ai/` et `src/lib/context/`** | c'est ce qui est livré, c'est ce qui a les comptes, les tests et la CI ; et le produit ferait enfin ce que son nom promet | il faut réconcilier deux modèles de données sans ancêtre commun |
| **B. `master` devient le tronc** | il a l'intelligence et les quatre contextes pays, écrits avec soin | il perd comptes, tableau de bord, profil, tests, CI — et il faudrait changer la branche de production |
| **C. Statu quo** | rien à faire | le produit continue de recommander sans IA, et 61 fichiers de travail réel dorment |

**Hypothèse retenue : A, et je n'ai rien porté.** Porter `src/lib/ai/` et `src/lib/context/`
de `master` vers `main`, c'est précisément la décision que cette question te pose — le faire
sans ta réponse serait trancher à ta place. Ce que j'ai fait, c'est mesurer, pour que la
décision tienne en une minute.

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

### Q15 — CompTrack : une vitrine tourne, le produit non (2026-09-09, réécrite le 17)

> **Cette question a changé de nature le 17 septembre.** Je la posais comme « laquelle
> des deux branches est le vrai tronc ». La mesure dit autre chose, et la vraie question
> est plus simple à trancher.

**Ce que tu as fusionné hier n'a pas livré.** La **#39** — le garde du tableau de bord —
visait `feat/comptrack-v1`. Son déploiement porte `target: null` : une **prévisualisation**.
Les **cinq** déploiements `target: production` du projet viennent tous de `main`, le plus
récent étant ta propre fusion de la #40, hier à 19h32.

**Et je me suis trompé deux fois sur ce dépôt, dans le même sens.** Les 9 et 15 septembre
j'ai écrit que le tableau de bord comptable « s'ouvre à qui connaît l'adresse — paie,
déclarations fiscales, trésorerie, bilan ». C'est faux, et la vérification tient en une
commande :

```
$ grep -rn "from '@supabase" --include=*.ts --include=*.tsx .   → aucun
$ grep -rnE "fetch\(|axios|createClient" app lib components     → aucun
```

`@supabase/ssr` est bien dans `package.json` de `main`, et **rien ne l'importe**. Aucun
appel réseau nulle part. Les chiffres des 18 pages sont des tableaux écrits en dur.
**Il n'y a pas de salaires exposés : il n'y a pas de salaires.**

| | `main` | `feat/comptrack-v1` |
|---|---|---|
| en production | **oui**, 5 déploiements sur 5 | jamais |
| pages | 18 | 21 |
| données | **aucune**, tout en dur | schéma Supabase, tests |
| authentification | aucune | connexion + garde (#39, fusionnée) |
| ce que c'est | une **vitrine** | le **produit** |

**La question, donc :** veux-tu que `v1` devienne ce qui est servi ?

| | |
|---|---|
| **A. Oui** | il faut faire pointer la production de Vercel sur `v1` (ou fusionner `v1` dans `main`), et les 17 PR qui visent `main` deviennent à retrier |
| **B. Non, `main` reste la vitrine** | alors `v1` est un prototype, et il faut le dire — sinon chaque passage y remettra du travail qui ne sera jamais servi |

**Hypothèse retenue : aucune, et je ne construis rien ici.** Ce dépôt a 20 PR ouvertes,
au-delà du seuil de triage. Et surtout : **je n'ai pas porté le garde sur `main`** — il
n'y protégerait rien, et le faire trancherait à ta place. Si ta réponse est A, le chantier
n'est pas « poser un verrou sur la vitrine », c'est « faire servir le produit ».

**Ce que je n'ai pas fait, et qui t'appartient :** repointer la branche de production chez
l'hébergeur, fusionner `v1` dans `main`, ou fermer des PR.

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

### Q17 — UEEMT-Tokat : `dev` est morte, mesuré (2026-09-12, tranchée par la mesure le 18)

> **Je posais la question dans le vide : elle se mesure.** Sur un clone **complet** :
>
> ```
> dev est-il contenu dans main ?   OUI — déjà fusionné
> main a 33 commits que dev n'a pas
> dev a  0 commits que main n'a pas
> ```
>
> `dev` n'a **rien** en propre. Figée au 26 juillet ; `main` a bougé hier.

**Ce que ça change concrètement : quatre des six PR ouvertes visent cette branche morte.**

| PR | base | déjà dans `main` ? | fusionnable dans `main` ? |
|---|---|---|---|
| **#8** gouvernance | `dev` | **OUI — absorbée par la #9** | propre |
| **#11** logos archives | `main` | non | **propre** |
| #5 annonces | `dev` | non | 1 conflit |
| #6 membres filtres | `dev` | non | 2 conflits |
| #7 cotisations CSV | `dev` | non | 3 conflits |
| #12 photo fondateur | `main` | non | 1 conflit |

**Trois gestes, tous à toi :**

1. **Fermer la #8** — sa branche est déjà dans `main` via la #9. Deux PR pour une même branche ; rien à perdre.
2. **Recibler la #11 sur `main`** — la seule qui passe proprement.
3. **Supprimer ou repointer `dev`** — zéro commit unique, mesure à l'appui.

Pour **#5, #6, #7, #12** : du travail réel, des conflits réels. **Dis-moi lesquelles comptent encore et je les résous.**

**Hypothèse retenue : je ne touche à rien.** Fermer, recibler ou supprimer une branche sont des gestes du protocole §3 — et ce sont tes PR.

**Réponse de Steeve :** _(en attente)_

---

### Q18 — Lequel des deux produits d'élevage est le bon ? (2026-09-13)

> **16 septembre — tu as fusionné dans les DEUX, et ça ne tranche pas.**
> `livestockos` #10 (réparation des 17 tests) et `livestock-os` #3 (les volailles
> comptées et jamais affichées) ont été fusionnées à cinq minutes d'intervalle.
> Je ne le lis pas comme une réponse : réparer un dépôt n'est pas le choisir, et tu as
> réparé les deux. La question reste posée.
>
> Mesuré au passage sur `livestockos` : sa branche par défaut, `feat/animaux-rapports`,
> est **entièrement contenue dans `main`** — zéro commit unique, `main` a 18 commits
> qu'elle n'a pas. La repointer sur `main` ne peut donc **rien** faire perdre. C'est un
> réglage GitHub qui t'appartient (protocole §3), et il vaut quelle que soit ta réponse
> à Q18.
>
> Son `main` est vert : **133/133**, vérifié sur le `main` fusionné et non sur ma branche.

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

### Q21 — AgroTrack BF : il ne casse plus, il n'est pas en service (2026-09-16, mis à jour le soir même)

> **Mise à jour du 16 septembre, 18h53 UTC — la panne est terminée.**
>
> Tu as fusionné la **#19** à 15h01. La production a été redéployée, et `/dashboard`
> répond désormais **200** : il redirige vers `/auth/login?raison=non-configure`, la
> bannière nomme les deux variables manquantes, et le bouton de démo est désactivé.
> **Vingt-cinq jours de 500, terminés.** Le produit ferme au lieu de casser.
>
> **Il n'est pas en service pour autant** — la question ci-dessous reste entière.
>
> **⚠️ Et une chose à régler AVANT d'y répondre.**
>
> La page de connexion, enfin visible, **imprimait le mot de passe du compte de
> démonstration en clair**. Aujourd'hui il ne vaut rien : sans Supabase, le compte
> n'existe pas. Mais à la seconde où tu poseras les deux variables, ce mot de passe
> devient un **identifiant valide affiché à qui charge l'adresse**.
>
> La **PR #20** le retire : les identifiants viennent de `DEMO_EMAIL` et
> `DEMO_PASSWORD` (sans préfixe `NEXT_PUBLIC_`), le bouton « Accéder à la démo » reste,
> le mot de passe disparaît. **Fusionne-la avant de poser les variables.**
>
> **La valeur qui était affichée est brûlée** : elle a été publique et reste dans
> l'historique git. `DEMO_PASSWORD` doit recevoir une valeur **neuve**.
>
> *Je ne l'avais pas vue parce que la page ne s'affichait pas — elle était derrière le
> 500. Réparer la panne a rendu le défaut visible.*

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

### Q22 — Sahel Commerce AI : ce qui est écrit hors ligne ne remonte jamais (2026-09-18)

Ma **PR #2** répare le fait que l'application ne **revenait** jamais en ligne après une
coupure. Elle ne répare pas la moitié suivante.

`VISION.md §4` demande deux choses : *« l'app fonctionne sans connexion »* — c'est fait,
et bien fait, le mode local persiste dans `localStorage` et le dit honnêtement — *« et
**se synchronise quand elle revient** »* — **ça, ça n'existe pas.**

Concrètement : un commerçant hors réseau enregistre trois ventes. Elles sont sauvegardées
**sur son téléphone**. Le réseau revient, l'application se reconnecte (grâce à la #2), et
les trois ventes **restent sur le téléphone**. Le serveur ne les verra jamais.

Rien ne ment — la bannière dit « les données restent sur cet appareil ». Mais un outil de
gestion de boutique dont les écritures ne remontent pas n'est pas un outil de gestion.

| | Quoi | Pour / contre |
|---|---|---|
| **A. File d'attente locale + rejeu au retour** | chaque écriture hors ligne est empilée, puis rejouée quand le backend répond | le vrai geste ; demande des identifiants stables et une idempotence côté serveur, sinon un rejeu double les ventes |
| **B. Lecture seule hors ligne** | on consulte hors ligne, on n'écrit que connecté | honnête et simple, mais ampute le produit là où il sert le plus — au marché, sans réseau |
| **C. Rien de plus, c'est une démonstration** | l'état actuel | tenable tant qu'aucun commerçant réel n'y saisit ses ventes |

**Hypothèse retenue : C tant que c'est une démonstration**, exactement comme **Q16** — et
les deux se répondent ensemble. A n'a de sens qu'avec l'authentification de Q16 : sans
savoir **qui** écrit, une file d'attente rejoue des ventes sans propriétaire.

**Ce que je n'ai pas fait :** aucune file, aucun rejeu. C'est une architecture, et elle
touche au schéma comme Q16.

**Réponse de Steeve :** _(en attente)_

---

### Q23 — 🚨 PRODUCTION — Depuis le 26 septembre, rien ne monte plus en ligne (2026-09-28)
**Contexte :** les trois derniers déploiements de production tentés dans le portefeuille
sont tous `BLOCKED`, avec le même lien d'erreur fourni par Vercel
(`troubleshoot-project-collaboration#team-configuration`) :

| Quand (UTC) | Projet | Ce qui devait monter | État |
|---|---|---|---|
| 26 sept 10h15 | portfolio | ta photo sur téléphone | **READY** — le dernier qui passe |
| 26 sept 12h07 | combine | `main` @ 65f7cbd | **BLOCKED** |
| 26 sept 14h08 | ueemt-tokat | le module Tontine « La Main » (#15) | **BLOCKED** |
| 27 sept 06h04 | comptrack | **ton push** Golden Prompt + règles IA | **BLOCKED** |

Les **prévisualisations** fonctionnent normalement — vérifié le 27 et le 28 sur quatre
dépôts. Le blocage ne touche que la production.

**Enjeu :** il passe devant toute la file de PR. Fusionner aujourd'hui fait atterrir le code
sur le tronc, mais le déploiement qui suit est bloqué et le site continue de servir l'ancien
build. Concrètement : fusionner `duka-boutique#11` ne rendrait pas la vente aux commerçants,
et le module Tontine d'UEEMT reste invisible bien qu'il soit fusionné depuis le 26.

**Ce que je ne peux pas te dire :** la cause. `get_team` n'expose ni le plan ni l'état de
facturation, et le lien d'erreur pointe vers un réglage d'équipe lisible sur ton tableau de
bord, pas d'ici. Je préfère l'écrire que d'inventer une cause plausible.

**Hypothèse retenue :** c'est un réglage de compte ou de plan que toi seul peux lever. Je
continue donc à préparer et vérifier les PR normalement, mais je ne présente plus aucune
fusion comme « mettant quelque chose en ligne » tant que le blocage tient. Aucune tentative
de redéploiement de ma part.

**Ce que je n'ai pas fait, et qui t'appartient :** ouvrir le tableau de bord Vercel, lire la
raison, la lever. Relancer un déploiement de production ou changer un réglage d'équipe est
interdit par `00-protocole-forge.md §3` règle 6. Dès que le premier déploiement repasse en
`READY`, je peux vérifier les pages moi-même — le connecteur Vercel me le permet depuis le
27 septembre (règle 49).

**Réponse de Steeve :** _(en attente)_

---

### Q24 — 🚨 ARCHITECTURE — La session a dormi quatre jours, et quatre matins sont partis avec (2026-10-03)

**Le fait, mesuré au réveil.** Les Routines ont sonné normalement. Le Forge Quotidien du
**29 septembre, du 30, du 1er et du 2 octobre** est arrivé dans la file et n'a jamais été
traité : la session dormait. Je ne l'ai vu qu'au tour du 3 octobre, en lisant les
notifications d'un coup. Même chose pour la veille des troncs, qui a sonné 26 fois.

Ce n'est pas une surprise, c'est la limite écrite dans `CLAUDE.md` : *« il n'y a qu'un seul
point de défaillance : le 11 septembre la session dormait quand la Routine a sonné, et la
journée entière a été perdue. »* Elle a coûté **un** jour le 11 septembre. Elle vient d'en
coûter **quatre**.

**Ce que ça fait au débit réel.** Le système annonce 2 projets par jour, soit un tour du
portefeuille en deux semaines. Sur les neuf derniers jours il en a traité **deux**. Le tour
du portefeuille est donc à plus de deux mois, pas deux semaines.

**Ce que je ne peux pas faire.** Créer, rallumer ou reconfigurer une Routine est `§3`. Je ne
touche à rien — y compris et surtout pas à une Routine de secours que je me serais écrite
à moi-même.

**Les trois options, et leur prix :**

| | Ce que ça change | Ce que ça coûte |
|---|---|---|
| **A. Statu quo** | rien | un trou de 1 à 4 jours à chaque fois que la session dort |
| **B. Une Routine en session neuve** en secours du Quotidien | plus aucun trou : une session neuve démarre toujours | elle perd le contexte — c'est exactement ce que la session vivante apportait, et pourquoi les 24 loops ont été éteints |
| **C. Rallumer les 26 loops** (c'est Q19) | 25 projets/semaine au lieu de 2/jour | ils ne peuvent pas attacher de dépôt : paramètre `connectors` indisponible pour l'organisation |

**Mon hypothèse retenue, et je continue dessus : A.** Non pas parce qu'elle est bonne, mais
parce que B et C sont toutes deux des actions sur des Routines, et qu'aucune ne m'appartient.
Je note juste que A est la seule des trois dont on connaisse déjà le prix : cinq jours
perdus en trois semaines.

**Ce que ça te demande :** une ligne. « B » et je prépare la Routine de secours pour que tu
la crées toi-même, avec son prompt écrit. « A » et je ne reparle plus de ce trou.

**Réponse de Steeve :** _(en attente)_

---

### Q25 — 📱 QG — La landing sert 278 Ko de JavaScript, et cache son texte derrière une animation (2026-10-03)

**Mesuré le 3 octobre**, première application réelle du playbook 05 sur une surface
d'acheteur. Les deux chiffres sont du premier chargement, gzip, calculés sur le HTML
prérendu :

| Route | JS gzip au 1er chargement | Seuil du playbook |
|---|---|---|
| `/` (la landing) | **278 Ko** | 150 Ko |
| `/dashboard` | **369 Ko** | 150 Ko |
| `/ecosystem` | 279 Ko | 150 Ko |
| `/auth/login` | 321 Ko | 150 Ko |

**Toutes les routes du QG sont au-dessus du seuil**, de 1,7 à 2,5 fois. Sur la landing,
**94 Ko — un tiers du total — sont des bibliothèques d'animation** : gsap 56 Ko,
framer-motion 38 Ko. Le QG en embarque trois (gsap, framer-motion, lenis) là où le playbook
en autorise une. Sur un Android d'entrée de gamme en 2G, 278 Ko gzip, c'est une dizaine de
secondes de téléchargement avant même l'analyse du script.

**Le second fait est plus gênant que le premier.** La page est rendue par le serveur avec
**53 éléments en `opacity:0`** en style en ligne : c'est framer-motion qui les révèle à
l'entrée dans le viewport. Sans JavaScript — et sur un téléphone lent, « sans » veut aussi
dire « pas encore » — le visiteur voyait **40 blocs de texte invisibles** sur une page de
15 459 px. C'est la règle 5 du playbook : *le contenu ne dépend jamais d'une animation*.

**Ce que j'ai fait aujourd'hui, et qui est dans la PR :** un filet `<noscript>` qui rend tout
visible si le JavaScript ne tourne pas. Vérifié au navigateur : **40 blocs invisibles → 0**,
et la landing est entière et lisible sur un écran de 360 px. Plus `prefers-reduced-motion`
respecté partout, qui n'existait nulle part dans le dépôt.

**Ce que je n'ai pas fait, parce que ça t'appartient :** retirer la deuxième bibliothèque
d'animation. Enlever gsap rend 56 Ko sur la landing, mais réécrit le compteur animé, la
lueur qui suit le curseur, les anneaux de l'écosystème et le défilement inertiel. C'est la
page que voit un investisseur : je ne change pas sa texture sans te le demander.

**Mon hypothèse retenue, et je continue dessus :** je garde les trois bibliothèques et je ne
touche pas au rendu. Le chantier « une seule bibliothèque » attend ton accord.

**Ce que ça te demande :** « vas-y » si les 56 Ko valent de perdre la lueur au curseur et le
défilement inertiel, « non » si la texture actuelle est ce que tu veux montrer.

**Réponse de Steeve :** _(en attente)_

---

### Q26 — 🔑 PERMISSION — Deux correctifs vérifiés attendent une permission, pas du travail (2026-10-03)

`add_repo(owner="dosteeve2-hash", repo="taama", access="push")` m'a été **refusé** ce matin
par le contrôle de permissions de la session. Je n'ai pas cherché à contourner : ni par
`git push` depuis le clone existant, ni par les outils GitHub. Le correctif existe donc,
vérifié, et n'est nulle part sur GitHub.

Il est à l'abri dans ce dépôt :
`AUTOMATION/correctifs-en-attente/taama-peremption-horloge-reelle.patch`.

Ce qu'il corrige est décrit dans `AUTOMATION/rapports/taama/2026-10-03.md` : l'écran
d'inventaire annonce « ⚠ 24j » à un vaccin périmé depuis 32 jours, en production, à cette
minute.

**Ce que ça te demande :** soit tu m'accordes l'accès en écriture à `taama` et je pousse la
branche + la PR draft au prochain tour, soit tu appliques le patch toi-même :

```bash
git fetch origin main && git checkout -b fix/expiration-horloge-reelle origin/main
git am < taama-peremption-horloge-reelle.patch
```

---

**Second patch, trouvé à la veille de 04h05 : `Mifa_Life_shop`.**

La production de MIFA Life est **figée depuis le 16 septembre à 15h02**. Netlify échoue au
stade « preparing repo », avant même le build :

```
Error checking out submodules: fatal: No url found for submodule path
'Mes pages html/.claude/worktrees/charming-neumann-3e17c2' in .gitmodules
```

Une worktree Claude Code a été commitée comme gitlink, sans `.gitmodules`. **Ce défaut
avait déjà été corrigé le 2 septembre** (`3e0d92a`) ; il est revenu le 16 septembre par la
fusion de la #29, qui portait un commit du 12 juillet, antérieur au correctif.

Ce que ça coûte : les fusions des **#23, #29 et #30 ne sont jamais montées en ligne**. Un
produit tier 1 déclaré « Actif » n'a reçu aucune mise à jour depuis 17 jours, et rien ne
l'affichait — les contrôles Netlify n'apparaissent que sur les PR, jamais sur le tronc.

Reproduit en première main : `git submodule update --init --recursive` rend **128 sur
`main`**, avec le message exact de Netlify, et **0 sur la branche corrigée**. Le correctif
est d'une ligne : `AUTOMATION/correctifs-en-attente/mifa-life-sous-module-fantome.patch`.

**Mon hypothèse retenue :** je garde les deux patchs ici et je les re-vérifie à chaque tour
tant que les troncs ne bougent pas. S'ils bougent, je rejoue la vérification avant de te les
proposer encore.

**Ce que ça te demande :** l'accès en écriture à `taama` et à `Mifa_Life_shop`, ou tu
appliques les deux patchs toi-même. C'est la même ligne pour les deux.

**Réponse de Steeve :** _(en attente)_

---


## ✅ Questions résolues

### [2026-09-19] Q11 — African Hybrid Agent : l'endpoint IA public est fermé

**Résolu par toi le 16 septembre, et je ne l'ai vu que trois jours plus tard.**

Ce que je signalais depuis le 8 : `burkinacollect.vercel.app` sert `african-hybrid-agent`,
dont `/api/chat` tournait **sans limite de débit**, sur un dépôt **public**.

Tu as fusionné la **PR #7 le 16 septembre à 15h00:00 UTC** — la deuxième fusion de ta session.

**Vérifié dans les deux sens, sans solliciter l'endpoint :**

```
src/lib/rate-limit.ts:4   export const AI_RATE_LIMIT = { limit: 20, windowSeconds: 3600 }
src/app/api/chat/route.ts:41   logOptional("orchestrator", "rate_limited", …)
```

Vingt requêtes par heure — exactement la règle de `CLAUDE.md`. Et en production : déploiement
`target: production`, état `READY`, depuis `main @ f99cc32`, dont le message de commit est
« Merge pull request #7 — Limite de débit sur l'endpoint IA ».

*Je n'ai pas appelé `/api/chat` : la métadonnée du déploiement et le code source suffisent, et
l'appeler dépenserait le crédit que la limite protège.*

**Ma faute :** j'ai porté cette question en tête de cinq check-ins comme « urgente, sans
réponse », alors qu'elle était close. Mon décompte des fusions venait de mes notifications, pas
des dépôts — **règles 30 et 31**.

---

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
