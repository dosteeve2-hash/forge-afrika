<div align="center">

<img src="https://img.shields.io/badge/FORGE-Afrika-D4AF37?style=for-the-badge&logoColor=white&labelColor=0A1628" alt="FORGE Afrika" height="40"/>

# 🏭 FORGE Afrika

> **L'infrastructure logicielle de l'industrialisation ouest-africaine.**
> Construire les outils qui manquent à l'Afrique pour transformer ses matières premières en richesse.

[![License: MIT](https://img.shields.io/badge/License-MIT-D4AF37.svg?style=for-the-badge&labelColor=0A1628)](LICENSE)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-white?style=for-the-badge&labelColor=0A1628)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?style=for-the-badge&labelColor=0A1628)](https://supabase.com)
[![Status](https://img.shields.io/badge/Status-Phase%201%20Active-D4AF37?style=for-the-badge&labelColor=0A1628)](.)
[![Made in](https://img.shields.io/badge/Made%20in-Burkina%20Faso%20🇧🇫-00BCD4?style=for-the-badge&labelColor=0A1628)](./VISION.md)

**[📖 Vision](./VISION.md)** · **[🗺️ Roadmap](./ROADMAP.md)** · **[📋 Project](./PROJECT.md)** · **[🚀 Checklist](./LAUNCH_CHECKLIST.md)** · **[📧 Contact](mailto:docompaore2@gmail.com)**

</div>

---

## 🎯 La Vision

L'Afrique de l'Ouest exporte des matières premières à bas prix et importe des produits finis à prix fort. Ce n'est pas une fatalité — c'est un problème logiciel.

FORGE Afrika construit la suite d'outils SaaS qui permettront aux PMEs, coopératives agricoles, exportateurs et industriels africains de :

- **Transformer sur place** plutôt qu'exporter brut
- **Gérer leurs opérations** avec des outils pensés pour leur réalité
- **Accéder aux marchés internationaux** directement
- **Tracer et certifier** leurs produits pour l'export

> *"Pendant la ruée vers l'or californienne, les vrais gagnants n'étaient pas les chercheurs d'or — c'étaient ceux qui leur vendaient les pioches."*
>
> Ne pas chercher l'or. **Forger la pioche.**

**Fondateur :** Steeve Donald Compaoré
**Base :** Burkina Faso 🇧🇫 / Turquie 🇹🇷
**Horizon :** Devenir l'infrastructure logicielle de référence pour l'industrialisation CEDEAO

---

## 🏗️ L'Écosystème — Phase 1 (En construction)

### Produits actifs

| Produit | Description | Cible | Statut |
|---------|-------------|-------|--------|
| [**TAAMA**](https://github.com/dosteeve2-hash/taama) | ERP industriel + traçabilité agricole (conformité EUDR 2026) | PMEs transformation, coopératives BF | 🟡 Beta |
| [**FORJA**](https://github.com/dosteeve2-hash/forja) | Plateforme SaaS gestion exportations café & cacao | Exportateurs BF | 🟡 Beta |
| [**MIFA Life**](https://github.com/dosteeve2-hash/Mifa_Life_shop) | Marketplace e-commerce mode & produits africains | Consommateurs CEDEAO | 🟡 Beta |
| [**CompTrack**](https://github.com/dosteeve2-hash/comptrack) | Comptabilité PME SYSCOHADA — simple, mobile, FCFA-natif | PMEs & artisans | 🟡 Beta |

### Produits en conception

| Produit | Description | Cible | Statut |
|---------|-------------|-------|--------|
| [**AgroTrack BF**](./docs/agrotrack-bf.md) | Gestion coopératives agricoles, offline-first | Coopératives coton, sésame, karité | 🔵 Conception |
| [**MillTrack**](./docs/milltrack.md) | Suivi production usines de transformation | Minoteries, huileries, égrenage | 🔵 Conception |
| [**LivestockOS**](./docs/livestock-os.md) | Gestion d'élevage mobile (santé, stocks, ventes) | Éleveurs sahéliens | 🔵 Conception |
| [**ValueChain Connect**](./docs/valuechain-connect.md) | Marketplace B2B producteurs ↔ transformateurs | Zone CEDEAO | 🔵 Conception |

---

## 🛠️ Stack Technique

Tous les produits FORGE Afrika partagent une stack commune :

```
Frontend    → Next.js 15 (App Router) + TypeScript strict + Tailwind CSS
UI          → shadcn/ui + Framer Motion (animations)
Auth        → Supabase SSR (getUser() — jamais getSession())
Database    → Supabase (PostgreSQL + Realtime + Storage)
Analytics   → PostHog
Email       → Resend
Deployment  → Vercel
```

**Charte graphique FORGE Afrika**

| Token | Hex | Usage |
|-------|-----|-------|
| Navy | `#0A1628` | Fond principal |
| Gold | `#D4AF37` | Accent premium |
| Cyan | `#00BCD4` | Accent tech |

**Standards de code**

- TypeScript strict — 0 `any`
- `getUser()` pour l'auth — jamais `getSession()`
- Pub/sub Supabase Realtime — jamais polling
- Build 0 erreurs avant chaque PR
- `Co-authored-by: Claude <claude@anthropic.com>`

---

## 📐 Architecture de l'écosystème

```
forge-afrika/               ← Ce repo — QG & documentation centrale
├── docs/                   ← Specs produits en conception
│   ├── agrotrack-bf.md     ← Coopératives agricoles
│   ├── milltrack.md        ← Usines de transformation
│   ├── livestock-os.md     ← Gestion d'élevage
│   └── valuechain-connect.md ← Marketplace B2B CEDEAO
├── LOGICIELS/              ← Specs produits actifs
├── RECHERCHE/              ← Terrain & analyses marché
├── VISION.md               ← Philosophie & chaîne de valeur
├── ROADMAP.md              ← Timeline 2025-2030, KPIs
└── LAUNCH_CHECKLIST.md     ← 10 points avant chaque lancement

Repos produits (même organisation)
├── taama/                  ← ERP industriel & traçabilité
├── forja/                  ← Plateforme export
├── mifa-life/              ← Marketplace e-commerce
├── comptrack/              ← Comptabilité PMEs
├── agrotrack-bf/           ← [À venir] Coopératives agricoles
├── milltrack/              ← [À venir] Usines transformation
├── livestock-os/           ← [À venir] Élevage mobile
└── valuechain-connect/     ← [À venir] B2B CEDEAO
```

**Flux de données intégré**

```
BurkinaCollect / AgroTrack       TAAMA / MillTrack        CompTrack
  (Collecte terrain)         →   (Production / ERP)   →  (Comptabilité)
  Données GPS                    Lots certifiés            Bilans SYSCOHADA
  Agents terrain                 Traçabilité EUDR          Export fiscal
  Offline-first                  Rendements                Multi-devises FCFA
                                       ↓
                            ValueChain Connect
                            (Marketplace B2B CEDEAO)
```

---

## 📊 Métriques & Roadmap

### Phase 1 — Production (2025–2026)

| Métrique | Cible |
|----------|-------|
| Produits en beta | 4 |
| Clients pilotes | 10 |
| MRR | 500 000 FCFA |
| Pays couverts | Burkina Faso, Côte d'Ivoire, Sénégal |

### Phase 2 — Industrie (2027–2028)

500 PME clientes. ARR 50M FCFA. Extension Sénégal, Côte d'Ivoire, Mali. Suite intégrée TAAMA + CompTrack + MIFA Life.

### Phase 3 — Monopole (2029+)

Expansion CEDEAO 5 pays. ARR 500M FCFA. Infrastructure critique pour l'industrialisation. Partenariats institutionnels BCEAO / UEMOA.

---

## 🚀 Stratégie Go-To-Market

**Phase 1 — Pioche**
Être présent partout où les PMEs africaines cherchent des solutions. Construire la réputation produit en livrant de la valeur réelle avant de facturer.

**Phase 2 — Production**
Convertir les utilisateurs en clients payants. Intégrer les produits entre eux (TAAMA + CompTrack + MIFA Life = suite intégrée). Recrutement d'une équipe commerciale terrain.

**Phase 3 — Monopole**
Devenir la référence incontournable. Expansion CEDEAO. Infrastructure critique pour l'industrialisation africaine.

---

## 📊 Chiffres clés du marché

| Indicateur | Valeur |
|------------|--------|
| PME africaines sans outils digitaux | ~50 millions |
| PME burkinabè gérant leur compta sur papier/Excel | > 80 % |
| Coût ERP classique (Odoo, SAP) pour une PME | 1,5 — 10M FCFA |
| Valeur marché SaaS B2B Afrique 2030 (estimé) | > 15 Mds USD |
| Horizon ARR FORGE Afrika 2030 | 500M+ FCFA |

---

## 🌟 Les inspirations stratégiques

**Aliko Dangote** — L'intégration verticale. Contrôler toute la chaîne, du producteur au consommateur.
**NVIDIA** — Vendre l'infrastructure. Celui qui contrôle les outils contrôle la valeur.
**John D. Rockefeller** — La standardisation. Qui dicte la norme dicte les conditions du marché.
**Les Tigres Asiatiques** — La vitesse. 25 ans suffisent pour transformer un pays si la stratégie est juste.

---

## 🤝 Contribuer

FORGE Afrika est en développement actif. Chaque repo est ouvert aux contributions.

Pour contribuer : fork → branche → PR. Standards ci-dessus obligatoires. Build 0 erreurs avant de soumettre.

---

## 📬 Contact

**Steeve Donald Compaoré**
Fondateur, FORGE Afrika
Étudiant en informatique (L3) · Université de Tokat Gaziosmanpaşa, Turquie

📧 [docompaore2@gmail.com](mailto:docompaore2@gmail.com)
🐙 [github.com/dosteeve2-hash](https://github.com/dosteeve2-hash)
🌐 [steeve-portfolio-mocha.vercel.app](https://steeve-portfolio-mocha.vercel.app)

> Pour les investisseurs, partenaires institutionnels ou PMEs intéressées par un accès early, écrire directement.

---

<div align="center">

*Construire l'Afrique de demain, un logiciel à la fois.*

**FORGE Afrika © 2025-2026 — Steeve Donald Compaoré**

</div>
