import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUITS } from "@/lib/produits";
import { SERVICES } from "@/lib/services";
import { SITE } from "@/lib/site";
import ProduitCarte from "@/components/ProduitCarte";

const prioritaire = PRODUITS.find((p) => p.niveau === "prioritaire");
const enCours = PRODUITS.filter((p) => p.niveau === "developpement");

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">Startup technologique africaine · phase de démarrage</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-6xl">
          Des processus qui <span className="text-gradient-gold">ne laissent plus rien passer</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-300">{SITE.phrase}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-3 font-bold text-navy hover:opacity-90">
            Échange de 30 minutes <ArrowRight size={16} />
          </Link>
          <Link href="/services" className="rounded-lg border border-white/20 px-5 py-3 font-semibold text-white hover:border-gold/60">
            Voir nos services
          </Link>
        </div>
      </section>

      {/* 2. Problème */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-2">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Le problème</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              Prospects non relancés, devis sans suite, factures payées en retard, demandes clients perdues entre plusieurs
              outils : dans beaucoup d&apos;entreprises, ces fuites sont invisibles parce que personne ne les mesure.
            </p>
            <p>
              Nous commençons par comprendre votre fonctionnement et par mesurer. Nous construisons une solution seulement
              si les données montrent qu&apos;elle a de la valeur.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Services */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Ce que nous faisons</h2>
          <p className="mt-2 max-w-2xl text-gray-300">
            Trois offres, décrites par ce que vous obtenez. Prix de lancement en euros, confirmés par devis écrit.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {SERVICES.map((s) => (
              <li key={s.slug} className="flex flex-col rounded-xl border border-white/10 p-5">
                <h3 className="font-bold text-white">{s.titre}</h3>
                <p className="mt-2 text-sm text-gold">{s.promesse}</p>
                <p className="mt-2 text-sm text-gray-300">{s.pour}</p>
                <p className="mt-auto pt-4 font-mono text-sm text-white">{s.prix}</p>
              </li>
            ))}
          </ul>
          <Link href="/services" className="mt-6 inline-block text-sm font-semibold text-gold hover:underline">
            Détail des offres et de la méthode →
          </Link>
        </div>
      </section>

      {/* 3–4. Ce que nous construisons / produits */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Nos produits en construction</h2>
            <p className="mt-2 max-w-2xl text-gray-300">
              Aucun n&apos;a encore de client. Chacun affiche son statut réel : ce qui fonctionne, et ce qui manque.
            </p>
          </div>
          <Link href="/produits" className="text-sm font-semibold text-gold hover:underline">
            Tous les produits ({PRODUITS.length}) →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[prioritaire, ...enCours].filter((p) => p !== undefined).map((p) => (
            <ProduitCarte key={p.slug} produit={p} />
          ))}
        </div>
      </section>

      {/* 6. Technologie */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Comment nous construisons</h2>
        <ul className="mt-6 grid gap-4 text-sm text-gray-300 sm:grid-cols-2 lg:grid-cols-4">
          <li className="rounded-xl border border-white/10 p-5"><strong className="block text-white">Pensé pour le hors connexion</strong>Certains produits stockent déjà les données sur l&apos;appareil. La synchronisation avec un serveur n&apos;est pas encore construite.</li>
          <li className="rounded-xl border border-white/10 p-5"><strong className="block text-white">Mobile d&apos;abord</strong>Testé à 375 px de large, pour un téléphone Android d&apos;entrée de gamme.</li>
          <li className="rounded-xl border border-white/10 p-5"><strong className="block text-white">Français et FCFA</strong>Interfaces en français, montants en francs CFA, langues locales prévues.</li>
          <li className="rounded-xl border border-white/10 p-5"><strong className="block text-white">Outils ouverts</strong>Next.js, TypeScript, PostgreSQL, Vercel. Code versionné ; tests et intégration continue sur la plupart des dépôts.</li>
        </ul>
      </section>

      {/* 7–9. Stade, fondateur, appel à l'action */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Où nous en sommes</h2>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>• 0 client payant, 0 revenu, aucun financement externe.</li>
              <li>• Un fondateur : {SITE.fondateur}, étudiant en informatique.</li>
              <li>• Pas encore de société immatriculée.</li>
              <li>• Un produit en MVP, plusieurs en développement, trois offres de services.</li>
            </ul>
            <Link href="/a-propos" className="mt-4 inline-block text-sm font-semibold text-gold hover:underline">
              Notre histoire et notre feuille de route →
            </Link>
          </div>
          <div className="rounded-2xl border border-gold/30 p-6">
            <h2 className="font-display text-xl font-bold text-white">Un échange de 30 minutes ?</h2>
            <p className="mt-2 text-gray-300">
              Décrivez votre situation. Nous vous répondons avec une proposition claire, ou en vous disant honnêtement si
              nous ne sommes pas les bonnes personnes.
            </p>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-3 font-bold text-navy hover:opacity-90">
              Demander un échange <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
