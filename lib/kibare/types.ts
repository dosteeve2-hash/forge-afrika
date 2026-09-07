/**
 * KIBARÉ — Types du moteur d'analyse local.
 * Aucune de ces données ne quitte le navigateur : voir lib/kibare/engine.ts.
 */

export type Marche = "BRVM" | "International";

export interface Ligne {
  id: string;
  nom: string;
  secteur: string;
  marche: Marche;
  quantite: number;
  /** Prix de revient unitaire, en FCFA */
  pru: number;
  /** Cours actuel saisi manuellement, en FCFA */
  cours: number;
}

export interface Portefeuille {
  lignes: Ligne[];
  /** Liquidités disponibles, en FCFA */
  cash: number;
}

export interface LigneCalculee extends Ligne {
  valeur: number;
  cout: number;
  /** Poids dans le portefeuille total (cash inclus), en % */
  poids: number;
  plusValue: number;
  plusValuePct: number;
}

export interface Metriques {
  valeurTitres: number;
  cash: number;
  total: number;
  poidsCash: number;
  nbLignes: number;
  poidsMax: number;
  ligneMax: string;
  /** Indice de Herfindahl-Hirschman sur les poids — 1 = une seule ligne */
  hhi: number;
  nbSecteurs: number;
  poidsSecteurMax: number;
  secteurMax: string;
  plusValueTotale: number;
  plusValuePct: number;
  nbPerdantes: number;
  poidsPerdantes: number;
  poidsGagnantes: number;
  poidsBRVM: number;
}

export type Gravite = "critique" | "attention" | "ok";

export type Theme =
  | "concentration"
  | "liquidites"
  | "diversification"
  | "cycle"
  | "discipline";

export interface Constat {
  personaId: string;
  theme: Theme;
  gravite: Gravite;
  titre: string;
  detail: string;
  action: string;
}

export interface Persona {
  id: string;
  nom: string;
  ecole: string;
  couleur: string;
  principe: string;
  citation: string;
  analyser: (m: Metriques, lignes: LigneCalculee[]) => Constat[];
}

export interface EntreeAudit {
  horodatage: string;
  cible: string;
  methode: string;
  /** true si la requête contenait une donnée issue du portefeuille */
  fuite: boolean;
}
