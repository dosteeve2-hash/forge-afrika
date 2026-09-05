# 🔨 Playbook — Forge Quotidien (tous les jours, 05h00)

> Prérequis : avoir lu `CLAUDE.md` et `AUTOMATION/playbooks/00-protocole-forge.md`.
> Durée cible : une session. Livrable : 1 à 3 PR draft + 1 rapport.

---

## Étape 0 — Reprendre le fil (5 min)

Tu es une session neuve. Commence par retrouver où tu en étais :

```bash
cd /home/user/forge-afrika
cat AUTOMATION/etat/rotation.json          # ce qui reste à faire, ce qui a été reporté
ls -t AUTOMATION/rapports/*.md | head -3   # les derniers rapports
head -60 AUTOMATION/QUESTIONS.md           # questions ouvertes + réponses éventuelles
```

**Si Steeve a répondu à une question** (le champ `Réponse de Steeve` n'est plus vide) :
c'est ta priorité absolue du jour. Applique sa décision, y compris si cela veut dire
défaire une hypothèse précédente. Puis marque la question comme résolue.

Vérifie ensuite les PR draft encore ouvertes :

```bash
./AUTOMATION/scripts/forge-rotation.sh --pr-ouvertes
```

Une PR rouge ou en conflit se reprend **avant** d'ouvrir un nouveau chantier.

---

## Étape 1 — Déterminer la cible du jour (2 min)

```bash
./AUTOMATION/scripts/forge-rotation.sh
```

Le script lit `AUTOMATION/registry.json` et te donne les projets du jour selon la
rotation hebdomadaire. Il tient compte des reports de la veille.

Rotation nominale :

| Jour | Projets en développement profond |
|---|---|
| Lundi | TAAMA · ComptTrack · Portfolio 2.0 |
| Mardi | AgroTrack BF · ValueChain Connect · SUGU |
| Mercredi | MillTrack · FORJA · MIFA Life |
| Jeudi | LivestockOS · Indubot Afrika · Phone Showcase |
| Vendredi | BurkinaCollect · African Hybrid Agent · Sahel Commerce AI |
| Samedi | Problem to Projects Africa · UEEMT Tokat |
| Dimanche | *(revue stratégique — voir playbook 03)* |

Le tier 3 (archives) n'entre pas en rotation profonde : il est seulement scanné.

---

## Étape 2 — Scan de santé de TOUS les projets (10 min)

Même les projets qui ne sont pas du jour. C'est ce qui permet de détecter un incendie
sur un projet dont ce n'est pas le tour.

```bash
./AUTOMATION/scripts/forge-scan.sh --tous
```

Pour chaque dépôt le scan relève : dernier commit, PR ouvertes, état de la CI,
présence d'un README / de tests / d'une CI, vulnérabilités déclarées, et l'écart
au fichier `doctrine` (offline, i18n FR, XOF, mobile).

**Toute anomalie de niveau 1 ou 2** (`00-protocole-forge.md §5`) détectée sur
*n'importe quel* projet devient prioritaire sur la rotation du jour. Un build cassé
sur TAAMA un jeudi se répare le jeudi.

---

## Étape 3 — Développement profond (le gros du temps)

Pour chaque projet du jour, dans l'ordre :

### 3.1 — Comprendre avant de toucher

```bash
mkdir -p /tmp/forge && cd /tmp/forge
# via add_repo puis git clone (voir README AUTOMATION §Accès aux dépôts)
```

Lis, dans cet ordre : le `README`, le `CLAUDE.md` du projet s'il existe, la spec
correspondante dans `LOGICIELS/`, les issues ouvertes, les 20 derniers commits.

Puis pose-toi **la question FORGE** :

> *Ce projet, tel qu'il est aujourd'hui, sert-il l'ambition décrite dans son entrée
> du registre — et à travers elle, la Phase 1 de FORGE Afrika ?*

Si la réponse est non, c'est ça le travail du jour. Pas les dépendances à jour.

### 3.2 — Choisir UN chantier qui compte

Un chantier par projet et par jour. Il doit être :

- **fini le jour même** (pas de demi-fonctionnalité poussée),
- **visible** (Steeve doit voir la différence, pas juste la lire),
- **aligné** sur la doctrine ou la ROADMAP.

Grille de choix, dans l'ordre de `00-protocole-forge.md §5` :

| Si tu observes… | Le chantier du jour est… |
|---|---|
| Build ou CI rouge | Le réparer. Rien d'autre. |
| Faille / dépendance vulnérable | La corriger. |
| Produit en prod avec bug fonctionnel | Le corriger. |
| Pas de tests du tout | Poser le socle de test + couvrir le cœur métier. |
| Pas offline-first alors que c'est un outil terrain | Ajouter la couche offline (cache + file de sync). |
| Pas de français / pas de XOF | Ajouter i18n FR + formatage XOF. |
| Pas responsive / lourd sur mobile | Optimiser le poids et le mobile. |
| Une fonctionnalité de la spec manque | L'implémenter. |
| Rien de tout ça | Prendre la prochaine idée du backlog produit et la construire. |

### 3.3 — Construire

- Branche : `claude/forge-<AAAA-MM-JJ>-<sujet-court>`
- Commits atomiques, Conventional Commits en français.
- Tests d'abord quand c'est possible.
- Respect du seuil de qualité (`00-protocole-forge.md §6`) — build + tests + lint
  verts **avant** de pousser.

### 3.4 — Livrer

- `git push -u origin <branche>`
- Ouvrir une **PR draft** avec une description en français qui répond à trois questions :
  **Quoi ?** **Pourquoi maintenant ?** **Comment le vérifier ?**
- Relier la PR à l'ambition du registre et, quand c'est pertinent, à la ROADMAP.
- S'abonner à l'activité de la PR et la mener au vert.

---

## Étape 4 — Améliorer le système lui-même (10 min)

Une fois par jour, regarde ce système avec un œil critique :

- Le registre est-il juste ? Un `a_confirmer: true` que tu as pu vérifier aujourd'hui
  doit être corrigé et le drapeau retiré.
- Un projet manque-t-il au registre (nouveau dépôt créé par Steeve) ?
- La rotation est-elle bien calibrée, ou un projet est-il systématiquement sacrifié ?
- Le playbook t'a-t-il fait perdre du temps quelque part ? Corrige-le.

Ce système est un projet comme un autre. Il se développe aussi.

---

## Étape 5 — Rendre compte et transmettre (10 min)

1. Écris `AUTOMATION/rapports/AAAA-MM-JJ-quotidien.md` au format de
   `00-protocole-forge.md §7`. Factuel. Honnête. Court.
2. Ajoute la ligne du jour à `AUTOMATION/rapports/JOURNAL.md`.
3. Mets à jour `AUTOMATION/etat/rotation.json` : ce qui est fait, ce qui est reporté,
   ce que la session de demain doit reprendre en premier.
4. Ajoute les nouvelles questions à `AUTOMATION/QUESTIONS.md`, chacune avec son hypothèse.
5. Commit et push sur la branche d'automatisation, puis PR draft si besoin.

---

## Le principe directeur

Chaque matin, ces projets doivent être **un peu plus proches d'être utilisables par une
vraie PME burkinabè** qu'ils ne l'étaient la veille. Pas plus modernes. Pas plus
sophistiqués. Plus **utilisables**.

C'est la seule métrique qui compte en Phase 1 :

> *3 logiciels en production utilisés par des entreprises africaines réelles.*
> — KPI Phase 1, `PROJECT.md`

Tout le reste est du bruit.
