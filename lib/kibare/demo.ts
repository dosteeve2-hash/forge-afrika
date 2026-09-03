import type { Portefeuille } from "./types";

/**
 * Portefeuille de démonstration — volontairement imparfait.
 * Il déclenche plusieurs constats contradictoires entre les personas,
 * ce qui est tout l'intérêt de la démonstration.
 * Les cours sont fictifs et servent uniquement à illustrer le moteur.
 */
export const PORTEFEUILLE_DEMO: Portefeuille = {
  cash: 450_000,
  lignes: [
    { id: "d1", nom: "Sonatel", secteur: "Télécoms", marche: "BRVM", quantite: 120, pru: 15_500, cours: 21_400 },
    { id: "d2", nom: "Orange Côte d'Ivoire", secteur: "Télécoms", marche: "BRVM", quantite: 80, pru: 12_800, cours: 14_200 },
    { id: "d3", nom: "Ecobank Transnational", secteur: "Banque", marche: "BRVM", quantite: 900, pru: 22, cours: 17 },
    { id: "d4", nom: "SIB", secteur: "Banque", marche: "BRVM", quantite: 60, pru: 8_900, cours: 7_100 },
    { id: "d5", nom: "Palmci", secteur: "Agro-industrie", marche: "BRVM", quantite: 150, pru: 6_400, cours: 6_900 },
    { id: "d6", nom: "Nvidia", secteur: "Technologie", marche: "International", quantite: 4, pru: 62_000, cours: 108_000 },
  ],
};

export const PORTEFEUILLE_VIDE: Portefeuille = { cash: 0, lignes: [] };

export const SECTEURS_SUGGERES = [
  "Télécoms",
  "Banque",
  "Agro-industrie",
  "Technologie",
  "Énergie",
  "Distribution",
  "Industrie",
  "Santé",
  "Immobilier",
  "Autre",
];
