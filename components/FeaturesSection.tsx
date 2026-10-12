"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: "📡",
    titre: "Pensé pour le hors ligne",
    desc: "Des outils conçus pour continuer à fonctionner avec une connexion faible ou coupée, puis se synchroniser.",
    couleur: "#D4AF37",
  },
  {
    icon: "🎯",
    titre: "Un problème à la fois",
    desc: "Chaque outil traite un maillon précis d'une filière, plutôt que de promettre un logiciel qui fait tout.",
    couleur: "#00BCD4",
  },
  {
    icon: "💱",
    titre: "Réalité locale",
    desc: "FCFA, référentiel SYSCOHADA, mobile d'abord, et des langues locales là où c'est pertinent.",
    couleur: "#22C55E",
  },
  {
    icon: "🔗",
    titre: "Des outils qui se parlent",
    desc: "L'objectif : qu'une donnée saisie dans un outil serve aux autres, de la collecte à la comptabilité et à l'export.",
    couleur: "#F97316",
  },
  {
    icon: "🔐",
    titre: "Base technique commune",
    desc: "Une même pile technique moderne et des règles de sécurité communes à tous les outils.",
    couleur: "#8B5CF6",
  },
  {
    icon: "🔎",
    titre: "Code ouvert à la lecture",
    desc: "Le code du site FORGE Afrika est public sur GitHub : vous pouvez vérifier ce que nous construisons.",
    couleur: "#EF4444",
  },
];

export default function FeaturesSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".feature-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 82%", once: true },
      }
    );
  }, { scope: gridRef });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
  };

  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }}
          viewport={{ once: true }}
        >
          <span className="text-xs uppercase tracking-[0.3em] font-bold mb-4 block" style={{ color: "#00BCD4" }}>
            Notre approche
          </span>
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Comment nous construisons
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Des principes simples, appliqués à chaque outil.
          </p>
        </motion.div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.titre}
              onMouseMove={handleMove}
              className="feature-card relative rounded-2xl p-7 overflow-hidden group"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at var(--mx,50%) var(--my,50%), ${f.couleur}18, transparent 60%)` }}
              />
              <div className="relative z-10">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${f.couleur}15` }}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.titre}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: f.couleur }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
