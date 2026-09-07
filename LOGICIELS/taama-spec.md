# TAAMA — Spécification Produit v1.0
> *FORGE Afrika / Steeve Donald Compaore*
> *Rédigé : Juin 2026*

---

> ### ⚠️ Note de cadrage — septembre 2026
>
> Le positionnement « conformité EUDR » a été retiré de cette spec après vérification.
> **L'EUDR ne couvre que sept matières premières** — bovins, cacao, café, huile de palme, soja,
> caoutchouc et bois — donc **ni le karité, ni le sésame, ni l'anacarde, ni le coton**, c'est-à-dire
> aucune des filières visées ici. L'argument se retourne devant un professionnel de la filière.
>
> **Le déclencheur commercial réel** est burkinabè : la suspension de l'exportation des amandes de
> karité brutes (septembre 2024) et de la noix de cajou brute (avril 2025). Des négociants qui
> réexpédiaient de la matière brute sont désormais contraints de transformer sur place, sans en
> avoir les outils. Voir [`COMMERCIAL/prospection-taama.md`](../COMMERCIAL/prospection-taama.md).
>
> L'EUDR reste vendable, mais aux filières **bovine** (cuirs, peaux, viande — 3ᵉ produit
> d'exportation du pays) et **bois**, avec échéance au 30 décembre 2026 pour les moyennes et
> grandes entreprises.

---

## 1. Contexte & Problème

**TAAMA** (en Mooré : *le voyage, la progression*) est un SaaS industriel B2B conçu pour les PME de transformation agroalimentaire et industrielle au Burkina Faso et en Afrique de l'Ouest.

### Problèmes documentés

| # | Problème | Impact estimé |
|---|----------|---------------|
| P1 | **Production aveugle** — 63 % des PME africaines gèrent manuellement | Écarts stock moyens : 22 % |
| P2 | **Traçabilité absente** — bloque l'accès à l'export certifié (GlobalG.A.P., bio, fair trade) | Contrats export perdus |
| P3 | **ERP inaccessibles** — Odoo = 1,5–10 M FCFA, taux d'échec adoption ~70 % | Cash gaspillé |
| P4 | **Rendements jamais mesurés** — pertes post-transformation 30–40 % | Millions FCFA invisibles |
| P5 | **Reporting impossible** — les banques refusent faute de données fiables | Financement bloqué |

### Secteurs cibles
Coton · Karité · Sésame · Mangue séchée · Céréales · Abattoirs · Savonneries · Huileries

---

## 2. Architecture Technique

### Stack

```
Frontend  : Next.js 15 (App Router) + TypeScript strict
Styling   : Tailwind CSS v4 + shadcn/ui
Charts    : Recharts
ORM       : Drizzle ORM + Drizzle Kit
Backend   : Next.js Route Handlers + Server Actions
Database  : Supabase (PostgreSQL + Auth + Storage + Realtime)
State     : TanStack Query v5
Auth      : Supabase Auth (JWT + RLS)
Deploy    : Vercel (app) + Supabase (backend)
```

### Architecture multi-tenant offline-first

```
┌────────────────────────────────────────────────────┐
│                Opérateur Terrain                    │
│                                                     │
│  [Saisie lot] → [IndexedDB Local] → [Sync Queue]  │
│                       ↓                             │
│          Service Worker (Phase 2 — PWA)            │
└──────────────────────┬─────────────────────────────┘
                        │ Reconnexion réseau
                        ▼
┌────────────────────────────────────────────────────┐
│               Supabase / Vercel                     │
│                                                     │
│  [API Sync] → [PostgreSQL + RLS] → [Dashboard]    │
└────────────────────────────────────────────────────┘
```

### Principes clés
- **Multi-tenant** : isolation stricte par `organization_id` sur toutes les tables
- **Row Level Security** : activé sur chaque table Supabase (zéro fuite cross-tenant)
- **Server Components** par défaut, Client Components seulement si nécessaire
- **TypeScript strict** : pas de `any`, types générés par Drizzle

---

## 3. Modules Fonctionnels

| Module | Description | Priorité MVP |
|--------|-------------|:------------:|
| **Auth & Onboarding** | Inscription organisation, invitation membres, multi-sites | P0 |
| **Batch Tracking** | Création lot, saisie intrants/extrants, calcul rendement auto | P0 |
| **Inventaire** | Stocks temps réel par site, alertes seuil bas, historique mouvements | P0 |
| **Tableau de bord** | KPIs production, graphique 30 jours, santé stock, alertes actives | P0 |
| **Traçabilité export** | Lots → fournisseur → région, certification PDF, export CSV | P1 |
| **Rapports** | Rapport mensuel PDF, bilan matières, export banquier | P1 |
| **Fournisseurs** | Catalogue fournisseurs, scoring qualité, géolocalisation | P2 |
| **Offline sync** | PWA installable, IndexedDB + Service Worker, notifications push | P2 |

