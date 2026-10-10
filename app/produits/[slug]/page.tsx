import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { PRODUITS, getProduit } from "@/lib/produits";
import StatutBadge from "@/components/StatutBadge";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUITS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduit(slug);
  return p ? { title: p.nom, description: p.probleme } : {};
}

export default async function ProduitPage({ params }: Props) {
  const { slug } = await params;
  const p = getProduit(slug);
  if (!p) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link href="/produits" className="text-sm text-gray-300 hover:text-white">← Tous les produits</Link>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">{p.nom}</h1>
        <StatutBadge statut={p.statut} />
      </div>
      <p className="mt-1 text-sm text-gray-400">
        {p.domaine}
        {p.ancienNom && <span> · anciennement {p.ancienNom}</span>}
      </p>

      <dl className="mt-8 space-y-6">
        <div>
          <dt className="font-mono text-xs uppercase tracking-wider text-gold">Le problème</dt>
          <dd className="mt-1 text-gray-200">{p.probleme}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-wider text-gold">Pour qui</dt>
          <dd className="mt-1 text-gray-200">{p.pourQui}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-wider text-gold">Ce qui fonctionne aujourd&apos;hui</dt>
          <dd>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-gray-200">
              {p.existe.map((e) => <li key={e}>{e}</li>)}
            </ul>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-wider text-gold">Ce qui manque</dt>
          <dd>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-gray-200">
              {p.manque.map((m) => <li key={m}>{m}</li>)}
            </ul>
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-wider text-gold">Technologies</dt>
          <dd className="mt-1 text-gray-200">{p.stack}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-wider text-gold">Modèle économique envisagé</dt>
          <dd className="mt-1 text-gray-200">{p.modele}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-wider text-gold">Prochaine étape</dt>
          <dd className="mt-1 text-gray-200">{p.prochaineEtape}</dd>
        </div>
      </dl>

      <div className="mt-10 flex flex-wrap gap-3">
        {p.demoUrl && (
          <a
            href={p.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:border-gold/60"
          >
            {p.statut === "Prototype" ? "Voir le prototype (données de démonstration)" : "Voir l'application"}
            <ExternalLink size={14} />
          </a>
        )}
        <Link href={`/contact?sujet=${encodeURIComponent(p.nom)}`} className="rounded-lg bg-gold px-4 py-2 text-sm font-bold text-navy hover:opacity-90">
          Être tenu informé ou tester
        </Link>
      </div>
    </article>
  );
}
