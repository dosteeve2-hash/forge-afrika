# FORJA — Fiche Produit Préliminaire
**SaaS industriel B2B pour les industries de transformation en Afrique de l'Ouest**

*Rédigé le 23 juin 2026 — FORGE Afrika / Steve Donald Compaore*

---

## 1. CONTEXTE : LES INDUSTRIES DE TRANSFORMATION AU BURKINA FASO

### Le secteur en chiffres (2024-2025)
- **389 172 unités économiques** recensées au Burkina Faso en 2024
- **25 269 entreprises créées** en 2025 malgré un contexte sécuritaire difficile
- L'État nationalise et industrialise activement : BRAFASO, SN-CITEC, SOSUCO, MINOFA
- Secteurs clés : agroalimentaire, coton, karité, sésame, brasseries, mines, savonneries, briqueteries

### Acteurs principaux identifiés

| Secteur | Acteurs clés |
|---------|-------------|
| Coton | SOFITEX (Bobo-Dioulasso) |
| Karité / huile végétale | SN-CITEC, OLVEA, coopératives export |
| Brasseries / boissons | SN-BRAFASO (ex-BRAKINA) |
| Agro-transformation | SOFATO (tomate), MINOFA (minoterie), SOSUCO (sucre) |
| Mines & métaux | IAMGOLD, Endeavour Mining, SOPAMIB (État) |
| Céréales / élevage | PME locales, coopératives |

Le karité est le **4e produit d'exportation** du Burkina après l'or, le coton et la viande bovine.
Il soutient ~3 millions de personnes.

---

## 2. LES 5 DOULEURS PROFONDES

### Douleur #1 — Production "à l'aveugle" (Excel/papier omniprésent)

**Ce qui se passe :** 63,3 % des PME africaines gèrent leurs stocks manuellement.
Les écarts entre données enregistrées et stocks réels atteignent en moyenne **22 %**.

**Ce que ça coûte :**
- Ruptures de stock matière première = arrêts de ligne non planifiés
- Surstocks = cash immobilisé (55 % des PME africaines ont 20 %+ de stock excédentaire)
- Pertes post-transformation estimées à **30-40 %** en Afrique subsaharienne, jamais mesurées
- Un responsable ne connaît pas son taux d'extraction réel : 25 % vs 28 % sur 100 t de karité
  = 3 tonnes de matière perdue = plusieurs millions de FCFA évaporés chaque cycle

**Comment ils font aujourd'hui :** Cahiers de bord, Excel non synchronisé, ou rien du tout.


### Douleur #2 — Traçabilité absente = portes de l'export fermées

**Ce qui se passe :** Pour exporter du karité certifié bio/fair trade, du coton UTZ ou du
sésame labellisé, il faut tracer chaque lot jusqu'à sa source (coopérative, village, parcelle).
Sans traçabilité documentée, aucune certification ne peut être vérifiée ni renouvelée.

**Ce que ça coûte :**
- Contrats export perdus faute de preuves documentaires lors des audits
- Recertifications impossibles sans historique structuré des lots
- L'EUDR (EU Deforestation Regulation) s'applique à partir du 30 décembre 2026 pour les moyennes
  et grandes entreprises, et du 30 décembre 2027 pour les micro et petits opérateurs primaires.
  ⚠️ Il ne couvre aujourd'hui que sept matières premières — bovins, cacao, café, huile de palme,
  soja, caoutchouc, bois — **donc ni le karité, ni le sésame, ni l'anacarde, ni le coton**.
  La liste des produits est en cours de révision par la Commission : une extension est possible,
  elle n'est pas acquise. Pour les filières burkinabè, la contrainte réelle vient des acheteurs
  et des certifications (GlobalG.A.P., bio, fair trade), pas de l'EUDR
- OLVEA et quelques grands acteurs ont des systèmes maison. Les PME, non.

**Comment ils font aujourd'hui :** Reconstitution manuelle des données à chaque audit
(3 à 4 semaines de travail, pleines d'erreurs, souvent refusées).

---

### Douleur #3 — ERP existants : trop chers, trop complexes, pas localisés

**Ce qui se passe :** Odoo coûte **1,5 à 10 millions FCFA** juste en implémentation
(hors licences annuelles). SAP est réservé aux multinationales. Sage a une interface
vieillissante et un support limité.

**Ce que ça coûte :**
- Les PME tentent l'implémentation, abandonnent après 3 mois (taux d'échec ~70 % en Afrique)
- Pas de localisation OHADA/SYSCOHADA dans la plupart des solutions importées
- Pas de mode hors-ligne : réseau instable au BF = données perdues
- Support en anglais ou français hors-contexte, pas adapté au terrain

