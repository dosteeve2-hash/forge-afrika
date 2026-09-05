# MIFA Life — Spécification Produit v1.0
> *FORGE Afrika / Steeve Donald Compaore*
> *Rédigé : Juin 2026*

---

## 1. Contexte & Problème

**MIFA Life** est une boutique e-commerce premium dédiée à la mode africaine contemporaine — vêtements kente, dashiki, wax revisités — à destination de la diaspora africaine et des clientèles locales exigeantes.

### Vision

> *"La première boutique mode africaine premium pour la diaspora et les locaux"*

MIFA Life repositionne la mode africaine : de l'artisanat invisible à l'expérience d'achat premium, de la création locale au marché mondial, de l'anonymat de l'artisan à son storytelling valorisé.

### Problèmes documentés

| # | Problème | Impact estimé |
|---|----------|---------------|
| P1 | **Mode africaine sous-représentée en ligne** — les plateformes globales (Zalando, ASOS) ignorent presque totalement les créations africaines | Des millions de dollars de CA perdus chaque année pour les artisans |
| P2 | **Manque de confiance pour l'achat en ligne en Afrique** — fraudes fréquentes, pas de garantie retour, interfaces peu rassurantes | Taux d'abandon panier > 70 % sur les boutiques africaines existantes |
| P3 | **Délais de livraison imprécis** — aucun tracking fiable, communication artisans → clients inexistante | Perte de confiance et churn client |
| P4 | **Tailles non adaptées aux morphologies africaines** — les grilles européennes S/M/L/XL ne correspondent pas | Taux de retour élevé, expérience client dégradée |
| P5 | **Pas de storytelling sur les artisans** — les créateurs sont invisibles, l'acheteur ne sait pas d'où vient la pièce | Faible valeur perçue, prix cassés |
| P6 | **Paiement mobile absent** — Wave, Orange Money, MTN MoMo absents des boutiques existantes | Exclusion de 60 %+ des acheteurs africains sans carte bancaire |

### Clientèles cibles

Diaspora africaine (France, Belgique, Canada, USA) · Clientèle locale urbaine Ouagadougou / Dakar / Abidjan · Artisans mode Burkina Faso & Afrique de l'Ouest


---

## 2. Architecture Technique

### Stack

```
Frontend  : Next.js 15 (App Router) + TypeScript strict
Styling   : Tailwind CSS v4 + shadcn/ui
ORM       : Drizzle ORM + Drizzle Kit
Backend   : Next.js Route Handlers + Server Actions
Database  : Supabase (PostgreSQL + Auth + Storage + Realtime)
Images    : Cloudinary (optimisation, transformations, CDN global)
State     : TanStack Query v5
Auth      : Supabase Auth (JWT + RLS)
Paiement  : Stripe (cartes internationales) + Wave API + Orange Money API
Email     : Resend (confirmations commandes, tracking, newsletters)
Deploy    : Vercel (app) + Supabase (backend) + Cloudinary (assets)
```

### Architecture e-commerce

```
┌────────────────────────────────────────────────────┐
│                Acheteur / Visiteur                  │
│                                                     │
│  [Catalogue] → [Produit] → [Panier] → [Checkout]  │
│                                  ↓                  │
│            [Wave / Orange Money / Stripe]           │
└──────────────────────┬─────────────────────────────┘
                        │ Commande confirmée
                        ▼
┌────────────────────────────────────────────────────┐
│          Artisan / Admin Dashboard                  │
│                                                     │
│  [Notification] → [Préparation] → [Expédition]    │
│  [Supabase Realtime] → [Tracking Client]           │
└────────────────────────────────────────────────────┘
```

### Principes clés

- **Mobile-first** : 70 %+ des acheteurs africains sont sur smartphone Android
- **Images optimisées** : Cloudinary pour compression automatique, WebP, CDN global — chargement < 1,5 s sur 3G
- **Paiement multi-rail** : Stripe (diaspora), Wave (Burkina, Sénégal, CI, Mali), Orange Money (7 pays)
- **TypeScript strict** : zéro `any`, types générés par Drizzle
- **Server Components** par défaut — performance maximale sur connexions lentes
- **Row Level Security** : chaque requête filtrée par `user_id` — aucun accès cross-utilisateur


---

