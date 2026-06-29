<div align="center">

<img src="https://img.shields.io/badge/FORGE-Afrika-C4572A?style=for-the-badge&logoColor=white&labelColor=070e1f" alt="FORGE Afrika" height="40"/>

# Construire l'infrastructure logicielle de l'Afrique francophone

[![GitHub Stars](https://img.shields.io/github/stars/dosteeve2-hash/forge-afrika?style=for-the-badge&color=F0A832&labelColor=070e1f)](https://github.com/dosteeve2-hash/forge-afrika/stargazers)
[![Dernière mise à jour](https://img.shields.io/github/last-commit/dosteeve2-hash/forge-afrika?style=for-the-badge&color=2dd4ff&labelColor=070e1f&label=Mis+%C3%A0+jour)](https://github.com/dosteeve2-hash/forge-afrika/commits/main)
[![Licence](https://img.shields.io/badge/Licence-MIT-4ade80?style=for-the-badge&labelColor=070e1f)](./LICENSE)
[![Phase](https://img.shields.io/badge/Phase-Production%202025--2026-F0A832?style=for-the-badge&labelColor=070e1f)](./ROADMAP.md)
[![Made in](https://img.shields.io/badge/Made%20in-Burkina%20Faso%20%F0%9F%87%A7%F0%9F%87%AB-C4572A?style=for-the-badge&labelColor=070e1f)](./VISION.md)

**[📖 Vision](./VISION.md)** · **[🗺️ Roadmap](./ROADMAP.md)** · **[💡 Produits](./LOGICIELS/idees-produits.md)** · **[📧 Contact](mailto:docompaore2@gmail.com)**

</div>

---

## 🎯 La thèse d'investissement

> *"Pendant la ruée vers l'or californienne, les vrais gagnants n'étaient pas les chercheurs d'or — c'étaient ceux qui leur vendaient les pioches."*

**FORGE Afrika** applique cette logique à l'Afrique de 2025 : pendant que 50 millions de PME africaines cherchent leur or — croissance, formalisation, accès aux marchés export — nous leur fournissons les pioches. Ces pioches sont des logiciels : SaaS de comptabilité, de traçabilité agricole, de collecte terrain, pensés pour les réalités du continent.

Le marché du logiciel B2B en Afrique sub-saharienne est encore vierge. Les géants comme SAP ou Odoo sont inaccessibles (coût, complexité, langue). Les PME africaines tiennent leur compta sur cahier, leur production sur Excel, leur traçabilité dans leur tête. **Cela crée une inefficacité systémique de plusieurs dizaines de milliards de dollars — et une opportunité de même ampleur.**

Notre stratégie n'est pas de participer à la ruée. C'est de **devenir la couche infrastructure** sur laquelle toute la croissance africaine s'appuie. D'ici 2030, FORGE Afrika vise à être la stack logicielle standard de l'Afrique francophone : la référence incontournable pour toute PME qui veut exister dans l'économie formelle.

---

## 💼 Portefeuille de produits

| Produit | Statut | Description | Accès |
|---------|:------:|-------------|-------|
| **TAAMA** | 🟢 Beta | Traçabilité agricole & ERP industriel — conformité EUDR 2026 | [taama.vercel.app](https://taama.vercel.app) |
| **CompTrack** | 🟢 Beta | Comptabilité PME SYSCOHADA — simple, mobile, FCFA-natif | [comptrack.vercel.app](https://comptrack.vercel.app) |
| **BurkinaCollect** | 🟡 En dev | Collecte de données terrain offline-first pour agents de terrain | — |
| **MIFA Life** | 🚀 En production | E-commerce mode africaine — vêtements & accessoires africains | — |

> Chaque produit est autonome et génère ses propres revenus. Ensemble, ils forment un écosystème intégré : données terrain → production → comptabilité → accès marchés.

---

## 🗺️ Roadmap 2025–2030+

### Phase 1 — Production (2025–2026)
4 produits SaaS en ligne, premiers clients payants, ARR > 5M FCFA. Validation du modèle sur le marché burkinabè. C'est la phase actuelle : prouver que des PME africaines paient pour du logiciel adapté.

### Phase 2 — Industrie (2027)
500 PME clientes actives. ARR 50M FCFA (≈ 75 000 €). Recrutement d'une équipe commerciale terrain. Extension aux marchés sénégalais, ivoirien et malien. Les produits passent de beta à production robuste.

### Phase 3 — Monopole (2028–2029)
Expansion 5 pays francophones. ARR 500M FCFA (≈ 750 000 €). FORGE devient la référence obligatoire pour les PME voulant exporter (certification EUDR, conformité bancaire SYSCOHADA). Lancement d'une offre Enterprise pour les groupes industriels.

### Phase 4 — Infrastructure (2030+)
FORGE devient **la stack standard** de l'Afrique francophone. Partenariats institutionnels (BCEAO, UEMOA, banques de développement). Les logiciels FORGE sont préinstallés dans les incubateurs et programmes gouvernementaux. Objectif : être à l'Afrique ce que Stripe est au paiement en ligne.

---

## 🔗 Architecture écosystème

```
BurkinaCollect          TAAMA                CompTrack
(Collecte terrain)  →  (Production / ERP)  →  (Comptabilité)
       ↓                      ↓                      ↓
  Données GPS           Lots certifiés         Bilans SYSCOHADA
  Géolocalisation       Rendements             Export fiscal
  Agents terrain        Traçabilité EUDR       Multi-devises FCFA
                              ↓
                    FORGE Trade (Phase 2)
                    (Marketplace export B2B)
```

Les produits FORGE sont conçus pour s'alimenter mutuellement : les données de collecte terrain de BurkinaCollect entrent dans TAAMA pour la production, et les coûts de production de TAAMA alimentent CompTrack pour la comptabilité. Un seul écosystème intégré, du champ à la facture.

---

## 📊 Chiffres clés du marché

| Indicateur | Valeur |
|------------|--------|
| PME en Afrique sub-saharienne sans outils digitaux | ~50 millions |
| PME burkinabè gérant leur compta sur papier/Excel | > 80 % |
| Coût ERP classique (Odoo, SAP) pour une PME | 1,5 — 10M FCFA |
| Taux d'adoption des ERP classiques en Afrique | < 30 % |
| Valeur marché SaaS B2B Afrique 2030 (estimé) | > 15 Mds USD |
| Horizon ARR FORGE Afrika 2030 | 500M+ FCFA |

---

## 🏗️ Structure du dépôt

```
forge-afrika/
├── README.md              → Ce fichier — vision & portefeuille
├── PROJECT.md             → Stratégie globale long terme
├── VISION.md              → Philosophie, analyse chaîne de valeur
├── ROADMAP.md             → Timeline 2025-2030, KPIs par phase
├── LOGICIELS/
│   ├── taama-spec.md          → Spec produit TAAMA
│   ├── comptrack-spec.md      → Spec produit CompTrack
│   ├── burkinacollect-spec.md → Spec produit BurkinaCollect
│   └── idees-produits.md      → Backlog des prochains logiciels
└── RECHERCHE/
    ├── texte-01-le-temps-des-machines.md → Manifeste fondateur
    └── synthese-terrain-burkina.md       → Réalités terrain BF
```

---

## 🌟 Les inspirations stratégiques

**Aliko Dangote** — L'intégration verticale. Contrôler toute la chaîne, du producteur au consommateur.
**NVIDIA** — Vendre l'infrastructure. Celui qui contrôle les outils contrôle la valeur.
**John D. Rockefeller** — La standardisation. Qui dicte la norme dicte les conditions du marché.
**Les Tigres Asiatiques** — La vitesse. 25 ans suffisent pour transformer un pays si la stratégie est juste.

---

## 📬 Contact & Collaboration

**Steeve Donald Compaoré** — Fondateur, FORGE Afrika
Étudiant en informatique (L3) · Université de Tokat Gaziosmanpaşa, Turquie 🇹🇷
Burkinabè de Ouagadougou 🇧🇫

📧 [docompaore2@gmail.com](mailto:docompaore2@gmail.com)
🐙 [github.com/dosteeve2-hash](https://github.com/dosteeve2-hash)
🌐 [steeve-portfolio-mocha.vercel.app](https://steeve-portfolio-mocha.vercel.app)

> Pour les investisseurs, partenaires institutionnels ou PME intéressées par un accès early, écrire directement à l'adresse ci-dessus.

---

<div align="center">

*"Ne pas chercher l'or. Forger la pioche."*

**FORGE Afrika © 2025-2026 — Steeve Donald Compaoré**

</div>