**Comment ils font :** Reviennent à Excel. Parfois paient un ERP qu'ils n'utilisent pas.

---

### Douleur #4 — Rendements non mesurés = argent jeté en silence

**Ce qui se passe :** Une unité de transformation (karité, sésame, tomate) ne mesure pas
son taux de rendement par lot, par machine ou par opérateur.

**Ce que ça coûte :**
- Impossible d'identifier les machines défaillantes ou les shifts inefficaces
- Impossible de négocier avec les fournisseurs sur la base de données réelles de qualité
- 60 % des industriels africains n'ont pas de données de production fiables (Greytrix Africa)
- Les pertes sont "absorbées" dans les coûts sans jamais être documentées ni réduites

**Comment ils font :** Estimation à vue d'œil. Comptage manuel en fin de mois.

---

### Douleur #5 — Reporting impossible = financement bloqué

**Ce qui se passe :** Banques et bailleurs (AFD, BIO, BOAD, investisseurs impact)
exigent des états de production, des comptes d'exploitation détaillés, des KPIs mensuels.

**Ce que ça coûte :**
- 3 à 4 semaines pour reconstituer des données lors d'une demande de crédit
- Données approximatives → banques refusent ou réduisent les lignes de financement
- 80-90 % des PME subsahariennes échouent dans les 5 premières années — l'incapacité
  à produire des données fiables est l'une des causes principales du refus de financement

**Comment ils font :** Le comptable reconstitue tout à la main. Long. Imprécis.

---

## 3. CE QUI EXISTE ET POURQUOI ÇA NE SUFFIT PAS

| Solution | Coût estimé | Problème principal pour BF |
|----------|------------|---------------------------|
| **Odoo** | 1,5–10 M FCFA implémentation | Complexe, pas hors-ligne, peu localisé OHADA |
| **Sage** | Packagé, cher | Interface vieillissante, support limité |
| **SAP Business One** | 20 M+ FCFA | Réservé grandes entreprises |
| **Excel / papier** | Gratuit | Zéro traçabilité, erreurs, non-scalable |
| **ERPs africains (GESCOM, Orion)** | Variable | Pas spécialisés industrie, pas de module traçabilité export |

**Gap identifié :** Aucune solution ne combine :
1. Gestion de production simple adaptée au terrain
2. Traçabilité lot-to-source pour certifications export
3. Prix accessible (< 2 M FCFA/an)
4. Mode hors-ligne natif
5. Localisé pour le contexte Burkina / Afrique de l'Ouest


---

## 4. PROPOSITION DE NOM

### Option A — FORJA ⭐ **[VOTE]**

- **Origine :** "Forge" en espagnol, portugais et catalan — l'endroit où la matière brute
  est transformée par le feu en quelque chose de plus fort
- **Pourquoi ça marche :** Évoque exactement le cœur du produit (transformation industrielle).
  Cohérent avec le projet FORGE Afrika déjà existant. Prononçable en français, anglais,
  espagnol, portugais. 5 lettres, mémorable, pas générique.
- **Domaine :** forja.africa ou forja.app (disponibilité probable)
- **Taglines possibles :**
  - *"FORJA — Forgez votre production"*
  - *"What gets measured, gets made."*
  - *"De la matière première au produit certifié."*

### Option B — FABRIKA

- **Origine :** "Fabrique/usine" en tchèque, bosniaque, arabe translittéré — mot
  international pour usine, immédiatement compréhensible
- **Pourquoi ça marche :** Universel, facile à prononcer partout, sonne startup tech solide
- **Limite :** Moins de consonance africaine, peut sembler générique à terme
- **Domaine :** fabrika.africa ou fabrika.app

### Option C — USINI

- **Origine :** "Usine" + suffixe africain "-ni" (présent en swahili et dans plusieurs
  langues subsahariennes, donne un sens de "lieu de")
- **Pourquoi ça marche :** Francophone, africain, simple, immédiatement contextuel
- **Limite :** Peut sembler trop local, limite l'ambition régionale voire continentale
- **Domaine :** usini.africa

---

**→ VERDICT : FORJA** — cohérence avec FORGE Afrika + imagerie de transformation forte
+ portée internationale (sans besoin de traduction) + 5 lettres mémorables.

---

## 5. FONCTIONNALITÉS MVP (5 priorités absolues)

