// Offre de services. Trois offres, chacune formulée en résultat pour le client.
// Les prix sont des prix de lancement indicatifs en euros, confirmés par devis écrit.
// Aucun résultat chiffré n'est promis : la valeur se mesure sur les données du client.

export type Service = {
  slug: string;
  titre: string;
  promesse: string;
  pour: string;
  probleme: string;
  inclut: string[];
  livrable: string;
  prix: string;
  prixNote: string;
  sujet: string;
};

export const SERVICES: Service[] = [
  {
    slug: "relances-ia",
    titre: "Relances, ventes et SAV automatisés par l'IA",
    promesse: "Plus aucune demande, aucun devis et aucune facture ne reste sans réponse.",
    pour: "Entreprises qui vendent à d'autres entreprises et gèrent leurs prospects, devis, factures et demandes clients à la main, sur tableur, e-mail ou messagerie.",
    probleme:
      "Les prospects ne sont pas relancés au bon moment, les devis restent sans suite, les paiements arrivent en retard et les demandes clients se perdent entre plusieurs outils.",
    inclut: [
      "Cartographie de votre parcours devis → vente → encaissement → service après-vente",
      "Relances automatiques (e-mail, messagerie) avec validation humaine avant envoi sensible",
      "Assistant IA qui trie, résume et prépare les réponses à vos demandes clients",
      "Tableau de suivi : devis en attente, factures en retard, demandes ouvertes",
      "Prise en main de votre équipe et documentation",
    ],
    livrable: "Un système en service, branché sur vos outils existants, et un tableau de suivi lisible par le dirigeant.",
    prix: "À partir de 1 500 €",
    prixNote: "Mise en place. Suivi mensuel optionnel à partir de 150 €/mois.",
    sujet: "Relances, ventes et SAV automatisés",
  },
  {
    slug: "conseil-sur-mesure",
    titre: "Diagnostic et solution sur mesure",
    promesse: "Nous trouvons où votre entreprise perd du temps ou de l'argent, puis nous construisons la solution.",
    pour: "Dirigeants qui sentent qu'un processus coûte cher mais ne savent pas lequel, ni quoi automatiser en premier.",
    probleme:
      "Les données sont dispersées entre plusieurs outils, des tâches répétitives consomment du temps sans créer de valeur, et personne n'a de vue claire sur ce qui bloque.",
    inclut: [
      "Échange de découverte gratuit de 30 minutes, sans engagement",
      "Diagnostic payant à périmètre fixe : entretiens, observation des processus, analyse de vos données réelles",
      "Rapport écrit : constats vérifiables, causes probables, priorités et solutions chiffrées",
      "Si les preuves sont insuffisantes ou si la solution n'a pas de valeur claire, nous vous le disons",
      "Conception et mise en œuvre de la solution retenue, sur devis",
    ],
    livrable: "Un rapport de diagnostic écrit, puis, si vous le décidez, la solution déployée et testée.",
    prix: "Diagnostic à partir de 490 €",
    prixNote: "Montant déduit du prix de la mise en œuvre si vous poursuivez avec nous. Mise en œuvre sur devis.",
    sujet: "Diagnostic et solution sur mesure",
  },
  {
    slug: "site-web-b2b",
    titre: "Site web B2B animé",
    promesse: "Un site qui présente clairement votre entreprise et qui amène des demandes qualifiées.",
    pour: "PME, cabinets, industriels et indépendants qui vendent à des entreprises et dont le site actuel est absent, daté ou ne génère aucun contact.",
    probleme:
      "Un site lent, flou ou sans appel à l'action ne donne pas confiance à un décideur qui compare trois prestataires en dix minutes.",
    inclut: [
      "Message et structure pensés pour un décideur, pas pour un moteur de recherche seul",
      "Design sur mesure avec animations soignées, qui respectent les préférences de réduction de mouvement",
      "Rapide sur mobile et sur connexion lente, accessible (WCAG 2.1 AA visé)",
      "Formulaire de demande relié à votre messagerie, référencement de base, mise en ligne",
    ],
    livrable: "Un site en ligne, le code et les accès transférés, et une page de présentation de votre offre.",
    prix: "À partir de 900 €",
    prixNote: "Site de 5 pages. Page unique à partir de 450 €. Hébergement et domaine refacturés au coût.",
    sujet: "Site web B2B",
  },
];

export const ETAPES = [
  { t: "Découverte gratuite", d: "30 minutes pour comprendre votre activité et votre problème. Vous recevez un court résumé écrit de ce que nous avons compris." },
  { t: "Diagnostic ou proposition", d: "Un diagnostic payant à périmètre fixe, ou une proposition écrite pour un site ou une automatisation déjà bien cadrés." },
  { t: "Réalisation", d: "Points d'étape réguliers et version de test en ligne. Le périmètre et le prix sont fixés par écrit avant tout travail." },
  { t: "Mesure", d: "Nous relevons un indicateur au départ, puis le comparons sur vos propres données à 60 et 90 jours. Sans promesse de gain." },
];

// Ce que nous ne faisons pas — et le disons.
export const LIMITES = [
  "Nous ne promettons ni gain chiffré ni délai avant d'avoir analysé votre situation.",
  "Nous ne sommes pas un cabinet d'expertise comptable : la tenue légale des comptes et les déclarations restent l'affaire d'un professionnel agréé.",
  "Nous ne collectons ni ne gérons l'argent de tiers.",
  "Nous n'avons pas encore de client à citer : les trois premiers projets bénéficient d'un tarif de lancement en échange d'un avis écrit et signé.",
];
