import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Les filiales — FORGE Afrika",
  description:
    "Les dix filiales de l'écosystème FORGE Afrika : retail, e-commerce, industrie, finance, agriculture, élevage et commerce B2B en Afrique de l'Ouest.",
};

export default function EcosystemLayout({ children }: { children: React.ReactNode }) {
  return children;
}
