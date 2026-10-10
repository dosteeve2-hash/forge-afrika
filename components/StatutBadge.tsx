import type { Statut } from "@/lib/produits";

// Couleurs choisies pour rester ≥ 4,5:1 sur le fond navy.
const STYLES: Record<Statut, string> = {
  MVP: "border-emerald-400/40 text-emerald-300",
  "En développement": "border-cyan/40 text-cyan",
  "Usage interne": "border-sky-400/40 text-sky-300",
  Prototype: "border-amber-400/40 text-amber-300",
  Concept: "border-gray-400/40 text-gray-300",
};

export default function StatutBadge({ statut }: { statut: Statut }) {
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 font-mono text-xs ${STYLES[statut]}`}>
      {statut}
    </span>
  );
}
