import Link from "next/link";
import type { Produit } from "@/lib/produits";
import StatutBadge from "@/components/StatutBadge";

export default function ProduitCarte({ produit }: { produit: Produit }) {
  return (
    <Link
      href={`/produits/${produit.slug}`}
      className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-gold/50"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-white">{produit.nom}</h3>
          <p className="text-xs text-gray-400">{produit.domaine}</p>
        </div>
        <StatutBadge statut={produit.statut} />
      </div>
      <p className="mt-3 text-sm text-gray-300">{produit.probleme}</p>
      <p className="mt-auto pt-4 text-xs text-gray-400">
        <span className="text-gray-300">Prochaine étape :</span> {produit.prochaineEtape}
      </p>
    </Link>
  );
}
