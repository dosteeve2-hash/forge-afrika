import type { Metadata } from "next";
import Link from "next/link";
import { ETAPES, LIMITES, SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Automatisation des relances, ventes et service client par l'IA, diagnostic et solution sur mesure, site web B2B. Prix de lancement en euros.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Services</h1>
      <p className="mt-3 max-w-3xl text-gray-300">
        Nous partons de votre problème, pas d&apos;une technologie. Chaque offre est décrite par ce que vous obtenez. Nous
        travaillons à distance, en français et en anglais, avec des entreprises de toute zone.
      </p>

      <div className="mt-10 space-y-6">
        {SERVICES.map((s) => (
          <section key={s.slug} id={s.slug} className="rounded-xl border border-white/10 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="max-w-3xl">
                <h2 className="font-display text-xl font-bold text-white">{s.titre}</h2>
                <p className="mt-2 text-lg text-gold">{s.promesse}</p>
              </div>
              <div className="text-right">
                <p className="font-display text-xl font-bold text-white">{s.prix}</p>
                <p className="mt-1 max-w-xs text-xs text-gray-400">{s.prixNote}</p>
              </div>
            </div>
            <dl className="mt-5 grid gap-5 text-sm md:grid-cols-2">
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-cyan">Pour qui</dt>
                <dd className="mt-1 text-gray-300">{s.pour}</dd>
                <dt className="mt-4 font-mono text-xs uppercase tracking-wider text-cyan">Le problème</dt>
                <dd className="mt-1 text-gray-300">{s.probleme}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-cyan">Ce que comprend l&apos;offre</dt>
                <dd>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-gray-200">
                    {s.inclut.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </dd>
                <dt className="mt-4 font-mono text-xs uppercase tracking-wider text-cyan">Ce que vous recevez</dt>
                <dd className="mt-1 text-gray-200">{s.livrable}</dd>
              </div>
            </dl>
            <Link
              href={`/contact?service=${s.slug}`}
              className="mt-6 inline-block rounded-lg bg-gold px-5 py-2.5 text-sm font-bold text-navy hover:opacity-90"
            >
              Demander un échange de 30 minutes
            </Link>
          </section>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="font-display text-xl font-bold text-white">Comment se passe une mission</h2>
        <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ETAPES.map((e, i) => (
            <li key={e.t} className="rounded-xl border border-white/10 p-5">
              <span className="font-mono text-xs text-gold">0{i + 1}</span>
              <h3 className="mt-1 font-bold text-white">{e.t}</h3>
              <p className="mt-1 text-sm text-gray-300">{e.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 rounded-xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="font-display text-xl font-bold text-white">Tarifs</h2>
        <p className="mt-2 text-gray-300">
          Les prix affichés sont des prix de lancement indicatifs, en euros. Le montant définitif est fixé par un devis
          écrit sur un périmètre précis, avant tout travail. Le paiement en ligne n&apos;est pas encore ouvert : nous
          commençons par un échange.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-bold text-white">Ce que nous ne faisons pas</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-300">
          {LIMITES.map((l) => <li key={l}>{l}</li>)}
        </ul>
      </section>
    </div>
  );
}
