/**
 * Contenu détaillé de chaque filiale, pour les pages /ecosystem/[slug].
 * Source : les specs et briefs du dépôt (LOGICIELS/, docs/).
 * `lib/constants.ts` reste la source de vérité pour l'identité des filiales
 * (nom, slug, catégorie, statut, couleur, URL) — ce fichier ne fait que l'enrichir.
 */

export interface DetailFiliale {
  accroche: string;
  contexte: string;
  problemes: string[];
  solutions: string[];
  cible: string;
  zone: string;
  /** Chemin d'un document du dépôt qui documente la filiale, si disponible. */
  documentation?: string;
  depot?: string;
}

export const DETAILS_FILIALES: Record<string, DetailFiliale> = {
  sugu: {
    accroche: "La boutique de quartier, enfin outillée.",
    contexte:
      "Le commerce informel représente l'essentiel de l'activité de détail en Afrique de l'Ouest. Des centaines de milliers de boutiques tiennent leurs comptes de tête ou sur un cahier, sans jamais savoir ce qui se vend vraiment.",
    problemes: [
      "Stock suivi de mémoire : ruptures sur les produits qui tournent, capital immobilisé sur ceux qui dorment",
      "Aucune vision de la marge réelle par produit",
      "Crédit client noté sur un carnet, souvent oublié ou contesté",
      "Impossible de prouver son activité pour obtenir un financement",
    ],
    solutions: [
      "Saisie des ventes en quelques secondes, pensée pour un téléphone d'entrée de gamme",
      "Suivi du stock et alertes de réapprovisionnement",
      "Carnet de crédit client numérique, consultable par le commerçant et son client",
      "Bilan mensuel simple : ce qui rentre, ce qui sort, ce qui reste",
    ],
    cible: "Commerçants et boutiquiers du secteur informel",
    zone: "Burkina Faso, puis Afrique de l'Ouest",
    depot: "duka-boutique",
  },

  "mifa-life": {
    accroche: "La mode africaine, vendue comme elle le mérite.",
    contexte:
      "MIFA Life repositionne la mode africaine contemporaine — kente, dashiki, wax revisités : de l'artisanat invisible à l'expérience d'achat premium, à destination de la diaspora et des clientèles locales exigeantes.",
    problemes: [
      "La mode africaine est quasi absente des grandes plateformes mondiales",
      "La confiance manque à l'achat en ligne en Afrique : fraudes, pas de garantie de retour",
      "Les délais de livraison sont imprécis, sans suivi fiable",
      "Les grilles de tailles européennes ne correspondent pas aux morphologies africaines",
    ],
    solutions: [
      "Boutique premium avec storytelling des artisans et des créations",
      "Paiements adaptés au marché : mobile money et carte",
      "Suivi de commande de bout en bout, notifications à chaque étape",
      "Grille de tailles pensée pour la clientèle visée",
    ],
    cible: "Diaspora africaine et clientèle locale premium",
    zone: "Mali et Afrique de l'Ouest, expédition internationale",
    documentation: "LOGICIELS/mifa-life-spec.md",
    depot: "Mifa_Life_shop",
  },

  taama: {
    accroche: "Ce qui n'est pas mesuré ne s'améliore jamais.",
    contexte:
      "TAAMA — « le voyage, la progression » en mooré — est l'ERP industriel du groupe, conçu pour les PME de transformation agroalimentaire et industrielle d'Afrique de l'Ouest. Depuis les suspensions d'exportation du karité brut (2024) et de la noix de cajou brute (2025), des négociants deviennent transformateurs du jour au lendemain, sans outils.",
    problemes: [
      "Production pilotée à l'aveugle : la majorité des PME africaines gèrent leur production manuellement",
      "Taux d'extraction jamais mesuré : des tonnes de matière perdues sans que personne ne le voie",
      "Traçabilité absente, donc export certifié inaccessible",
      "Les ERP existants coûtent des millions de FCFA et échouent à l'adoption",
    ],
    solutions: [
      "Suivi de production par lot, du lot de matière première au produit fini",
      "Calcul automatique des rendements et détection des pertes",
      "Traçabilité lot-to-source exportable pour les acheteurs et les certificateurs",
      "Inventaire multi-sites et tableau de bord des coûts réels",
    ],
    cible: "PME de transformation : karité, sésame, anacarde, céréales, savonneries",
    zone: "Burkina Faso, puis UEMOA",
    documentation: "LOGICIELS/taama-spec-technique.md",
    depot: "taama",
  },

  comptrack: {
    accroche: "La comptabilité SYSCOHADA, sans comptable et sans Excel.",
    contexte:
      "CompTrack applique nativement le Plan Comptable OHADA, en vigueur dans 17 États d'Afrique de l'Ouest et du Centre — un référentiel que les logiciels internationaux ne gèrent pas.",
    problemes: [
      "Plus de 80 % des PME africaines tiennent leur comptabilité sur papier ou sur Excel",
      "Sage et QuickBooks ne gèrent pas nativement le SYSCOHADA : retraitements manuels permanents",
      "Les licences coûtent de 300 000 à 2 millions de FCFA par an — hors de portée",
      "Sans bilan SYSCOHADA certifiable, les banques refusent le crédit",
    ],
    solutions: [
      "Plan comptable OHADA intégré, écritures guidées",
      "Multi-devises FCFA, EUR et USD avec suivi des écarts de change",
      "États financiers et rapports compatibles avec les exigences de la DGI",
      "Tarification pensée pour une PME africaine, pas pour un grand compte européen",
    ],
    cible: "PME formelles, artisans, coopératives, ONG locales, cabinets comptables",
    zone: "Burkina Faso → Sénégal → Côte d'Ivoire → Mali → Togo",
    documentation: "LOGICIELS/comptrack-spec.md",
    depot: "comptrack",
  },

  forja: {
    accroche: "De la parcelle au conteneur, sans rupture d'information.",
    contexte:
      "FORJA suit les filières agricoles d'export d'Afrique de l'Ouest — karité, anacarde, sésame — là où la valeur se perd aujourd'hui entre le producteur et l'acheteur international.",
    problemes: [
      "Contrats export perdus faute de preuves documentaires lors des audits",
      "Recertifications impossibles sans historique structuré des lots",
      "Les grands acteurs ont des systèmes maison ; les PME n'ont rien",
      "Les exigences des acheteurs et des certifications se durcissent chaque année",
    ],
    solutions: [
      "Suivi des lots depuis la collecte jusqu'au conteneur",
      "Dossier de certification constitué au fil de l'eau, pas reconstitué la veille de l'audit",
      "Gestion des campagnes, des collecteurs et des paiements producteurs",
      "Rapports export prêts pour les acheteurs et les organismes certificateurs",
    ],
    cible: "Exportateurs et groupements de producteurs de produits agricoles",
    zone: "Burkina Faso et corridor CEDEAO",
    documentation: "LOGICIELS/forja-product-brief.md",
    depot: "forja",
  },

  "ueemt-tokat": {
    accroche: "Une communauté étudiante, structurée et visible.",
    contexte:
      "Plateforme digitale de l'Union des Élèves et Étudiants Maliens à Tokat, en Turquie. Le premier terrain d'application du groupe : une communauté réelle, avec des besoins réels.",
    problemes: [
      "Informations dispersées entre groupes de discussion et bouche-à-oreille",
      "Aucun annuaire des membres ni mémoire des promotions passées",
      "Événements et démarches administratives mal relayés",
      "Aucune visibilité pour les nouveaux arrivants avant leur départ",
    ],
    solutions: [
      "Site officiel de l'association et présentation du bureau",
      "Annonces, événements et informations pratiques centralisés",
      "Ressources pour les nouveaux étudiants",
      "Vitrine de la communauté vers l'extérieur",
    ],
    cible: "Étudiants africains à Tokat et futurs arrivants",
    zone: "Tokat, Turquie",
    depot: "ueemt-tokat",
  },

  "agrotrack-bf": {
    accroche: "Le cahier de la coopérative, en mieux — et sans internet.",
    contexte:
      "Les coopératives agricoles du Burkina gèrent des centaines de membres et des milliers de tonnes sur des cahiers, sans connexion, sous quarante degrés. AgroTrack numérise ce travail sans exiger de réseau permanent.",
    problemes: [
      "Pesée et collecte sans traçabilité : pertes, fraudes et litiges entre membres",
      "Paiements calculés à la main : erreurs, retards, méfiance",
      "Inventaires approximatifs : sur-vente ou sous-utilisation des stocks",
      "Rapports bailleurs reconstitués en plusieurs semaines de travail",
    ],
    solutions: [
      "Registre des membres, des parcelles et des livraisons",
      "Suivi des paiements : qui a été payé, combien, ce qui reste dû",
      "Fonctionnement hors ligne intégral, synchronisation à la première connexion",
      "Rapports PDF pour les banques, bailleurs et acheteurs certifiés",
    ],
    cible: "Coopératives coton, sésame, karité et anacarde",
    zone: "Burkina Faso, puis Mali et Niger",
    documentation: "docs/agrotrack-bf.md",
    depot: "agrotrack-bf",
  },

  milltrack: {
    accroche: "Combien est entré, combien est sorti, où est passée la perte.",
    contexte:
      "Une minoterie qui traite 500 tonnes de maïs par mois ignore le plus souvent son rendement réel par ligne de production. MillTrack répond à cette question en continu, sans expertise ERP préalable.",
    problemes: [
      "Rendement par ligne de production inconnu : les pertes restent invisibles",
      "Coûts réels par lot transformé jamais calculés",
      "Maintenance uniquement réactive : les arrêts machine coûtent cher",
      "Bilan de production mensuel impossible sans des semaines de saisie",
    ],
    solutions: [
      "Suivi des entrées et sorties par ligne, en temps réel",
      "Calcul du rendement et du coût par lot",
      "Alertes machines et historique de maintenance",
      "Bilan de production généré automatiquement",
    ],
    cible: "Minoteries, huileries, unités d'égrenage",
    zone: "Burkina Faso et Afrique de l'Ouest",
    documentation: "docs/milltrack.md",
    depot: "milltrack",
  },

  livestockos: {
    accroche: "Un troupeau qu'on suit vaut plus qu'un troupeau qu'on compte.",
    contexte:
      "L'élevage pèse une part majeure de l'économie burkinabè et fait vivre une grande partie de la population. Pourtant un éleveur de 200 têtes n'a aucun outil pour suivre la santé de son troupeau ni prouver son activité à une banque.",
    problemes: [
      "Maladies détectées trop tard : mortalité élevée et pertes brutales",
      "Prix négociés à l'aveugle : bétail systématiquement sous-valorisé",
      "Alimentation et médicaments gérés de mémoire : ruptures ou gaspillage",
      "Aucun historique de production, donc aucun accès au crédit",
    ],
    solutions: [
      "Registre du troupeau et suivi sanitaire animal par animal",
      "Historique des ventes et des prix pratiqués",
      "Gestion des stocks d'aliments et de produits vétérinaires",
      "Bilan d'activité exploitable face à une banque",
    ],
    cible: "Éleveurs sahéliens et coopératives d'élevage",
    zone: "Sahel : Burkina Faso, Mali, Niger",
    documentation: "docs/livestock-os.md",
    depot: "livestockos",
  },

  "valuechain-connect": {
    accroche: "Le producteur de Dori et l'huilerie de Bobo ne se connaissent pas. C'est le problème.",
    contexte:
      "La chaîne de valeur agricole ouest-africaine est fragmentée par un problème d'information, pas par un manque de production. ValueChain Connect met en relation directe ceux qui produisent et ceux qui transforment.",
    problemes: [
      "Les producteurs vendent localement à bas prix, sans accès aux acheteurs industriels",
      "Les transformateurs subissent un approvisionnement incertain et de qualité variable",
      "Des intermédiaires captent une large part de la marge sans créer de valeur",
      "Les certifications restent trop complexes pour les petits volumes",
    ],
    solutions: [
      "Places d'offres et de demandes par produit, qualité et volume",
      "Profils vérifiés des producteurs et des transformateurs",
      "Traçabilité intégrée aux transactions",
      "Documentation des certifications constituée avec la transaction",
    ],
    cible: "Producteurs, coopératives, transformateurs et exportateurs",
    zone: "Zone CEDEAO",
    documentation: "docs/valuechain-connect.md",
    depot: "valuechain-connect",
  },
};
