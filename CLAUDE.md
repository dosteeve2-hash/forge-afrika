# CLAUDE.md — Guide de travail pour ce dépôt

## Ce qu'est ce dépôt

`forge-afrika` est le **quartier général stratégique** de FORGE Afrika, le projet de vie de
Steve Donald Compaoré (étudiant burkinabè en génie informatique à Tokat, Turquie) :
contrôler une chaîne de valeur africaine complète, du logiciel industriel à la transformation
des matières premières, sur l'horizon 2024-2050.

**⚠️ Ce dépôt ne contient pas de code applicatif.** C'est un dépôt de documents stratégiques.
Le code vit dans les dépôts produits (`taama`, `agrotrack-bf`, `forja`, etc.).
N'y ajoute pas de scaffold, de `package.json` ni de dossier `src/`.

## Carte des documents

| Fichier | Rôle |
|---------|------|
| `AMBITIONS.md` | **Document maître** — toutes les ambitions, tous les projets, l'inventaire complet des dépôts. Commence toujours par là |
| `PROJECT.md` | Stratégie globale, les 4 phases, analogies NVIDIA / Dangote / Rockefeller |
| `VISION.md` | Philosophie, analyse de la chaîne de valeur, leçons historiques |
| `ROADMAP.md` | Timeline 2024-2050, KPIs par phase |
| `LOGICIELS/` | Specs et briefs produits (un fichier par produit) |
| `CAPITAL/` | Stratégie de financement et d'investissement |
| `RECHERCHE/` | Textes fondateurs, notes de terrain |
| `NOTES/` | Notes de travail (non versionnées) |

## Langue et style

- **Tout s'écrit en français.** Les termes techniques restent en anglais quand c'est l'usage
  (offline-first, SaaS, carried interest).
- Ton **direct, factuel, sans flatterie**. Steve demande des avis francs — les donner.
- Structure : titres avec émoji, tableaux comparatifs, blocs `>` pour ce qui doit rester en tête.
- Chiffres sourcés et datés. Une affirmation invérifiable vaut mieux non écrite.
- Devise : **FCFA/XOF** pour l'Afrique de l'Ouest, USD ou EUR pour l'international. Préciser.

## Règles de fond

1. **La règle d'or du dépôt : un produit à la fois.** Avant de proposer une idée nouvelle,
   vérifier où elle se place face à TAAMA. Si elle disperse, le dire.
2. **Toujours dire le vrai sur la priorisation.** Une bonne idée mal chronométrée est un piège ;
   classer honnêtement (🔴 maintenant / 🟠 engagement / 🔵 gelé) plutôt que d'encourager.
3. **Vérifier avant d'affirmer.** Réglementation, chiffres de marché, état de l'art technique :
   chercher, sourcer, dater. Ce dépôt sert à décider — une donnée fausse coûte cher.
4. **Signaler le juridique.** Tout ce qui touche à l'argent d'autrui, à la collecte d'épargne ou
   à l'investissement relève du CREPMF (UEMOA) ou de la BCEAO. Le rappeler, sans jouer l'avocat.
5. **Contraintes africaines non négociables** dans toute spec produit : offline-first,
   mobile-first, Android entrée de gamme, mobile money (Orange/Moov/MTN/Wave), multilinguisme
   (français, mooré, dioula, bambara), légèreté (< 15 Mo).
6. **Ne jamais gonfler un statut.** Un scaffold est un scaffold ; un produit est un produit
   quand quelqu'un le paie.

## Conventions d'écriture des specs produit

Un nouveau produit se documente dans `LOGICIELS/<nom>-spec.md` avec, au minimum :
problème résolu · solution · contraintes africaines · stack · marché cible · modèle de revenus ·
concurrents · risques · roadmap MVP · avis franc sur la priorisation.

Puis **trois mises à jour obligatoires** :
`LOGICIELS/idees-produits.md` (entrée + tableau récapitulatif), `README.md` (tableau produits +
arborescence), et `AMBITIONS.md` (inventaire).

## Git

- Branche de travail : celle qui est assignée à la session ; jamais de push direct sur `main`.
- Messages de commit en français, format `docs: <objet>` (ce dépôt est documentaire).
- Une PR par sujet, en brouillon, avec un corps qui résume les décisions — pas seulement les fichiers.

## Contexte personnel utile

- Basé à **Tokat, Turquie** — études en cours ; marché cible : **Burkina Faso** et UEMOA.
- Travaille **seul** sur FORGE, sauf **Mifa Life** (équipe de 11 étudiants maliens, il est lead tech).
- Pas encore de capital ni de client payant : toute recommandation doit tenir dans un budget
  proche de zéro et des soirées d'étudiant.
