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
