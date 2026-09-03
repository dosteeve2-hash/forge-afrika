import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap — FORGE Afrika",
  description:
    "La feuille de route de FORGE Afrika : les phases de construction du groupe, du logiciel industriel à la transformation des matières premières.",
};

export default function RoadmapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
