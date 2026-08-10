"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FILIALES_FORGE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function FiliaresSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".filiale-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
      }
    );
  }, { scope: gridRef });

  return (
    <section id="filiales" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Nos Filiales
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {FILIALES_FORGE.length} entreprises opérationnelles, chacune souveraine sur son secteur, toutes gouvernées depuis le QG.
          </p>
        </motion.div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {FILIALES_FORGE.map((filiale) => (
            <motion.a
              key={filiale.slug}
              href={filiale.url !== "#" ? filiale.url : "/ecosystem"}
              target={filiale.url !== "#" ? "_blank" : undefined}
              rel={filiale.url !== "#" ? "noopener noreferrer" : undefined}
              className="filiale-card rounded-xl p-5 cursor-pointer group relative overflow-hidden block"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              whileHover={{ y: -6, borderColor: filiale.couleur, boxShadow: `0 12px 40px ${filiale.couleur}22` }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{ background: filiale.couleur }} />
              <div className="text-3xl mb-3">{filiale.icon}</div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-white">{filiale.nom}</h3>
                <span
                  className="text-xs px-2 py-0.5 rounded-full ml-2 shrink-0"
                  style={{
                    background: filiale.statut === "Actif" ? "rgba(34,197,94,0.15)" : "rgba(212,175,55,0.15)",
                    color: filiale.statut === "Actif" ? "#22C55E" : "#D4AF37",
                  }}
                >
                  {filiale.statut}
                </span>
              </div>
              <div className="text-xs font-medium mb-3" style={{ color: filiale.couleur }}>{filiale.categorie}</div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{filiale.description}</p>
              <div className="flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" style={{ color: filiale.couleur }}>
                Voir le projet <ArrowUpRight size={14} />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/ecosystem"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
            style={{ border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37" }}
          >
            Voir tous les détails et accéder aux filiales →
          </Link>
        </div>
      </div>
    </section>
  );
}
