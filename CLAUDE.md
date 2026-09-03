# FORGE Afrika HQ — Instructions Claude

## Vision
FORGE Afrika est l'**entreprise mère** (le QG) d'un groupe de filiales technologiques panafricaines.
Ce site est le centre de commande : il doit refléter la structure holding → filiales, jamais un produit isolé.
Chaque décision technique doit servir la vision : bâtir quelque chose qui dure 100 ans.

## Stack
- **Next.js 15 App Router** + TypeScript strict (0 `any`)
- **Supabase SSR** : TOUJOURS `getUser()`, JAMAIS `getSession()` (sécurité serveur)
- **Framer Motion** : `type: 'spring' as const` pour éviter les erreurs TypeScript
- **Charte graphique** : Navy `#0A1628`, Gold `#D4AF37`, Cyan `#00BCD4`
- **Montants FCFA** : `new Intl.NumberFormat('fr-FR').format(n) + ' FCFA'`
- **Recharts** : pattern `mounted` avec `useState` pour éviter les erreurs SSR

## Filiales de l'écosystème
Source de vérité : `lib/constants.ts` → `FILIALES_FORGE`.

| Filiale | Secteur | Statut |
|---------|---------|--------|
| SUGU | Retail | Actif |
| MIFA Life | E-commerce | Actif |
| TAAMA | Industrie | Actif |
| CompTrack | Finance | Actif |
| FORJA | Agriculture | Actif |
| UEEMT-Tokat | Communauté | Actif |
| AgroTrack BF | Agriculture | En développement |
| MillTrack | Industrie | En développement |
| LivestockOS | Élevage | En développement |
| ValueChain Connect | Commerce | En développement |

## Structure du projet
```
app/
  page.tsx              # Landing page QG — hero, filiales, organigramme, vision
  ecosystem/page.tsx    # Grille des 10 filiales + filtres
  roadmap/page.tsx      # 4 phases + section investisseurs
  (dashboard)/
    layout.tsx
    dashboard/page.tsx  # KPIs + Recharts + sidebar
  auth/login/page.tsx   # Connexion Supabase
lib/
  constants.ts          # Données filiales (FILIALES_FORGE), phases, helpers
  supabase/
    client.ts           # Client browser
    server.ts           # Client server (SSR)
middleware.ts           # Protection /dashboard
```

## Règles obligatoires
1. `npm run build` DOIT passer avec **0 erreurs** avant chaque commit
2. `Co-authored-by: Claude <claude@anthropic.com>` dans chaque commit message
3. Pub/sub Supabase Realtime — **JAMAIS de polling**
4. Les `"use client"` sont UNIQUEMENT pour les composants avec hooks/animations
5. Server Components par défaut, Client Components si nécessaire

## Variables d'environnement requises
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Commandes
```bash
npm run dev    # Développement
npm run build  # Build de production (doit être 0 erreurs)
npm run lint   # Lint ESLint
```

## Principes Karpathy

> Andrej Karpathy (ex-Tesla AI / OpenAI) sur comment coder avec l'IA.

### 1. Reflechis avant de coder
Ne genere pas de code immediatement. Quel est le vrai probleme ? Quelle est la solution la plus simple ?

### 2. Simplicite d'abord
Le meilleur code est celui qui n'existe pas. Prefere 50 lignes claires a 200 lignes "intelligentes".

### 3. Modifications chirurgicales
Ne reecris pas ce qui fonctionne. Identifie le changement minimal qui resout le probleme.

### 4. Execution orientee objectif
Garde l'objectif final en vue. Livre quelque chose qui fonctionne, ameliore ensuite.

## Regles IA -- Securite

### Rate Limiting endpoints IA
Tout endpoint touchant Anthropic/OpenAI doit avoir un rate limit.
Max 20 requetes/utilisateur/heure.

### Protection injection de prompt
Ne jamais concatener l'input utilisateur dans un system prompt.
Utiliser des delimiteurs XML : <user_input>${userText}</user_input>

### Variables d'environnement
- .env.local JAMAIS commite (dans .gitignore)
- SUPABASE_SERVICE_ROLE_KEY : chiffre dans Vercel, jamais dans le code

### Authentification Supabase
- getUser() TOUJOURS cote serveur
- getSession() JAMAIS cote serveur
- Valider l'utilisateur dans chaque Server Action

---

## Le volet stratégique du dépôt

Ce dépôt porte **deux choses** : le site du QG (code ci-dessus) **et** les documents
stratégiques de FORGE Afrika. Les deux vivent ensemble — ne pas traiter les `.md`
stratégiques comme de la documentation technique.

| Fichier | Rôle |
|---------|------|
| `AMBITIONS.md` | **Document maître** — les 6 ambitions, l'inventaire complet des projets et leur statut réel, les décisions à trancher. Commencer par là |
| `PROJECT.md` · `VISION.md` · `ROADMAP.md` | Stratégie, philosophie, calendrier 2024-2050 |
| `LOGICIELS/` | Specs et briefs produits (un fichier par produit) |
| `CAPITAL/` | Stratégie de financement et d'investissement |
| `COMMERCIAL/` | Prospection, argumentaires, scripts d'appel |
| `RECHERCHE/` | Textes fondateurs, notes de terrain |

### Règles d'écriture stratégique

1. **Tout s'écrit en français.** Ton direct, factuel, sans flatterie — Steve demande des avis
   francs, les donner.
2. **La règle d'or : un produit à la fois.** Avant de proposer une idée nouvelle, la situer face
   à TAAMA. Si elle disperse, le dire.
3. **Ne jamais gonfler un statut.** Un scaffold est un scaffold ; un produit l'est quand
   quelqu'un le paie.
4. **Vérifier avant d'affirmer.** Réglementation, chiffres de marché, état de l'art : chercher,
   sourcer, dater.
5. **Signaler le juridique.** Tout ce qui touche à l'argent d'autrui, à la collecte d'épargne ou
   à l'investissement relève du CREPMF (UEMOA) ou de la BCEAO.
6. **Contraintes africaines non négociables** dans toute spec produit : offline-first,
   mobile-first, Android entrée de gamme, mobile money, multilinguisme, légèreté.

### Nouvelle spec produit

`LOGICIELS/<nom>-spec.md` avec : problème résolu · solution · contraintes africaines · stack ·
marché cible · modèle de revenus · concurrents · risques · roadmap MVP · avis franc sur la
priorisation. Puis mettre à jour `LOGICIELS/idees-produits.md`, `README.md` et `AMBITIONS.md`.
