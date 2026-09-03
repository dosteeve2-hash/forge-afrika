# CompTrack — Spécification Produit v1.0
> *FORGE Afrika / Steeve Donald Compaore*
> *Rédigé : Juin 2026*

---

## 1. Contexte & Problème

**CompTrack** (Comptabilité + Track) est un SaaS de comptabilité B2B conçu pour les PME d'Afrique francophone qui opèrent sous le référentiel SYSCOHADA — le Plan Comptable OHADA en vigueur dans 17 États membres d'Afrique de l'Ouest et du Centre.

### Problèmes documentés

| # | Problème | Impact estimé |
|---|----------|---------------|
| P1 | **Comptabilité sur papier/Excel** — > 80 % des PME africaines n'ont pas de logiciel comptable | Erreurs, pertes, fraude invisible |
| P2 | **Logiciels inadaptés** — Sage, QuickBooks ne gèrent pas nativement le SYSCOHADA | Retraitements manuels coûteux |
| P3 | **Barrière prix** — licences Sage = 300 000–2M FCFA/an, inaccessibles aux PME | Exclusion financière |
| P4 | **Multi-devises ignorée** — FCFA, EUR, USD coexistent dans les PME exportatrices | Erreurs de change non détectées |
| P5 | **Déclarations fiscales impossibles** — pas de rapport DGI-compatible sans comptable | Amendes, fermetures |
| P6 | **Accès au crédit bloqué** — les banques exigent des bilans SYSCOHADA certifiables | Financement refusé |

### Secteurs cibles

Commerce import/export · Artisanat · Agroalimentaire · BTP · Services professionnels · Coopératives · ONG locales · Startups formelles

### Zone géographique initiale

Burkina Faso → Sénégal → Côte d'Ivoire → Mali → Togo (dans cet ordre)

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
PDF       : @react-pdf/renderer (bilans, journaux, déclarations)
Export    : xlsx (états financiers Excel), papaparse (CSV)
Deploy    : Vercel (app) + Supabase (backend)
```

### Architecture multi-tenant

```
┌────────────────────────────────────────────────────┐
│                Gestionnaire PME                     │
│                                                     │
│  [Saisie écriture] → [Validation] → [Journal]     │
│          ↓                                          │
│  [Grand Livre] → [Balance] → [Bilan / CPC]        │
└──────────────────────┬─────────────────────────────┘
                        │ Multi-tenant isolation
                        ▼
