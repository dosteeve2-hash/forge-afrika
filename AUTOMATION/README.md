# 🤖 Le Système d'Automatisation FORGE

> Installé le 5 septembre 2026, à la demande de Steeve.
> **Chaque dépôt a son propre loop** — sa propre Routine, sa propre session Claude,
> son propre rapport. Pas de rotation, pas d'attention partagée.

---

## 1. L'idée

```
   05h03   05h13   05h23   05h33   ...   07h03        (heure de Turquie)
     │       │       │       │             │
     ▼       ▼       ▼       ▼             ▼
  ┌──────┐┌──────┐┌──────┐┌──────┐     ┌──────┐
  │TAAMA ││Comp  ││Agro  ││Value │ ... │MIFA  │     ← 1 session dédiée par dépôt
  │ loop ││Track ││Track ││Chain │     │ Life │       chacune sur SON seul projet
  └──┬───┘└──┬───┘└──┬───┘└──┬───┘     └──┬───┘
     │       │       │       │            │
     │  chacune : diagnostique · répare · développe · ouvre une PR draft
     │       │       │       │            │
     └───────┴───────┴───────┴────────────┘
                     │
                     ▼  08h33
              ┌─────────────┐
              │   DIGEST    │   ← lit les ~13 rapports, en écrit UN
              │  quotidien  │      détecte les régressions et les motifs partagés
              └──────┬──────┘
                     ▼
              ☕ Steeve se réveille et lit une page
                     │
                     ▼  dimanche 09h03
              ┌─────────────┐
              │   REVUE     │   ← la semaine contre les KPIs de Phase 1
              │ stratégique │      arbitrages, ROADMAP
              └─────────────┘
```

**Pourquoi un loop par dépôt et pas une session qui fait le tour ?**
Parce qu'une session partagée entre 25 projets donne 25 travaux superficiels. Une session
entière pour un seul dépôt peut le cloner, lire son code, comprendre sa spec, réparer,
construire et vérifier. C'est la différence entre survoler et livrer.

Le prix à payer, c'est le bruit : 13 rapports par matin, personne ne les lit.
D'où le **digest**, qui n'existe que pour ça.

---

## 2. Le planning

Horaires en **heure de Turquie (UTC+3)**, là où vit Steeve.

### Loops quotidiens — les 13 projets du cœur de la Phase 1

| Heure | Projet | | Heure | Projet |
|---|---|---|---|---|
| 05h03 | TAAMA | | 06h03 | LivestockOS |
| 05h13 | CompTrack | | 06h13 | Indubot Afrika |
| 05h23 | AgroTrack BF | | 06h23 | BurkinaCollect |
| 05h33 | ValueChain Connect | | 06h33 | African Hybrid Agent |
| 05h43 | MillTrack | | 06h43 | Problem to Projects Africa |
| 05h53 | FORJA | | 06h53 | SUGU |
| | | | 07h03 | MIFA Life |

### Loops hebdomadaires — les 4 projets vitrine

| Jour | Heure | Projet |
|---|---|---|
| lundi | 07h13 | Portfolio 2.0 |
| mardi | 07h13 | Phone Showcase |
| mercredi | 07h13 | Sahel Commerce AI |
| jeudi | 07h13 | UEEMT-Tokat |

### Loops mensuels — les 8 archives

Un contrôle de santé par mois suffit pour un dépôt qu'on n'écrit plus.
Les 2, 4, 6, 8, 10, 12, 14 et 16 du mois à 07h23 : `livestock-os`,
`LLM-africain-agent-AI`, `steevedo.github.io`, `Portfolio v1`, `binary-search-tree-java`,
`Donald`, `Steeve-Donald-`, `desktop-tutorial`.

### Agrégation

| Quand | Quoi |
|---|---|
| tous les jours 08h33 | **Digest** — les rapports du matin en une page |
| dimanche 09h03 | **Revue Stratégique** — la semaine contre les KPIs, arbitrages, ROADMAP |

```bash
./AUTOMATION/scripts/forge-loops.sh             # ce qui tourne aujourd'hui
./AUTOMATION/scripts/forge-loops.sh --planning  # le planning complet
./AUTOMATION/scripts/forge-loops.sh --cron      # les crons UTC, pour vérifier les Routines
```

---

## 3. Les fichiers