## 3. Modules Fonctionnels

| Module | Description | Priorité MVP |
|--------|-------------|:------------:|
| **Catalogue produits** | Listing, filtres (catégorie, tissu, artisan, taille, prix), recherche full-text | P0 |
| **Panier** | Ajout/suppression, persistance session, calcul total + frais de port | P0 |
| **Paiement** | Stripe (carte), Wave, Orange Money — confirmation temps réel + reçu email | P0 |
| **Admin dashboard** | Gestion produits, commandes, artisans, stocks, analytics ventes | P0 |
| **Profil artisan** | Page storytelling — biographie, localisation, galerie créations, histoire du tissu | P1 |
| **Tailles africaines** | Guide interactif adapté morphologies africaines, correspondance EU/UK/US | P1 |
| **Livraison & tracking** | Suivi commande temps réel, notifications SMS/email à chaque étape | P1 |
| **Wishlist** | Liste de souhaits persistante, partage réseaux sociaux, alertes disponibilité | P2 |
| **Reviews** | Avis clients avec photos, système d'étoiles, modération admin | P2 |
| **Newsletter** | Inscription, campagnes segmentées (diaspora / local), nouveautés et offres | P2 |

---

## 4. Modèle de Données — Entités Clés

### `Product` (produit)

```typescript
interface Product {
  id: string;                    // UUID
  artisan_id: string;            // Référence artisan créateur
  name: string;                  // Ex: "Boubou Kente Royal Bleu"
  slug: string;                  // URL-friendly : boubou-kente-royal-bleu
  description: string;           // Description détaillée avec histoire du tissu
  category: "vêtement" | "accessoire" | "chaussure" | "bijou" | "décoration";
  fabric: "kente" | "dashiki" | "wax" | "bogolan" | "faso_dan_fani" | "autre";
  price: number;                 // Prix en FCFA
  price_eur?: number;            // Prix converti pour la diaspora (auto)
  stock: number;                 // Quantité disponible
  images: string[];              // URLs Cloudinary (min. 3 photos, max. 10)
  sizes: AfricanSize[];          // Tailles disponibles avec mesures cm
  tags: string[];                // Ex: ["mariage", "cérémonie", "casual"]
  is_featured: boolean;          // Mis en avant homepage
  is_active: boolean;
  commission_rate: number;       // Taux commission artisan (0.15 à 0.25)
  created_at: Date;
  updated_at: Date;
}
```

### `Order` (commande)

```typescript
interface Order {
  id: string;                    // UUID
  order_number: string;          // Ex: MFL-2026-00142 (auto-généré)
  user_id: string;               // Acheteur (null si guest checkout)
  status: "en_attente" | "confirmee" | "en_preparation" | "expediee" | "livree" | "annulee" | "remboursee";
  items: OrderItem[];            // Produits commandés
  subtotal: number;              // Sous-total FCFA
  shipping_cost: number;         // Frais de port FCFA
  total: number;                 // Total final FCFA
  payment_method: "stripe" | "wave" | "orange_money";
  payment_status: "en_attente" | "paye" | "echoue" | "rembourse";
  payment_reference?: string;    // Référence paiement Wave/Stripe/OrangeMoney
  shipping_address: Address;     // Adresse de livraison complète
  tracking_number?: string;      // Numéro de suivi transporteur
  notes?: string;                // Instructions spéciales client
  artisan_notified_at?: Date;    // Horodatage notification artisan
  created_at: Date;
  updated_at: Date;
}
```

### `CartItem` (article panier)

```typescript
interface CartItem {
  id: string;
  session_id: string;            // Session anonyme ou user_id
  product_id: string;
  product: Pick<Product, "name" | "price" | "images" | "stock" | "artisan_id">;
  size: AfricanSize;
  quantity: number;
  added_at: Date;
}
```

### `User` (acheteur)

```typescript
interface User {
  id: string;                    // UUID Supabase Auth
  email: string;
  full_name: string;
  phone?: string;                // Pour notifications SMS + initiation paiement Wave
  avatar_url?: string;
  country: string;               // "BF" | "SN" | "CI" | "FR" | "BE" | "CA" | ...
  preferred_sizes?: AfricanSize[];  // Tailles habituelles pour recommandations
  addresses: Address[];          // Adresses de livraison sauvegardées
  preferred_payment?: "stripe" | "wave" | "orange_money";
  wishlist_ids: string[];        // IDs produits en wishlist
  newsletter_subscribed: boolean;
  total_orders: number;          // Compteur commandes (calculé)
  created_at: Date;
}
```


