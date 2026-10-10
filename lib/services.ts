// Offre de services. Tant que Forge Afrika n'est pas immatriculée, les services
// livrables sont proposés en projet pilote non facturé ; le reste « sur demande ».

export type Disponibilite = "Projet pilote" | "Sur demande";

export type Service = {
  slug: string;
  titre: string;
  pour: string;
  inclut: string[];
  disponibilite: Disponibilite;
  note?: string;
};

export const SERVICES: Service[] = [
  {
    slug: "sites-web",
    titre: "Sites web et pages de présentation",
    pour: "PME, associations, écoles, commerces et entrepreneurs qui ont besoin d'une présence en ligne sérieuse.",
    inclut: [
      "Page de présentation ou site vitrine de quelques pages",
      "Adapté aux téléphones et rapide sur connexion lente",
      "Formulaire de contact, référencement de base, mise en ligne",
    ],
    disponibilite: "Projet pilote",
  },
  {
    slug: "applications-metier",
    titre: "Applications web et outils de gestion",
    pour: "Organisations qui gèrent encore leur activité sur cahiers, tableurs ou WhatsApp.",
    inclut: [
      "Tableaux de bord, gestion de stocks, de membres, de réservations ou de facturation",
      "Base de données, comptes utilisateurs et rôles",
      "Fonctionnement hors connexion quand le terrain l'exige",
      "Déploiement cloud et maintenance",
    ],
    disponibilite: "Projet pilote",
  },
  {
    slug: "integration-ia",
    titre: "Intégration d'IA et automatisation",
    pour: "Équipes qui veulent automatiser une tâche précise : tri de documents, réponses types, résumés, extraction de données.",
    inclut: [
      "Analyse du processus et du gain attendu avant tout développement",
      "Intégration d'un modèle d'IA dans un outil existant ou un nouvel outil",
      "Limites d'usage et protection des données dès la conception",
    ],
    disponibilite: "Projet pilote",
    note: "Nous n'avons pas encore livré de projet d'IA pour un client. Le premier projet sera traité comme un pilote.",
  },
  {
    slug: "design",
    titre: "Design d'interface",
    pour: "Porteurs de projets qui ont besoin de maquettes, d'une page de lancement ou d'une identité numérique cohérente.",
    inclut: ["Maquettes d'interface (UI/UX)", "Pages de lancement", "Présentations et visuels numériques"],
    disponibilite: "Projet pilote",
  },
  {
    slug: "video",
    titre: "Vidéo, motion design et contenu court",
    pour: "Marques et entreprises qui ont besoin de vidéos publicitaires, explicatives ou pour les réseaux sociaux.",
    inclut: ["Montage vidéo", "Motion design et animations", "Formats courts (Reels, TikTok, Shorts)", "Contenu UGC"],
    disponibilite: "Sur demande",
    note: "Forge Afrika n'a pas d'équipe de production ni de réseau de créateurs constitué. Ces projets sont étudiés au cas par cas, réalisés par le fondateur ou avec des créateurs partenaires recrutés pour le projet.",
  },
];

// Ce que nous ne faisons pas — et le disons.
export const LIMITES = [
  "Nous ne sommes pas un cabinet d'expertise comptable. Nous construisons des logiciels de gestion financière ; la tenue légale des comptes et les déclarations restent l'affaire d'un professionnel agréé.",
  "Nous ne collectons ni ne gérons l'argent de tiers.",
  "Nous ne promettons pas de délai ni de prix avant d'avoir compris votre besoin.",
];
