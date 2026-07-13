# FORGE Afrika HQ — Instructions Claude

## Vision
Plateforme centrale de l'écosystème FORGE Afrika — conglomérat industriel panafricain.
Chaque décision technique doit servir la vision : bâtir quelque chose qui dure 100 ans.

## Stack
- **Next.js 15 App Router** + TypeScript strict (0 `any`)
- **Supabase SSR** : TOUJOURS `getUser()`, JAMAIS `getSession()` (sécurité serveur)
- **Framer Motion** : `type: 'spring' as const` pour éviter les erreurs TypeScript
- **Charte graphique** : Navy `#0A1628`, Gold `#D4AF37`, Cyan `#00BCD4`
- **Montants FCFA** : `new Intl.NumberFormat('fr-FR').format(n) + ' FCFA'`
- **Recharts** : pattern `mounted` avec `useState` pour éviter les erreurs SSR

## Produits de l'écosystème
| Produit | Secteur | Statut |
|---------|---------|--------|
| TAAMA | Agriculture | Actif |
| MIFA Life | E-commerce | Actif |
| FORJA | Industrie | Actif |
| CompTrack | Finance | Actif |
| AgroTrack BF | Agriculture | Actif |
| MillTrack | Industrie | Actif |
| LivestockOS | Élevage | Actif |
| ValueChain Connect | Commerce | Actif |
| FORGE Afrika HQ | Plateforme | En cours |

## Structure du projet
```
app/
  page.tsx              # Landing page premium
  ecosystem/page.tsx    # Grille 9 produits + filtres
  roadmap/page.tsx      # 4 phases + section investisseurs
  (dashboard)/
    layout.tsx
    dashboard/page.tsx  # KPIs + Recharts + sidebar
  auth/login/page.tsx   # Connexion Supabase
lib/
  constants.ts          # Données produits, phases, helpers
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