---

## 5. Système de Tailles Africaines

L'un des différenciateurs clés de MIFA Life : un guide des tailles conçu pour les morphologies africaines, systématiquement exclues des grilles européennes standard.

```typescript
interface AfricanSize {
  label: "XS-AF" | "S-AF" | "M-AF" | "L-AF" | "XL-AF" | "XXL-AF" | "XXXL-AF";
  chest_cm: [number, number];    // Poitrine min-max en cm
  waist_cm: [number, number];    // Tour de taille min-max
  hips_cm: [number, number];     // Tour de hanches min-max
  eu_equiv?: string;             // Équivalent taille européenne (36, 38...)
  uk_equiv?: string;             // Équivalent taille UK
  us_equiv?: string;             // Équivalent taille US
}
```

Le **guide interactif des tailles** recommande la taille idéale après saisie des mesures personnelles. Résultat attendu : réduction du taux de retour de 70 % à moins de 25 %, meilleure expérience client, valorisation de l'achat.

---

## 6. Numérotation des commandes

```
MFL-{ANNÉE}-{SÉQUENCE}
Exemple : MFL-2026-00142 (142e commande de l'année 2026)
```

- Générée côté serveur via séquence PostgreSQL atomique — pas de collision possible
- Utilisée pour le tracking, les emails de confirmation et les litiges paiement

---

## 7. Modèle Économique

MIFA Life est un modèle B2C à commission artisan — pas d'abonnement pour les acheteurs ni pour les artisans débutants.

| Source de revenus | Taux | Description |
|-------------------|------|-------------|
| **Commission artisan** | 15–25 % | Prélevée sur chaque vente réalisée via la plateforme |
| **Frais de port** | Variable | Facturés à l'acheteur, partiellement reversés au transporteur |
| **Mise en avant premium** | Fixe / mois | Artisans souhaitant apparaître en featured homepage |
| **Partenariats créateurs** | Négocié | Collaborations exclusives avec créateurs africains établis |

> Pas de frais d'inscription, pas d'abonnement. MIFA Life ne gagne que quand l'artisan vend. Les commissions sont dégressives selon le volume : 25 % < 500k FCFA/mois, 20 % entre 500k et 2M, 15 % au-delà.

---

## 8. Modules Paiement — Détail

### 8.1 Stripe (cartes internationales)
- Visa / Mastercard pour la diaspora (France, Belgique, Canada, USA, Royaume-Uni)
- Paiement 3D Secure, webhooks pour confirmation instantanée
- Remboursements automatisés via l'API Stripe en cas d'annulation < 24h

### 8.2 Wave (Afrique de l'Ouest)
- Numéro de téléphone → initiation paiement via Wave API officielle
- Confirmation instantanée < 10 s via webhook Wave
- Pays : Burkina Faso, Sénégal, Côte d'Ivoire, Mali, Guinée

### 8.3 Orange Money
- Paiement via application Orange Money ou USSD
- Confirmation via Orange Money API (webhook)
- Pays : Burkina Faso, Côte d'Ivoire, Mali, Cameroun, Guinée, Madagascar, Niger

### 8.4 Tableau de bord paiements (Admin)

```
┌─────────────────────────────────────────────┐
│  GMV du mois         │  Commissions perçues  │
│  3 450 000 FCFA      │  690 000 FCFA (20%)  │
├─────────────────────────────────────────────┤
│  Commandes payées    │  En attente paiement  │
│  142 commandes       │  8 commandes          │
├─────────────────────────────────────────────┤
│  Wave (55 %)         │  Stripe (30 %)        │
│  Orange Money (15 %) │  Remboursements (2)   │
└─────────────────────────────────────────────┘
```


---

## 9. Performance & Métriques Cibles

