# TAAMA — Spécification Technique Complète
> Version 1.0 — Juin 2026
> Auteur : Steve Donald Compaoré

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

## 1. Vue d'ensemble du produit

**TAAMA** (en Mooré : "le voyage, la progression") est un SaaS industriel B2B offline-first conçu pour les PME de transformation agroalimentaire et industrielle au Burkina Faso et en Afrique de l'Ouest.

### Problème résolu
1. **Production aveugle** — 63% des PME africaines gèrent la production manuellement
2. **Traçabilité absente** — bloque les exports certifiés (GlobalG.A.P., bio, fair trade ; EUDR pour les seules filières bovine et bois — voir la note de cadrage ci-dessous)
3. **ERP inaccessibles** — Odoo coûte 1,5–10M FCFA avec 70% d'échec d'adoption
4. **Rendements jamais mesurés** — millions de FCFA de pertes invisibles
5. **Pas de reporting** — empêche l'accès au crédit bancaire

### Secteurs cibles
Coton · Karité · Sésame · Céréales · Mangue séchée · Abattoirs · Savonneries

---

## 2. Architecture technique

### Stack
```
Frontend  : Next.js 15 (App Router) + TypeScript strict
Styling   : Tailwind CSS v4 + shadcn/ui
Charts    : Recharts
DB ORM    : Drizzle ORM + Drizzle Kit
Backend   : Next.js Route Handlers + Server Actions
Database  : Supabase (PostgreSQL + Auth + Storage + Realtime)
State     : TanStack Query v5
Deploy    : Vercel (app) + Supabase (backend)
Auth      : Supabase Auth (JWT + RLS)
```

### Principes d'architecture
- **Multi-tenant** : isolation par `organization_id` sur toutes les tables
- **Offline-first** : Service Worker + IndexedDB sync (Phase 2)
- **Server Components** par défaut, Client Components uniquement si nécessaire
- **Row Level Security** activé sur toutes les tables Supabase
- **TypeScript strict** : pas de `any`, types générés par Drizzle

---

## 3. Schéma de base de données

