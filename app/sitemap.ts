import type { MetadataRoute } from "next";
import { FILIALES_FORGE } from "@/lib/constants";

const BASE = "https://forge-afrika.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/ecosystem", "/roadmap", "/kibare", "/contact"].map((chemin) => ({
    url: `${BASE}${chemin}`,
    lastModified: new Date(),
    priority: chemin === "" ? 1 : 0.8,
  }));

  const filiales = FILIALES_FORGE.map((f) => ({
    url: `${BASE}/ecosystem/${f.slug}`,
    lastModified: new Date(),
    priority: 0.6,
  }));

  return [...pages, ...filiales];
}
