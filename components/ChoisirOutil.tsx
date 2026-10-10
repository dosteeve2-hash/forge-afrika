"use client";

import { useState } from "react";
import Link from "next/link";
import { ACTIVITES, PRODUITS, type Activite } from "@/lib/produits";
import StatutBadge from "@/components/StatutBadge";

export default function ChoisirOutil() {
  const [choix, setChoix] = useState<Activite | null>(null);
  const resultats = choix ? PRODUITS.filter((p) => p.activites.includes(choix)) : [];

  return (
    <section aria-labelledby="choisir-outil" className="rounded-2xl border border-gold/30 bg-white/[0.03] p-5 sm:p-6">
      <h2 id="choisir-outil" className="font-display text-xl font-bold text-white">
        Quel outil pour votre activité ?
      </h2>
      <p className="mt-1 text-sm text-gray-300">Choisissez ce que vous faites : nous vous montrons les outils qui correspondent.</p>

      <div role="group" aria-label="Votre activité" className="mt-4 flex flex-wrap gap-2">
        {(Object.keys(ACTIVITES) as Activite[]).map((a) => (
          <button
            key={a}
            type="button"
            aria-pressed={choix === a}
            onClick={() => setChoix(choix === a ? null : a)}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm transition-colors ${
              choix === a ? "border-gold bg-gold text-navy font-bold" : "border-white/20 text-gray-200 hover:border-gold/60"
            }`}
          >
            {ACTIVITES[a]}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-5">
        {choix && (
          <ul className="space-y-3">
            {resultats.map((p) => (
              <li key={p.slug} className="rounded-xl border border-white/10 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Link href={`/produits/${p.slug}`} className="font-bold text-white underline-offset-4 hover:underline">
                    {p.nom}
                  </Link>
                  <StatutBadge statut={p.statut} />
                </div>
                <p className="mt-1 text-sm text-gray-300">{p.probleme}</p>
                <p className="mt-2 text-xs text-gray-400">
                  {p.demoUrl
                    ? "Une démonstration en ligne est disponible sur la fiche."
                    : p.niveau === "futur"
                      ? "Pas encore construit."
                      : "Pas encore ouvert à l'essai : dites-nous si ça vous intéresse."}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
