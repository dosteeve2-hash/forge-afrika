# Fusion industrie : TAAMA + MillTrack + Indubot en un seul produit

Statut : plan, aucun code touché. Lu le 10/10/2026 sur les clones locaux (`taama` est un clone superficiel, branche `main`, commit `ba87e5f`). Les trois dossiers existent et ne sont pas vides. Indubot n'a **pas de CLAUDE.md** (ni AGENTS.md) : seule sa `README.md` fait foi. Tout ce qui n'a pas été ouvert est marqué « non vérifié ».

Règles de départ : TAAMA est le produit ; MillTrack et Indubot deviennent des modules ; aucun dépôt supprimé avant reprise de son contenu utile ; aucun chiffre ni donnée inventé repris ; peu d'étapes, car il n'y a aucun client.

## 1. Inventaire factuel

| | **TAAMA** | **MillTrack** | **Indubot Afrika** |
|---|---|---|---|
| Stack | Next.js 16, Supabase SSR, Tailwind v4, shadcn, Recharts | Next.js (v non vérifiée), Supabase importé, Recharts | Next.js 16, better-auth, visx/charts maison, motion |
| Pages réelles | `src/app/(dashboard)/` : dashboard, production, inventaire, catalogue, alertes, tracabilite, parametres (branchées DB) ; commandes, certifications, ventes, analytics, fournisseurs, rapports, parcelles (mock/non branchées, voir ci-dessous) ; publics : `/`, `/tarifs`, `/blog`, `/contact`, `/demo`, `/connexion`, `/inscription` | `app/(dashboard)/` : dashboard, production, broyages, lots, machines, maintenance, stocks, commandes, clients, ventes, rapports ; `app/page.tsx` | `src/app/dashboard/page.tsx` (une seule vue), landing `src/app/page.tsx`, `merci`, `politique-confidentialite`, `api/auth/[...all]` |
| Source de données | **Supabase** : `src/lib/queries.ts` (350 l.), 10 `from()` sur `batches`, `inventory(_movements)`, `materials`, `suppliers`, `sites`, `user_profiles`, `alerts`, `batch_*` ; Server Actions (`production`, `inventaire`, `catalogue`, `dashboard`, `parametres`) | **En dur** (`MOCK_MACHINES`, `MOCK_BROYAGES`, `MOCK_CLIENTS`, `MOCK_LOTS`, `DATA_12_MOIS`…). Seule persistance : `localStorage` pour les commandes (`lib/persistance-locale.ts`) | **En dur** : `src/lib/indubot.ts` (98 l.) ; commentaire du README : données « générées côté client pour la démonstration » |
| Authentification | Supabase `getUser()`, `src/proxy.ts` protège 14 préfixes, limiteur 60 req/min sur `/api` | **Aucune** : `dashboard/page.tsx` contient un `TODO` ; `proxy.ts` = limiteur seul | better-auth configuré (Google/GitHub) **sans base** ; `/dashboard` sans contrôle de session lu |
| Schéma | `supabase/migrations/` : 001 (11 tables + RLS `get_my_org_id()`), 008 `alertes`, 009 `demo_requests`, 010 `leads`, 011 `articles` | Aucun (`supabase/` absent) | Aucun |
| Tests | 11 fichiers `__tests__/` (non exécutés par moi). ETAT.md signale `InventairePage.test.tsx` qui ne se charge pas | 13 fichiers `__tests__/` (persistance, identifiants, quantité, pages) ; non exécutés | 1 test (`format-stat.test.ts`) + `scripts/check-mouvement.mjs` (garde du mouvement réduit) |
| CI | **Aucune** (pas de `.github/`, non vérifié sur GitHub) | `.github/workflows/ci.yml` : lint, tests, build | `.github/workflows/ci.yml` : lint, mouvement réduit, tests, build |
| Fonctionnel vs maquette | Fonctionnel : auth, lots de production (entrées/sorties, QR/PDF `pdfLot.ts`), stocks et mouvements, catalogue matières/fournisseurs, alertes, traçabilité. Maquette : le reste | Maquette complète, mais UI riche et métier minoterie/huilerie | Maquette : vitrine + 1 dashboard de démonstration ; 4 modules sur 5 « à venir » |

