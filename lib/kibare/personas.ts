import { pct1 } from "./engine";
import type { Constat, Persona } from "./types";

/**
 * Les cinq grilles de lecture.
 * Chaque persona est un ensemble de règles chiffrées et déterministes appliquées
 * au portefeuille — pas une imitation de style. Les seuils sont issus de la
 * doctrine publiée de chaque investisseur et sont volontairement discutables :
 * c'est le désaccord entre les cinq qui a de la valeur, pas le verdict d'un seul.
 */
export const PERSONAS: Persona[] = [
  {
    id: "buffett",
    nom: "Buffett & Munger",
    ecole: "Qualité et concentration",
    couleur: "#D4AF37",
    principe:
      "Peu de lignes, très bien comprises, achetées sous leur valeur. Le cash n'est pas un échec, c'est une option d'achat sans date d'expiration.",
    citation:
      "« La diversification est une protection contre l'ignorance. Elle n'a pas beaucoup de sens si vous savez ce que vous faites. »",
    analyser: (m) => {
      const c: Constat[] = [];

      if (m.nbLignes > 20) {
        c.push({
          personaId: "buffett",
          theme: "diversification",
          gravite: "attention",
          titre: `${m.nbLignes} lignes, c'est trop pour les suivre vraiment`,
          detail:
            "Au-delà d'une vingtaine de positions, plus personne ne lit sérieusement les comptes de chacune. La dispersion imite la prudence sans en produire les effets.",
          action: "Garder les convictions réelles, sortir des lignes tenues par habitude.",
        });
      } else if (m.nbLignes > 0 && m.nbLignes < 4) {
        c.push({
          personaId: "buffett",
          theme: "concentration",
          gravite: "attention",
          titre: `Seulement ${m.nbLignes} ligne(s) — concentration assumée ?`,
          detail:
            "La concentration est défendable, mais uniquement si chaque société est comprise en profondeur. Sinon ce n'est pas de la conviction, c'est un pari.",
          action: "Pour chaque ligne, écrire en cinq phrases pourquoi l'entreprise gagnera de l'argent dans dix ans. Si c'est impossible, la position est trop grosse.",
        });
      } else if (m.nbLignes > 0) {
        c.push({
          personaId: "buffett",
          theme: "diversification",
          gravite: "ok",
          titre: `${m.nbLignes} lignes — format lisible`,
          detail: "Un nombre de positions qui reste suivable une par une.",
          action: "Maintenir. Refuser toute ligne ajoutée sans thèse écrite.",
        });
      }

      if (m.poidsCash < 5) {
        c.push({
          personaId: "buffett",
          theme: "liquidites",
          gravite: "attention",
          titre: `${pct1(m.poidsCash)} de liquidités — aucune munition`,
          detail:
            "Sans cash, une baisse de marché devient une punition au lieu d'être une occasion. On subit au lieu d'acheter.",
          action: "Reconstituer une réserve avant la prochaine baisse, pas pendant.",
        });
      } else if (m.poidsCash > 45) {
        c.push({
          personaId: "buffett",
          theme: "liquidites",
          gravite: "attention",
          titre: `${pct1(m.poidsCash)} en liquidités — attente très longue`,
          detail:
            "Attendre est légitime quand rien n'est bon marché. Mais un cash durablement élevé sans liste d'achats précise devient de l'indécision déguisée en patience.",
          action: "Écrire les trois sociétés à acheter et le prix qui déclenche l'achat.",
        });
      } else {
        c.push({
          personaId: "buffett",
          theme: "liquidites",
          gravite: "ok",
          titre: `${pct1(m.poidsCash)} de liquidités disponibles`,
          detail: "Une réserve qui permet d'agir sans vendre dans l'urgence.",
          action: "Ne pas l'investir par ennui.",
        });
      }

      return c;
    },
  },

  {
    id: "graham",
    nom: "Benjamin Graham",
    ecole: "Investisseur défensif",
    couleur: "#00BCD4",
    principe:
      "Diversification suffisante, marge de sécurité, et une part défensive qui ne descend jamais sous 25 % du patrimoine.",
    citation:
      "« L'essentiel de l'investissement défensif est une diversification adéquate et le refus de payer trop cher. »",
    analyser: (m) => {
      const c: Constat[] = [];

      if (m.nbLignes > 0 && m.nbLignes < 10) {
        c.push({
          personaId: "graham",
          theme: "diversification",
          gravite: "critique",
          titre: `${m.nbLignes} ligne(s) — sous le minimum défensif`,
          detail:
            "La règle défensive demande entre 10 et 30 titres. En dessous, une seule faillite peut détruire une part irrécupérable du capital.",
          action: "Monter progressivement vers 10 lignes minimum avant d'augmenter les montants.",
        });
      } else if (m.nbLignes > 30) {
        c.push({
          personaId: "graham",
          theme: "diversification",
          gravite: "attention",
          titre: `${m.nbLignes} lignes — au-delà du seuil utile`,
          detail:
            "Passé une trentaine de titres, la diversification n'apporte presque plus de réduction du risque, mais coûte du temps et des frais.",
          action: "Consolider plutôt qu'ajouter.",
        });
      } else if (m.nbLignes > 0) {
        c.push({
          personaId: "graham",
          theme: "diversification",
          gravite: "ok",
          titre: `${m.nbLignes} lignes — dans la fourchette défensive`,
          detail: "Entre 10 et 30 titres, comme le prescrit l'investisseur défensif.",
          action: "Maintenir.",
        });
      }

      if (m.poidsCash < 25) {
        c.push({
          personaId: "graham",
          theme: "liquidites",
          gravite: "attention",
          titre: `Part défensive à ${pct1(m.poidsCash)} — sous les 25 % prescrits`,
          detail:
            "La règle demande de ne jamais descendre sous 25 % en actifs défensifs (liquidités, obligations), quelle que soit la confiance dans le marché.",
          action: "Ramener la part défensive vers 25 % au minimum.",
        });
      } else {
        c.push({
          personaId: "graham",
          theme: "liquidites",
          gravite: "ok",
          titre: `Part défensive à ${pct1(m.poidsCash)}`,
          detail: "Conforme à la règle des 25-75 %.",
          action: "Rééquilibrer une fois par an, mécaniquement.",
        });
      }

      if (m.poidsMax > 20) {
        c.push({
          personaId: "graham",
          theme: "concentration",
          gravite: "critique",
          titre: `${m.ligneMax} pèse ${pct1(m.poidsMax)} du patrimoine`,
          detail:
            "Aucune conviction ne justifie qu'une erreur unique puisse amputer un cinquième du capital. La marge de sécurité est d'abord une question de taille de position.",
          action: `Ramener ${m.ligneMax} sous 20 %, par allègement ou par renforcement du reste.`,
        });
      }

      return c;
    },
  },

  {
    id: "lynch",
    nom: "Peter Lynch",
    ecole: "Connaître ce que l'on détient",
    couleur: "#22C55E",
    principe:
      "N'acheter que des activités que l'on peut expliquer à un enfant, et ne jamais couper les gagnantes pour financer les perdantes.",
    citation:
      "« Certains coupent les fleurs et arrosent les mauvaises herbes. »",
    analyser: (m) => {
      const c: Constat[] = [];

      if (m.poidsPerdantes > m.poidsGagnantes && m.poidsPerdantes > 0) {
        c.push({
          personaId: "lynch",
          theme: "discipline",
          gravite: "critique",
          titre: `Les perdantes pèsent plus lourd que les gagnantes (${pct1(m.poidsPerdantes)} contre ${pct1(m.poidsGagnantes)})`,
          detail:
            "Les positions en forte perte occupent plus de place que celles en forte hausse. C'est la signature du biais le plus coûteux qui soit : garder ce qui baisse en espérant se refaire, et vendre ce qui monte pour sécuriser.",
          action: "Pour chaque perdante, se demander : est-ce que je l'achèterais aujourd'hui à ce prix ? Si non, la thèse est morte.",
        });
      } else if (m.nbPerdantes > 0) {
        c.push({
          personaId: "lynch",
          theme: "discipline",
          gravite: "attention",
          titre: `${m.nbPerdantes} ligne(s) en perte de plus de 20 %`,
          detail:
            "Une perte n'est pas un problème en soi. Une perte dont on n'a pas relu la thèse en est un.",
          action: "Relire la thèse d'achat de chacune, écrite ou reconstituée.",
        });
      } else if (m.nbLignes > 0) {
        c.push({
          personaId: "lynch",
          theme: "discipline",
          gravite: "ok",
          titre: "Aucune ligne en perte sévère",
          detail: "Rien qui indique un entêtement sur une thèse cassée.",
          action: "Continuer à écrire la thèse avant chaque achat.",
        });
      }

      if (m.nbSecteurs > 0 && m.nbSecteurs < 3) {
        c.push({
          personaId: "lynch",
          theme: "diversification",
          gravite: "attention",
          titre: `Seulement ${m.nbSecteurs} secteur(s) représenté(s)`,
          detail:
            "Investir dans ce que l'on connaît ne veut pas dire investir dans un seul métier. Un secteur peut rester déprimé dix ans sans que personne n'y puisse rien.",
          action: "Chercher une deuxième compétence sectorielle réelle, pas une ligne de plus.",
        });
      }

      return c;
    },
  },

  {
    id: "dalio",
    nom: "Ray Dalio",
    ecole: "Équilibre du risque",
    couleur: "#A78BFA",
    principe:
      "Ce qui compte n'est pas le nombre de lignes mais le nombre de risques réellement différents. Deux titres du même secteur ne font qu'un pari.",
    citation:
      "« La diversification est le seul repas gratuit de la finance. »",
    analyser: (m) => {
      const c: Constat[] = [];

      if (m.hhi > 0.25) {
        c.push({
          personaId: "dalio",
          theme: "concentration",
          gravite: "critique",
          titre: `Concentration du risque élevée (indice ${m.hhi.toFixed(2)})`,
          detail:
            "L'indice de Herfindahl mesure à quel point le risque est logé dans peu de positions. Au-delà de 0,25, le portefeuille se comporte comme s'il ne comptait que trois ou quatre paris.",
          action: "Réduire les deux plus grosses lignes avant d'en ajouter de nouvelles.",
        });
      } else if (m.nbLignes > 0) {
        c.push({
          personaId: "dalio",
          theme: "concentration",
          gravite: "ok",
          titre: `Risque réparti (indice ${m.hhi.toFixed(2)})`,
          detail: "Aucune position ne domine mécaniquement le comportement de l'ensemble.",
          action: "Surveiller l'indice après chaque renforcement.",
        });
      }

      if (m.poidsSecteurMax > 35) {
        c.push({
          personaId: "dalio",
          theme: "diversification",
          gravite: "critique",
          titre: `${pct1(m.poidsSecteurMax)} du patrimoine sur le secteur « ${m.secteurMax} »`,
          detail:
            "Plusieurs lignes d'un même secteur montent et descendent ensemble. Le portefeuille paraît diversifié et ne l'est pas : c'est un seul pari en plusieurs morceaux.",
          action: `Traiter « ${m.secteurMax} » comme une position unique et la dimensionner comme telle.`,
        });
      }

      if (m.nbLignes > 0 && (m.poidsBRVM > 90 || m.poidsBRVM < 10)) {
        const zone = m.poidsBRVM > 90 ? "la BRVM" : "les marchés internationaux";
        c.push({
          personaId: "dalio",
          theme: "diversification",
          gravite: "attention",
          titre: `Exposition presque exclusive à ${zone}`,
          detail:
            "Une seule zone monétaire et réglementaire, c'est un seul régime économique. Le franc CFA et le dollar ne réagissent pas aux mêmes chocs.",
          action: "Chercher une exposition à un régime différent, même modeste.",
        });
      }

      return c;
    },
  },

  {
    id: "marks",
    nom: "Howard Marks",
    ecole: "Position dans le cycle",
    couleur: "#F97316",
    principe:
      "On ne prédit pas le marché, on sait où l'on se trouve dans le cycle — et on ajuste sa prudence, pas ses prévisions.",
    citation:
      "« Nous ne pouvons pas savoir où nous allons, mais nous ferions bien de savoir où nous sommes. »",
    analyser: (m) => {
      const c: Constat[] = [];

      if (m.plusValuePct > 40) {
        c.push({
          personaId: "marks",
          theme: "cycle",
          gravite: "attention",
          titre: `Plus-value latente de ${pct1(m.plusValuePct)} — attention à l'attribution`,
          detail:
            "Après une forte hausse, chacun se croit bon investisseur. La question à se poser n'est pas « ai-je eu raison ? » mais « qu'est-ce qui, dans ce résultat, vient du marché plutôt que de moi ? »",
          action: "Augmenter la prudence quand tout monte : alléger les positions devenues trop grosses par la hausse elle-même.",
        });
      } else if (m.plusValuePct < -20) {
        c.push({
          personaId: "marks",
          theme: "cycle",
          gravite: "attention",
          titre: `Moins-value latente de ${pct1(Math.abs(m.plusValuePct))} — le pire moment pour capituler`,
          detail:
            "Les cycles se retournent quand le pessimisme est maximal. Vendre par lassitude après la baisse est la façon la plus fiable de transformer une perte temporaire en perte définitive.",
          action: "Ne rien vendre sous le coup de la baisse. Relire les thèses, pas les cours.",
        });
      } else if (m.nbLignes > 0) {
        c.push({
          personaId: "marks",
          theme: "cycle",
          gravite: "ok",
          titre: `Performance latente de ${pct1(m.plusValuePct)} — rien d'extrême`,
          detail: "Ni euphorie ni capitulation : la période où les décisions sont les moins mauvaises.",
          action: "C'est maintenant qu'on écrit ses règles, pas pendant la tempête.",
        });
      }

      if (m.poidsMax > 30) {
        c.push({
          personaId: "marks",
          theme: "concentration",
          gravite: "attention",
          titre: `${m.ligneMax} à ${pct1(m.poidsMax)} — le risque de ruine avant le rendement`,
          detail:
            "Survivre passe avant performer. Une position de cette taille rend un scénario défavorable difficilement rattrapable, quelle que soit la qualité de l'analyse.",
          action: "Se demander : si cette ligne perdait 70 %, est-ce que je continue d'investir sereinement ?",
        });
      }

      return c;
    },
  },
];

export const LIBELLES_THEMES: Record<string, string> = {
  concentration: "Concentration",
  liquidites: "Liquidités",
  diversification: "Diversification",
  cycle: "Cycle de marché",
  discipline: "Discipline",
};
