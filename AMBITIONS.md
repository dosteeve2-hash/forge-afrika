# 🔥 AMBITIONS — Le document maître

### Toutes les ambitions, tous les projets, toutes les idées de Steve Donald Compaoré
*Consolidé le 3 septembre 2026 — à partir du repo FORGE Afrika, de 26 dépôts GitHub et des documents de travail*

---

> *« Ce n'est pas le manque de ressources qui appauvrit l'Afrique.
> C'est le manque de contrôle sur ce qu'elle fait de ces ressources. »*

Ce document existe pour une seule raison : **tout mettre au même endroit.**
Les idées éparpillées ne se hiérarchisent pas. Ce qui n'est pas écrit ne se décide pas.

Il ne remplace pas [`VISION.md`](./VISION.md) (la philosophie), [`PROJECT.md`](./PROJECT.md)
(la stratégie) ni [`ROADMAP.md`](./ROADMAP.md) (le calendrier). **Il les surplombe** :
c'est la carte de tout ce qui existe, de ce qui est réel, et de ce qui reste une intention.

---

## 🧭 LA PHRASE UNIQUE

**Contrôler une chaîne de valeur africaine complète — du logiciel qui la pilote jusqu'à la
matière qu'elle transforme — et financer cette conquête avec ses propres armes.**

Tout le reste de ce document découle de cette phrase.

---

## 🎯 LES SIX AMBITIONS

Vingt-six dépôts, une dizaine de produits, plusieurs pays. Mais en réalité, **six ambitions
seulement** — et elles s'emboîtent.

### A1 — Industrialiser l'Afrique par le logiciel *(FORGE Tech, 2024-2028)*
Vendre les pioches, pas chercher l'or. Des SaaS industriels offline-first pour les PME
africaines, conçus pour la réalité africaine et non pour la Silicon Valley.
**Statut : en cours, c'est le cœur battant.**

### A2 — Devenir industriel *(FORGE Industries, 2028-2040)*
Passer du code au béton. Racheter ou créer une unité de transformation au Burkina, la moderniser
avec les logiciels de A1, puis remonter jusqu'à la matière première.
**Statut : vision documentée, non commencée. Dépend entièrement de A1.**

### A3 — La souveraineté de l'IA africaine
Des agents et des modèles qui tournent **en local**, qui appartiennent à leur utilisateur, et qui
parlent des réalités africaines qu'aucun modèle mondial ne connaît.
**Statut : 4 prototypes, 1 spécification complète. Thèse la plus différenciante du portefeuille.**

### A4 — Le capital *(FORGE Capital, 2029+)*
Un cercle d'investisseurs — diaspora d'abord — pour financer A2 sans dépendre des banques.
**Statut : brief stratégique écrit. Bloqué (volontairement) sur la crédibilité, pas sur l'idée.**

### A5 — Le commerce et la distribution
Connecter les marchés africains aux produits du monde, et les producteurs africains entre eux.
**Statut : Mifa Life a une équipe de 11 personnes et un PRD complet — c'est le projet le plus
avancé socialement, mais Steve n'en est que le lead technique.**

### A6 — La transmission
Aider les autres talents africains à transformer leurs idées en projets réels. Écrire. Documenter.
Structurer les communautés.
**Statut : Problem to Project Africa est un vrai produit ; UEEMT-Tokat sert la communauté malienne
de Tokat ; le manifeste *Le Temps des Machines* fonde le tout.**

---

## 📦 L'INVENTAIRE COMPLET — 26 dépôts, sans complaisance

Légende : 🟢 produit réel · 🟡 scaffold / prototype · 🔵 idée documentée · ⚪️ exercice ou vitrine

### A1 — Logiciels industriels (FORGE Tech)

