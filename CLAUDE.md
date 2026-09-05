# CLAUDE.md — Contexte permanent FORGE Afrika

> Ce fichier est lu automatiquement par **toute** session Claude Code ouverte sur ce dépôt.
> Il est la mémoire longue du projet. Il n'a pas besoin d'être rappelé — il est déjà là.

---

## 1. Qui et quoi

**Steeve Donald Compaoré** — burkinabè, 20 ans, L3 informatique à l'Université de Tokat
Gaziosmanpaşa (Turquie). Email : `docompaore2@gmail.com`. GitHub : `dosteeve2-hash`.

**FORGE Afrika** est son projet de vie : contrôler une chaîne de valeur africaine complète,
du logiciel industriel jusqu'à la transformation des matières premières.
Ce dépôt-ci (`forge-afrika`) n'est pas un logiciel — c'est le **quartier général stratégique**
et, depuis septembre 2026, l'**orchestrateur d'automatisation** de tous les autres projets.

Documents de référence, à relire quand une décision est ambiguë :

| Fichier | Rôle |
|---|---|
| `PROJECT.md` | Stratégie globale, les 4 phases, l'analogie NVIDIA / Rockefeller |
| `VISION.md` | Philosophie, analyse chaîne de valeur, leçons historiques |
| `ROADMAP.md` | Timeline 2024-2050, objectifs et KPIs par année |
| `LOGICIELS/*.md` | Specs produit (TAAMA, Forja, BurkinaCollect, backlog d'idées) |
| `RECHERCHE/*.md` | Textes fondateurs et synthèses terrain |

---

## 2. La stratégie en une ligne

> **« Pendant la ruée vers l'or, ne cherche pas l'or. Vends les pioches. »**

Phase 1 (2024-2028) = **les logiciels**. C'est la phase active aujourd'hui.
Tout le reste (industrie 2028-2035, primaire 2033-2040, empire 2040-2050) en dépend.
Un projet qui n'avance pas en Phase 1 retarde tout l'édifice.

---

## 3. Doctrine technique — comment on construit ici

Ces contraintes ne sont pas des préférences de style. Elles viennent du terrain africain
décrit dans `VISION.md §4`. Un logiciel qui les viole est inutilisable au Burkina Faso.

1. **Offline-first, toujours.** Le réseau est 2G/3G, intermittent, cher. L'app doit
   fonctionner sans connexion et se synchroniser quand elle revient. Pas l'inverse.
2. **Mobile d'abord.** L'utilisateur cible n'a pas d'ordinateur. Il a un smartphone
   d'entrée de gamme, souvent Android ancien. Budget JS serré, pas de dépendance lourde.
3. **Français d'abord**, anglais ensuite, langues locales (mooré, dioula) prévues dans
   l'architecture i18n dès le départ.
4. **Franc CFA (XOF)** comme devise par défaut. Pas d'arrondi à 2 décimales : le XOF
   n'a pas de sous-unité. Formats de date/nombre FR.
5. **Simple > sophistiqué.** L'utilisateur n'est pas formé. Chaque écran doit être
   compréhensible sans manuel. Si une fonctionnalité demande une explication, elle est ratée.
6. **Robuste > élégant.** Batterie faible, stockage plein, coupure en plein formulaire :
   ce sont les cas nominaux, pas les cas limites.
7. **Coût quasi nul.** Cible : PME africaine qui ne peut pas payer SAP. L'infra doit
   tenir dans les tiers gratuits (Vercel, Supabase, Neon) le plus longtemps possible.

---

## 4. Conventions de dépôt

- **Commits** : Conventional Commits en français (`feat:`, `fix:`, `docs:`, `chore:`,
  `refactor:`, `test:`, `perf:`, `ci:`). Message court à l'impératif.
- **Branches** : `feat/…`, `fix/…`, `docs/…`, `chore/…`. Jamais de push direct sur `main`.
- **PR** : toujours en draft d'abord, description en français, liste de ce qui change
  et pourquoi, lien vers l'objectif ROADMAP concerné quand il y en a un.
- **Secrets** : jamais dans le dépôt. Toujours variables d'environnement + `.env.example`.

---

## 5. Le système d'automatisation

Depuis septembre 2026, un ensemble de Routines Claude tourne automatiquement sur
l'ensemble des projets de Steeve. Tout est décrit dans **`AUTOMATION/README.md`**.

En résumé :

| Routine | Fréquence | Rôle |
|---|---|---|
| 🔨 **Forge Quotidien** | tous les jours 05h00 | Scanne tous les repos, développe en profondeur ceux du jour |
| 🛡️ **Sentinelle** | tous les jours 05h00 (même run) | Santé technique : build, deps, sécurité, déploiements |
| 🧭 **Revue Stratégique** | dimanche | Réalignement VISION/ROADMAP, mise à jour des KPIs |

Le protocole d'autonomie que ces routines suivent est dans
`AUTOMATION/playbooks/00-protocole-forge.md`. **Lis-le avant toute exécution automatique.**

---

## 6. Règle d'autonomie (importante)

Steeve a explicitement demandé, le 5 septembre 2026, que Claude **n'attende pas
son feu vert** pour avancer :

> « N'attends pas forcément que je te dise à chaque fois vas-y continue. […] Si je ne
> réponds pas à temps, tu continues. Dès que je vais venir, tu me dis ce que tu as fait.
> Si c'est mauvais, on reviendra en arrière. »

Donc : **avancer par défaut, sur une branche, en PR draft.** Les questions ne bloquent
jamais le travail — elles s'écrivent dans `AUTOMATION/QUESTIONS.md` et le travail continue
avec l'hypothèse la plus raisonnable, clairement annoncée.

Les limites de cette autonomie (ce qui reste interdit sans accord explicite) sont
listées dans `AUTOMATION/playbooks/00-protocole-forge.md §3`. Elles ne sont pas négociables.
