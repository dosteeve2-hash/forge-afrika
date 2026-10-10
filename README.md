# Forge Afrika

**Une startup technologique africaine en phase de démarrage, fondée par Steeve Donald Compaoré.**
Nous construisons des logiciels et des services numériques pour les entreprises et organisations africaines — d'abord pour l'agriculture, l'élevage et la petite industrie au Burkina Faso.

Site : https://forge-afrika.vercel.app

## Où nous en sommes — sans arrondir

| | |
|---|---|
| Clients payants | **0** |
| Revenu | **0** |
| Financement externe | **aucun** |
| Entité juridique | **pas encore immatriculée** |
| Équipe | le fondateur, seul |
| Produit le plus avancé | ÉlevageTrack (ex-LivestockOS) — MVP, aucun utilisateur réel à ce jour |

Le détail produit par produit est dans [`lib/produits.ts`](./lib/produits.ts) (source affichée sur le site) et dans [`docs/strategie/AUDIT-PRODUITS.md`](./docs/strategie/AUDIT-PRODUITS.md).

## Produits

| Niveau | Produits |
|---|---|
| Priorité | ÉlevageTrack (MVP) |
| MVP / développement | AgroTrack · TAAMA · COMBINE (usage interne) |
| Prototypes | MillTrack · AgroLink · CompTrack · Indubot Afrika · BurkinaCollect · ExportTrack · SUGU |
| Futur | Logistique du froid (concept, aucun code) |

> **Noms (10/10/2026)** : LivestockOS → ÉlevageTrack · AgroTrack BF → AgroTrack · ValueChain Connect → AgroLink · FORJA → ExportTrack. Seuls les noms visibles changent ; les dépôts, projets Vercel et adresses gardent leurs anciens noms jusqu'à l'achat d'un domaine propre.

## Documents stratégiques

- [Audit du site et des produits](./docs/strategie/AUDIT-PRODUITS.md) — ce qui était faux, ce qui a été corrigé
- [Domaine et e-mail professionnel](./docs/strategie/DOMAINE-ET-EMAIL.md)
- [Offre de services et prospection](./docs/strategie/OFFRE-ET-PROSPECTION.md)
- [Fusion industrie : TAAMA + MillTrack + Indubot](./docs/strategie/FUSION-INDUSTRIE.md) — plan, rien n'est encore fusionné
- [Claude for Startups — conditions et brouillon](./docs/strategie/ANTHROPIC-CANDIDATURE.md)
- Vision long terme (texte du fondateur) : [`VISION.md`](./VISION.md), [`PROJECT.md`](./PROJECT.md), [`ROADMAP.md`](./ROADMAP.md). Ce sont des ambitions, pas des faits.
- [`PRD.md`](./PRD.md) décrit le site V1 (« holding », « filiales ») : historique, remplacé par ce README.

## Le site

Next.js 16 (App Router) · TypeScript strict · Tailwind CSS · Vercel. Entièrement statique : aucune base de données, aucune variable d'environnement, aucun secret.

```bash
npm ci
npm run dev     # http://localhost:3000
npm run lint
npm run build   # doit passer sans erreur avant tout push
```

```
app/            pages : /, /produits, /produits/[slug], /services, /a-propos, /contact, /confidentialite
components/     Navbar, Footer, ProduitCarte, StatutBadge, ContactForm, ForgeLogoSVG
lib/produits.ts source unique des produits et de leur statut réel
lib/services.ts offre de services
lib/site.ts     e-mail, URL, faits publics (« avez-vous des clients ? »)
```

**Règle du dépôt :** aucun chiffre d'usage, témoignage, logo client ou partenaire n'entre dans le site sans être vérifiable. Un changement de statut produit se fait dans `lib/produits.ts`, nulle part ailleurs.

## L'automatisation quotidienne

Des routines Claude passent sur le portefeuille et laissent leurs rapports dans [`AUTOMATION/rapports/`](./AUTOMATION/rapports/). Tout passe par des PR draft ; rien n'est fusionné, déployé ou supprimé sans décision humaine. → [Mode d'emploi](./AUTOMATION/README.md) · [Protocole](./AUTOMATION/playbooks/00-protocole-forge.md)

## Contact

Steeve Donald Compaoré — docompaore2@gmail.com
