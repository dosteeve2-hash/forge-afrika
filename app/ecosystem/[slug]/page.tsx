import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import { FILIALES_FORGE } from "@/lib/constants";
import { DETAILS_FILIALES } from "@/lib/filiales-detail";

const DEPOT_BASE = "https://github.com/dosteeve2-hash";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return FILIALES_FORGE.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const filiale = FILIALES_FORGE.find((f) => f.slug === slug);
  if (!filiale) return { title: "Filiale introuvable — FORGE Afrika" };

  const detail = DETAILS_FILIALES[slug];
  const description = detail?.accroche ?? filiale.description;

  return {
    title: `${filiale.nom} — Filiale FORGE Afrika`,
    description,
    openGraph: {
      title: `${filiale.nom} — FORGE Afrika`,
      description,
      type: "website",
    },
  };
}

export default async function FilialePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const filiale = FILIALES_FORGE.find((f) => f.slug === slug);
  if (!filiale) notFound();

  const detail = DETAILS_FILIALES[slug];
  const actif = filiale.statut === "Actif";
  const aUnSite = filiale.url !== "#";

  return (
    <main className="min-h-screen" style={{ background: "#0A1628" }}>
      <Nav />

      <div className="pt-28 pb-24 px-4 max-w-4xl mx-auto">
        <Link
          href="/ecosystem"
          className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          ← Toutes les filiales
        </Link>

        {/* En-tête */}
        <header className="mt-6 mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-5xl">{filiale.icon}</span>
            <span
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{
                background: actif ? "rgba(34,197,94,0.15)" : "rgba(212,175,55,0.15)",
                color: actif ? "#22C55E" : "#D4AF37",
              }}
            >
              {filiale.statut}
            </span>
            <span
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{ background: `${filiale.couleur}22`, color: filiale.couleur }}
            >
              {filiale.categorie}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">{filiale.nom}</h1>
          {detail && (
            <p className="text-xl text-gray-300 mb-4 leading-relaxed">{detail.accroche}</p>
          )}
          <p className="text-gray-400">{filiale.description}</p>

          <div className="flex flex-wrap gap-3 mt-7">
            {aUnSite && (
              <a
                href={filiale.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-5 py-2.5 rounded-xl font-medium"
                style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}
              >
                Ouvrir le produit ↗
              </a>
            )}
            {detail?.depot && (
              <a
                href={`${DEPOT_BASE}/${detail.depot}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-5 py-2.5 rounded-xl font-medium text-gray-300 hover:text-white transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
              >
                Dépôt de code ↗
              </a>
            )}
          </div>
        </header>

        {!detail ? (
          <p className="text-gray-500">Fiche détaillée en cours de rédaction.</p>
        ) : (
          <>
            {/* Contexte */}
            <section
              className="rounded-2xl p-6 mb-8"
              style={{
                background: `${filiale.couleur}0F`,
                borderLeft: `3px solid ${filiale.couleur}`,
              }}
            >
              <p className="text-gray-200 leading-relaxed">{detail.contexte}</p>
            </section>

            {/* Problème / Solution */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <section className="card-navy rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-4">Ce qui ne va pas aujourd'hui</h2>
                <ul className="space-y-3">
                  {detail.problemes.map((p) => (
                    <li key={p} className="text-sm text-gray-400 flex gap-3 leading-relaxed">
                      <span style={{ color: "#EF4444" }}>—</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="card-navy rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-4">Ce que la filiale apporte</h2>
                <ul className="space-y-3">
                  {detail.solutions.map((s) => (
                    <li key={s} className="text-sm text-gray-400 flex gap-3 leading-relaxed">
                      <span style={{ color: "#22C55E" }}>→</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Cible et zone */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="card-navy rounded-xl p-5">
                <div className="text-xs text-gray-500 mb-2">Pour qui</div>
                <div className="text-white">{detail.cible}</div>
              </div>
              <div className="card-navy rounded-xl p-5">
                <div className="text-xs text-gray-500 mb-2">Où</div>
                <div className="text-white">{detail.zone}</div>
              </div>
            </div>

            {detail.documentation && (
              <p className="text-sm text-gray-500 mb-10">
                Spécification détaillée :{" "}
                <a
                  href={`${DEPOT_BASE}/forge-afrika/blob/main/${detail.documentation}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#D4AF37" }}
                >
                  {detail.documentation} ↗
                </a>
              </p>
            )}
          </>
        )}

        {/* Autres filiales */}
        <section style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} className="pt-8">
          <h2 className="text-sm font-medium text-gray-500 mb-4">Autres filiales du groupe</h2>
          <div className="flex flex-wrap gap-2">
            {FILIALES_FORGE.filter((f) => f.slug !== slug).map((f) => (
              <Link
                key={f.slug}
                href={`/ecosystem/${f.slug}`}
                className="text-sm px-3 py-2 rounded-lg text-gray-400 hover:text-white transition-colors"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                {f.icon} {f.nom}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