| Projet | Dépôt | Description | Statut |
|--------|-------|-------------|--------|
| **TAAMA** ⭐ | `taama` (privé) | SaaS gestion industrielle PME BF — traçabilité, production, inventaire, conformité EUDR | 🟡 [Spec complète](./LOGICIELS/taama-spec-technique.md) + code |
| **FORJA** | `forja` (privé) | SaaS industriel B2B transformation Afrique de l'Ouest | 🟡 [Brief marché](./LOGICIELS/forja-product-brief.md) |
| **AgroTrack BF** | `agrotrack-bf` (privé) | Gestion de coopératives agricoles, offline-first | 🟡 Scaffold |
| **MillTrack** | `milltrack` (privé) | Suivi de production temps réel pour usines | 🟡 Scaffold |
| **LivestockOS** | `livestockos` (public) **+** `livestock-os` (privé) | Gestion d'élevage sahélien | 🟡 ⚠️ **Doublon à trancher** |
| **ValueChain Connect** | `valuechain-connect` (privé) | Marketplace B2B producteurs ↔ transformateurs | 🟡 Scaffold |
| **Indubot Afrika** | `indubot-afrika` (privé) | Gestion automatique d'industries : machines, alertes, rapports temps réel | 🟡 Scaffold |
| **ComptTrack** | `comptrack` (privé) | SaaS comptabilité TPE/PME africaines — FCFA, factures, rapports | 🟡 Scaffold |
| **BurkinaCollect** | `burkinacollect` (public) | Collecte de données terrain offline-first pour organisations BF | 🟡 [Spec](./LOGICIELS/burkinacollect-spec.md) |
| **TransportRural** | — | Groupage et optimisation du transport rural (« BlaBlaCar des marchandises ») | 🔵 [Idée](./LOGICIELS/idees-produits.md) |
| **IndustrIA** | — | Couche IA au-dessus des données collectées par les autres produits | 🔵 Idée, 2028+ |

### A3 — IA & agents

| Projet | Dépôt | Description | Statut |
|--------|-------|-------------|--------|
| **Sahel Commerce AI** | `sahel-commerce-ai` (public) | Assistant IA pour marchands ouest-africains — agent LLM, inventaire, ventes, rapprochement mobile money (FastAPI + Next.js PWA) | 🟡 Prototype |
| **African Hybrid Agent** | `african-hybrid-agent` (public) | Prototype d'agent hybride africain | 🟡 Prototype |
| **LLM Africain Agent** | `LLM-africain-agent-AI` (public) | Agent LLM africain | 🟡 Prototype |
| **KIBARÉ** | — | Conseiller d'investissement IA 100 % local, réseau à sens unique | 🔵 [Spec complète](./LOGICIELS/kibare-spec.md) |

⚠️ **Trois prototypes d'agents IA sur trois dépôts distincts.** Il y a probablement **un seul
produit** là-dedans. À fusionner ou à trancher (voir §« Décisions »).

### A4 — Capital

| Projet | Description | Statut |
|--------|-------------|--------|
| **FORGE Capital — « Le Cercle »** | Club d'investissement type Blast, adapté à l'UEMOA : recherche → club SPV → fonds régulé | 🔵 [Brief complet](./CAPITAL/forge-capital-brief.md) |

### A5 — Commerce & distribution

| Projet | Dépôt | Description | Statut |
|--------|-------|-------------|--------|
| **Mifa Life** | `Mifa_Life_shop` (privé) | E-commerce dropshipping Chine/Turquie → Mali. **11 fondateurs**, PRD v2.0, paiements Orange Money/Wave/PayDunya. Steve = Chef de projet technique & Lead Dev | 🟢 Équipe réelle, PRD complet |
| **SUGU** | `duka-boutique` (privé) | Gestion de boutique pour les commerçants du secteur informel — filiale « Retail » de l'écosystème, déployée sur `duka.vercel.app` | 🟡 En ligne |

### A6 — Transmission & communauté

| Projet | Dépôt | Description | Statut |
|--------|-------|-------------|--------|
| **Problem to Project Africa** | `Problem-to-Projects-Africa` (privé) | Plateforme IA transformant un problème local ou une compétence en projet exécutable, avec roadmap et incubation. Blueprint + PRD + architecture technique + moteur de recommandation | 🟢 **Le plus abouti après TAAMA** |
| **UEEMT-Tokat** | `ueemt-tokat` (privé) | Site officiel de l'Union des Élèves et Étudiants Maliens à Tokat | 🟡 Site communautaire |
| **Le Temps des Machines** | — | Manifeste fondateur (juin 2026) | 🟢 [Texte](./RECHERCHE/texte-01-le-temps-des-machines.md) |
| **Synthèse terrain Burkina** | — | Recherche de terrain | 🟢 [Note](./RECHERCHE/synthese-terrain-burkina.md) |
| **Site QG FORGE Afrika** | `forge-afrika` (ce dépôt) | Vitrine holding + écosystème des filiales + dashboard KPI (Next.js 15 · Supabase · Recharts) | 🟢 En ligne |

### Vitrine, apprentissage, archives

| Projet | Dépôt | Note |
|--------|-------|------|
| Portfolio 2.0 | `Mon-Portfolio-2.0` | ⚪️ Version active |
| Portfolio 1 | `Mon-Portfolio-` | ⚪️ **Doublon — à archiver** |
| Site GitHub Pages | `steevedo.github.io` | ⚪️ Ancien, à archiver |
| Profil | `Steeve-Donald-`, `Donald` | ⚪️ À archiver |
| AURA Pro | `phone-showcase` | ⚪️ Vitrine technique (Next.js 15, Tailwind v4, Framer Motion) — **bon échantillon de savoir-faire** |
| BST Java | `binary-search-tree-java` | ⚪️ Exercice académique |
| Tutoriel | `desktop-tutorial` | ⚪️ À supprimer |

