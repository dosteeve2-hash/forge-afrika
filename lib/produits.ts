// Source unique de vérité pour les produits affichés sur le site.
// Règle : chaque affirmation ici doit être vérifiable dans le dépôt du produit
// ou sur son déploiement. Aucun chiffre d'usage tant qu'il n'y a pas d'usage réel.
// Dernier audit : octobre 2026 (voir docs/strategie/AUDIT-PRODUITS.md).

export type Statut =
  | "MVP"
  | "En développement"
  | "Prototype"
  | "Usage interne"
  | "Concept";

export type Niveau = "prioritaire" | "developpement" | "prototype" | "futur";

export type Activite =
  | "cultiver"
  | "elever"
  | "transformer"
  | "vendre"
  | "comptabilite"
  | "exporter"
  | "collecter"
  | "financer"
  | "transporter";

// Libellés du sélecteur « Quel outil pour mon activité ? » (/produits).
export const ACTIVITES: Record<Activite, string> = {
  cultiver: "Je cultive",
  elever: "Je fais de l'élevage",
  transformer: "Je transforme (industrie)",
  vendre: "Je vends ou j'achète",
  comptabilite: "Je tiens ma comptabilité",
  exporter: "J'exporte",
  collecter: "Je collecte des données",
  financer: "Je cherche un financement",
  transporter: "Je transporte",
};

export type Produit = {
  slug: string;
  nom: string;
  // Ancien nom, affiché sur la fiche pour que les visiteurs retrouvent le produit.
  ancienNom?: string;
  domaine: string;
  niveau: Niveau;
  activites: Activite[];
  statut: Statut;
  probleme: string;
  pourQui: string;
  existe: string[];
  manque: string[];
  stack: string;
  modele: string;
  prochaineEtape: string;
  // Lien public seulement si la page en production ne montre aucune donnée
  // inventée. Six prototypes en ont été retirés le 10/10/2026 : leur page
  // d'accueil affiche encore des chiffres ou témoignages fictifs.
  demoUrl?: string;
  depot?: string;
};

export const NIVEAUX: Record<Niveau, { titre: string; description: string }> = {
  prioritaire: {
    titre: "Priorité actuelle",
    description: "Le produit sur lequel l'effort est concentré en ce moment.",
  },
  developpement: {
    titre: "MVP et développement",
    description: "Commencés, avec une partie réellement fonctionnelle, mais pas encore commercialisés.",
  },
  prototype: {
    titre: "Prototypes et R&D",
    description: "Interfaces construites avec des données de démonstration. Pas encore branchées à une vraie base.",
  },
  futur: {
    titre: "Produits futurs",
    description: "Idées documentées. Aucune ligne de code.",
  },
};

