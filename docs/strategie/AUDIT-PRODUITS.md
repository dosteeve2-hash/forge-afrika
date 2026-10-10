# Audit — site et produits Forge Afrika

*Octobre 2026. Sources : code de ce dépôt, projets Vercel et Supabase du compte (lus via leurs API), dépôts des produits, audit fichier par fichier du 22/09/2026 (`ambition/ETAT.md`). Rien ici n'est déduit d'un document marketing.*

## 1. Ce que le site V1 affichait de faux

| Où | Affirmation | Réalité | Traitement |
|---|---|---|---|
| Hero, `lib/constants.ts` | « CA consolidé » ≈ 296 M FCFA, utilisateurs par filiale (MIFA 3 400, TAAMA 1 240, CompTrack 890, FORJA 560…) | 0 client, 0 revenu | Supprimé |
| `InvestorSection` | « 10 filiales, 6 en production, 5 000+ utilisateurs actifs, revenus récurrents » | Faux | Section supprimée |
| `/dashboard` | Courbe de 420 à 7 800 utilisateurs, flux « il y a 2 min » | Données codées en dur | Page supprimée → redirection |
| `/performance` | Scores santé/croissance/rétention par filiale | « Scores synthétiques » inventés | Page supprimée |
| `/produits/*` (`lib/marketing.ts`) | Témoignages nommés (« Aminata K., Ouagadougou »…), « premier logiciel », « hébergé en Afrique », « connectez Orange Money », « essai gratuit 30 jours » | Aucun utilisateur, fonctions inexistantes | Remplacé par des fiches factuelles |
| Roadmap | « Partenariats coopératives BF » coché, « 6 filiales en production » coché | Faux | Remplacé par la feuille de route en 6 phases |
| Contact | « Basé entre Ouagadougou et Paris » ; formulaire qui simule un envoi (`setTimeout`) puis affiche « envoyé » | Fondateur à Tokat ; messages perdus | Localisation corrigée ; formulaire → e-mail prérempli réel |
| Liens produits | `taama.vercel.app`, `milltrack.vercel.app`, `forja.vercel.app`, `comptrack.vercel.app`, `duka.vercel.app`, `livestock-os.vercel.app` | **Domaines qui ne sont pas les nôtres** ; les vrais sont `taama-mu`, `milltrack-two`, `forja-pied`, `comptrack-chi`, `duka-kappa`, `livestock-os-ashy` | Corrigé, vérifié dans les projets Vercel |
| Métadonnées | « maison mère qui gouverne 10 filiales » | Pas de société, pas de filiales juridiques | Reformulé |

**Supabase :** le site n'a jamais eu de projet Supabase. L'exemple `.env` parlait d'un « projet FORGE Afrika HQ » qui n'existe pas dans le compte (5 projets : `ueemt-tokat` actif ; `taama`, `mifa-life-db`, `problem to project africa db` et un projet par défaut, tous inactifs). Aucune donnée à nettoyer ici. Le code Supabase mort et la page `/auth/login` ont été retirés. **Rien n'a été supprimé dans une base.**

**Production :** la dernière mise en production date d'août (`d95e692`) ; les fusions sur `master` depuis n'ont pas produit de nouveau déploiement de production. À vérifier dans Vercel après la fusion de cette PR.

## 2. Hiérarchie retenue

```
FORGE AFRIKA — projet de studio technologique (non immatriculé)
├── A. Priorité        LivestockOS
├── B. MVP / dév.      AgroTrack BF · TAAMA · COMBINE (usage interne)
├── C. Prototypes      MillTrack · ValueChain Connect · CompTrack · Indubot Afrika · BurkinaCollect · FORJA · SUGU
└── D. Futur           Logistique du froid
```

**Retirés de la liste des produits Forge** (ne sont pas des produits de l'entreprise) :
- **MIFA Life Shop** — projet d'apprentissage, e-commerce grand public (hors doctrine B2B).
- **UEEMT-Tokat** — plateforme d'une association étudiante. C'est une *réalisation* utile comme référence de services, pas un produit.

Ces deux dépôts restent intacts. Rien n'a été supprimé.

## 3. Fiches

Les fiches complètes (problème, cible, existant, manques, stack, modèle, prochaine étape) sont dans `lib/produits.ts` — source unique, affichée sur `/produits/<slug>`. Résumé :

| Produit | Statut public | Ce qui marche vraiment | Bloquant principal |
|---|---|---|---|
| LivestockOS | MVP | Auth Neon, passeport vérifiable | Registre en localStorage ; 0 utilisateur ; PR tarifs non fusionnée |
| AgroTrack BF | En développement | CI, auth, 2/17 modules en base | Pas de projet base de production ; `/dashboard` en 500 relevé en septembre |
| TAAMA | En développement | Schéma complet, UI auditée | Base Supabase en pause → inutilisable en ligne |
| COMBINE | Usage interne | CI verte, 93 tests | Variables de production non posées |
| MillTrack | Prototype | UI + tests | Ni auth ni base |
| ValueChain Connect | Prototype | UI + auth | Aucune table métier |
| CompTrack | Prototype | UI | Build cassé (`@sentry/nextjs` non déclaré) |
| Indubot Afrika | Prototype | UI + tests | Auth sans base |
| BurkinaCollect | Prototype | File hors ligne | Pas de destination serveur |
| FORJA | Prototype | UI | Tronc rouge (lint, tests), schéma incomplet |
| SUGU | Prototype | Gestion locale hors ligne | Pas de compte ni de sync |
| Logistique du froid | Concept | — | Bloqué volontairement |

## 4. Ce que je n'ai pas pu vérifier

- **Que chaque lien de démo répond aujourd'hui.** Le proxy de ce conteneur bloque `*.vercel.app`. Les domaines sont confirmés par l'API Vercel, pas par un navigateur. → **Ouvrir chaque lien depuis un téléphone avant de partager le site** (Règle #1).
- L'état de LivestockOS après le 27/09 (PR tarifs fusionnée ou non). Le site dit « grille prête dans le code mais pas en ligne » : à corriger si elle a été fusionnée.
