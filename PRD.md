# PRD — FORGE Afrika

## Résumé exécutif
FORGE Afrika est la maison mère (QG) de l'écosystème logiciel de Steeve Donald Compaoré : une holding technologique qui construit les outils SaaS dont les PME, coopératives et industriels africains ont besoin pour transformer leurs matières premières sur place plutôt que de les exporter brutes. Ce repo est à la fois la documentation stratégique du groupe (vision, roadmap, manifeste) et la plateforme web (`forge-afrika-hq`) qui présente l'écosystème, ses métriques et sert de dashboard interne.

## Motivation originale
> "Entreprise mère de tous mes projets. QG. Devenir le Rockefeller africain. Stratégie pioche — vendre les outils à ceux qui cherchent de l'or. Développer l'Afrique via les industries, l'entrepreneuriat, le secteur secondaire et tertiaire. 4 phases : production → industrie → monopole → impact continental."
> — Steeve Donald Compaoré

Cette instruction reprend fidèlement ce qui est déjà documenté dans `VISION.md` et `PROJECT.md` : la stratégie de la pioche (analogie NVIDIA/ruée vers l'or), l'objectif "Rockefeller africain" (contrôle de toute la chaîne de valeur plutôt que domination par extraction), et les 4 phases (Logiciels → Industrie de transformation → Secteur primaire → Empire continental).

## Vision et ambition
> *"Ce n'est pas le manque de ressources qui appauvrit l'Afrique. C'est le manque de contrôle sur ce qu'elle fait de ces ressources."* — Steeve Donald Compaore

FORGE Afrika part d'un constat chiffré (documenté dans VISION.md) : la Côte d'Ivoire et le Ghana produisent 65% du cacao mondial mais ne captent que 3-6% de la valeur du marché du chocolat (130 Mds USD) ; l'Éthiopie exporte du café à 0,50-1,50 USD/livre revendu 35-50 USD par Starbucks ; le Burkina Faso exporte du coton brut sans industrie textile nationale. La conviction fondatrice : ce retard est structurel et historique, donc rattrapable — pas une fatalité.

La stratégie ("Ne pas chercher l'or, forger la pioche") consiste à vendre l'infrastructure logicielle à tous les acteurs qui, eux, courent après les matières premières — en s'inspirant de Dangote (intégration verticale), NVIDIA (contrôle de l'infrastructure), Rockefeller (standardisation) et des Tigres Asiatiques (vitesse d'exécution, 25-30 ans pour transformer un pays).

Structure cible à terme (Phase 4, 2042-2050) : cinq branches — **FORGE Tech** (logiciels), **FORGE Agro** (terres, coopératives), **FORGE Industrie** (usines), **FORGE Trade** (export/négoce), **FORGE Capital** (investissement dans des start-ups africaines alliées).

## Problème résolu
Le logiciel comme accélérateur de l'industrialisation africaine, en s'attaquant à 5 problèmes concrets documentés dans VISION.md :
1. **Information asymétrique** — producteurs sans accès aux prix de marché en temps réel.
2. **Absence de traçabilité** — perte de contrats export faute de preuve farm-to-fork.
3. **Gestion artisanale des usines** — pas de suivi stocks/pertes/production.
4. **Accès au financement** — pas de données financières fiables pour les banques.
5. **Pertes post-récolte** — 30-40% de la production alimentaire perdue faute de logistique/traçabilité.

## Utilisateurs cibles
- **PME, coopératives, industriels et exportateurs africains** — utilisateurs finaux des produits de l'écosystème (TAAMA, FORJA, SUGU, CompTrack, etc.), via leurs pages produit dédiées.
- **Investisseurs et partenaires institutionnels** — consultent `/roadmap` et la section investisseurs pour évaluer la trajectoire du groupe.
- **Steeve Donald Compaoré et une future équipe FORGE Tech** — utilisent le dashboard interne (`/dashboard`, protégé par Supabase Auth) pour suivre les KPIs consolidés de l'écosystème.

## Fonctionnalités clés (MVP)
Construites (code présent dans `app/`) :
- **Landing page premium** (`app/page.tsx`) — présentation du groupe, charte Navy/Gold/Cyan.
- **Page Écosystème** (`app/ecosystem/page.tsx`) — grille des 9 produits FORGE avec filtres, statuts (Actif / En développement), métriques par filiale (utilisateurs, transactions, CA) définies dans `lib/constants.ts` (`FILIALES_FORGE`).
- **Page Roadmap** (`app/roadmap/page.tsx`) — les 4 phases (2024-2050) + section investisseurs.
- **Dashboard protégé** (`app/(dashboard)/dashboard/page.tsx`) — KPIs consolidés avec Recharts, accès via `middleware.ts`.
- **Authentification** (`app/auth/login/page.tsx`) — connexion Supabase SSR (`getUser()` côté serveur, jamais `getSession()`).

Documentées mais hors du périmètre applicatif direct (gouvernance stratégique du groupe) :
- Manifeste et principes de la roadmap (`PROJECT.md`, `ROADMAP.md`).
- Checklist de lancement produit (`LAUNCH_CHECKLIST.md`).
- Specs des produits en conception (`docs/agrotrack-bf.md`, `docs/milltrack.md`, `docs/livestock-os.md`, `docs/valuechain-connect.md`).

## Stack technique
```
Frontend    Next.js 15.3.3 (App Router) + React 19 + TypeScript strict
UI          Tailwind CSS + Framer Motion (spring animations)
Auth/DB     Supabase SSR (@supabase/ssr) + PostgreSQL
Charts      Recharts (pattern `mounted` pour éviter les erreurs SSR)
Icons       lucide-react
Déploiement Vercel
```
Charte graphique : Navy `#0A1628`, Gold `#D4AF37`, Cyan `#00BCD4`.

## Intégration écosystème FORGE Afrika
Ce repo *est* le point d'entrée de l'écosystème — il référence et agrège les 8 produits filiales (TAAMA, FORJA, MIFA Life/SUGU, CompTrack, AgroTrack BF, MillTrack, LivestockOS, ValueChain Connect) via `lib/constants.ts`. Le flux de données intégré documenté dans le README :
```
BurkinaCollect / AgroTrack  →  TAAMA / MillTrack  →  CompTrack  →  ValueChain Connect
  (Collecte terrain)            (Production/ERP)      (Comptabilité)   (Marketplace B2B CEDEAO)
```
Chaque produit filiale doit, à terme, remonter ses métriques dans le dashboard FORGE Afrika HQ pour donner une vue consolidée du groupe.

## Feuille de route
### Phase 1 — Les Logiciels (2024–2028) — actuel
Construire l'arsenal technique. Cible : 3 logiciels en production, revenu annuel FORGE > 15 000 USD, réseau de 50+ contacts industrie, 20+ clients cumulés d'ici fin 2028. KPIs Phase 1 (README) : 4 produits en beta, 10 clients pilotes, MRR 500 000 FCFA, présence Burkina Faso / Côte d'Ivoire / Sénégal.

### Phase 2 — Industrie de transformation (2029–2035)
Passer du code au béton : rachat/création d'une première unité de transformation (karité, anacarde, mangue ou textile coton) au Burkina Faso, avec les logiciels FORGE installés dès J+1. Cible : CA groupe > 1M USD, 150-200 emplois directs, capital 2-5M USD.

### Phase 3 — Secteur primaire (2035–2042)
Sécuriser l'approvisionnement en amont : 200-500 hectares, 100+ producteurs intégrés via contract farming non-prédateur (prix garanti = marché + 10%, producteurs restent propriétaires de leurs terres).

### Phase 4 — L'Empire (2042–2050+)
Réplication du modèle dans 5+ pays africains (Mali, Niger, Côte d'Ivoire, Sénégal, Ghana, Togo, Bénin, puis Afrique de l'Est). Structure des 5 branches FORGE opérationnelle. Objectif : un produit "Transformé en Afrique, par des Africains" vendu dans les supermarchés de Paris, Londres, Dubaï, Pékin.

## Métriques de succès
- **Phase 1 (actuel)** : produits en beta, clients pilotes, MRR, pays couverts (voir README §Métriques).
- **Long terme** : ARR du groupe, emplois directs créés, hectares sous contrat, pays avec présence opérationnelle, part de valeur captée localement sur les filières ciblées (cacao, café, coton, karité, anacarde).
- Le manifeste (PROJECT.md) fixe le garde-fou éthique : la réussite se mesure aussi à l'intégration des petits producteurs comme partenaires, pas comme prestataires jetables.

## Contraintes et décisions clés
- **Standards de code obligatoires sur tout l'écosystème** : TypeScript strict (0 `any`), `getUser()` jamais `getSession()` côté serveur, pub/sub Supabase Realtime jamais polling, build 0 erreurs avant chaque PR, commits co-signés `Claude <claude@anthropic.com>`.
- **Principes Karpathy** adoptés comme discipline d'ingénierie : réfléchir avant de coder, simplicité d'abord, modifications chirurgicales, exécution orientée objectif.
- **Sécurité IA** : rate limiting (20 req/utilisateur/heure) sur tout endpoint touchant Anthropic/OpenAI ; jamais concaténer l'input utilisateur dans un system prompt (délimiteurs XML `<user_input>`) ; `SUPABASE_SERVICE_ROLE_KEY` uniquement chiffrée côté Vercel.
- **Choix stratégique documenté** : chaque phase finance la suivante — pas de saut de phase sans base solide (principe explicite de la roadmap).

---
*PRD rédigé par Claude (COO) sur instruction de Steve Donald Compaore (PDG FORGE Afrika)*
*Dernière mise à jour : 2026-07-25*
