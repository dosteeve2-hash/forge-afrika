# MillTrack

> Suivi de production pour usines de transformation — minoteries, huileries, égrenage.

[![Status](https://img.shields.io/badge/Status-Conception-0A1628?style=flat-square&labelColor=0A1628&color=00BCD4)](.)
[![Stack](https://img.shields.io/badge/Stack-Next.js%2015%20%2B%20Supabase-D4AF37?style=flat-square&labelColor=0A1628)](.)

---

## 🎯 Vision

Les usines de transformation africaines — minoteries, huileries de karité, unités d'égrenage — tournent sans données. Combien de tonnes sont entrées ? Quel est le rendement réel de la chaîne ? Où part la perte ? MillTrack répond à ces questions en temps réel, sans expertise ERP préalable.

---

## 🏭 Problème résolu

Une minoterie traitant 500 tonnes/mois de maïs burkinabè ne sait généralement pas :

- Son **rendement exact** par ligne de production (pertes invisibles = profits perdus)
- Ses **coûts réels** par lot transformé
- L'**état de ses machines** avant la panne (maintenance réactive = arrêts coûteux)
- La **traçabilité** de ses matières premières pour les acheteurs qui l'exigent
- Son **bilan production** mensuel sans semaines de saisie manuelle

**Résultat :** des marges sous-optimisées, des pertes non détectées, des certifications inaccessibles.

---

## ⚙️ Fonctionnalités clés

### Suivi production temps réel
- Enregistrement des entrées (matières premières) et sorties (produits finis, sous-produits, déchets)
- Calcul automatique du taux de transformation et des pertes par ligne
- Tableau de bord production quotidien/hebdomadaire/mensuel

### Gestion des lots
- Traçabilité complète : fournisseur → stockage → transformation → produit fini → client
- QR code par lot pour scan en entrepôt
- Certifications export (EUDR uniquement si la filière est couverte)

### Gestion des stocks
- Inventaire temps réel matières premières et produits finis
- Alertes réapprovisionnement automatiques
- Valorisation des stocks (CUMP)

### Maintenance préventive
- Planning maintenance par machine
- Historique des pannes et interventions
- Calcul du coût maintenance par tonne produite

### Comptabilité production
- Coût de revient par lot et par produit
- Intégration CompTrack pour la comptabilité générale
- Rapport mensuel exploitants en un clic

---

## 🛠️ Stack

```
Frontend    → Next.js 15 (App Router) + TypeScript strict + Tailwind
UI          → shadcn/ui + recharts (dashboards production)
Auth        → Supabase SSR (getUser())
Database    → Supabase PostgreSQL + Realtime (alertes live)
Storage     → Supabase Storage (documents, photos lots)
Analytics   → PostHog (usage patterns opérateurs)
Deployment  → Vercel
```

---

## 👥 Cible client

- Minoteries (maïs, sorgho, mil) — marché de 80+ unités au BF
- Huileries karité et sésame
- Unités d'égrenage coton (SOFITEX, GPC)
- Rizeries et décortiqueuses
- Unités de transformation fruits & légumes (tomate, oignon)

**Taille de marché BF :** ~300 unités de transformation agro-industrielle recensées. Extension CEDEAO : Côte d'Ivoire, Sénégal, Mali.

---

## 📈 Métriques de succès

| Métrique | Cible 12 mois |
|----------|---------------|
| Usines pilotes | 3 |
| Lots tracés/mois | 500 |
| Réduction pertes non détectées | -30% |
| MRR | 200 000 FCFA |
| Temps rapport mensuel | < 30 min (vs 2 semaines) |

---

## 🗓️ Roadmap

- **Q4 2026** — Spec technique + UX research 3 minoteries
- **Q1 2027** — Développement MVP (entrées/sorties + traçabilité)
- **Q2 2027** — Pilote avec 1 minoterie partenaire Ouaga
- **Q3 2027** — Lancement beta public + intégration CompTrack

---

*Partie de l'écosystème [FORGE Afrika](../README.md)*
