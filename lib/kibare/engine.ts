import type {
  LigneCalculee,
  Metriques,
  Portefeuille,
} from "./types";

/** Calcule les lignes enrichies. Purement local, aucun appel réseau. */
export function calculerLignes(p: Portefeuille): LigneCalculee[] {
  const valeurTitres = p.lignes.reduce((s, l) => s + l.quantite * l.cours, 0);
  const total = valeurTitres + p.cash;

  return p.lignes.map((l) => {
    const valeur = l.quantite * l.cours;
    const cout = l.quantite * l.pru;
    const plusValue = valeur - cout;
    return {
      ...l,
      valeur,
      cout,
      poids: total > 0 ? (valeur / total) * 100 : 0,
      plusValue,
      plusValuePct: cout > 0 ? (plusValue / cout) * 100 : 0,
    };
  });
}

/** Agrège les métriques de risque du portefeuille. */
export function calculerMetriques(
  p: Portefeuille,
  lignes: LigneCalculee[]
): Metriques {
  const valeurTitres = lignes.reduce((s, l) => s + l.valeur, 0);
  const total = valeurTitres + p.cash;
  const coutTotal = lignes.reduce((s, l) => s + l.cout, 0);

  const parSecteur = new Map<string, number>();
  for (const l of lignes) {
    parSecteur.set(l.secteur, (parSecteur.get(l.secteur) ?? 0) + l.valeur);
  }

  let secteurMax = "—";
  let valeurSecteurMax = 0;
  for (const [secteur, valeur] of parSecteur) {
    if (valeur > valeurSecteurMax) {
      valeurSecteurMax = valeur;
      secteurMax = secteur;
    }
  }

  const triees = [...lignes].sort((a, b) => b.valeur - a.valeur);
  const premiere = triees[0];

  // HHI calculé sur les titres seuls : mesure la concentration du risque actions.
  const hhi = lignes.reduce((s, l) => {
    const part = valeurTitres > 0 ? l.valeur / valeurTitres : 0;
    return s + part * part;
  }, 0);

  const perdantes = lignes.filter((l) => l.plusValuePct < -20);
  const gagnantes = lignes.filter((l) => l.plusValuePct > 20);
  const valeurBRVM = lignes
    .filter((l) => l.marche === "BRVM")
    .reduce((s, l) => s + l.valeur, 0);

  const pct = (part: number): number => (total > 0 ? (part / total) * 100 : 0);

  return {
    valeurTitres,
    cash: p.cash,
    total,
    poidsCash: pct(p.cash),
    nbLignes: lignes.length,
    poidsMax: premiere ? pct(premiere.valeur) : 0,
    ligneMax: premiere ? premiere.nom : "—",
    hhi: lignes.length > 0 ? hhi : 0,
    nbSecteurs: parSecteur.size,
    poidsSecteurMax: pct(valeurSecteurMax),
    secteurMax,
    plusValueTotale: valeurTitres - coutTotal,
    plusValuePct: coutTotal > 0 ? ((valeurTitres - coutTotal) / coutTotal) * 100 : 0,
    nbPerdantes: perdantes.length,
    poidsPerdantes: pct(perdantes.reduce((s, l) => s + l.valeur, 0)),
    poidsGagnantes: pct(gagnantes.reduce((s, l) => s + l.valeur, 0)),
    poidsBRVM: pct(valeurBRVM),
  };
}

/** Arrondi d'affichage à une décimale. */
export const pct1 = (n: number): string => `${n.toFixed(1)} %`;
