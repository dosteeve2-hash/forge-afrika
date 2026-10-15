"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const PILIERS = [
  {
    step: "01",
    titre: "Comprendre",
    description: "Partir d'un problème réel de terrain : cahiers perdus, stocks mal suivis, traçabilité impossible à prouver.",
    icon: "🌱",
  },
  {
    step: "02",
    titre: "Construire",
    description: "Des outils simples, utilisables sur un téléphone d'entrée de gamme et avec une connexion instable.",
    icon: "🛠️",
  },
  {
    step: "03",
    titre: "Prouver",
    description: "Tester avec des partenaires pilotes, mesurer le résultat, et n'étendre que ce qui marche.",
    icon: "📏",
  },
];

export default function MissionSection() {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!bgRef.current) return;
    gsap.to(bgRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
    });
  }, { scope: sectionRef });

  return (
    <section id="mission" ref={sectionRef} className="relative py-24 px-4 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{ background: "radial-gradient(circle at 30% 20%, #D4AF37 0%, transparent 45%), radial-gradient(circle at 80% 80%, #00BCD4 0%, transparent 45%)" }}
      />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Notre Mission
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Construire, outil après outil, les logiciels qui manquent aux filières africaines.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-0">
          {PILIERS.map((pilier, i) => (
            <motion.div
              key={pilier.step}
              className="rounded-2xl p-8 relative"
              style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.15)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15, type: "spring" as const }}
              viewport={{ once: true }}
            >
              <div className="text-xs font-mono mb-4" style={{ color: "#D4AF37" }}>{pilier.step}</div>
              <div className="text-4xl mb-4">{pilier.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{pilier.titre}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{pilier.description}</p>
              {i < PILIERS.length - 1 && (
                <div
                  className="hidden md:block absolute top-1/2 -right-4 w-8 h-px"
                  style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.4), transparent)" }}
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 rounded-2xl p-8 md:p-12 space-y-6 text-gray-300 leading-relaxed text-lg"
          style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.15)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }}
          viewport={{ once: true }}
        >
          <p>
            L&apos;Afrique n&apos;a pas besoin d&apos;un outil de plus. Elle a besoin d&apos;une{" "}
            <strong style={{ color: "#D4AF37" }}>infrastructure</strong> — des fondations technologiques que ses
            propres entrepreneurs construisent, possèdent et gouvernent.
          </p>
          <p>
            FORGE Afrika est un projet jeune, fondé par Steeve Donald Compaoré, étudiant en informatique.
            Plusieurs outils sont déjà en ligne en version pilote : ils couvrent l&apos;agriculture, l&apos;élevage,
            la transformation, la comptabilité et le commerce. Le projet démarre : nous
            cherchons nos premiers partenaires pilotes pour les améliorer avec de vrais usages.
          </p>
          <p className="italic" style={{ color: "#00BCD4" }}>
            Le Burkina Faso comme point de départ, l&apos;Afrique de l&apos;Ouest comme horizon.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