### F1 — Suivi de lot (Batch Tracking)
- Ouvrir un lot : matières premières entrantes → produit fini sortant
- Calcul automatique du rendement (taux d'extraction)
- Alerte si rendement sous seuil défini
- *Pourquoi c'est le #1 :* résout immédiatement les douleurs #1 et #4

### F2 — Gestion des stocks (Inventory)
- Entrées/sorties de stock en temps réel par site de production
- Alertes de stock minimum configurable
- **Mode hors-ligne natif avec sync différée** (critique pour BF)
- *Pourquoi c'est le #2 :* sans stock fiable, rien d'autre ne marche

### F3 — Traçabilité export (Trace & Prove)
- Lier chaque lot à sa source : fournisseur, coopérative, zone géographique, date
- Générer un certificat de traçabilité PDF par lot, prêt pour audit
- Export CSV structuré pour audits Bio, Fair Trade, UTZ
- *Pourquoi c'est le #3 :* seule feature qui débloque des contrats export immédiatement

### F4 — Tableau de bord production (Dashboard)
- KPIs temps réel : rendement moyen, pertes, volumes produits, lots en cours
- Comparaison shift / équipe / machine / période
- Export rapport mensuel PDF + Excel pour banques et bailleurs
- *Pourquoi c'est le #4 :* résout la douleur #5 (financement)

### F5 — Gestion des commandes clients (Order Lite)
- Enregistrer les commandes en attente, en cours, expédiées
- Lier commande → lots de production utilisés (traçabilité client)
- Base pour facturation future (pas de module compta au MVP)
- *Pourquoi c'est le #5 :* ferme la boucle production-vente

---

## 6. CLIENTS CIBLES

### Segment primaire — MVP
**PMI agroalimentaires au Burkina Faso**
- Unités de transformation : karité, sésame, huile végétale, tomate, céréales, mangue séchée
- Taille : 10 à 200 employés, chiffre d'affaires 100 M – 5 Mds FCFA/an
- Exportent partiellement ou totalement vers Europe ou Asie
- Ont ou cherchent activement des certifications Bio / Fair Trade / RSPO
- Problème aigu documenté : traçabilité pour accès à l'export ou financement

### Segment secondaire — 6 à 18 mois
- Brasseries et boissons (SN-BRAFASO, brasseries régionales)
- Savonneries, briqueteries, huileries
- Extension géographique : Côte d'Ivoire, Sénégal, Mali (contexte identique)

### Segment tertiaire — 18 mois+
- Mines artisanales et semi-mécanisées (traçabilité "conflict-free gold")
- Abattoirs industriels (traçabilité animale)


---

## 7. MODÈLE DE REVENUS

### Tarification SaaS annuelle

| Plan | Cible | Prix/an (FCFA) | Prix/an (EUR) |
|------|-------|----------------|---------------|
| **Starter** | 1 site prod, 5 users, F1+F2 | 600 000 | ~915 € |
| **Growth** | 3 sites, 15 users, F1 à F4 + export traçabilité | 1 500 000 | ~2 290 € |
| **Pro** | Multi-sites illimités, API, audit illimité | 3 000 000 | ~4 575 € |

**Logique de prix :** Le plan Starter = moins d'1 mois de salaire d'un responsable
administratif au BF. ROI immédiat si une seule rupture de stock ou un seul contrat
export est sécurisé grâce au système.

### Revenus additionnels
- **Setup fee :** 150 000 – 500 000 FCFA selon complexité d'onboarding
- **Formation on-site :** 100 000 – 300 000 FCFA (2 jours terrain)
- **Certificats traçabilité PDF :** 10 000 – 25 000 FCFA/certificat (au-delà du quota plan)

### Objectif ARR an 1
10 clients Growth = **15 millions FCFA (~22 900 €)**

---

## 8. CLOUD HOSTING RECOMMANDÉ

### Recommandation principale : Cloudstore.africa (Abidjan)

**Pourquoi :**
- Data centers Tier 3 à Abidjan, Lomé, Douala, Brazzaville
- Latence **20-60 ms** depuis Ouagadougou (vs 150-250 ms pour un serveur européen)
- Hébergement souverain africain → conforme aux réglementations locales
- Déjà compatible stack SaaS (héberge Odoo, Moodle, OwnCloud en natif)
- Tarifs adaptés au marché africain, support en français
- Site : cloudstore.africa

### Alternative montante : AWS Wavelength / Orange Sénégal (Dakar)
- Ultra-faible latence via réseau Sonatel/Orange
- SLA AWS enterprise-grade
- Plus cher mais justifié si scalabilité rapide nécessaire (> 50 clients actifs)

### Architecture recommandée pour le MVP

```
[Users BF / Afrique Ouest]
        ↓
   Cloudflare CDN (DNS + DDoS + cache statique — gratuit)
        ↓
  VPS Cloudstore.africa Abidjan (app Next.js + API Node.js)
        ↓
  PostgreSQL + Redis (même VPS ou VPS dédié Cloudstore)
        ↓
  Backup automatique → OVH France ou Hetzner (€5-10/mois)
```

**Note critique :** Connectivité au BF = aléatoire.
Architecture **PWA (Progressive Web App) avec SQLite WASM local + sync différée** est
non-négociable. Sans ça, le produit ne fonctionnera pas sur le terrain.

---

## 9. STACK TECHNIQUE RECOMMANDÉE

### Frontend
- **Next.js 15** (React) — PWA avec Service Workers pour offline
- **Tailwind CSS** + composants shadcn/ui
- **SQLite (WASM / wa-sqlite)** en local pour fonctionnement hors-ligne complet

### Backend
- **Node.js + Hono** (léger, edge-friendly, parfait pour VPS modeste)
- **PostgreSQL** (base principale)
- **Redis** (cache sessions + file d'attente sync)
- **Prisma ORM** (migrations typées)

### Infrastructure
- **Cloudstore.africa** (Abidjan) — VPS Tier 3 principal
- **Docker + Caddy** (reverse proxy + SSL automatique Let's Encrypt)
- **Cloudflare** (DNS, protection DDoS, CDN assets statiques)
- **GitHub Actions** (CI/CD automatisé)

### Authentification & Multi-tenant
- **Better Auth** (SaaS multi-tenant, open-source)
- **Row-Level Security** PostgreSQL pour isolation stricte des données clients

### Génération de documents
- **Puppeteer** — certificats traçabilité PDF par lot
- **ExcelJS** — exports rapports pour banques et bailleurs

---

## 10. NEXT STEPS IMMÉDIATS

| Semaine | Action | Livrable |
|---------|--------|----------|
| S1 | 5 entretiens terrain PMI au BF (via CCIB ou contacts directs) | Liste des 3 douleurs les plus aiguës confirmées |
| S2 | Wireframes des 3 écrans clés (lot, stock, dashboard) | Maquettes Figma basse fidélité |
| S3-S4 | Prototype MVP (Next.js + Postgres, pas encore offline) | Demo navigateur fonctionnelle |
| M2 | Présentation à 3 entreprises pilotes (karité/sésame en priorité) | 1er feedback terrain documenté |
| M3 | Ajustement tarification + premiers clients payants | Revenu récurrent validé |

**Critères de pivot :** Si après 10 entretiens terrain la douleur #3 (coût ERP) prime sur
la douleur #2 (traçabilité), pivoter sur un angle "ERP simplifié pas cher" plutôt que
"traçabilité d'abord". Laisser le terrain décider.

---

## 11. RÉSUMÉ EXÉCUTIF (10 lignes)

**FORJA** est un SaaS industriel B2B conçu pour les PMI de transformation au Burkina Faso
et en Afrique de l'Ouest. Il résout 5 douleurs documentées : production gérée à l'aveugle,
traçabilité absente qui bloque l'export, ERPs inaccessibles financièrement et techniquement,
rendements non mesurés, et reporting impossible qui ferme l'accès au financement.

63,3 % des PME africaines gèrent encore leurs stocks manuellement, avec des écarts de 22 %
entre stock réel et données enregistrées. Les pertes post-transformation atteignent 30-40 %.
Le karité seul (4e export du BF, ~3 M personnes) ne peut pas prétendre aux certifications
Fair Trade/Bio sans système de traçabilité lot-par-lot.

Le MVP se concentre sur 5 features : suivi de lot, gestion de stocks offline-first,
traçabilité export, dashboard KPIs, et gestion commandes client. Hébergé sur Cloudstore.africa
(20-60 ms de latence depuis Ouagadougou), il vise 10 clients Growth en an 1 pour 15 M FCFA ARR.

Le nom **FORJA** — forge en espagnol/portugais — incarne l'identité du produit :
transformer la matière brute en quelque chose de mesurable, certifiable, exportable.

---

*Fiche rédigée par Claude / FORGE Afrika — 23 juin 2026*

*Sources : L'Économiste du Faso, Horonya Finance, Greytrix Africa (inventory stats),
Cloudstore Africa, AWS/Orange Wavelength (Dakar), Biopartenaire (filière karité),
OLVEA Burkina, 3Vision Group (ERP Africa), Pravda BF (unités économiques 2024)*