**Total : 26 dépôts — 3 produits réellement avancés, ~12 scaffolds, ~8 vitrines ou archives.**

> ℹ️ **Ce dépôt lui-même a changé de nature.** `forge-afrika` n'est plus seulement le QG
> documentaire : il héberge désormais le **site vitrine de la holding** (Next.js 15, Supabase,
> dashboard KPI, page écosystème des 10 filiales). Les documents stratégiques et le code du site
> cohabitent — voir `CLAUDE.md` pour les conventions de chacun.

---

## ⚠️ LA CONTRADICTION CENTRALE — à regarder en face

Le fichier [`idees-produits.md`](./LOGICIELS/idees-produits.md) énonce une règle d'or :

> *« Un produit à la fois. AgroTrack d'abord. Tout le reste attendra.
> La dispersion est l'ennemi de l'entrepreneur solo en phase 1. »*

**Cette règle est excellente. Et elle n'est pas appliquée.**

Les faits, sans jugement :
- **12 projets produits** ouverts en parallèle, la plupart créés entre juillet et septembre 2026
- **Aucun client payant** à ce jour
- **Deux doublons** actifs (LivestockOS ×2, portfolios ×2) et **trois** agents IA distincts
- La ROADMAP fixait pour 2026 « l'année de la validation » — la validation suppose **un** produit
  entre les mains d'**un** client qui paie

Ce n'est pas un problème d'ambition : l'ambition est cohérente et rare. **C'est un problème de
concentration.** Un scaffold ne devient jamais un produit tout seul, et douze scaffolds ne valent
pas un logiciel installé chez un client.

### La règle des trois fenêtres

Pour tenir l'ambition sans se disperser, **trois créneaux seulement**, et rien d'autre :

