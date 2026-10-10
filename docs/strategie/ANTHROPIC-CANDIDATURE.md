# Claude for Startups — conditions vérifiées et brouillon de candidature

*Vérifié le 10/10/2026 sur la page officielle [claude.com/programs/startups](https://claude.com/programs/startups) (redirection de anthropic.com/startups).*

## 1. Ce que dit la source officielle aujourd'hui

- **Ouvert aux startups « bootstrapped, pre-seed et venture-backed ».** Pas d'obligation d'avoir levé des fonds.
- **🔴 « We're currently over capacity on the Claude Team and $1,000 API credit offers. »** — l'année de Claude Team et les 1 000 USD de crédits API sont **actuellement saturés** pour les nouveaux candidats. Les membres existants les gardent.
- Reste accessible : la *Startup Stack* (réductions de partenaires tiers, « jusqu'à 45 000 USD »), office hours IA appliquée toutes les deux semaines, événements, limites de débit API plus élevées pour les détenteurs de crédits.
- Jusqu'à 100 000 USD de crédits supplémentaires **uniquement** via un fonds partenaire — ne nous concerne pas.
- Crédits non utilisables via AWS Bedrock ou Google Vertex.
- Candidature depuis la Console Claude (`platform.claude.com/offers/startups-application`). Réponse visée sous une semaine. Pas de date limite publiée. Les candidatures peuvent être réexaminées.
- **Non précisé par la page :** nombre de sièges, durée, critère d'âge de l'entreprise, entité juridique exigée ou non, renouvellement.

**Sur l'âge et le financement :** la presse du 06/10/2026 (CNBC, reprise par des blogs) évoque « fondée il y a moins de 5 ans *ou* financée il y a moins de 2 ans » et « jusqu'à 5 sièges Team pendant un an ». **La page officielle ne reprend pas ces chiffres** — ils ne doivent pas être cités comme conditions.

## 2. Verdict honnête

| Critère probable | Forge Afrika |
|---|---|
| Startup réelle | 🟠 Projet réel, code réel, mais **pas d'entité immatriculée** — si le formulaire demande une société, la réponse honnête est « pas encore » |
| Usage de Claude | 🟢 Réel et documentable : Claude Code sur tous les dépôts (commits co-signés). 🔴 Aucun produit n'intègre l'API |
| Traction | 🔴 Zéro, à écrire zéro |
| Offre Team + crédits | 🔴 **Saturée à la date du jour** |

**Recommandation :** ne pas candidater cette semaine. Candidater quand (1) l'adresse `@forge-afrika.com` existe, (2) l'immatriculation est faite ou en cours avec une date, et (3) idéalement un premier pilote réel. Revérifier la page à ce moment-là : si l'offre Team a rouvert, c'est le moment ; sinon la Startup Stack et les office hours valent déjà la candidature.

## 3. Brouillon (anglais — à relire et à mettre à jour le jour J)

**Company.** Forge Afrika is an early-stage African technology venture building management software for agriculture, livestock and small-scale industry in West Africa, and offering web and software development services to African organizations. It is founder-led and not yet incorporated *(update if incorporated)*.

**Founder.** Steeve Donald Compaoré, Burkinabè, computer science student at Tokat Gaziosmanpaşa University (Türkiye). Sole founder and developer.

**Problem.** Cooperatives, livestock farmers and small processors in Burkina Faso run their operations on paper notebooks, spreadsheets and WhatsApp. Available software is expensive, English-first, priced in dollars and assumes stable connectivity.

**Solution.** Offline-first, mobile-first web apps in French, priced in FCFA. Current focus: LivestockOS, a herd registry that produces a verifiable, server-timestamped livestock passport a farmer can present to a microfinance institution.

**Target market.** Livestock farmers, veterinarians and agricultural cooperatives in Burkina Faso first; small agro-processors next.

**Current stage.** Pre-revenue. One MVP (LivestockOS: authentication and verifiable passport live; herd data still stored on-device), several products in development or prototype. No users yet.

**Traction.** Forge Afrika is pre-revenue and has not yet acquired paying customers or active users. No external funding.

**Business model.** Subscription for LivestockOS (free tier up to 20 animals, paid tiers above; pricing under validation). Fixed-price web development projects for services.

**Technology.** Next.js, TypeScript, PostgreSQL (Neon), Better Auth, Vercel.

**Claude usage.** Claude Code is the main engineering tool across all repositories: implementation, code review, test writing, accessibility and security audits, documentation. No product integrates the Claude API in production yet. Planned, scoped use: *(only write this once it is actually designed — e.g. structured extraction from cooperative paper records)*.

**Roadmap.** (1) First real user of LivestockOS; (2) persist herd data server-side; (3) first paid service project; (4) incorporation in Burkina Faso.

**Why Anthropic / why now.** As a solo founder, Claude multiplies what one person can build and maintain. Program support would let us move from prototypes to a product used by real farmers.

> Règle : chaque phrase doit rester vraie le jour de l'envoi. Si un fait a changé, on change la phrase, jamais l'inverse.