### 3.1 Table `organizations`
```sql
CREATE TABLE organizations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  sector      TEXT NOT NULL, -- coton | karite | sesame | cereales | elevage | mangue | savonnerie
  country     TEXT NOT NULL DEFAULT 'BF',
  city        TEXT,
  phone       TEXT,
  email       TEXT,
  logo_url    TEXT,
  plan        TEXT NOT NULL DEFAULT 'trial', -- trial | starter | pro | enterprise
  trial_ends_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.2 Table `sites`
```sql
CREATE TABLE sites (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  location        TEXT,
  type            TEXT NOT NULL DEFAULT 'usine', -- usine | entrepot | champ
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.3 Table `users`
```sql
-- Liée à auth.users de Supabase via user_id
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id         UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  full_name       TEXT NOT NULL,
  email           TEXT NOT NULL,
  role            TEXT NOT NULL DEFAULT 'operator', -- owner | admin | manager | operator
  site_id         UUID REFERENCES sites(id),
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.4 Table `materials`
```sql
CREATE TABLE materials (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  code            TEXT,
  unit            TEXT NOT NULL DEFAULT 'kg', -- kg | litre | tonne | sac | piece
  type            TEXT NOT NULL, -- matiere_premiere | produit_fini | emballage | consommable
  low_stock_threshold DECIMAL(10,3),
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.5 Table `suppliers`
```sql
CREATE TABLE suppliers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  contact_name    TEXT,
  phone           TEXT,
  email           TEXT,
  address         TEXT,
  region          TEXT, -- région du Burkina Faso
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.6 Table `inventory`
```sql
CREATE TABLE inventory (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  site_id         UUID NOT NULL REFERENCES sites(id),
  material_id     UUID NOT NULL REFERENCES materials(id),
  quantity        DECIMAL(12,3) NOT NULL DEFAULT 0,
  last_updated    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(site_id, material_id)
);
```

### 3.7 Table `inventory_movements`
```sql
CREATE TABLE inventory_movements (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  site_id         UUID NOT NULL REFERENCES sites(id),
  material_id     UUID NOT NULL REFERENCES materials(id),
  type            TEXT NOT NULL, -- entree | sortie | transfert | ajustement
  quantity        DECIMAL(12,3) NOT NULL,
  reference       TEXT, -- numéro de bon, lot, etc.
  supplier_id     UUID REFERENCES suppliers(id),
  notes           TEXT,
  created_by      UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.8 Table `batches`
```sql
-- Lot de production = unité centrale du suivi
CREATE TABLE batches (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  site_id         UUID NOT NULL REFERENCES sites(id),
  batch_number    TEXT NOT NULL, -- généré automatiquement (ex: LOT-2026-001)
  product_id      UUID NOT NULL REFERENCES materials(id), -- produit fini
  status          TEXT NOT NULL DEFAULT 'planifie',
  -- statuts : planifie | en_cours | termine | annule | en_attente_controle
  planned_start   TIMESTAMPTZ,
  actual_start    TIMESTAMPTZ,
  actual_end      TIMESTAMPTZ,
  planned_output  DECIMAL(12,3), -- quantité prévue en sortie
  actual_output   DECIMAL(12,3), -- quantité réelle en sortie
  yield_rate      DECIMAL(5,2), -- calculé : actual_output / sum(inputs) * 100
  notes           TEXT,
  created_by      UUID REFERENCES users(id),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.9 Table `batch_inputs`
```sql
CREATE TABLE batch_inputs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id    UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  material_id UUID NOT NULL REFERENCES materials(id),
  quantity    DECIMAL(12,3) NOT NULL,
  lot_number  TEXT, -- traçabilité
  supplier_id UUID REFERENCES suppliers(id),
  notes       TEXT
);
```

### 3.10 Table `batch_outputs`
```sql
CREATE TABLE batch_outputs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id    UUID NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  material_id UUID NOT NULL REFERENCES materials(id),
  quantity    DECIMAL(12,3) NOT NULL,
  type        TEXT NOT NULL DEFAULT 'produit_fini', -- produit_fini | dechet | sous_produit
  notes       TEXT
);
```

### 3.11 Table `lot_numbers`
```sql
-- Numeros de lot pour la tracabilite export (GlobalG.A.P., bio, fair trade ; EUDR si filiere concernee)
CREATE TABLE lot_numbers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  batch_id        UUID REFERENCES batches(id),
  lot_code        TEXT UNIQUE NOT NULL,
  product_id      UUID REFERENCES materials(id),
  production_date DATE,
  expiry_date     DATE,
  quantity        DECIMAL(12,3),
  status          TEXT DEFAULT 'actif', -- actif | vendu | archive
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.12 Table `alerts`
```sql
CREATE TABLE alerts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  type            TEXT NOT NULL,
  -- stock_bas | rendement_anormal | lot_expire | batch_bloque
  severity        TEXT NOT NULL DEFAULT 'info', -- info | warning | critical
  title           TEXT NOT NULL,
  message         TEXT NOT NULL,
  related_id      UUID, -- ID de l'entité concernée
  related_type    TEXT, -- inventory | batch | lot_number
  is_read         BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 4. Fonctionnalités MVP (Phase 1)

### 4.1 Authentification & Onboarding
- [ ] Inscription organisation (nom, secteur, pays, email)
- [ ] Connexion / déconnexion Supabase Auth
- [ ] Création du profil utilisateur à la première connexion
- [ ] Invitation de membres (admin → manager → operator)
- [ ] Multi-sites : création et gestion des sites

### 4.2 Tableau de bord
- [ ] KPIs temps réel : lots en cours, rendement moyen, alertes actives, tonnes produites
- [ ] Graphique production 30 derniers jours (Recharts LineChart)
- [ ] Tableau des derniers lots avec statut et rendement
- [ ] Indicateur de santé stock (matières premières critiques)

### 4.3 Gestion des lots (Batch Tracking)
- [ ] Création de lot avec numéro automatique (LOT-AAAA-NNN)
- [ ] Saisie des intrants (matières premières + quantités + fournisseurs)
- [ ] Mise à jour du statut (planifié → en cours → terminé)
- [ ] Saisie des extrants (produits finis + déchets + sous-produits)
- [ ] Calcul automatique du rendement
- [ ] Historique complet des lots

### 4.4 Inventaire
- [ ] Catalogue des matières (matières premières, produits finis, consommables)
- [ ] Mouvements d'inventaire (entrée, sortie, ajustement)
- [ ] Stock en temps réel par site
- [ ] Alertes stock bas automatiques
- [ ] Historique des mouvements

### 4.5 Traçabilité (conformité export)
- [ ] Attribution numéros de lot aux batches
- [ ] Lien lot → fournisseur → région d'origine
- [ ] Rapport de traçabilité PDF exportable
- [ ] Tableau de conformité (produits avec/sans traçabilité complète)

### 4.6 Rapports
- [ ] Rapport de production mensuel (PDF)
- [ ] Rapport de rendement par produit
- [ ] Bilan matières (entrées/sorties/pertes)
- [ ] Export CSV pour le banquier / bailleur de fonds

---

## 5. Roadmap

### Phase 1 — MVP Core (Mois 1–3)
**Objectif : First paying customer**
- Authentification multi-tenant
- Tableau de bord avec KPIs
- Batch tracking complet
- Inventaire temps réel
- 2 rapports PDF basiques
- Déploiement Vercel + Supabase
- Test avec 2–3 PME pilotes à Ouagadougou

### Phase 2 — Offline-first + Mobile (Mois 4–6)
**Objectif : Fiabilité terrain**
- Progressive Web App (PWA) installable
- Offline sync via IndexedDB + Service Worker
- Interface opérateur simplifiée (saisie terrain sur tablette)
- Notifications push (alertes stock bas, lot bloqué)
- API mobile (React Native en parallèle)
- Intégration balance connectée (optionnel)

### Phase 3 — Intelligence + Export (Mois 7–12)
**Objectif : Différenciation premium**
- Prédiction de rendement (ML simple sur historique)
- Module conformité export automatisé (format EUDR pour les filières bovine et bois)
- Rapport bankable structuré (format accepté BCEAO / SGBB)
- Multi-devises (FCFA / EUR / USD)
- API publique pour intégration ERP tiers
- Module fournisseurs avancé (scoring, géolocalisation)
- Tableau de bord direction (consolidation multi-sites)

---

## 6. Modèle économique

| Plan | Prix annuel | Limites |
|------|-------------|---------|
| Trial | Gratuit 30j | 1 site, 50 lots/mois |
| Starter | 150 000 FCFA/an | 2 sites, 200 lots/mois |
| Pro | 350 000 FCFA/an | 5 sites, illimité |
| Enterprise | Devis | Illimité + support dédié |

---

## 7. Décisions techniques

### Pourquoi Drizzle ORM et pas Prisma ?
- Build plus rapide (critique pour Vercel Edge)
- Typage natif sans génération de client
- Compatibilité Supabase pooler sans friction

### Pourquoi shadcn/ui ?
- Composants copiés dans le projet (pas de dépendance externe)
- 100% personnalisable à la palette TAAMA
- Accessibilité WCAG intégrée

### Pourquoi pas Odoo / SAP ?
- Coût : 1,5–10M FCFA vs 150 000–350 000 FCFA TAAMA
- Complexité : 70% d'échec d'adoption des ERP en Afrique
- TAAMA est conçu pour des opérateurs terrain avec niveau bac

---

*Document maintenu à jour à chaque sprint.*
*Prochaine révision : Phase 2 kick-off*