Points TAAMA à noter : `commandes/page.tsx` (449 l.) et `inventaire/page.tsx` (591 l.) sont des **maquettes de pharmacie** (« bons de commande · Pharmacie TAAMA », champ `medicament`), sans lien avec l'ERP industriel. `inventaire/InventaireClient.tsx` + `actions.ts` existent à côté : quelle version la route sert réellement est **non vérifié**. `008_alertes.sql` isole par `user_id` (pas par org) et sa table `alertes` fait doublon avec `alerts` (001) : à trancher. Les 11 tables du CLAUDE.md = migration 001.

## 2. Recouvrements et manques

**Déjà couvert par TAAMA, ne pas dupliquer :**
- Lots de production, intrants/extrants, code lot unique, QR et PDF (`production/`, `QRCodeLot.tsx`, `pdfLot.ts`) = les « lots » et la « production » de MillTrack.
- Stocks matières et mouvements avec seuil mini (`inventory`, `inventory_movements`) = `stocks` de MillTrack.
- Fournisseurs et matières (`catalogue/`) ; alertes ; traçabilité ; rapports ; multi-site et multi-tenant.
- Dashboard, tableau d'alertes, KPI : TAAMA a déjà les siens ; ne pas importer les 3 dashboards.

**À reprendre de MillTrack (absent de TAAMA) :**
- **Machines et maintenance** (`machines/MachinesClient.tsx`, `maintenance/page.tsx`, `AlertesMaintenance.tsx`, `PlanningMaintenance.tsx`) : parc machine, statut, heures, prochaine maintenance, interventions préventives/correctives. C'est le vrai manque de TAAMA.
- **Clients et commandes de mouture** (`clients/`, `commandes/`) : la mouture à façon (le client apporte son grain). TAAMA n'a aucun client ni bon de travail.
- **Broyages** (`broyages/page.tsx`) : séance de mouture (céréale, poids entré/sorti) = lot spécialisé ; au schéma, un `batch` avec un type, pas une table à part.
- **Rendement** (kg sortis / kg entrés) : calcul simple sur `batch_inputs/outputs`.
- Utilitaires testés : `lib/identifiants.ts` (CMD-001 suivant), `lib/quantite.ts` (lecture de saisie décimale « 12,5 »), `lib/persistance-locale.ts` (file locale offline ; voir étape 5).
- Spécifique minoterie/huilerie : types de machine (moulin, presse, décortiqueuse, séchoir), céréales (maïs, sorgho, mil, riz, fonio, niébé).

**À reprendre d'Indubot :**
- **Supervision machines** : états, alertes machine, taux d'utilisation (`machines-ring-chart.tsx`), rendement et uptime comme *calculs*, pas comme valeurs.
- Composants de graphiques visx (dossier `src/components/charts/`, ~90 fichiers) : lourd et redondant avec Recharts déjà dans TAAMA. **Non repris par défaut** (voir décision 5).
- `scripts/check-mouvement.mjs` : garde CI du mouvement réduit, utile à TAAMA qui n'a pas de CI.
- Énergie (kWh) : aucune donnée réelle, concept seulement.
- Intégration automate/capteurs : **inexistante** dans le code (README le dit). Pas de reprise.

## 3. Correspondance cible

Modules proposés dans TAAMA (route group `(dashboard)` existant, mêmes préfixes à ajouter dans `PROTECTED_PREFIXES` de `src/proxy.ts`) :

| Module cible | Reçoit | Remplace |
|---|---|---|
| `/machines` (nouveau) | Parc, statut, compteur d'heures, alertes machine (MillTrack machines + Indubot supervision) | `machines/`, dashboard Indubot |
| `/maintenance` (nouveau) | Plan et interventions (MillTrack maintenance) | `maintenance/` |
| `/clients` + commandes de mouture (nouveau) | MillTrack clients, commandes | `clients/`, `commandes/` |
| `/production` (existant) | Option « mouture/pressage » sur le lot, machine utilisée, rendement | `broyages/`, `lots/`, `production/` de MillTrack |
| `/inventaire` (existant) | Rien à ajouter ; remplacer la page pharmacie par `InventaireClient` | `stocks/` |
| `/dashboard` (existant) | Deux cartes : machines en panne, maintenance en retard | dashboards MillTrack et Indubot |

