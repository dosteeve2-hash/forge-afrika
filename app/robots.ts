import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/dashboard", "/auth/"] },
    sitemap: "https://forge-afrika.vercel.app/sitemap.xml",
  };
}
