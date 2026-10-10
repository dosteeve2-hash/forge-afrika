import type { Metadata } from "next";
import { NIVEAUX, produitsParNiveau, type Niveau } from "@/lib/produits";
import ProduitCarte from "@/components/ProduitCarte";
import ChoisirOutil from "@/components/ChoisirOutil";

export const metadata: Metadata = {
  title: "Produits",
  description: "Les produits de Forge Afrika et leur statut réel : MVP, en développement, prototype ou concept.",
};

const ORDRE: Niveau[] = ["prioritaire", "developpement", "prototype", "futur"];

export default function ProduitsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Produits</h1>
      <p className="mt-3 max-w-3xl text-gray-300">
        Forge Afrika regroupe plusieurs produits construits par son fondateur. Aucun n&apos;a encore d&apos;utilisateur
        payant. Plutôt que de tout présenter comme lancé, chaque produit affiche ce qui fonctionne vraiment, ce qui
        manque, et la prochaine étape.
      </p>

      <div className="mt-8">
        <ChoisirOutil />
      </div>

      {ORDRE.map((niveau) => {
        const produits = produitsParNiveau(niveau);
        if (produits.length === 0) return null;
        return (
          <section key={niveau} className="mt-12" aria-labelledby={`niveau-${niveau}`}>
            <h2 id={`niveau-${niveau}`} className="font-display text-xl font-bold text-white">
              {NIVEAUX[niveau].titre}
            </h2>
            <p className="mt-1 text-sm text-gray-400">{NIVEAUX[niveau].description}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {produits.map((p) => (
                <ProduitCarte key={p.slug} produit={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