**Tables à ajouter** (migration 012, **non créée**) — toutes avec `ENABLE ROW LEVEL SECURITY` ; la clé tenant est `org_id` (ou `site_id → sites.org_id`) :

- `machines` : id uuid, `org_id` → organizations, `site_id` → sites, name, type (text : moulin, presse, decortiqueuse, sechoir, autre), capacity_kg_h numeric, status (`operational|maintenance|down`), run_hours numeric, created_at. RLS : `org_id = get_my_org_id()`.
- `maintenance_tasks` : id, `machine_id` → machines, kind (`preventive|corrective|inspection|part_replacement`), planned_for date, done_at timestamptz, notes, cost_fcfa integer (pas de décimales), created_by. RLS : `machine_id IN (SELECT id FROM machines WHERE org_id = get_my_org_id())`.
- `customers` : id, `org_id`, name, phone, kind, created_at. RLS : `org_id = get_my_org_id()`.
- `service_orders` (mouture à façon) : id, `org_id`, `customer_id`, `batch_id` nullable, reference (CMD-xxx unique par org), grain material_id, quantity_in_kg numeric, status (`pending|in_progress|ready|delivered|cancelled`), price_fcfa integer, created_at. RLS par `org_id`.
- Colonnes sur `batches` : `machine_id` nullable → machines, `process_type` text nullable (`milling|pressing|…`). Rendement = calcul, jamais stocké.
- Alertes machine : réutiliser `alerts` (001, par org), type `machine`/`maintenance` ; ne pas créer de 3e table d'alertes. `alertes` (008) à fusionner ou retirer : décision 3.
- Monnaie : entiers FCFA, formatage `Intl.NumberFormat('fr-FR')` comme dans CLAUDE.md.

## 4. Ce qu'on NE reprend PAS

- **Toutes les données en dur** : `MOCK_MACHINES`, `MOCK_BROYAGES`, `MOCK_CLIENTS`, `MOCK_LOTS`, `MOCK_MOUTURE`, `COMMANDES_INITIALES`, `CHART_DATA`, `DATA_12_MOIS`, `DATA_CEREALES`, `TOP_CLIENTS`, `OPERATEURS` (noms de personnes) dans `milltrack/app/(dashboard)/**`. Même interdit pour `ventes` et `rapports` de MillTrack (540 l., 100 % chiffres de démo).
- `indubot-afrika/src/lib/indubot.ts` (production, kWh, KPI, alertes AL-10xx) : valeurs inventées. Idem les identifiants « Ligne A/B/C/D ».
- Le front de MillTrack tel quel : styles inline avec couleurs en dur, `new Date('2026-08-10')` figé dans `MachinesClient.tsx` (date factice).
- Côté TAAMA : le back-office pharmacie (`commandes/page.tsx`, `inventaire/page.tsx` et ses tests liés si existants) ; pages mock `certifications`, `parcelles`, `rapports`, `ventes`, `analytics`, `fournisseurs` tant que non branchées (non lues en détail : **non vérifié**).
- Indubot : better-auth sans base (doublon de l'auth Supabase de TAAMA), `src/components/kokonut/*` (logos d'IA, décor), `google-analytics.tsx`, `charts/*` (voir décision 5), la landing (TAAMA a la sienne), `docs/captures/` (captures de la démo fictive).
- MillTrack : `lib/supabase/*` (importé par aucun fichier), configs Sentry non branchées (non vérifié), `pr_body.md`, `.claude/hooks`.

## 5. Ordre d'exécution (S/M/L = effort relatif, sans date)

