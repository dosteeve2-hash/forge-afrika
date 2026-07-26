# LivestockOS

> Gestion d'élevage mobile — santé animale, stocks, ventes. Pensé pour les éleveurs sahéliens.

[![Status](https://img.shields.io/badge/Status-Conception-0A1628?style=flat-square&labelColor=0A1628&color=00BCD4)](.)
[![Stack](https://img.shields.io/badge/Stack-Next.js%2015%20%2B%20Supabase-D4AF37?style=flat-square&labelColor=0A1628)](.)

---

## 🎯 Vision

L'élevage représente 18% du PIB burkinabè et nourrit 30% de la population. Pourtant, un éleveur de 200 têtes de bétail n'a aucun outil pour suivre la santé de son troupeau, optimiser ses ventes, ou accéder au crédit faute d'historique financier documenté. LivestockOS change ça — avec une app mobile qui fonctionne sans internet dans le Sahel.

---

## 🐄 Problème résolu

Les éleveurs sahéliens font face à des pertes évitables :

- **Santé animale** : maladies non détectées tôt → mortalité élevée → pertes catastrophiques
- **Ventes** : prix négociés à l'aveugle → sous-valorisation systématique du bétail
- **Stocks** : alimentation et médicaments gérés de mémoire → ruptures ou gaspillage
- **Traçabilité** : aucun historique de production → accès au crédit bancaire impossible
- **Bilans** : pas de comptabilité → invisibilité financière totale

---

## ⚙️ Fonctionnalités clés

### Registre du troupeau
- Fiche individuelle par animal : espèce, race, âge, poids, historique médical
- Identification par numéro de boucle ou QR code sur collier
- Suivi de la descendance (généalogie)

### Santé animale
- Calendrier vaccinations et traitements (avec rappels push)
- Enregistrement des pathologies et traitements administrés
- Alertes mortalité et signaux d'alerte épidémique
- Partage d'alertes sanitaires entre éleveurs de la zone

### Gestion des stocks
- Suivi aliments (quantité, coût, durée restante)
- Stock médicaments et consommables vétérinaires
- Alertes réapprovisionnement

### Ventes & marché
- Enregistrement de chaque vente avec prix, acheteur, date, marché
- Historique des prix par espèce et par marché
- Calcul de la valeur estimée du troupeau
- Comparatif prix marchés locaux (intégration données marchés CEDEAO)

### Comptabilité éleveur
- Bilan mensuel : revenus ventes, coûts alimentation/santé, marge nette
- Historique financier exportable pour demande de crédit
- Intégration CompTrack pour les éleveurs avec structure formelle

---

## 🛠️ Stack

```
Frontend    → Next.js 15 (PWA) + TypeScript + Tailwind
Mobile      → React Native (app principale — iOS & Android)
Auth        → Supabase SSR (getUser())
Database    → Supabase PostgreSQL + SQLite local (offline)
Sync        → Synchronisation différentielle dès réseau disponible
Maps        → Mapbox (localisation pâturages, points d'eau)
Notifications → Supabase Realtime + FCM (alertes sanitaires)
Deployment  → Vercel (web) + Expo (mobile)
```

---

## 👥 Cible client

- Éleveurs bovins, ovins, caprins (Burkina, Mali, Niger, Tchad)
- Éleveurs semi-transhumants et agropasteurs
- Coopératives d'éleveurs et groupements pastoraux
- Services vétérinaires de terrain (suivi de zones)
- Projets d'appui à l'élevage (FAO, FIDA, ONG)

**Taille de marché BF :** ~900 000 ménages d'éleveurs. Marché sahélien total : plusieurs millions.

---

## 📈 Métriques de succès

| Métrique | Cible 12 mois |
|----------|---------------|
| Éleveurs enregistrés | 500 |
| Animaux suivis | 20 000 |
| Alertes sanitaires envoyées | 1 000 |
| MRR (version premium) | 100 000 FCFA |
| Réduction mortalité troupeau | -25% (pilote) |

---

## 🗓️ Roadmap

- **Q1 2027** — UX research terrain (3 zones : Sahel, Nord, Est BF)
- **Q2 2027** — Développement MVP mobile (registre + santé)
- **Q3 2027** — Pilote avec 50 éleveurs dans la région du Sahel
- **Q4 2027** — Lancement beta public + partenariat services vétérinaires

---

*Partie de l'écosystème [FORGE Afrika](../README.md)*