| Fenêtre | Projet | Temps | Objectif |
|---------|--------|-------|----------|
| **🔴 La priorité** | **TAAMA** | 70 % | Un client burkinabè qui paie. Rien d'autre ne compte |
| **🟠 L'engagement** | **Mifa Life** | 20 % | Une équipe de 11 personnes compte sur toi — un engagement pris se tient |
| **🟢 La curiosité** | 1 seul projet, tournant | 10 % | Se former, explorer (KIBARÉ Palier 1, un agent IA, le carnet d'analyses) |

Tout le reste est **gelé, pas abandonné** : documenté ici, repris plus tard, dans l'ordre.
Geler n'est pas renoncer. C'est refuser de tout perdre en voulant tout tenir.

---

## 🔀 DÉCISIONS À PRENDRE (les vraies)

| # | Décision | Pourquoi maintenant |
|---|----------|---------------------|
| 1 | **`livestockos` ou `livestock-os` ?** En garder un, archiver l'autre | Deux dépôts pour un produit = confusion garantie dans 6 mois |
| 2 | **TAAMA vs FORJA vs Indubot Afrika** — trois produits pour des industriels africains. Est-ce un seul produit avec trois noms ? | Si oui, c'est la décision la plus importante de l'année : elle libère les deux tiers de l'effort |
| 3 | **Les 3 agents IA** — `sahel-commerce-ai`, `african-hybrid-agent`, `LLM-africain-agent-AI` : fusionner en un | Trois prototypes valent moins qu'un produit fini |
| 4 | **ComptTrack** est-il un produit à part, ou un module de TAAMA ? | Un ERP contient déjà la compta ; deux produits = deux ventes à faire |
| 5 | **Problem to Project Africa** : produit à part entière ou vitrine de compétences ? | Il est très abouti. S'il devient produit, il entre en concurrence de temps avec TAAMA |
| 6 | Archiver les 5 dépôts vitrine/exercice | Un GitHub lisible est un actif commercial ; 26 dépôts dont 8 morts, non |
| 7 | **`LOGICIELS/taama-spec.md` vs `taama-spec-technique.md`**, et `docs/*.md` qui redoublent `LOGICIELS/idees-produits.md` | Deux specs pour un produit = deux vérités ; il faut une source unique |
| 8 | **Les métriques affichées sur le site du QG** (utilisateurs, transactions, CA par filiale) sont-elles réelles ou des placeholders ? | ⚠️ Voir ci-dessous — c'est la décision la plus urgente |
| 9 | **Retirer « conformité EUDR » du positionnement de TAAMA** | ⚠️ L'EUDR ne couvre que bovins, cacao, café, huile de palme, soja, caoutchouc et bois — **ni karité, ni sésame, ni anacarde, ni coton**. L'argument se retourne devant un professionnel de la filière. Remplacement proposé dans [le dossier de prospection](./COMMERCIAL/prospection-taama.md) |

### ⚠️ Sur les chiffres du site vitrine

`lib/constants.ts` affiche publiquement des métriques par filiale (utilisateurs, transactions,
chiffre d'affaires en FCFA) et des statuts « Actif » / « Beta ». Si ces chiffres sont des
placeholders de démonstration — ce qui est cohérent avec l'absence de client payant — **ils
doivent être retirés ou explicitement marqués comme illustratifs avant toute diffusion du site.**

Ce n'est pas un détail cosmétique. Un investisseur, un client ou un partenaire qui découvre que
des métriques publiques étaient inventées ne revient pas. Sur un marché où tout le monde se
connaît, la crédibilité ne se refait pas. Un site qui affiche honnêtement « en construction »
est infiniment plus solide qu'un site qui affiche 420 utilisateurs fictifs.

---

## 📅 L'ORDRE — ce qui vient quand

```
2026  ├─ TAAMA : premier client payant                        ← LA SEULE CHOSE QUI COMPTE
      ├─ Mifa Life : MVP livré avec l'équipe
      └─ Gel documenté de tout le reste

2027  ├─ TAAMA : 3-5 clients, revenus récurrents
      ├─ FORGE Capital V0 : carnet d'analyses public, 2 h/semaine
      ├─ KIBARÉ Palier 1 : outil personnel, formation à l'investissement
      └─ Fusion des agents IA → un produit

2028  ├─ FORGE Tech : 15+ clients, > 15 000 USD/an  (KPI Phase 1)
      ├─ Premiers investissements avec son propre argent
      └─ Décision : quelle industrie racheter ?

2029+ ├─ Phase 2 : l'industrie                    (voir ROADMAP.md)
      ├─ FORGE Capital V1 : club SPV, cercle restreint
      └─ Problem to Project Africa : relancé avec les moyens
```

---

## 📊 LES SEULS CHIFFRES QUI COMPTENT (2026-2027)

| Indicateur | Aujourd'hui | Objectif 12 mois |
|------------|-------------|------------------|
| **Clients payants** | 0 | **3** |
| Revenu récurrent mensuel | 0 | 300-500 USD |
| Produits en production réelle | 0 | 1 (TAAMA) |
| Dépôts actifs | 26 | ≤ 12 |
| Analyses d'investissement publiées | 0 | 40 |
| Contacts industriels qualifiés | ~50 | 150 |

**Un seul indicateur est vital : le premier client qui paie.** Tous les autres en découlent.
Une signature change plus de choses que dix dépôts.

---

## 🧱 CE QUI NE CHANGE PAS

Quelles que soient les décisions ci-dessus, quatre principes tiennent :

1. **Offline-first, mobile-first, léger.** L'Afrique n'a pas la fibre — le logiciel doit s'en passer.
2. **Souveraineté.** Les données africaines restent africaines ; les modèles tournent chez l'utilisateur.
3. **Vendre les pioches avant de chercher l'or.** Le logiciel finance l'industrie, jamais l'inverse.
4. **La preuve avant le discours.** Un client qui paie vaut mille pitchs ; un carnet d'analyses
   de 100 semaines vaut mille promesses.

---

## ▶️ LA PROCHAINE ACTION

Non pas « les prochaines actions ». **La** prochaine action :

> **Appeler trois transformateurs burkinabè cette semaine.**

Les 10 cibles sont identifiées, avec l'angle d'entrée, le script d'appel, la grille de
qualification et les objections : **[`COMMERCIAL/prospection-taama.md`](./COMMERCIAL/prospection-taama.md)**.

Pas coder. Pas ouvrir un 27ᵉ dépôt. **Appeler.**
Le code est déjà en avance sur le marché — c'est le marché qui manque, pas le logiciel.

---

## 🗂️ Sources de ce document

- Repo `forge-afrika` : `VISION.md`, `PROJECT.md`, `ROADMAP.md`, `PRD.md`, `LOGICIELS/`, `CAPITAL/`, `RECHERCHE/`, `lib/constants.ts`
- 26 dépôts GitHub `dosteeve2-hash/*` (métadonnées et descriptions, septembre 2026)
- Repo `Problem-to-Projects-Africa` : blueprint fondateur, PRD MVP, architecture technique
- Google Drive : *Product Requirements Document (PRD) v2.0 — Mifa Life* (mars 2026)

*⚠️ Document vivant. À relire au début de chaque mois, et à corriger dès qu'une décision est prise.*

*Consolidé le 3 septembre 2026*