1. **[S] Assainir TAAMA.** Retirer ou masquer la pharmacie (décision 1) ; relier la route `/inventaire` à `InventaireClient`. *Vérif :* `npm run lint`, `npm run build`, `npm test` à 0 erreur ; plus aucune occurrence de « medicament » / « Pharmacie » (`grep`).
2. **[S] CI sur TAAMA.** Copier le `ci.yml` de MillTrack (lint, tests, build) et `check-mouvement.mjs` d'Indubot. *Vérif :* run vert sur une PR.
3. **[M] Base vivante.** Décision de plateforme (décision 2), puis appliquer 001 + 009–011 ; réconcilier `alertes`/`alerts`. *Vérif :* inscription → création d'une org → un lot de production → visible seulement par cette org (test avec 2 comptes, RLS).
4. **[M] Module Machines + Maintenance** (migration 012 : `machines`, `maintenance_tasks`). Écrans repris de la structure MillTrack, **sans aucune donnée d'exemple** (état vide guidé). *Vérif :* créer une machine, planifier une maintenance, voir l'alerte « en retard » au dashboard ; isolation RLS testée ; états vides testés.
5. **[M] Lot « mouture/pressage » + rendement** : `batches.machine_id`, `process_type`, calcul de rendement ; reprise de `quantite.ts` et `identifiants.ts` avec leurs tests. *Vérif :* tests repris verts ; un lot de test donne le rendement attendu calculé à la main.
6. **[M] Clients + commandes de mouture** (`customers`, `service_orders`), puis file de saisie hors ligne (inspirée de `persistance-locale.ts`) si le terrain l'exige. *Vérif :* commande créée hors ligne puis synchronisée ; aucune commande annoncée « créée » sans enregistrement réel (défaut déjà corrigé dans MillTrack).
7. **[S] Archivage.** Pour chaque dépôt, checklist « repris / écarté + raison » cochée, README renvoyant vers TAAMA, dépôt archivé (jamais supprimé). *Vérif :* checklist signée par Steeve.
8. **[L, optionnel] Supervision temps réel** (capteurs/automates) : seulement si un client réel l'exige. Rien dans les trois dépôts ne le prépare.

## 6. Décisions pour Steeve et risques

1. **Pharmacie TAAMA :** supprimer ces deux pages maquette (oui/non) ? Recommandation : oui, elles n'ont aucun rapport avec l'industrie et mentent sur le produit.
2. **Base de données :** migrer TAAMA vers Neon + Better Auth (doctrine, Règle #16) ou réactiver Supabase ? Choix A (Neon) / B (Supabase).
3. **Alertes :** garder `alerts` (par org) et abandonner `alertes` (par utilisateur) — oui/non ?
4. **Nom et domaine :** le produit fusionné s'appelle-t-il TAAMA ? (oui/non). MillTrack et Indubot gardent seulement une page de renvoi.
5. **Graphiques d'Indubot (visx) :** n'en reprendre aucun, rester sur Recharts — oui/non ?

**Risques :**
- **Base TAAMA** : projet Supabase en pause (ETAT.md), offre gratuite limitée à 2 projets actifs et mise en pause après inactivité : migration vers Neon recommandée par la doctrine ; le schéma part tel quel (Postgres), seuls l'auth et le client changent. Attention : les RLS reposent sur `auth.uid()` de Supabase ; sur Neon il faut reécrire `get_my_org_id()` (ou filtrer côté serveur). Effort réel de l'étape 3 : à réévaluer.
- **Aucun client** : le plan ne doit pas devenir un 12e chantier. Les étapes 1 à 3 apportent seules de la valeur ; s'arrêter après l'étape 4 tant qu'aucun gérant de minoterie n'a parlé (Règle #10, question 6).
- **Faux chiffres** : les trois dépôts ont des données de démo ; une revue `grep` des nombres en dur avant archivage est nécessaire.
- **Perte de contenu** : ne pas archiver avant l'étape 7 ; les captures et le README d'Indubot contiennent le descriptif produit à conserver.
- **Non vérifié** : pages mock de TAAMA non lues, versions exactes de Next/Sentry de MillTrack, exécution des tests et builds, existence de CI TAAMA côté GitHub, utilisation de Vercel/domaines.