export const PRODUITS: Produit[] = [
  {
    slug: "elevagetrack",
    nom: "ÉlevageTrack",
    ancienNom: "LivestockOS",
    domaine: "Élevage",
    niveau: "prioritaire",
    activites: ["elever"],
    statut: "MVP",
    probleme:
      "Un éleveur sahélien n'a souvent aucun historique écrit de son troupeau. Sans historique, pas de dossier à présenter à une microfinance.",
    pourQui: "Éleveurs et vétérinaires, d'abord au Sahel, puis les institutions de microfinance qui leur prêtent.",
    existe: [
      "Inscription et connexion (base Neon Postgres + Better Auth)",
      "Registre du cheptel, suivi santé et ventes",
      "Passeport du cheptel publiable, avec un lien de vérification public horodaté côté serveur",
    ],
    manque: [
      "Le registre du cheptel est encore stocké sur l'appareil (localStorage), pas en base",
      "Aucun utilisateur réel à ce jour",
      "Encaissement : la grille tarifaire est prête dans le code mais pas encore en ligne",
    ],
    stack: "Next.js, TypeScript, Neon Postgres, Better Auth, Vercel",
    modele: "Abonnement : gratuit jusqu'à 20 têtes, puis formule payante (prix en cours de validation).",
    prochaineEtape: "Trouver un premier éleveur ou vétérinaire qui l'utilise réellement, et persister le registre en base.",
    demoUrl: "https://livestock-os-ashy.vercel.app",
  },
  {
    slug: "agrotrack",
    nom: "AgroTrack",
    ancienNom: "AgroTrack BF",
    domaine: "Agriculture",
    niveau: "developpement",
    activites: ["cultiver"],
    statut: "En développement",
    probleme:
      "Les coopératives agricoles tiennent leurs membres, pesées et paiements sur papier, ce qui rend les rapports aux bailleurs et aux acheteurs lents et fragiles.",
    pourQui: "Coopératives et exploitations agricoles, dans n'importe quel pays : l'outil doit s'adapter à celui de l'utilisateur.",
    existe: [
      "Installable sur téléphone (manifeste web). Le mode hors connexion n'est pas encore construit",
      "Authentification et intégration continue (lint, tests, build)",
      "2 modules sur 17 branchés à une base de données",
    ],
    manque: [
      "Le choix du pays, de la devise et des cultures libres est en cours de construction : l'outil a été conçu pour le Burkina Faso",
      "15 modules restent sur des données de démonstration",
      "Le projet de base de données de production n'est pas configuré",
      "Aucune coopérative utilisatrice à ce jour",
    ],
    stack: "Next.js, TypeScript, Supabase (migration vers Neon envisagée), Vercel",
    modele: "Abonnement par coopérative (à définir avec une première coopérative).",
    prochaineEtape: "Brancher la base de production, puis tester avec une coopérative pilote.",
    demoUrl: "https://agrotrack-bf.vercel.app",
  },
  {
    slug: "taama",
    nom: "TAAMA",
    domaine: "Industrie",
    niveau: "developpement",
    activites: ["transformer"],
    statut: "En développement",
    probleme:
      "Les PME de transformation suivent production, stocks et qualité sur des cahiers, ce qui complique les certifications export.",
    pourQui: "PME de transformation agroalimentaire en Afrique de l'Ouest.",
    existe: [
      "Schéma de base de données complet (production, stocks, qualité)",
      "Interface complète ; audit d'accessibilité réalisé, correctifs proposés",
    ],
    manque: [
      "La base de données est actuellement en pause : l'application n'est pas utilisable en ligne",
      "Aucun client à ce jour",
    ],
    stack: "Next.js, TypeScript, Supabase, Vercel",
    modele: "Abonnement par entreprise (à définir).",
    prochaineEtape: "Réactiver ou migrer la base de données, puis rechercher une PME pilote.",
  },
  {
    slug: "combine",
    nom: "COMBINE",
    domaine: "Accompagnement de projets",
    niveau: "developpement",
    activites: ["financer"],
    statut: "Usage interne",
    probleme:
      "Les porteurs de projets ont du mal à présenter un dossier clair et vérifiable aux structures d'accompagnement.",
    pourQui: "Porteurs de projets et structures d'accompagnement (incubateurs). Outil interne pour l'instant.",
    existe: [
      "Dossier de projet horodaté, avec une page de vérification publique codée (pas encore en ligne)",
      "Gestion d'appels à candidatures et évaluation",
      "Intégration continue complète (types, lint, 93 tests, build, parcours navigateur)",
    ],
    manque: [
      "Pas encore déployé publiquement en production",
      "Aucun utilisateur externe",
    ],
    stack: "Next.js, TypeScript, Neon Postgres, Better Auth, Vercel",
    modele: "À définir. Aucun flux financier ne transite par la plateforme.",
    prochaineEtape: "Déploiement de production, puis test avec un petit groupe de porteurs de projets.",
  },
  {
    slug: "milltrack",
    nom: "MillTrack",
    domaine: "Industrie",
    niveau: "prototype",
    activites: ["transformer"],
    statut: "Prototype",
    probleme: "Les minoteries et huileries suivent leur production sans outil dédié.",
    pourQui: "Minoteries, huileries et rizeries.",
    existe: ["Interface de suivi de production avec données de démonstration", "Tests et intégration continue"],
    manque: ["Pas d'authentification", "Pas de base de données", "Aucun utilisateur"],
    stack: "Next.js, TypeScript, Vercel",
    modele: "Abonnement par usine (hypothèse).",
    prochaineEtape: "Valider le besoin auprès d'une minoterie avant tout développement supplémentaire.",
  },
  {
    slug: "agrolink",
    nom: "AgroLink",
    ancienNom: "ValueChain Connect",
    domaine: "Commerce B2B",
    niveau: "prototype",
    activites: ["vendre"],
    statut: "Prototype",
    probleme: "Producteurs et transformateurs se trouvent difficilement sans intermédiaires.",
    pourQui: "Coopératives productrices et transformateurs de la zone CEDEAO.",
    existe: ["Catalogue et parcours vendeur/acheteur avec données de démonstration", "Authentification"],
    manque: ["Aucune table métier en base", "Aucun utilisateur"],
    stack: "Next.js, TypeScript, Supabase, Vercel",
    modele: "Abonnement ou mise en relation (hypothèse).",
    prochaineEtape: "Mis en attente : priorité au produit prioritaire.",
  },
  {
    slug: "comptrack",
    nom: "CompTrack",
    domaine: "Gestion financière",
    niveau: "prototype",
    activites: ["comptabilite"],
    statut: "Prototype",
    probleme: "Les TPE suivent recettes, dépenses et factures dans des cahiers ou des tableurs.",
    pourQui: "TPE et PME d'Afrique francophone.",
    existe: ["Interfaces de transactions, factures et rapports avec données de démonstration"],
    manque: [
      "Pas de base de données branchée",
      "Ce n'est pas un service d'expertise comptable : c'est un logiciel",
    ],
    stack: "Next.js, TypeScript, Vercel",
    modele: "Abonnement (hypothèse).",
    prochaineEtape: "Mis en attente : priorité au produit prioritaire.",
  },
  {
    slug: "indubot-afrika",
    nom: "Indubot Afrika",
    domaine: "Industrie",
    niveau: "prototype",
    activites: ["transformer"],
    statut: "Prototype",
    probleme: "Les unités de production manquent de visibilité sur leurs machines et leurs arrêts.",
    pourQui: "Unités de transformation industrielle.",
    existe: ["Tableaux de bord de supervision avec données de démonstration", "Tests et intégration continue"],
    manque: ["Authentification configurée sans base de données", "Aucune donnée machine réelle", "Aucun utilisateur"],
    stack: "Next.js, TypeScript, Vercel",
    modele: "Licence par site (hypothèse).",
    prochaineEtape: "Mis en attente : priorité au produit prioritaire.",
  },
  {
    slug: "burkinacollect",
    nom: "BurkinaCollect",
    domaine: "Collecte de données",
    niveau: "prototype",
    activites: ["collecter"],
    statut: "Prototype",
    probleme: "Les enquêtes terrain se font sur papier puis sont ressaisies, avec pertes et erreurs.",
    pourQui: "ONG, projets agricoles et équipes d'enquête terrain.",
    existe: ["Interface de formulaires avec file d'attente hors connexion"],
    manque: ["La file d'attente n'a pas encore de serveur de destination", "Aucun utilisateur"],
    stack: "Next.js, TypeScript, Vercel",
    modele: "Abonnement par organisation (hypothèse).",
    prochaineEtape: "Mis en attente : priorité au produit prioritaire.",
  },
  {
    slug: "exporttrack",
    nom: "ExportTrack",
    ancienNom: "FORJA",
    domaine: "Export",
    niveau: "prototype",
    activites: ["exporter"],
    statut: "Prototype",
    probleme: "Les exportateurs de café peinent à documenter la traçabilité de la parcelle au conteneur.",
    pourQui: "Coopératives et exportateurs de café.",
    existe: ["Interfaces de traçabilité et de documents d'export"],
    manque: ["Branche principale du dépôt actuellement en échec (lint et tests)", "Schéma de base incomplet", "Aucun utilisateur"],
    stack: "Next.js, TypeScript, Supabase, Vercel",
    modele: "Abonnement ou frais par lot exporté (hypothèse).",
    prochaineEtape: "Réparer la branche principale avant toute évolution.",
  },
  {
    slug: "sugu",
    nom: "SUGU",
    domaine: "Commerce de proximité",
    niveau: "prototype",
    activites: ["vendre"],
    statut: "Prototype",
    probleme: "Les boutiquiers ne savent pas précisément ce qu'ils vendent, ce qu'il reste en stock et qui leur doit de l'argent.",
    pourQui: "Boutiques de quartier et commerçants du secteur informel. Interface en français, anglais, jula et mooré.",
    existe: ["Produits, ventes, achats, clients et stock enregistrés sur l'appareil, sans connexion"],
    manque: ["Pas de compte ni de synchronisation serveur", "Paiement mobile affiché mais non intégré", "Aucun utilisateur"],
    stack: "Next.js, TypeScript, stockage local, Vercel",
    modele: "Abonnement mensuel modeste (hypothèse).",
    prochaineEtape: "Mis en attente : priorité au produit prioritaire.",
    demoUrl: "https://duka-kappa.vercel.app",
  },
  {
    slug: "logistique-froid",
    nom: "Logistique du froid",
    domaine: "Logistique",
    niveau: "futur",
    activites: ["transporter"],
    statut: "Concept",
    probleme: "Une part importante des denrées périssables est perdue entre le producteur et le marché faute de chaîne du froid coordonnée.",
    pourQui: "Producteurs, transformateurs et transporteurs frigorifiques.",
    existe: ["Une note de cadrage. Aucune ligne de code."],
    manque: ["Tout le produit", "Une conversation avec un vrai transporteur"],
    stack: "—",
    modele: "—",
    prochaineEtape: "Volontairement bloqué jusqu'au premier client payant d'ÉlevageTrack.",
  },
];

export const produitsParNiveau = (niveau: Niveau) => PRODUITS.filter((p) => p.niveau === niveau);

export const getProduit = (slug: string) => PRODUITS.find((p) => p.slug === slug);