┌────────────────────────────────────────────────────┐
│               Supabase / Vercel                     │
│                                                     │
│  [PostgreSQL + RLS] → [API REST] → [Dashboard]    │
│  [Storage PDF]      → [Export fiscal]              │
└────────────────────────────────────────────────────┘
```

### Principes clés

- **SYSCOHADA natif** : plan de comptes OHADA préchargé (classes 1 à 8), aucune configuration requise
- **Multi-tenant strict** : isolation par `organization_id` sur toutes les tables via Row Level Security
- **Mobile-first** : interface pensée pour saisie sur smartphone Android (réalité terrain africaine)
- **Offline partiel** : journaux récents mis en cache local, synchronisation à la reconnexion
- **TypeScript strict** : zéro `any`, types générés par Drizzle

---

## 3. Modules Fonctionnels

| Module | Description | Priorité MVP |
|--------|-------------|:------------:|
| **Auth & Onboarding** | Inscription entreprise, profil SYSCOHADA, invitations membres | P0 |
| **Transactions** | Saisie écritures comptables, validation double, journal général | P0 |
| **Grand Livre** | Compte par compte, filtres période, solde cumulatif | P0 |
| **Tableau de bord** | KPIs clés : trésorerie, recettes, dépenses, ratio liquidité | P0 |
| **Rapports SYSCOHADA** | Balance générale, Bilan, CPC (Compte de Produits et Charges) | P1 |
| **Export CSV** | Export journal, grand livre, balance en CSV + Excel | P1 |
| **Multi-devises** | Gestion FCFA / EUR / USD avec taux de change paramétrable | P1 |
| **Export fiscal** | Rapport DGI-compatible, état TVA, liasse fiscale simplifiée | P2 |
| **Clients & Fournisseurs** | Carnet de tiers, suivi créances/dettes, relances | P2 |
| **Intégration TAAMA** | Import automatique coûts de production depuis TAAMA | P3 |

---

## 4. Modèle de Données — Entités Clés

### `JournalEntry` (écriture comptable)

```typescript
interface JournalEntry {
  id: string;                    // UUID
  organization_id: string;       // Multi-tenant isolation
  entry_number: string;          // Ex: ECR-2026-00142 (auto-généré)
  date: Date;                    // Date de l'opération
  description: string;           // Libellé de l'écriture
  currency: "XOF" | "EUR" | "USD";
  exchange_rate: number;         // 1 si XOF, sinon taux BCEAO du jour
  status: "brouillon" | "validee" | "annulee";
  created_by: string;            // user_id
  validated_by?: string;         // user_id du validateur
  validated_at?: Date;
  lines: JournalLine[];          // Minimum 2 lignes (débit/crédit)
}
```

### `JournalLine` (ligne d'écriture — débit ou crédit)

```typescript
interface JournalLine {
  id: string;
  journal_entry_id: string;
  account_id: string;            // Référence compte SYSCOHADA
  label: string;                 // Libellé ligne
  debit: number;                 // Montant débit (FCFA)
  credit: number;                // Montant crédit (FCFA)
}
```

### `Account` (compte SYSCOHADA)

```typescript
interface Account {
  id: string;
  organization_id: string;
  code: string;                  // Ex: "401" (Fournisseurs)
  name: string;                  // Ex: "Fournisseurs - dettes en compte"
  class: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;  // Classes SYSCOHADA
  type: "actif" | "passif" | "charge" | "produit" | "bilan";
  is_system: boolean;            // true = plan OHADA préchargé, false = compte personnalisé
  balance_debit: number;         // Calculé : somme mouvements débit
  balance_credit: number;        // Calculé : somme mouvements crédit
}
```

### Plan SYSCOHADA préchargé

| Classe | Intitulé | Exemples de comptes |
|--------|----------|---------------------|
| **1** | Comptes de ressources durables | 101 Capital, 161 Emprunts |
| **2** | Comptes d'actif immobilisé | 211 Terrains, 241 Matériel |
| **3** | Comptes de stocks | 311 Marchandises, 321 MP |
| **4** | Comptes de tiers | 401 Fournisseurs, 411 Clients |
| **5** | Comptes de trésorerie | 521 Banque, 571 Caisse |
| **6** | Comptes de charges | 601 Achats MP, 661 Intérêts |
| **7** | Comptes de produits | 701 Ventes, 771 Subventions |
| **8** | Comptes de résultat | 891 Résultat net |

> Tous les comptes SYSCOHADA standard sont préchargés à la création de l'organisation. L'utilisateur peut ajouter des sous-comptes personnalisés (ex: 4011 Fournisseur Dramé & Fils).

---

## 5. Numérotation automatique des écritures

```
ECR-{ANNÉE}-{SÉQUENCE_ORG}
Exemple : ECR-2026-00142 (142e écriture de l'organisation en 2026)
```

- Générée côté serveur via séquence PostgreSQL par `organization_id`
- Inalltérable après validation (piste d'audit conforme OHADA)

---

## 6. Modèle Économique

| Plan | Cible | Prix/an (FCFA) | Limites |
|------|-------|---------------|---------| 
| **Trial** | Découverte | Gratuit 30 j | 1 utilisateur · 50 écritures/mois |
| **Solo** | Auto-entrepreneurs, artisans | 60 000 | 1 utilisateur · illimité |
| **PME** | Entreprises 5–50 employés | 150 000 | 5 utilisateurs · exports PDF/CSV illimités |
| **Pro** | PME 50–200 employés + comptable externe | 300 000 | 20 utilisateurs · API accès · support prioritaire |

**ROI clients PME :** Le plan PME à 150 000 FCFA/an coûte moins qu'une heure de comptable agréé par mois. Un seul redressement fiscal évité ou un prêt bancaire obtenu grâce aux états financiers CompTrack = ROI immédiat.

---

## 7. Fonctionnalités Clés — Détail

### 7.1 Module Transactions

- Saisie guidée en 3 étapes : date → comptes → montants
- Suggestion automatique des comptes (historique utilisateur + recherche textuelle)
- Contrôle équilibre débit = crédit avant validation
- Pièce justificative attachable (photo facture smartphone)
- Journal chronologique avec recherche full-text

### 7.2 Tableau de bord

```
┌─────────────────────────────────────────────┐
│  Trésorerie nette    │  Recettes du mois     │
│  1 247 500 FCFA ▲   │  3 450 000 FCFA       │
├─────────────────────────────────────────────┤
│  Dépenses du mois   │  Résultat (30 j)      │
│  2 202 500 FCFA     │  +1 247 500 FCFA ✓   │
├─────────────────────────────────────────────┤
│  Créances clients   │  Dettes fournisseurs  │
│  850 000 FCFA       │  420 000 FCFA         │
└─────────────────────────────────────────────┘
         Graphique évolution 12 mois
```

### 7.3 Rapports SYSCOHADA

- **Balance générale** : tous les comptes avec soldes débit/crédit
- **Bilan** : Actif / Passif au format SYSCOHADA (conforme OHADA)
- **CPC** (Compte de Produits et Charges) : équivalent du compte de résultat
- **Journal général** : toutes les écritures de la période avec numéros

Tous les rapports sont exportables en PDF professionnel (logo entreprise, en-tête) et en Excel.

### 7.4 Multi-devises

- FCFA (XOF) natif — devise principale
- EUR et USD avec taux de change paramétrable (ou auto via API BCEAO)
- Toutes les écritures converties et stockées en FCFA pour la comptabilité officielle
- Rapports de change disponibles pour les PME exportatrices

### 7.5 Export fiscal

- État récapitulatif TVA (mensuel/trimestriel)
- Liasse fiscale simplifiée au format DGI Burkina Faso
- Export clé en main pour le comptable ou expert-comptable externe
- Format structuré compatible avec les logiciels de déclaration fiscale

---

## 8. Performance & Métriques Cibles

| Métrique | Cible |
|----------|-------|
| LCP (First Load) | < 2,5 s sur 3G |
| Disponibilité | > 99,5 % mensuel |
| Génération rapport PDF | < 3 s |
| Export Excel (1000 écritures) | < 5 s |
| Précision calcul balance | ± 0 FCFA (contrôle strict) |
| Support clients PME → Pro | < 4 h réponse |
| Temps d'onboarding (1ère écriture) | < 10 minutes |

---

## 9. Sécurité & Conformité

- **Row Level Security** PostgreSQL : chaque requête filtrée par `organization_id` — un utilisateur ne peut jamais voir les données d'une autre entreprise
- **JWT Supabase Auth** : tokens 1h + refresh sécurisé côté serveur
- **Données en transit** : HTTPS forcé (TLS 1.3 minimum)
- **Piste d'audit immuable** : toute écriture validée est archivée avec horodatage, auteur et hash — conforme aux exigences OHADA d'inaltérabilité
- **Conformité SYSCOHADA** : plan de comptes, états financiers et nomenclatures conformes à l'Acte Uniforme OHADA révisé 2017
- **Chiffrement données sensibles** : données financières chiffrées au repos (AES-256 via Supabase)

---

## 10. Roadmap Immédiate (M1–M8)

| Milestone | Objectif | Délai |
|-----------|----------|-------|
| **MVP Core** | Auth + Transactions + Grand Livre + Balance | M1–M2 |
| **Tableau de bord** | KPIs + graphiques 12 mois | M2–M3 |
| **First Client** | 3–5 PME pilotes à Ouagadougou | M3 |
| **Rapports SYSCOHADA** | Bilan + CPC + export PDF | M3–M4 |
| **Multi-devises** | EUR + USD + taux BCEAO auto | M4–M5 |
| **Export fiscal** | TVA + liasse fiscale DGI | M5–M6 |
| **Clients & Fournisseurs** | Carnet tiers + suivi créances | M6–M7 |
| **ARR 1M FCFA** | 7+ clients payants | M7–M8 |

---

## 11. Connexions Écosystème FORGE Afrika

CompTrack s'intègre nativement avec les autres logiciels FORGE :

| Logiciel | Type de connexion |
|----------|-------------------|
| **TAAMA** | Import automatique des coûts de production (lots, matières, main d'œuvre) |
| **BurkinaCollect** | Import des achats terrain (collecte matières premières) |
| **African Hybrid Agent** *(futur)* | Analyse IA des anomalies financières, prévisions de trésorerie |
| **FORGE Trade** *(Phase 2+)* | Facturation export automatique, reconciliation devises |

> CompTrack est la couche financière de l'écosystème FORGE : il transforme les opérations de production (TAAMA) et de collecte (BurkinaCollect) en données comptables certifiables, permettant aux PME africaines d'accéder au crédit bancaire et aux marchés formels.

---

## 12. Différenciation Concurrentielle

| Critère | CompTrack | Sage Africa | QuickBooks | Odoo |
|---------|:---------:|:-----------:|:----------:|:----:|
| SYSCOHADA natif | ✅ | ⚠️ Partiel | ❌ | ⚠️ Module payant |
| Prix accessible PME (< 200k FCFA/an) | ✅ | ❌ | ❌ | ❌ |
| Interface en français africain | ✅ | ⚠️ | ❌ | ⚠️ |
| Mobile-first (Android) | ✅ | ❌ | ⚠️ | ❌ |
| Intégration ERP africain (TAAMA) | ✅ | ❌ | ❌ | ❌ |
| Multi-devises FCFA/EUR/USD | ✅ | ✅ | ✅ | ✅ |
| Support terrain Burkina Faso | ✅ | ❌ | ❌ | ❌ |

---

*Spécification rédigée en Juin 2026 — FORGE Afrika*
*Auteur : Steeve Donald Compaore — docompaore2@gmail.com*
*Voir aussi : [`taama-spec.md`](./taama-spec.md) · [`burkinacollect-spec.md`](./burkinacollect-spec.md)*
