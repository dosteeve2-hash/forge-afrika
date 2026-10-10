import type { Metadata } from "next";
import Link from "next/link";
import { LIMITES, SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Sites web, applications de gestion, intégration d'IA, design et vidéo pour les organisations africaines.",
};

const ETAPES = [
  { t: "Échange", d: "Vous décrivez votre besoin par e-mail ou via le formulaire. Nous posons les questions qui manquent." },
  { t: "Proposition écrite", d: "Périmètre, délai et prix fixés par écrit avant tout travail. Pas de surprise." },
  { t: "Réalisation", d: "Points d'étape réguliers, version de test en ligne pour vous permettre de valider." },
  { t: "Livraison", d: "Mise en ligne, transfert des accès et du code, et maintenance si vous le souhaitez." },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Services</h1>
      <p className="mt-3 max-w-3xl text-gray-300">
        En plus de ses produits, Forge Afrika construit des outils numériques pour d&apos;autres organisations. Nous
        démarrons : nous n&apos;avons pas encore de client à citer. Les premiers projets sont donc proposés comme des
        projets pilotes, avec un périmètre volontairement serré.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {SERVICES.map((s) => (
          <section key={s.slug} id={s.slug} className="rounded-xl border border-white/10 p-6">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h2 className="font-display text-lg font-bold text-white">{s.titre}</h2>
              <span className={`font-mono text-xs ${s.disponibilite === "Disponible" ? "text-emerald-300" : "text-amber-300"}`}>
                {s.disponibilite}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-300">{s.pour}</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-gray-200">
              {s.inclut.map((i) => <li key={i}>{i}</li>)}
            </ul>
            {s.note && <p className="mt-4 border-l-2 border-amber-300/60 pl-3 text-xs text-gray-300">{s.note}</p>}
          </section>
        ))}
      </div>

      <section className="mt-14">
        <h2 className="font-display text-xl font-bold text-white">Comment se passe un projet</h2>
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
          Sur devis, après un premier échange. Nous préférons un prix fixe sur un périmètre clair plutôt qu&apos;une
          estimation vague. La facturation se fera via une structure immatriculée, en cours de mise en place.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-bold text-white">Ce que nous ne faisons pas</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-300">
          {LIMITES.map((l) => <li key={l}>{l}</li>)}
        </ul>
      </section>

      <Link href="/contact" className="mt-10 inline-block rounded-lg bg-gold px-5 py-3 font-bold text-navy hover:opacity-90">
        Décrire mon projet
      </Link>
    </div>
  );
}
