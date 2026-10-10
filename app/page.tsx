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
          Des logiciels pensés pour le <span className="text-gradient-gold">terrain africain</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-300">{SITE.phrase}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-3 font-bold text-navy hover:opacity-90">
            Parler d&apos;un projet <ArrowRight size={16} />
          </Link>
          <Link href="/produits" className="rounded-lg border border-white/20 px-5 py-3 font-semibold text-white hover:border-gold/60">
            Voir nos produits
          </Link>
        </div>
      </section>

      {/* 2. Problème */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-2">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Le problème</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              Coopératives, éleveurs, ateliers de transformation, PME : beaucoup gèrent encore leur activité sur cahiers,
              tableurs ou WhatsApp. Les logiciels du marché sont chers, pensés pour une connexion stable et rarement en
              français ou en FCFA.
            </p>
            <p>
              Nous construisons des outils simples, utilisables sur un téléphone d&apos;entrée de gamme, et conçus pour un
              réseau intermittent.
            </p>
          </div>
        </div>
      </section>

      {/* 3–4. Ce que nous construisons / produits */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Nos produits</h2>
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

      {/* 5. Services */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Nos services</h2>
          <p className="mt-2 max-w-2xl text-gray-300">
            Nous construisons aussi pour d&apos;autres. Les premiers projets sont des projets pilotes non facturés.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <li key={s.slug} className="rounded-xl border border-white/10 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-white">{s.titre}</h3>
                  {s.disponibilite === "Sur demande" && (
                    <span className="shrink-0 font-mono text-xs text-amber-300">Sur demande</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-300">{s.pour}</p>
              </li>
            ))}
          </ul>
          <Link href="/services" className="mt-6 inline-block text-sm font-semibold text-gold hover:underline">
            Détail des services →
          </Link>
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
              <li>• Un produit en MVP, plusieurs en développement.</li>
            </ul>
            <Link href="/a-propos" className="mt-4 inline-block text-sm font-semibold text-gold hover:underline">
              Notre histoire et notre feuille de route →
            </Link>
          </div>
          <div className="rounded-2xl border border-gold/30 p-6">
            <h2 className="font-display text-xl font-bold text-white">Vous avez un projet ?</h2>
            <p className="mt-2 text-gray-300">
              Décrivez votre besoin. Nous vous répondons avec une proposition claire, ou en vous disant honnêtement si nous
              ne sommes pas les bonnes personnes.
            </p>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-3 font-bold text-navy hover:opacity-90">
              Nous contacter <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
