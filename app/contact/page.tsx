import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Contact — FORGE Afrika",
  description:
    "Écrire à FORGE Afrika : industriels et PME cherchant un outil de gestion, investisseurs et partenaires, étudiants et développeurs.",
};

const EMAIL = "docompaore2@gmail.com";
const GITHUB = "https://github.com/dosteeve2-hash";

interface Piste {
  titre: string;
  pourQui: string;
  couleur: string;
  icone: string;
  attendu: string[];
  sujet: string;
  corps: string;
  bouton: string;
}

const PISTES: Piste[] = [
  {
    titre: "Vous dirigez une PME ou une unité de transformation",
    pourQui: "Industriels, coopératives, transformateurs, commerçants",
    couleur: "#22C55E",
    icone: "🏭",
    attendu: [
      "Une demi-journée dans votre unité, pour comprendre comment vous travaillez aujourd'hui",
      "Un état des lieux écrit de vos pertes et de ce qui n'est pas mesuré — que vous gardez, même si nous ne travaillons pas ensemble",
      "Aucune démonstration commerciale avant d'avoir vu votre production",
    ],
    sujet: "Prise de contact — PME / unité de transformation",
    corps:
      "Bonjour,\n\nNotre activité : \nCe que nous transformons : \nCe que nous n'arrivons pas à mesurer aujourd'hui : \nVille : \n\n",
    bouton: "Écrire à propos de mon activité",
  },
  {
    titre: "Vous investissez, ou vous voulez le faire",
    pourQui: "Investisseurs, diaspora, structures de financement",
    couleur: "#D4AF37",
    icone: "📈",
    attendu: [
      "Un état honnête d'avancement : ce qui tourne, ce qui n'est qu'un prototype, ce qui reste une idée",
      "Aucune promesse de rendement, aucune projection embellie",
      "Le document de référence du groupe, AMBITIONS.md, est public dans le dépôt — commencez par là",
    ],
    sujet: "Prise de contact — investissement / partenariat financier",
    corps:
      "Bonjour,\n\nQui je suis : \nCe qui m'intéresse dans FORGE Afrika : \nCe que je cherche à comprendre en priorité : \n\n",
    bouton: "Écrire à propos d'un investissement",
  },
  {
    titre: "Vous voulez construire avec nous",
    pourQui: "Développeurs, étudiants, ONG, institutions",
    couleur: "#00BCD4",
    icone: "🤝",
    attendu: [
      "Les dépôts sont ouverts sur GitHub : lisez le code avant d'écrire",
      "Les besoins concrets sont listés dans AMBITIONS.md, avec les décisions encore à trancher",
      "Une réponse honnête sur ce qui est utile maintenant, et ce qui ne l'est pas encore",
    ],
    sujet: "Prise de contact — collaboration",
    corps:
      "Bonjour,\n\nCe que je fais : \nCe sur quoi je pense pouvoir aider : \nDisponibilité : \n\n",
    bouton: "Écrire à propos d'une collaboration",
  },
];

function lienMail(sujet: string, corps: string): string {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
}

export default function ContactPage() {
  return (
    <main className="min-h-screen" style={{ background: "#0A1628" }}>
      <Nav />

      <div className="pt-28 pb-24 px-4 max-w-4xl mx-auto">
        <header className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Parlons</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            FORGE Afrika est dirigé par une personne, pas par un service commercial.
            Chaque message est lu et reçoit une réponse — dites simplement d'où vous venez.
          </p>
        </header>

        <div className="space-y-5 mb-14">
          {PISTES.map((piste) => (
            <section
              key={piste.titre}
              className="card-navy rounded-2xl p-6 sm:p-7"
              style={{ borderLeft: `3px solid ${piste.couleur}` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">{piste.icone}</span>
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{piste.titre}</h2>
                  <p className="text-xs" style={{ color: piste.couleur }}>
                    {piste.pourQui}
                  </p>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
                Ce à quoi vous pouvez vous attendre
              </p>
              <ul className="space-y-2 mb-6">
                {piste.attendu.map((a) => (
                  <li key={a} className="text-sm text-gray-400 flex gap-3 leading-relaxed">
                    <span style={{ color: piste.couleur }}>—</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>

              <a
                href={lienMail(piste.sujet, piste.corps)}
                className="inline-block text-sm px-5 py-2.5 rounded-xl font-medium transition-transform hover:scale-[1.02]"
                style={{ background: `${piste.couleur}1F`, color: piste.couleur, border: `1px solid ${piste.couleur}55` }}
              >
                {piste.bouton} →
              </a>
            </section>
          ))}
        </div>

        {/* Canaux directs */}
        <section className="card-navy rounded-2xl p-6 sm:p-7 mb-10">
          <h2 className="text-lg font-bold text-white mb-5">Directement</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="rounded-xl p-4 transition-colors hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="text-xs text-gray-500 mb-1">E-mail</div>
              <div className="text-white text-sm break-all">{EMAIL}</div>
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl p-4 transition-colors hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="text-xs text-gray-500 mb-1">Code et documents</div>
              <div className="text-white text-sm">github.com/dosteeve2-hash ↗</div>
            </a>
          </div>
          <p className="text-xs text-gray-600 mt-5 leading-relaxed">
            Basé à Tokat, Turquie (UTC+3) · Marché : Burkina Faso et UEMOA.
            Réponse sous quelques jours — c'est un projet mené en parallèle d'études, et cette page
            préfère le dire plutôt que promettre une réponse sous 24 heures.
          </p>
        </section>

        <div className="text-center">
          <Link href="/ecosystem" className="text-sm" style={{ color: "#D4AF37" }}>
            Voir d'abord ce que fait le groupe →
          </Link>
        </div>
      </div>
    </main>
  );
}
