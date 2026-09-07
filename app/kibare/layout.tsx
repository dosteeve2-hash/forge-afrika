import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KIBARÉ — Le Conseil | FORGE Afrika",
  description:
    "Prototype d'un conseiller d'investissement dont les données ne quittent jamais la machine : cinq grilles d'investisseurs appliquées à votre portefeuille, et un journal d'audit réseau vérifiable.",
};

export default function KibareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
