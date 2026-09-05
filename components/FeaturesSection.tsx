"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: "🏛️",
    titre: "Gouvernance Centralisée",
    desc: "Un QG unique pilote la stratégie, le capital et les priorités de toutes les filiales.",
    couleur: "#D4AF37",
  },
  {
    icon: "📊",
    titre: "Dashboard Temps Réel",
    desc: "CA, utilisateurs et croissance de chaque filiale consolidés sur un seul tableau de bord.",
    couleur: "#00BCD4",
  },
  {
    icon: "🔐",
    titre: "Infrastructure Partagée",
    desc: "Auth, sécurité et données mutualisées entre filiales — chaque nouveau projet démarre plus vite.",
    couleur: "#22C55E",
  },
  {
    icon: "🌍",
    titre: "Expansion Systématique",
    desc: "Burkina Faso → UEMOA → CEDEAO → Continent. Chaque marché conquis devient la base du suivant.",
    couleur: "#F97316",
  },
  {
    icon: "💰",
    titre: "Financement Inter-Filiales",
    desc: "Le capital circule vers la filiale qui a la meilleure traction, au bon moment.",
    couleur: "#8B5CF6",
  },
  {
    icon: "🤝",
    titre: "Écosystème Connecté",
    desc: "Chaque filiale bénéficie du réseau, de la marque et des utilisateurs des autres.",
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
            Ce que le QG apporte
          </span>
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            L&apos;Arsenal du Groupe
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Une infrastructure commune qui rend chaque filiale plus forte que si elle était seule.
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
