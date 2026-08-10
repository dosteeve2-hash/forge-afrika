"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { FILIALES_FORGE } from "@/lib/constants";
import Counter from "./Counter";

gsap.registerPlugin(ScrollTrigger);

const PILIERS = [
  {
    step: "01",
    titre: "Production",
    description: "Chaque filiale résout un problème réel, sur le terrain, dans un secteur réel — agriculture, retail, industrie.",
    icon: "🌱",
  },
  {
    step: "02",
    titre: "Industrie",
    description: "Les filiales matures se connectent entre elles, standardisent leurs données et deviennent des infrastructures sectorielles.",
    icon: "🏭",
  },
  {
    step: "03",
    titre: "Monopole",
    description: "FORGE Afrika devient l'infrastructure économique critique de son secteur — impossible à déloger, dans chaque pays où elle opère.",
    icon: "👑",
  },
];

const STATS = [
  { target: FILIALES_FORGE.length, suffix: "", label: "Filiales fondées" },
  { target: 3, suffix: "", label: "Pays pilotes" },
  { target: 1, suffix: "Md", label: "FCFA ARR ciblé" },
  { target: 2030, suffix: "", label: "Horizon conglomérat" },
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
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Bâtir le Rockefeller africain, une filiale à la fois.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
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
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }}
          viewport={{ once: true }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-4xl font-bold mb-2"
                style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                <Counter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

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
            FORGE Afrika n&apos;est pas une startup. C&apos;est une <strong style={{ color: "#D4AF37" }}>entreprise mère</strong> :
            chaque filiale résout un problème réel dans un secteur réel — le commerce informel, la mode, l&apos;industrie,
            la finance, l&apos;agriculture, l&apos;élevage, la communauté. Chacune est autonome. Toutes sont connectées.
          </p>
          <p className="italic" style={{ color: "#00BCD4" }}>
            Le Burkina Faso comme point de départ. L&apos;Afrique comme terrain de jeu. Un siècle comme horizon.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
