import type { Metadata } from "next";
import Link from "next/link";
import { FAITS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos",
  description: "Qui est derrière Forge Afrika, où en est le projet, et la feuille de route.",
};

const FEUILLE_DE_ROUTE = [
  { phase: "1", titre: "Fondations", etat: "En cours", detail: "Site honnête, données fictives retirées, identité, adresse professionnelle, documentation." },
  { phase: "2", titre: "Première offre commerciale", etat: "En cours", detail: "Services vendables, formulaire de demande, processus de devis, immatriculation." },
  { phase: "3", titre: "Premier produit", etat: "À venir", detail: "ÉlevageTrack : registre en base, accueil des nouveaux utilisateurs, retours d'usage." },
  { phase: "4", titre: "Premiers utilisateurs", etat: "À venir", detail: "Des utilisateurs réels, nommés, jamais simulés." },
  { phase: "5", titre: "Premiers revenus", etat: "À venir", detail: "Tarifs, facturation, contrats, support." },
  { phase: "6", titre: "Croissance", etat: "Plus tard", detail: "Automatisation, équipe, partenaires, autres pays." },
];

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">À propos</h1>

      <section className="mt-8 space-y-4 text-gray-300">
        <h2 className="font-display text-xl font-bold text-white">Le fondateur</h2>
        <p>
          <strong className="text-white">{SITE.fondateur}</strong> — fondateur. Burkinabè, originaire de Ouagadougou,
          étudiant en informatique à l&apos;Université de Tokat Gaziosmanpaşa (Turquie). Il conçoit, développe et
          déploie seul les produits Forge Afrika.
        </p>
        <p>
          Forge Afrika part d&apos;un constat simple : l&apos;Afrique de l&apos;Ouest exporte ses matières premières
          brutes et importe des produits finis. Entre le champ et l&apos;usine, il manque des outils — de gestion, de
          traçabilité, de confiance. Ce sont ces outils, peu visibles mais indispensables, que nous voulons construire.
        </p>
        <p>
          Il n&apos;y a pas d&apos;équipe, pas de cofondateur et pas d&apos;employé. Quand un projet le demandera, nous
          travaillerons avec des collaborateurs nommés.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-white">Les questions qu&apos;on nous pose</h2>
        <dl className="mt-5 divide-y divide-white/10 rounded-xl border border-white/10">
          {FAITS.map((f) => (
            <div key={f.q} className="p-4">
              <dt className="font-semibold text-white">{f.q}</dt>
              <dd className="mt-1 text-sm text-gray-300">{f.r}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12" id="feuille-de-route">
        <h2 className="font-display text-xl font-bold text-white">Feuille de route</h2>
        <p className="mt-2 text-sm text-gray-400">Sans dates promises : chaque phase commence quand la précédente est réellement terminée.</p>
        <ol className="mt-5 space-y-3">
          {FEUILLE_DE_ROUTE.map((e) => (
            <li key={e.phase} className="flex gap-4 rounded-xl border border-white/10 p-4">
              <span className="font-mono text-gold">{e.phase}</span>
              <div>
                <p className="font-semibold text-white">
                  {e.titre} <span className="ml-2 font-mono text-xs text-cyan">{e.etat}</span>
                </p>
                <p className="mt-1 text-sm text-gray-300">{e.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Link href="/contact" className="mt-10 inline-block rounded-lg bg-gold px-5 py-3 font-bold text-navy hover:opacity-90">
        Nous écrire
      </Link>
    </div>
  );
}
