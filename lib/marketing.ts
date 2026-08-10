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
  testimonials: { texte: string; auteur: string; role: string }[];
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
    solution: "CompTrack est le premier logiciel de comptabilité conçu pour les PME africaines : en FCFA, conforme SYSCOHADA, mobile-first. Pas besoin d'être comptable. Pas besoin de formation longue. En 10 minutes, vous avez une vue complète de votre trésorerie, vos factures et vos marges.",
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
    testimonials: [
      { texte: "Avant CompTrack, je passais 2 jours par mois sur ma comptabilité. Maintenant, 20 minutes.", auteur: "Aminata K.", role: "Gérante boutique textile, Ouagadougou" },
      { texte: "Mon banquier a dit que mes états financiers étaient parmi les mieux préparés qu'il avait vus.", auteur: "Ibrahim D.", role: "Prestataire IT, Abidjan" },
    ],
    ctaText: "Essayer Gratuitement — 30 jours",
    ctaUrl: "https://comptrack.vercel.app",
    ctaSecondText: "Voir une démo",
    ctaSecondUrl: "https://comptrack.vercel.app/demo",
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
    testimonials: [
      { texte: "Je savais jamais combien j'avais vraiment vendu dans la journée. Maintenant c'est affiché direct.", auteur: "Mariam S.", role: "Épicerie de quartier, Bobo-Dioulasso" },
      { texte: "J'ai ouvert une deuxième boutique. Sans SUGU, j'aurais pas pu gérer les deux.", auteur: "Moussa T.", role: "Boutique téléphonie, Ouagadougou" },
    ],
    ctaText: "Essayer SUGU Gratuitement",
    ctaUrl: "https://duka.vercel.app",
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
      { icon: "🔐", titre: "Données Sécurisées et Souveraines", description: "Vos données n'appartiennent qu'à vous. Hébergées en Afrique. Accès par rôles : le directeur voit tout, l'agent de terrain saisit ses villages. Pas de partage avec des tiers sans votre accord." },
    ],
    audiences: [
      "Coopératives coton, maïs, sésame, karité, anacarde, niébé",
      "Unions de producteurs et fédérations agricoles",
      "ONG et projets de développement agricole",
      "Bailleurs finançant des filières agricoles",
      "Toute organisation gérant des agriculteurs et leurs productions",
    ],
    testimonials: [
      { texte: "On pouvait enfin répondre aux questions de l'auditeur de certification sans chercher pendant une heure.", auteur: "Responsable coopérative sésame", role: "Province du Houet, Burkina Faso" },
      { texte: "L'application a remplacé 4 cahiers et un classeur entier.", auteur: "Agent de terrain", role: "Coopérative maraîchage, Ouagadougou" },
    ],
    ctaText: "Démarrer la Démo Gratuite",
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
    testimonials: [
      { texte: "Je savais mon rendement à ±5 %. Avec LivestockOS, c'est au kilo près. Ça change tout pour les achats.", auteur: "Éleveur bovin", role: "Région des Hauts-Bassins, Burkina Faso" },
      { texte: "J'ai réduit les maladies de 60 % en suivant les rappels de vaccination dans l'app.", auteur: "Gérant de ranch", role: "Région du Centre-Ouest" },
    ],
    ctaText: "Commencer le Suivi de Mon Troupeau",
    ctaUrl: "https://livestock-os.vercel.app",
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
    testimonials: [
      { texte: "On a décroché un contrat en Allemagne parce qu'on était les seuls à fournir une traçabilité EUDR complète.", auteur: "Directeur export", role: "Huilerie de sésame, Burkina Faso" },
      { texte: "Nos audits de certification bio durent maintenant 2 heures au lieu de 2 jours.", auteur: "Responsable qualité", role: "Unité de transformation, Bobo-Dioulasso" },
    ],
    ctaText: "Demander une Démo TAAMA",
    ctaUrl: "https://taama.vercel.app",
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
    solution: "ValueChain Connect est la marketplace B2B panafricaine qui connecte producteurs agricoles, transformateurs et acheteurs commerciaux dans l'espace CEDEAO. Plus d'intermédiaires qui mangent la marge. Une plateforme transparente où vous publiez votre production, recevez des offres d'acheteurs vérifiés et négociez directement.",
    features: [
      { icon: "🏪", titre: "Vitrine Commerciale Permanente", description: "Créez le profil de votre production : cultures, volumes, qualité, certifications. Visibles par des centaines d'acheteurs dans toute la CEDEAO. Votre production est commercialisée 24h/24." },
      { icon: "💹", titre: "Accès aux Prix de Marché Réels", description: "Consultez les cours en temps réel pour vos produits. Ne vendez plus sous-évalué par manque d'information. Négociez depuis une position de force avec des données objectives." },
      { icon: "🔍", titre: "Sourcing Sécurisé pour les Acheteurs", description: "Transformateurs et exportateurs : trouvez vos fournisseurs en quelques clics. Filtrez par produit, région, volume, certification. Sécurisez vos approvisionnements toute l'année." },
      { icon: "🤝", titre: "Contrats Digitaux et Traçabilité", description: "Formalisez vos transactions sur la plateforme. Chaque lot est tracé de la production à la livraison. Conformité EUDR pour l'export vers l'Europe. Certification origine garantie." },
      { icon: "📊", titre: "Intelligence de Filière", description: "Visualisez les flux de votre filière : qui produit quoi, où, en quelle quantité. Identifiez les opportunités de marché. Anticipez les déficits d'offre avant vos concurrents." },
      { icon: "🌍", titre: "Réseau CEDEAO Intégré", description: "Burkina Faso, Côte d'Ivoire, Sénégal, Ghana, Mali, Niger — une seule plateforme. Vos débouchés ne sont plus limités à votre région. L'Afrique de l'Ouest est votre marché." },
    ],
    audiences: [
      "Coopératives et unions de producteurs agricoles",
      "Agrégateurs et négociants de matières premières",
      "Transformateurs et industriels agroalimentaires",
      "Exportateurs et traders CEDEAO",
      "Structures d'appui aux filières (ONG, projets agricoles)",
    ],
    testimonials: [
      { texte: "J'ai vendu 40 tonnes de sésame à un acheteur sénégalais. Jamais j'aurais eu ce contact sans ValueChain.", auteur: "Responsable coopérative", role: "Région Centre-Ouest, Burkina Faso" },
      { texte: "En tant que transformateur, je sécurise mes approvisionnements 6 mois à l'avance maintenant.", auteur: "Directeur commercial", role: "Huilerie, Abidjan" },
    ],
    ctaText: "Rejoindre la Plateforme",
    ctaUrl: "https://valuechain-connect.vercel.app",
  },

  "mifa-life": {
    slug: "mifa-life",
    nom: "MIFA Life",
    headline: "Le Meilleur de la Mode et de l'Artisanat Africain",
    tagline: "L'Afrique crée. Le monde entier peut maintenant l'acheter.",
    couleur: "#EC4899",
    bgGradient: "linear-gradient(135deg, #4A1942, #831843)",
    problemTitle: "L'artisanat africain exceptionnel reste invisible et sous-valorisé",
    problem: "L'Afrique est une mine de créativité : bogolan du Mali, kente du Ghana, wax ivoirien, bijoux touaregs, maroquinerie burkinabè. Des artisans extraordinaires, des créateurs de talent, des savoir-faire millénaires. Mais trouver ces produits ? Acheter en confiance ? Se faire livrer rapidement ? C'est là que ça se complique — pour les acheteurs locaux comme pour la diaspora.",
    solutionTitle: "MIFA Life : le luxe africain accessible partout",
    solution: "MIFA Life est la boutique e-commerce premium dédiée à la mode et à l'artisanat africain. Une sélection rigoureuse de créations authentiques, livrées partout en Afrique avec la qualité de service qu'elles méritent. Chaque produit est sélectionné à la main. Chaque créateur est vérifié.",
    features: [
      { icon: "👑", titre: "Sélection Premium, Authenticité Garantie", description: "Pas de contrefaçon. Pas d'articles 'inspirés de'. Chaque pièce MIFA Life est authentique, sourcée directement chez des artisans et créateurs vérifiés. Notre équipe certifie chaque partenaire." },
      { icon: "📱", titre: "Paiement Mobile Africain", description: "Orange Money, Wave, Moov Money — payez comme vous vivez. Aucune carte bancaire nécessaire. Paiement sécurisé en quelques secondes. Adapté aux réalités financières africaines." },
      { icon: "🚚", titre: "Livraison Rapide et Suivie", description: "Livraison express à Bamako, Ouagadougou, Dakar, Abidjan. Suivi en temps réel de votre commande. Livraison à domicile ou en point relais. Vos achats arrivent intacts, emballés avec soin." },
      { icon: "🌍", titre: "Pour la Diaspora Africaine", description: "Vous vivez en France, au Canada, aux États-Unis ? Envoyez des cadeaux authentiques à vos proches restés au pays. MIFA Life livre directement en Afrique. Envoyez du style. Envoyez de l'amour." },
      { icon: "💎", titre: "Collections Exclusives et Limitées", description: "Nouvelles collections chaque saison. Éditions limitées avec les meilleurs créateurs. Abonnez-vous aux alertes pour ne rien manquer des pièces les plus convoitées." },
      { icon: "🛍️", titre: "Expérience d'Achat Fluide", description: "Navigation intuitive. Fiches produits détaillées avec photos HD. Avis vérifiés. Retours facilités. Service client humain, disponible et réactif. Vous achetez en confiance." },
    ],
    audiences: [
      "Amateurs de mode africaine authentique",
      "Diaspora africaine cherchant des produits du continent",
      "Acheteurs de cadeaux haut de gamme africains",
      "Professionnels cherchant des pièces d'artisanat pour décoration",
      "Créateurs et artisans africains voulant vendre en ligne",
    ],
    testimonials: [
      { texte: "J'ai offert un ensemble bogolan à ma mère pour son anniversaire. Elle a pleuré de joie. Merci MIFA.", auteur: "Fatou D.", role: "Cliente diaspora, Paris" },
      { texte: "Je commande chaque mois. Qualité toujours au rendez-vous, livraison rapide.", auteur: "Bintou K.", role: "Cadre, Bamako" },
    ],
    ctaText: "Découvrir la Boutique",
    ctaUrl: "https://mifa-life-shop-9k55.vercel.app",
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
    testimonials: [
      { texte: "Avant, je savais mon rendement à ±5 %. Avec MillTrack, c'est au kilo près. Ça change tout pour les achats.", auteur: "Directeur technique", role: "Minoterie, Bobo-Dioulasso" },
      { texte: "J'ai réduit les arrêts machines de 40 % en 3 mois juste en suivant les données de maintenance.", auteur: "Responsable production", role: "Huilerie industrielle, Ouagadougou" },
    ],
    ctaText: "Planifier une Démo en Usine",
    ctaUrl: "https://milltrack.vercel.app",
  },
};