| Métrique | Cible |
|----------|-------|
| LCP (First Load catalogue) | < 2,5 s sur 3G |
| Disponibilité | > 99,5 % mensuel |
| Chargement image produit (mobile 3G) | < 1,5 s (Cloudinary WebP + lazy load) |
| Taux de conversion catalogue → panier | > 8 % |
| Taux d'abandon panier | < 40 % (vs. > 70 % industrie africaine) |
| Délai confirmation paiement Wave | < 10 s |
| Délai notification artisan (commande) | < 60 s |
| Support acheteur (ticket) | < 4 h réponse |
| Temps d'onboarding artisan | < 30 minutes |
| Taux de retour commandes | < 25 % (grâce au guide tailles) |

---

## 10. Sécurité & Conformité

- **Row Level Security** PostgreSQL : données clients, commandes et adresses isolées par `user_id`
- **JWT Supabase Auth** : tokens 1h + refresh sécurisé côté serveur
- **HTTPS forcé** : TLS 1.3 minimum, certificat auto-renouvelé via Vercel
- **Stripe PCI DSS Level 1** : MIFA Life ne stocke jamais les données carte — délégation totale à Stripe
- **Wave / Orange Money** : intégration via APIs officielles certifiées, aucun stockage de credentials
- **Données personnelles** : conformité RGPD pour les résidents UE (diaspora) + loi n°010-2004 sur la protection des données personnelles au Burkina Faso
- **Images artisans** : droits vérifiés à l'onboarding, clause contractuelle anti-plagiat signée électroniquement
- **Fraude commandes** : détection via Stripe Radar, liste noire emails/IPs, vérification numéro de téléphone Wave

---

## 11. Roadmap M1–M6

| Milestone | Objectif | Délai |
|-----------|----------|-------|
| **MVP** | Catalogue + Panier + Paiement (Stripe + Wave) + Admin basique | M1–M2 |
| **First Sales** | 10 artisans onboardés, 50 premières commandes validées | M2–M3 |
| **Growth** | Profils artisans + Reviews + Guide tailles + Orange Money | M3–M4 |
| **Rétention** | Wishlist + Newsletter + Programme fidélité early adopters | M4–M5 |
| **Scale** | PWA installable + livraison express Ouagadougou J+1 | M5–M6 |
| **GMV cible M6** | 5M FCFA de ventes mensuelles, 50+ artisans actifs, 500+ clients | M6 |

---

## 12. Connexions Écosystème FORGE Afrika

MIFA Life s'intègre nativement avec les autres logiciels FORGE :

| Logiciel | Type de connexion |
|----------|-------------------|
| **CompTrack** | Export automatique des ventes et commissions vers la comptabilité SYSCOHADA |
| **African Hybrid Agent** *(futur)* | Recommandation produits IA, prédiction tendances mode, détection fraudes |
| **FORGE Trade** *(Phase 2+)* | Marketplace B2B export — grossistes internationaux et boutiques africaines diaspora |

> MIFA Life est la vitrine grand public de l'écosystème FORGE : elle génère des revenus B2C immédiats et constitue le laboratoire de l'expérience utilisateur pour les futurs produits de la holding.

---

## 13. Différenciation Concurrentielle

| Critère | MIFA Life | Jumia Fashion | Amazon | Etsy |
|---------|:---------:|:------------:|:------:|:----:|
| Mode africaine premium exclusive | ✅ | ⚠️ Généraliste | ❌ | ⚠️ Mixte |
| Tailles adaptées morphologies africaines | ✅ | ❌ | ❌ | ❌ |
| Wave / Orange Money | ✅ | ✅ | ❌ | ❌ |
| Storytelling artisan intégré | ✅ | ❌ | ❌ | ⚠️ Partiel |
| Commission éthique (15–25 %) | ✅ | ❌ (marges > 40 %) | ❌ | ⚠️ (6,5 % + frais) |
| Interface mobile-first francophone | ✅ | ⚠️ | ❌ | ❌ |
| Livraison locale Ouagadougou J+1 | ✅ (M6) | ✅ | ❌ | ❌ |
| Intégration comptabilité africaine | ✅ (CompTrack) | ❌ | ❌ | ❌ |

---

*Spécification rédigée en Juin 2026 — FORGE Afrika*
*Auteur : Steeve Donald Compaore — docompaore2@gmail.com*
*Voir aussi : [`taama-spec.md`](./taama-spec.md) · [`comptrack-spec.md`](./comptrack-spec.md)*
