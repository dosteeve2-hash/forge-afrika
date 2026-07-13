# AgroTrack BF

> Gestion de coopératives agricoles — offline-first, conçu pour le terrain burkinabè.

[![Status](https://img.shields.io/badge/Status-Conception-0A1628?style=flat-square&labelColor=0A1628&color=00BCD4)](.)
[![Stack](https://img.shields.io/badge/Stack-Next.js%2015%20%2B%20Supabase-D4AF37?style=flat-square&labelColor=0A1628)](.)

---

## 🎯 Vision

Les coopératives agricoles du Burkina Faso gèrent des centaines de membres, des milliers de tonnes de produits et des flux financiers complexes — le tout sur des cahiers, sans internet, sous 40°C. AgroTrack BF numérise ce travail sans exiger une connexion permanente.

---

## 🚜 Problème résolu

Les coopératives coton, sésame et karité du Burkina perdent de l'argent à chaque étape faute d'outils :

- **Pesée et collecte** : pas de traçabilité → pertes, fraudes, litiges membres
- **Paiements membres** : calculs manuels → erreurs, retards, méfiance
- **Stocks** : inventaires approximatifs → sur-vente ou sous-utilisation
- **Rapports bailleurs** : données dispersées → semaines de travail pour un rapport
- **Certifications bio/fair-trade** : documentation insuffisante → revenus premium perdus

---

## ⚙️ Fonctionnalités clés

### Gestion des membres
- Enregistrement membres avec photo, localisation GPS parcelle, historique livraisons
- Carte de membre digitale (QR code) pour identification rapide au point de collecte
- Historique complet livraisons, paiements, avances par membre

### Collecte & pesée terrain
- Saisie offline (PWA) — synchronisation automatique dès que le réseau revient
- Bon de livraison numérique avec signature membre
- Calcul automatique du prix par qualité et par variété

### Gestion des stocks
- Suivi en temps réel : quantité par entrepôt, qualité, humidité
- Alertes seuils critiques
- Traçabilité lot → membre (pour certifications)

### Comptabilité coopérative
- Calcul automatique des acomptes et soldes membres
- Gestion des intrants à crédit (semences, engrais)
- Rapport financier saison en un clic

### Certifications & export
- Génération automatique des rapports de traçabilité (EUDR, bio, fair-trade)
- Export CSV/PDF pour les acheteurs et bailleurs

---

## 🛠️ Stack

```
Frontend    → Next.js 15 (PWA offline-first) + TypeScript + Tailwind
Auth        → Supabase SSR (getUser())
Database    → Supabase PostgreSQL + sync offline avec IndexedDB
Storage     → Supabase Storage (photos membres, documents)
Mobile      → PWA installable + React Native (v2)
Deployment  → Vercel
```

---

## 👥 Cible client

- Coopératives cotonnières (SOFITEX zone, GPC)
- Coopératives sésame et karité (FIAB, Bagrépôle)
- Unions de coopératives (UGCPA, FASONUT)
- ONGs et projets agricoles nécessitant suivi terrain

**Taille de marché BF :** ~1 200 coopératives recensées, dont ~400 avec >50 membres actifs.

---

## 📈 Métriques de succès

| Métrique | Cible 12 mois |
|----------|---------------|
| Coopératives pilotes | 5 |
| Membres enregistrés | 2 000 |
| Livraisons tracées | 50 000 |
| MRR | 150 000 FCFA |
| Réduction erreurs paiement | -80% |

---

## 🗓️ Roadmap

- **Q3 2026** — Spec technique complète + wireframes
- **Q4 2026** — Développement MVP (collecte + membres)
- **Q1 2027** — Pilote avec 2 coopératives partenaires
- **Q2 2027** — Lancement beta public

---

*Partie de l'écosystème [FORGE Afrika](../README.md)*
