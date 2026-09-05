# Golden Prompt -- FORGE Afrika

> Reflechis avant de coder. Planifie avant de construire.

## Processus : Research -> PRD -> Phases -> Build

### 1. Research
- Lis les fichiers existants lies a la feature
- Identifie les patterns deja en place
- Verifie les types TypeScript existants

### 2. PRD (Product Requirements Document)
- Objectif de la feature en 1 phrase
- Utilisateurs concernes
- Criteres d'acceptation (max 5)

### 3. Phases
- Phase 1 : Structure (types, interfaces, schema DB)
- Phase 2 : Backend (Server Actions, API routes)
- Phase 3 : Frontend (composants, pages)
- Phase 4 : Tests + Build

### 4. Build
- 1 fichier = 1 responsabilite
- Max 250 lignes par fichier
- npm run build apres chaque phase

## Stack FORGE Afrika

- Next.js 15 App Router + TypeScript strict (0 any)
- Supabase SSR -- getUser() JAMAIS getSession()
- Navy #0A1628 / Gold #D4AF37 / Cyan #00BCD4
- FCFA : new Intl.NumberFormat('fr-FR').format(n) + ' FCFA'

## Anti-patterns interdits

- Coder sans plan
- Fichiers >250 lignes (God File)
- getSession() cote serveur
- any TypeScript
- Secrets dans le code