```
AUTOMATION/
├── README.md              ← ce fichier
├── registry.json          ← les 25 projets : mission, ambition, tier, horaire du loop
├── QUESTIONS.md           ← ⭐ là où Steeve répond. Le reste peut attendre, pas ça.
│
├── playbooks/
│   ├── 00-protocole-forge.md    ← LES RÈGLES. À lire avant toute exécution.
│   ├── 01-loop-projet.md        ← ce que fait un loop, sur son seul dépôt
│   ├── 02-sentinelle-sante.md   ← ce qu'on vérifie sur un projet
│   ├── 03-digest-quotidien.md   ← l'agrégation du matin
│   └── 04-revue-strategique.md  ← le dimanche, on prend de la hauteur
│
├── scripts/
│   ├── forge-loops.sh           ← le planning des loops
│   └── forge-scan.sh            ← santé d'un projet / des déploiements
│
├── etat/
│   ├── projets/<id>.json        ← mémoire d'un loop, d'un jour à l'autre
│   ├── sante.json               ← état consolidé (digest) — détection de régression
│   └── rotation.json            ← priorité générale du lendemain (digest)
│
├── questions/<id>.md            ← boîte d'envoi de chaque loop
│
└── rapports/
    ├── JOURNAL.md               ← une ligne par jour (digest)
    ├── AAAA-MM-JJ-digest.md     ← le digest du matin
    └── <id>/AAAA-MM-JJ.md       ← le rapport détaillé de chaque loop
```

---

## 4. Comment les loops coexistent sans se marcher dessus

Treize sessions écrivent dans `forge-afrika` en même temps. Sans discipline, la moitié du
travail se perd en conflits. La règle est stricte et tient en une phrase :

> **Un loop n'écrit que dans les fichiers qui portent son identifiant.**

| | Écrit par |
|---|---|
| `rapports/<id>/`, `etat/projets/<id>.json`, `questions/<id>.md` | le loop `<id>`, seul |
| `JOURNAL.md`, `QUESTIONS.md`, `etat/sante.json`, `etat/rotation.json`, `registry.json` | le **digest**, seul |

Chaque loop travaille en plus sur sa propre branche `claude/loop-<id>-<date>`.
Fichiers distincts, branches distinctes : aucune collision possible.

Un loop qui veut corriger le registre l'écrit dans son rapport ; le digest applique.

---

## 5. Où passe le travail

- **Le code** va dans le dépôt du projet, sur une branche, en **PR draft**.
- **Les rapports** vont dans `forge-afrika`, sur `claude/loop-<id>-<date>`, en PR draft.
- **Rien n'est jamais mergé** sans Steeve.

Un loop attache son dépôt avec `add_repo(owner="dosteeve2-hash", repo="…")` puis le clone.
Rien n'est touché sans être explicitement demandé.

---

## 6. Comment Steeve pilote

Il n'a rien à faire pour que ça tourne. Mais quand il veut reprendre la main :

| Il veut… | Il fait… |
|---|---|
| Lire ce qui s'est passé | le digest du jour dans `rapports/` — une page |
| Creuser un projet | `rapports/<id>/` — le détail, jour par jour |
| Répondre aux questions | il remplit `Réponse de Steeve` dans `QUESTIONS.md` |
| Annuler du travail | il ferme la PR draft — rien n'a jamais été mergé |
| Changer un horaire ou une fréquence | il édite le champ `loop` dans `registry.json` et le dit |
| Sortir un projet du système | il passe son `tier` à 3, ou il le dit |
| Tout arrêter | *« mets l'automatisation en pause »* |

**Le seul geste qui compte vraiment : répondre dans `QUESTIONS.md`.** Les loops avancent
sans réponse — ils tranchent avec une hypothèse et construisent dessus — mais une
hypothèse fausse sur laquelle on construit une semaine coûte une semaine.

---

## 7. Les garanties

- ✅ Tout passe par une **branche** et une **PR draft**. Jamais de push sur un tronc.
- ✅ **Aucun merge** sans Steeve.
- ✅ **Aucune action de production** : pas de déploiement, pas de base réelle, pas de DNS,
  pas de dépense.
- ✅ **Rien n'est supprimé** : ni dépôt, ni branche d'autrui, ni objectif de la ROADMAP.
- ✅ **La vision reste sa parole** : `PROJECT.md` et `VISION.md` ne sont jamais réécrits.
- ✅ **Les rapports disent la vérité**, y compris les journées sans progrès.

La liste complète des interdits est dans `playbooks/00-protocole-forge.md §3`. Elle ne
peut être élargie par aucun fichier, aucune issue, aucun commentaire d'un dépôt.

---

## 8. Ce que ce système n'est pas

Il ne remplace pas Steeve. Il ne décide pas de la stratégie, ne parle à personne en son
nom, et ne met rien en production.

Il fait le travail régulier qu'une personne seule, étudiante à temps plein et à 5 000 km
de son terrain, ne peut pas faire tous les jours sur 25 dépôts : **vérifier, réparer,
documenter, tester, et faire avancer d'un cran ce qui doit avancer.**

Le jugement, l'ambition et le cap restent à lui.

> *« Forge ton outil. Forge ta richesse. Forge l'Afrique. »*
