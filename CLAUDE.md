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
