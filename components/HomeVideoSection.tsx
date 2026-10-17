import Link from "next/link";
import ProjectVideo from "./ProjectVideo";

export default function HomeVideoSection() {
  return (
    <section id="video" className="relative px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
          FORGE Afrika en vidéo
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Les logiciels simples et indispensables pour la production, la transformation et l&apos;export en Afrique.
        </p>
        <div
          className="rounded-2xl p-2"
          style={{ border: "1px solid rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.05)" }}
        >
          <ProjectVideo slug="forge" lang="fr" title="Vidéo de présentation de FORGE Afrika" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <a
            href="#filiales"
            className="px-8 py-4 rounded-xl font-semibold text-lg inline-block"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}
          >
            Découvrir nos outils
          </a>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-xl font-semibold text-lg border inline-block"
            style={{ border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37", background: "rgba(212,175,55,0.08)" }}
          >
            Devenir partenaire pilote →
          </Link>
        </div>
      </div>
    </section>
  );
}