---

## 4. Modèle de Données — Entités Clés

### `Batch` (lot de production)

```typescript
interface Batch {
  id: string;                    // UUID
  organization_id: string;       // Multi-tenant isolation
  batch_number: string;          // Ex: LOT-2026-001 (auto-généré)
  product_id: string;            // Produit fini
  status: "planifie" | "en_cours" | "termine" | "annule" | "en_attente_controle";
  planned_start?: Date;
  actual_start?: Date;
  actual_end?: Date;
  planned_output?: number;       // Quantité prévue (kg/litre/tonne)
  actual_output?: number;        // Quantité réelle produite
  yield_rate?: number;           // Calculé : actual_output / sum(inputs) × 100
}
```

### `InventoryMovement` (mouvement de stock)

```typescript
interface InventoryMovement {
  id: string;
  organization_id: string;
  site_id: string;
  material_id: string;
  type: "entree" | "sortie" | "transfert" | "ajustement";
  quantity: number;
  reference?: string;            // N° bon, lot
  supplier_id?: string;
  created_at: Date;
}
```

> Le schéma SQL complet (12 tables, relations, RLS policies) est dans [`taama-spec-technique.md`](./taama-spec-technique.md).

---

## 5. Numérotation automatique des lots

```
LOT-{ANNÉE}-{SÉQUENCE_SITE}
Exemple : LOT-2026-042 (42e lot de l'année 2026 pour ce site)
```

- Généré côté serveur via une fonction Supabase (pas de collision possible en multi-tenant)
- Lié au numéro de certification (bio, fair trade, EUDR si filière concernée) pour la traçabilité export

---

## 6. Modèle Économique

| Plan | Cible | Prix/an (FCFA) | Limites |
|------|-------|---------------|---------|
| **Trial** | Découverte | Gratuit 30 j | 1 site · 50 lots/mois |
| **Starter** | PME 10–50 employés | 150 000 | 2 sites · 200 lots/mois |
| **Pro** | PME 50–200 employés | 350 000 | 5 sites · illimité |
| **Enterprise** | Groupes industriels | Sur devis | Multi-sites + support dédié |

**ROI clients Starter :** Moins d'un mois de salaire d'un responsable administratif au BF. Une seule rupture de stock évitée ou un contrat export sécurisé = ROI immédiat.

---

## 7. Performance & Métriques Cibles

| Métrique | Cible |
|----------|-------|
| LCP (First Load) | < 2,5 s sur 3G |
| Disponibilité | > 99,5 % mensuel |
| Sync offline → online | < 5 s après reconnexion |
| Précision calcul rendement | ± 0,1 % |
| Capacité données offline (Phase 2) | > 500 lots / appareil |
| Support clients Starter → Pro | < 4 h réponse |

---

## 8. Sécurité & Conformité

- **Row Level Security** PostgreSQL : chaque requête filtrée par `organization_id`
- **JWT Supabase Auth** : tokens 1h + refresh sécurisé côté serveur
- **Données en transit** : HTTPS forcé (TLS 1.3 minimum)
- **Traçabilité lot-to-source** exportable au format attendu par les acheteurs et certificateurs (dont EUDR pour les filières bovine et bois)
- **OHADA / SYSCOHADA** : rapports financiers compatibles norme comptable CEDEAO

---

## 9. Roadmap Immédiate

| Milestone | Objectif | Délai |
|-----------|----------|-------|
| **MVP Core** | Auth + Dashboard + Batch tracking + Inventaire | M1–M3 |
| **First Client** | 2–3 PME pilotes à Ouagadougou | M3 |
| **Traçabilité** | Module export certifications + rapport PDF | M4–M5 |
| **PWA Offline** | Service Worker + IndexedDB sync | M6 |
| **ARR 1M FCFA** | 7+ clients payants | M8–M10 |

---

## 10. Connexions Écosystème FORGE Afrika

TAAMA s'intègre nativement avec les autres logiciels FORGE :

| Logiciel | Type de connexion |
|----------|-------------------|
| **BurkinaCollect** | Import des données de collecte terrain (matières premières entrantes, zones de récolte) |
| **CompTrack** *(futur)* | Export des coûts de production vers la comptabilité |
| **African Hybrid Agent** *(futur)* | Analyse IA des anomalies de rendement et prédictions |
| **FORGE Trade** *(Phase 2+)* | Certificats de traçabilité → interface acheteurs export |

> TAAMA est le cœur opérationnel de la chaîne FORGE : il transforme les données terrain brutes de BurkinaCollect en indicateurs de performance industrielle exploitables.

---

*Spécification rédigée en Juin 2026 — FORGE Afrika*
*Auteur : Steeve Donald Compaore — docompaore2@gmail.com*
*Spec technique complète : [`taama-spec-technique.md`](./taama-spec-technique.md)*
