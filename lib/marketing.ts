// Marketing content pour chaque filiale FORGE Afrika
// Utilisé par les pages /produits/[slug]

export type Feature = {
  icon: string;
  titre: string;
  description: string;
};

export type ProductMarketing = {
  slug: string;
  nom: string;
  headline: string;
  tagline: string;
  couleur: string;
  bgGradient: string;
  problemTitle: string;
  problem: string;
  solutionTitle: string;
  solution: string;
  features: Feature[];
  audiences: string[];
  ctaText: string;
  ctaUrl: string;
  ctaSecondText?: string;
  ctaSecondUrl?: string;
};

export const MARKETING_DATA: Record<string, ProductMarketing> = {
  "comptrack": {
    slug: "comptrack",
    nom: "CompTrack",
    headline: "La Comptabilité Africaine, Enfin Simple",
    tagline: "Gérez vos finances en FCFA. Restez conforme OHADA. Dormez tranquille.",
    couleur: "#8B5CF6",
    bgGradient: "linear-gradient(135deg, #1E1B4B, #2D1B69)",
    problemTitle: "Vous perdez de l'argent sans le savoir",
    problem: "Chaque mois, des milliers de PME africaines gèrent leurs finances dans des cahiers, des WhatsApp et des Excel approximatifs. Des factures oubliées, des dépenses non comptées, des impôts mal calculés — c'est de l'argent qui s'évapore. Et quand la banque ou un investisseur demande vos états financiers, vous ne savez pas quoi montrer.",
    solutionTitle: "CompTrack fait votre comptabilité à votre place",
    solution: "CompTrack est un logiciel de comptabilité conçu pour les PME africaines : en FCFA, conforme SYSCOHADA, mobile-first. Pas besoin d'être comptable. Pas besoin de formation longue. En 10 minutes, vous avez une vue complète de votre trésorerie, vos factures et vos marges.",
    features: [
      { icon: "📄", titre: "Facturation Professionnelle", description: "Créez et envoyez des factures aux couleurs de votre entreprise en 30 secondes. Suivi des paiements, relances automatiques, reçus WhatsApp. Fini les factures oubliées et les impayés qui traînent." },
      { icon: "💰", titre: "Suivi des Dépenses Sans Effort", description: "Enregistrez chaque dépense depuis votre téléphone. CompTrack catégorise automatiquement, vous alerte quand vous dépassez votre budget, et vous montre exactement où va chaque franc." },
      { icon: "📊", titre: "Rapports SYSCOHADA Automatiques", description: "Bilan, compte de résultat, flux de trésorerie — générés automatiquement, conformes au référentiel SYSCOHADA. Prêts pour votre banque, votre investisseur ou le fisc. Plus de stress à la clôture." },
      { icon: "🏦", titre: "Réconciliation Bancaire", description: "Connectez Orange Money, Wave ou votre banque. CompTrack rapproche vos transactions automatiquement. Zéro saisie manuelle. Zéro erreur de calcul." },
      { icon: "👥", titre: "Multi-Utilisateurs et Multi-Rôles", description: "Votre comptable accède aux livres. Votre associé voit les rapports. Vos vendeurs créent des factures. Chacun voit ce dont il a besoin — vous gardez le contrôle total." },
      { icon: "📱", titre: "Mobile-First, Offline-Ready", description: "Gérez votre comptabilité depuis votre smartphone, partout au Burkina, en Côte d'Ivoire, au Sénégal — même avec une connexion instable. Vos données se synchronisent dès que le réseau revient." },
    ],
    audiences: [
      "PME et TPE de 1 à 50 employés en Afrique francophone",
      "Commerçants, artisans et prestataires de services",
      "Startups qui veulent des finances propres dès le premier jour",
      "Associations et ONG ayant besoin de reporting financier",
      "Gérants de boutiques avec plusieurs points de vente",
    ],
    ctaText: "Découvrir l'outil",
    ctaUrl: "https://comptrack-chi.vercel.app",
    ctaSecondText: "Devenir partenaire pilote",
    ctaSecondUrl: "/contact",
  },

  "sugu": {
    slug: "sugu",
    nom: "SUGU",
    headline: "La Caisse Digitale des Commerçants Africains",
    tagline: "Votre boutique mérite mieux qu'un cahier et une calculatrice.",
    couleur: "#F97316",
    bgGradient: "linear-gradient(135deg, #431407, #7C2D12)",
    problemTitle: "Vous ne savez pas combien vous gagnez vraiment",
    problem: "Il est 8h. Votre boutique ouvre. Les clients arrivent. Vous notez les ventes à la main, calculez le change de tête, gérez le stock aux approximations. En fin de journée, impossible de savoir exactement ce que vous avez vendu, ce qui manque en stock, combien vous avez vraiment gagné. Le lendemain, vous recommencez. Ce cycle s'arrête le jour où vous installez SUGU.",
    solutionTitle: "SUGU gère votre boutique pendant que vous vendez",
    solution: "SUGU est la caisse digitale offline-first conçue pour les commerçants africains. Elle fonctionne sans internet, s'adapte à votre façon de vendre, et vous donne enfin des chiffres clairs sur votre business. Enregistrez une vente en 3 secondes. Gérez 10 boutiques depuis votre téléphone.",
    features: [
      { icon: "⚡", titre: "Caisse Ultra-Rapide", description: "Vente en 3 touches. Recherche par nom, code ou scan. Reçu WhatsApp en un clic. Plus de queue pendant que vous cherchez un produit. SUGU est plus rapide que votre crayon." },
      { icon: "📦", titre: "Stock en Temps Réel", description: "SUGU soustrait automatiquement chaque article vendu de votre stock. Alertes de rupture avant qu'il soit trop tard. Inventaires simplifiés en un balayage. Vous savez toujours ce qu'il vous reste." },
      { icon: "🏪", titre: "Multi-Boutiques, Un Seul Écran", description: "Vous avez 2, 3, 10 points de vente ? SUGU les regroupe tous. Comparez les performances. Transférez du stock entre boutiques. Gérez tout depuis votre smartphone sans vous déplacer." },
      { icon: "📡", titre: "Offline-First : Jamais d'Interruption", description: "La connexion coupe ? SUGU continue de fonctionner. Vos données se synchronisent automatiquement dès que le réseau revient. Votre business ne s'arrête jamais à cause d'internet." },
      { icon: "📊", titre: "Rapports de Vente Quotidiens", description: "Chiffre d'affaires, produits les plus vendus, heures de pointe, marges par article. SUGU transforme vos ventes en intelligence business. Vous savez quoi commander, quand, en quelle quantité." },
      { icon: "💳", titre: "Tous les Paiements Africains", description: "Espèces, Orange Money, Wave, Moov Money — SUGU les gère tous. Chaque transaction est tracée. Chaque paiement mobile confirmé. Réconciliation automatique en fin de journée." },
    ],
    audiences: [
      "Épiceries, supérettes et boutiques de quartier",
      "Boutiques de vêtements, téléphonie et matériel",
      "Restaurants, maquis, snacks et fast-foods",
      "Pharmacies et para-pharmacies",
      "Tout commerçant qui veut savoir où va son argent",
    ],
    ctaText: "Découvrir SUGU",
    ctaUrl: "https://duka-kappa.vercel.app",
  },

  "agrotrack-bf": {
    slug: "agrotrack-bf",
    nom: "AgroTrack BF",
    headline: "La Coopérative Agricole Numérique",
    tagline: "Vos membres, vos récoltes, vos données — enfin organisés.",
    couleur: "#10B981",
    bgGradient: "linear-gradient(135deg, #022C22, #064E3B)",
    problemTitle: "Vos données agricoles sont éparpillées et inaccessibles",
    problem: "Les coopératives africaines font un travail énorme : des centaines de membres, des milliers de tonnes de production, des données critiques pour les financements, les certifications et les acheteurs. Mais tout ça tient dans des cahiers abîmés par la pluie, des Excel que personne ne sait tenir à jour. Quand un bailleur demande vos données de production, vous transpirez. Quand un acheteur veut tracer l'origine, vous ne pouvez pas répondre.",
    solutionTitle: "AgroTrack digitalise votre coopérative en une journée",
    solution: "AgroTrack BF est une application PWA offline-first qui permet aux coopératives agricoles de numériser leur gestion sans dépendre d'une connexion internet permanente. Enregistrez un membre depuis le champ. Saisissez une récolte sans réseau. Générez un rapport pour votre bailleur en un clic.",
    features: [
      { icon: "👨‍🌾", titre: "Gestion des Membres", description: "Fichier complet de chaque membre : coordonnées, superficie, cultures, historique. Ajoutez, modifiez, consultez depuis un smartphone basique, sans internet. Fini le cahier perdu et les doublons." },
      { icon: "🌱", titre: "Suivi des Récoltes par Parcelle", description: "Enregistrez les récoltes campagne par campagne, parcelle par parcelle. Comparez les rendements. Identifiez les membres qui ont besoin d'appui. Vos données agronomiques deviennent une vraie base de décision." },
      { icon: "📋", titre: "Rapports Bailleurs Instantanés", description: "Production totale, superficie cultivée, membres actifs, taux de collecte — générés en quelques secondes. Prêts pour la SFD, la SOFITEX, les ONG, les certifications bio ou commerce équitable." },
      { icon: "📡", titre: "Offline-First — Conçu pour le Terrain", description: "Pas de WiFi dans les champs ? Aucun problème. AgroTrack stocke tout localement et synchronise quand vous avez du réseau. Les agents saisissent depuis le village, le responsable voit tout au bureau." },
      { icon: "📊", titre: "Tableaux de Bord Décisionnels", description: "Quelles cultures sont les plus rentables ? Quels membres décrochent ? Quel village produit le plus ? AgroTrack répond visuellement pour que vos décisions soient basées sur des faits, pas des impressions." },
      { icon: "🔐", titre: "Données Sécurisées et Souveraines", description: "Vos données n'appartiennent qu'à vous. Accès par rôles : le directeur voit tout, l'agent de terrain saisit ses villages. Pas de partage avec des tiers sans votre accord." },
    ],
    audiences: [
      "Coopératives coton, maïs, sésame, karité, anacarde, niébé",
      "Unions de producteurs et fédérations agricoles",
      "ONG et projets de développement agricole",
      "Bailleurs finançant des filières agricoles",
      "Toute organisation gérant des agriculteurs et leurs productions",
    ],
    ctaText: "Découvrir l'outil",
    ctaUrl: "https://agrotrack-bf.vercel.app",
  },

  "livestockos": {
    slug: "livestockos",
    nom: "LivestockOS",
    headline: "Le Système d'Exploitation de Votre Élevage",
    tagline: "Chaque bête compte. Chaque donnée compte. LivestockOS les garde toutes.",
    couleur: "#F59E0B",
    bgGradient: "linear-gradient(135deg, #1C1917, #292524)",
    problemTitle: "Vous gérez votre troupeau à la mémoire — et vous perdez de l'argent",
    problem: "Vous gérez 50, 100, 500 têtes de bétail. Vous les connaissez de vos yeux — mais sur papier, c'est une autre histoire. Qui a été vacciné cette semaine ? Quelle vache a mis bas ? Quel bœuf est prêt pour la vente ? Sans ces réponses précises, vous vendez au mauvais moment, au mauvais prix, et vous ratez des opportunités qui se comptent en millions de FCFA.",
    solutionTitle: "LivestockOS met vos données au service de votre rentabilité",
    solution: "LivestockOS est le système de gestion de cheptel conçu pour les éleveurs africains. Il numérise le suivi de chaque animal, de sa naissance à sa commercialisation, et transforme les milliers de données générées quotidiennement en décisions qui augmentent vos revenus.",
    features: [
      { icon: "🐃", titre: "Fiche Individuelle par Animal", description: "Chaque bête a son profil : race, date de naissance, poids, père/mère, historique de santé, vaccinations, traitements, reproduction. Identifiez n'importe quel animal en 2 secondes." },
      { icon: "💊", titre: "Alertes Vétérinaires Automatiques", description: "Planifiez les vaccinations. Enregistrez les traitements. LivestockOS vous alerte avant chaque échéance sanitaire. Moins de maladies, moins de pertes, plus de productivité." },
      { icon: "🍼", titre: "Gestion Reproduction Complète", description: "Suivi des saillies, gestations, mises bas. Calcul automatique des dates. Tableau de bord reproducteur. Optimisez votre renouvellement de cheptel avec des données réelles." },
      { icon: "⚖️", titre: "Courbes de Croissance et Poids", description: "Pesées régulières enregistrées, courbes de croissance automatiques. Sachez exactement quand vos animaux sont au poids de vente optimal. Vendez au bon moment, au meilleur prix." },
      { icon: "🥛", titre: "Production Laitière et Performance", description: "Enregistrez la production quotidienne par animal. Comparez les performances, identifiez vos meilleures laitières. Maximisez votre rendement sans approximations." },
      { icon: "📊", titre: "Rentabilité par Tête et par Troupeau", description: "Coûts d'alimentation, vétérinaires, revenus des ventes — LivestockOS calcule votre marge par animal. Votre élevage devient un business piloté par les chiffres." },
    ],
    audiences: [
      "Éleveurs bovins, ovins, caprins, porcins et volaille",
      "Ranches et fermes d'élevage semi-industrielles",
      "Projets de développement de l'élevage (ONG, État)",
      "Vétérinaires gérant plusieurs élevages clients",
      "Coopératives d'éleveurs cherchant à se structurer",
    ],
    ctaText: "Découvrir LivestockOS",
    ctaUrl: "https://livestock-os-ashy.vercel.app",
  },

  "taama": {
    slug: "taama",
    nom: "TAAMA",
    headline: "La Traçabilité Industrielle qui Ouvre les Marchés Mondiaux",
    tagline: "Tracez. Certifiez. Exportez. TAAMA parle le langage des acheteurs internationaux.",
    couleur: "#22C55E",
    bgGradient: "linear-gradient(135deg, #052E16, #14532D)",
    problemTitle: "Vous perdez des contrats export faute de documentation",
    problem: "Vous transformez du coton, du sésame, du beurre de karité. Votre qualité est indéniable. Vos volumes sont là. Mais quand un importateur européen demande votre traçabilité EUDR, quand un certifieur bio exige votre historique de lot, quand un client asiatique veut vos certificats qualité — vous n'avez rien à montrer. Et vous perdez le contrat.",
    solutionTitle: "TAAMA documente chaque étape de votre production",
    solution: "TAAMA est le SaaS B2B de traçabilité et certification pour les PME de transformation africaines. Il digitalise toute votre chaîne de production : de la matière première reçue au produit fini expédié. Chaque lot est identifié. Chaque étape est horodatée. Chaque certificat est généré automatiquement.",
    features: [
      { icon: "🏷️", titre: "Traçabilité Lot par Lot", description: "Chaque lot reçoit un identifiant unique dès sa création. Suivez-le à travers toutes les étapes : réception, pesée, transformation, stockage, expédition. Remontée d'origine complète en quelques secondes." },
      { icon: "📋", titre: "Certification EUDR et Standards Internationaux", description: "TAAMA génère automatiquement les documents requis par le règlement EUDR (zéro déforestation), les certifications bio, Fairtrade, Rainforest Alliance. Vos audits passent sans stress." },
      { icon: "📦", titre: "Gestion des Stocks en Temps Réel", description: "Stock matières premières, en-cours, produits finis — tout en temps réel. Alertes de rupture. Valorisation automatique. Plus de surprises en fin de campagne." },
      { icon: "🔧", titre: "Suivi Machine et Maintenance Préventive", description: "Enregistrez vos équipements. Planifiez la maintenance préventive avec des alertes automatiques. Suivez les rendements machine par machine. Réduisez les arrêts non planifiés." },
      { icon: "📊", titre: "Analytics de Production", description: "Taux de rendement, pertes matières, productivité par équipe, coût de revient lot par lot. TAAMA transforme votre usine en système piloté par les données." },
      { icon: "🖨️", titre: "Documents Export en Un Clic", description: "Certificats d'origine, certificats qualité, rapports d'inspection — générés dans le format attendu par vos acheteurs. Vos équipes gagnent des jours chaque mois." },
    ],
    audiences: [
      "Huileries et unités de trituration (sésame, karité, arachide)",
      "Usines d'égrenage de coton",
      "Unités de transformation agroalimentaire",
      "PME cherchant à exporter vers l'Europe ou l'Asie",
      "Toute industrie soumise à des exigences de traçabilité",
    ],
    ctaText: "Découvrir TAAMA",
    ctaUrl: "https://taama-mu.vercel.app",
  },

  "valuechain-connect": {
    slug: "valuechain-connect",
    nom: "ValueChain Connect",
    headline: "Le Marketplace B2B qui Connecte l'Afrique de l'Ouest",
    tagline: "Votre production mérite les meilleurs acheteurs. On vous les trouve.",
    couleur: "#3B82F6",
    bgGradient: "linear-gradient(135deg, #0C4A6E, #1E3A8A)",
    problemTitle: "Vous vendez sous-évalué à cause d'intermédiaires opaques",
    problem: "Vous produisez du coton, du sésame, du karité, de l'anacarde. Vous travaillez dur. Votre qualité est là. Mais vos débouchés dépendent d'intermédiaires opaques qui fixent les prix sans vous expliquer pourquoi. De l'autre côté, les transformateurs et exportateurs cherchent des fournisseurs fiables mais n'ont aucune visibilité sur qui produit quoi. ValueChain Connect ferme ce fossé.",
    solutionTitle: "ValueChain Connect : l'offre rencontre la demande directement",
    solution: "ValueChain Connect est la marketplace B2B panafricaine qui connecte producteurs agricoles, transformateurs et acheteurs commerciaux dans l'espace CEDEAO. Plus d'intermédiaires qui mangent la marge. Une plateforme transparente où vous publiez votre production, recevez des offres d'acheteurs et négociez directement.",
    features: [
      { icon: "🏪", titre: "Vitrine Commerciale Permanente", description: "Créez le profil de votre production : cultures, volumes, qualité, certifications. Votre production est commercialisée 24h/24." },
      { icon: "💹", titre: "Accès aux Prix de Marché Réels", description: "Consultez les cours en temps réel pour vos produits. Ne vendez plus sous-évalué par manque d'information. Négociez depuis une position de force avec des données objectives." },
      { icon: "🔍", titre: "Sourcing Sécurisé pour les Acheteurs", description: "Transformateurs et exportateurs : trouvez vos fournisseurs en quelques clics. Filtrez par produit, région, volume, certification. Sécurisez vos approvisionnements toute l'année." },
      { icon: "🤝", titre: "Contrats Digitaux et Traçabilité", description: "Formalisez vos transactions sur la plateforme. Chaque lot est tracé de la production à la livraison. Conformité EUDR pour l'export vers l'Europe." },
      { icon: "📊", titre: "Intelligence de Filière", description: "Visualisez les flux de votre filière : qui produit quoi, où, en quelle quantité. Identifiez les opportunités de marché. Anticipez les déficits d'offre avant vos concurrents." },
      { icon: "🌍", titre: "Réseau CEDEAO Intégré", description: "Une seule plateforme pour élargir vos débouchés au-delà de votre région, à terme à toute l'Afrique de l'Ouest." },
    ],
    audiences: [
      "Coopératives et unions de producteurs agricoles",
      "Agrégateurs et négociants de matières premières",
      "Transformateurs et industriels agroalimentaires",
      "Exportateurs et traders CEDEAO",
      "Structures d'appui aux filières (ONG, projets agricoles)",
    ],
    ctaText: "Découvrir la plateforme",
    ctaUrl: "https://valuechain-connect.vercel.app",
  },

  "milltrack": {
    slug: "milltrack",
    nom: "MillTrack",
    headline: "Le Tableau de Bord de Votre Usine",
    tagline: "Votre minoterie ou huilerie, pilotée par les données. Enfin.",
    couleur: "#60A5FA",
    bgGradient: "linear-gradient(135deg, #1E3A5F, #1e40af)",
    problemTitle: "Vous pilotez votre usine aux approximations",
    problem: "Votre usine tourne. Mais en fin de journée, vous ne savez pas exactement combien de tonnes ont été traitées, quelle machine a eu un arrêt, quel lot a donné quel rendement, où se trouve le lot en cours, quel est votre coût de revient réel par tonne. Sans ces réponses, vous gérez aux impressions. Avec MillTrack, vous pilotez.",
    solutionTitle: "MillTrack transforme votre usine en machine de précision",
    solution: "MillTrack est le logiciel de production industrielle conçu pour les minoteries, huileries et usines de transformation africaines. Il digitalise le suivi de production lot par lot, le monitoring des machines, la gestion des stocks et les analytics de rentabilité — dans une interface simple, sans formation longue.",
    features: [
      { icon: "📦", titre: "Suivi Lot par Lot de A à Z", description: "Chaque entrée matière crée un lot identifié. Suivez-le à chaque étape : réception, pré-traitement, production, stockage, expédition. Rendement à chaque étape. Pertes quantifiées. Causes identifiées." },
      { icon: "🔧", titre: "Monitoring des Machines", description: "Enregistrez chaque arrêt machine : cause, durée, coût en production perdue. Planifiez la maintenance préventive avec alertes automatiques. Votre taux de disponibilité augmente. Vos coûts baissent." },
      { icon: "📊", titre: "Dashboard de Production en Temps Réel", description: "Tonnage traité aujourd'hui, cette semaine, ce mois. Rendement par machine, par équipe, par shift. Comparaison avec les objectifs. Alertes si vous décrochez. Visible depuis votre bureau ou téléphone." },
      { icon: "💰", titre: "Coût de Revient par Lot", description: "Intrants, main d'œuvre, énergie, maintenance — MillTrack les additionne par lot. Votre coût de revient réel par tonne est connu à la virgule près. Sachez si vous gagnez de l'argent sur chaque production." },
      { icon: "🏭", titre: "Gestion des Approvisionnements", description: "Évaluez vos fournisseurs sur la durée : qui livre quoi, à quel prix, avec quelle qualité. Sécurisez vos approvisionnements avec des données objectives. Renégociez depuis une position de force." },
      { icon: "📋", titre: "Rapports Direction Automatiques", description: "Rapport de production mensuel, bilan matières, analyse des rendements — générés automatiquement, prêts à être partagés avec votre conseil ou votre banque. Convaincre n'a jamais été aussi simple." },
    ],
    audiences: [
      "Minoteries et meuneries de toutes tailles",
      "Huileries artisanales et industrielles",
      "Rizeries et décortiqueuses industrielles",
      "Usines d'égrenage et de conditionnement",
      "Tout dirigeant d'usine qui veut piloter au lieu de deviner",
    ],
    ctaText: "Découvrir MillTrack",
    ctaUrl: "https://milltrack-two.vercel.app",
  },

  "indubot-afrika": {
    slug: "indubot-afrika",
    nom: "Indubot Afrika",
    headline: "L'intelligence industrielle au service de vos usines africaines",
    tagline: "Vos machines parlent. Indubot Afrika les écoute — et agit avant la panne.",
    couleur: "#00BCD4",
    bgGradient: "linear-gradient(135deg, #062A2E, #0E4A52)",
    problemTitle: "Vos machines tombent en panne sans prévenir — et ça coûte cher",
    problem: "Votre usine tourne avec des machines critiques : convoyeurs, presses, lignes de conditionnement. Mais vous ne savez pas quand une panne arrive avant qu'elle n'arrive. Un arrêt non planifié coûte des heures de production, des commandes en retard, des réparations en urgence. Vos opérateurs surveillent à l'œil, remplissent des cahiers de suivi — trop tard pour anticiper, trop lent pour réagir.",
    solutionTitle: "Indubot Afrika surveille vos usines 24h/24, en temps réel",
    solution: "Indubot Afrika est l'OS de gestion automatique d'industries conçu pour les usines africaines : suivi de production, supervision des machines, alertes en temps réel. Connectez vos lignes de production, recevez des alertes avant la panne, pilotez votre production depuis un tableau de bord unique — sans ingénieur IoT à plein temps.",
    features: [
      { icon: "📡", titre: "Supervision Temps Réel des Machines", description: "Suivez l'état de chaque machine, ligne et équipement en direct. Statut, cadence, température, vibrations — tout est visible depuis un seul écran, à tout moment." },
      { icon: "🚨", titre: "Alertes Avant la Panne", description: "Indubot Afrika détecte les signaux faibles — surchauffe, ralentissement, écart de cadence — et vous alerte avant l'arrêt. Moins de pannes surprises, moins de production perdue." },
      { icon: "🏭", titre: "Suivi de Production Ligne par Ligne", description: "Cadence, volumes produits, temps d'arrêt par ligne de production. Comparez les performances entre équipes et entre shifts. Identifiez les goulots d'étranglement en un coup d'œil." },
      { icon: "🔧", titre: "Maintenance Préventive Planifiée", description: "Planifiez les entretiens selon l'usage réel des machines, pas des calendriers approximatifs. Réduisez les coûts de réparation et prolongez la durée de vie de vos équipements." },
      { icon: "📊", titre: "Dashboard de Pilotage Unique", description: "Tonnage produit, disponibilité machine, taux de panne, coûts d'arrêt — tous vos indicateurs industriels dans un seul tableau de bord, accessible depuis le bureau ou le terrain." },
      { icon: "🤖", titre: "Prêt pour l'Automatisation", description: "Indubot Afrika s'intègre avec vos capteurs et automates existants, et prépare votre usine à l'orchestration de robots et lignes automatisées de demain." },
    ],
    audiences: [
      "Usines de transformation agroalimentaire et industrielle",
      "Minoteries, huileries et unités de conditionnement",
      "Directeurs de production cherchant à réduire les arrêts machine",
      "Responsables maintenance voulant passer du curatif au préventif",
      "Groupes industriels gérant plusieurs sites de production",
    ],
    ctaText: "Découvrir Indubot Afrika",
    ctaUrl: "https://indubot-afrika.vercel.app",
  },
};
