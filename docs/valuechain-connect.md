# ValueChain Connect

> Marketplace B2B producteurs ↔ transformateurs — connecter la chaîne de valeur CEDEAO.

[![Status](https://img.shields.io/badge/Status-Conception-0A1628?style=flat-square&labelColor=0A1628&color=00BCD4)](.)
[![Stack](https://img.shields.io/badge/Stack-Next.js%2015%20%2B%20Supabase-D4AF37?style=flat-square&labelColor=0A1628)](.)

---

## 🎯 Vision

Un producteur de sésame à Dori ne sait pas que l'huilerie de Bobo cherche exactement sa qualité de grain. Un transformateur de Dakar cherche du karité certifié équitable mais ne sait pas à qui s'adresser au Burkina. ValueChain Connect est le marché numérique qui connecte ces acteurs — en direct, sans intermédiaires, avec la traçabilité intégrée.

---

## 🔗 Problème résolu

La chaîne de valeur agricole CEDEAO est fragmentée par un problème d'information :

- **Producteurs** : vendent localement à bas prix faute d'accès aux acheteurs industriels
- **Transformateurs** : approvisionnement incertain, coûts logistiques élevés, qualité variable
- **Intermédiaires** : captent 30-50% de la marge sans créer de valeur
- **Exportateurs** : documentation et certifications trop complexes pour les petits volumes
- **Investisseurs** : pas de données sur les flux réels de la chaîne de valeur

**Résultat :** l'Afrique transforme moins de 15% de ses matières premières agricoles sur place.

---

## ⚙️ Fonctionnalités clés

### Marketplace producteurs
- Profil producteur/coopérative avec certifications, capacités, localisation
- Mise en vente de lots avec : quantité, qualité, prix indicatif, disponibilité, photos
- Historique de transactions et réputation (avis acheteurs)

### Marketplace transformateurs
- Profil usine avec capacité de transformation, produits acceptés, certifications
- Appels d'offre d'achat : spécifications exactes, volumes, prix cible, délais
- Matching automatique producteurs ↔ transformateurs par IA

### Traçabilité & certifications
- Attestation d'origine géolocalisée (intégration AgroTrack BF)
- Documentation certifications : bio, fair-trade, EUDR, SYSCOFA
- Génération automatique des documents export

### Logistique & transport
- Annuaire transporteurs certifiés (vrac agricole)
- Calcul de coût logistique estimatif
- Suivi livraison avec mise à jour statut

### Paiement & financement
- Escrow numérique (paiement sécurisé libéré à réception)
- Intégration Mobile Money (Orange Money, Wave, MTN MoMo)
- Factoring pour producteurs : avance sur commandes signées

### Données & analytics
- Indice des prix par produit et par marché (public)
- Tendances de l'offre et de la demande CEDEAO
- Tableau de bord acheteur : historique achats, fournisseurs, coûts

---

## 🛠️ Stack

```
Frontend    → Next.js 15 (App Router) + TypeScript strict + Tailwind
UI          → shadcn/ui + Mapbox (visualisation géographique flux)
Auth        → Supabase SSR (getUser()) + vérification KYB entreprises
Database    → Supabase PostgreSQL + Realtime (notifications offres)
Search      → Supabase Full-text search + filtres avancés
Payments    → Stripe (international) + API Mobile Money CEDEAO
Analytics   → PostHog
Email       → Resend (notifications transactions)
Deployment  → Vercel
```

---

## 👥 Cible client

**Côté offre (producteurs)**
- Coopératives agricoles (coton, sésame, karité, cajou, cacao)
- Producteurs certifiés équitable ou bio cherchant prime de qualité
- Unions de coopératives avec grands volumes

**Côté demande (acheteurs)**
- Minoteries, huileries, unités de transformation
- Exportateurs vers Europe et Asie
- Groupes agroalimentaires régionaux (OLAM, SIFCA, ETG)
- Acheteurs internationaux cherchant sourcing tracé

**Géographie :** Burkina Faso, Côte d'Ivoire, Sénégal, Ghana, Mali (Phase 1 CEDEAO)

---

## 💰 Modèle économique

| Flux | Modèle | Taux |
|------|--------|------|
| Transactions | Commission sur vente | 1.5% |
| Abonnement acheteurs | Mensuel (accès analytics + matching IA) | 50 000 FCFA/mois |
| Certifications | Frais génération documentation | 5 000 FCFA/lot |
| Financement | Marge factoring | 2-3% |

---

## 📈 Métriques de succès

| Métrique | Cible 18 mois |
|----------|---------------|
| Producteurs inscrits | 500 |
| Acheteurs inscrits | 50 |
| Volume GMV transactions | 500M FCFA |
| MRR | 500 000 FCFA |
| Pays actifs | 3 (BF, CI, SN) |
| Taux de répétition acheteurs | > 70% |

---

## 🗓️ Roadmap

- **Q2 2027** — Spec technique + partenariats coopératives CEDEAO
- **Q3 2027** — Développement MVP marketplace (listings + matching)
- **Q4 2027** — Pilote fermé : 20 producteurs BF × 5 acheteurs
- **Q1 2028** — Lancement public Burkina + Côte d'Ivoire
- **Q3 2028** — Expansion Sénégal + Ghana + module financement

---

*Partie de l'écosystème [FORGE Afrika](../README.md)*
