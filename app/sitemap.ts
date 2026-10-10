import type { MetadataRoute } from "next";
import { PRODUITS } from "@/lib/produits";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/produits", "/services", "/a-propos", "/contact", "/confidentialite"];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}` })),
    ...PRODUITS.map((p) => ({ url: `${SITE.url}/produits/${p.slug}` })),
  ];
}
