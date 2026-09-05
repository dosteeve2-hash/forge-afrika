"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { motion } from "framer-motion";
import { FILIALES_FORGE } from "@/lib/constants";
import Counter from "./Counter";
import MagneticButton from "./MagneticButton";
import ForgeLogoSVG from "./ForgeLogoSVG";

gsap.registerPlugin(SplitText);

const NB_ACTIVES = FILIALES_FORGE.filter((f) => f.statut === "Actif").length;
const CA_CONSOLIDE = FILIALES_FORGE.reduce((s, f) => s + f.metriques.ca, 0);

const STATS = [
  { target: FILIALES_FORGE.length, suffix: "", label: "Filiales du groupe" },
  { target: NB_ACTIVES, suffix: "", label: "En production" },
  { target: Math.round(CA_CONSOLIDE / 1_000_000), suffix: "M", label: "FCFA de CA consolidé" },
  { target: 8, suffix: "", label: "Pays UEMOA ciblés" },
];

/**
 * Bruit pseudo-aléatoire déterministe.
 *
 * `Math.random()` au niveau module produisait des valeurs DIFFÉRENTES côté
 * serveur et côté client : d'où le drapeau `mounted` qui retardait l'affichage
 * des particules après hydratation pour masquer le décalage. Une fonction pure
 * donne les mêmes valeurs des deux côtés — les particules s'affichent donc
 * immédiatement, sans état ni effet.
 */
function noise(seed: number): number {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
}

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: noise(i * 1.1) * 100,
  y: noise(i * 2.3) * 100,
  delay: noise(i * 3.7) * 3,
  size: 3 + noise(i * 4.9) * 7,
  // Calculée une fois : elle était tirée au rendu, donc rejouée à chaque
  // re-render, ce qui faisait sauter la durée d'animation.
  duration: 4 + noise(i * 6.1) * 3,
}));

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!titleRef.current) return;
    const split = new SplitText(titleRef.current, { type: "chars" });

    gsap.set(split.chars, { opacity: 0, y: 60, rotateX: -40 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(split.chars, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.035,
      ease: "back.out(1.7)",
    });

    return () => split.revert();
  }, { scope: sectionRef });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Grille animée */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)",
        }}
      />

      {/* Particules dorées */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: "radial-gradient(circle, rgba(212,175,55,0.6) 0%, rgba(212,175,55,0) 70%)",
              }}
              animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" as const }}
        >
          <div
            className="rounded-3xl p-3"
            style={{
              background: "rgba(212,175,55,0.08)",
              border: "1px solid rgba(212,175,55,0.3)",
              boxShadow: "0 0 60px rgba(212,175,55,0.2)",
            }}
          >
            <ForgeLogoSVG size={72} variant="icon" />
          </div>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, type: "spring" as const }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{ background: "rgba(0,188,212,0.15)", border: "1px solid rgba(0,188,212,0.3)", color: "#00BCD4" }}
        >
          🏛️ Entreprise Mère · Groupe Panafricain
        </motion.span>

        <h1
          ref={titleRef}
          className="font-bold mb-6 leading-none uppercase"
          style={{
            fontSize: "clamp(2.75rem, 9vw, 6.5rem)",
            fontFamily: "var(--font-display)",
            background: "linear-gradient(135deg, #D4AF37, #F5D76E, #D4AF37)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          FORGE AFRIKA
        </h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, type: "spring" as const }}
        >
          L&apos;écosystème africain de demain
        </motion.p>

        <motion.blockquote
          className="text-base italic text-gray-400 mb-12 max-w-2xl mx-auto"
          style={{ borderLeft: "3px solid #D4AF37", paddingLeft: "1.5rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.25 }}
        >
          « Nous ne construisons pas des outils. Nous forgeons l&apos;Afrique. »
        </motion.blockquote>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.35, type: "spring" as const }}
        >
          <MagneticButton
            href="#filiales"
            onClick={(e) => { e.preventDefault(); document.querySelector("#filiales")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-8 py-4 rounded-xl font-semibold text-lg inline-block"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}
          >
            Découvrir nos filiales
          </MagneticButton>
          <MagneticButton
            href="/dashboard"
            className="px-8 py-4 rounded-xl font-semibold text-lg border inline-block"
            style={{ border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37", background: "rgba(212,175,55,0.08)" }}
          >
            Accéder au QG →
          </MagneticButton>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl md:text-4xl font-bold mb-1"
                style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                <Counter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-gray-500 text-xs font-medium uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-1"
          style={{ borderColor: "rgba(212,175,55,0.4)" }}
        >
          <div className="w-1.5 h-3 rounded-full" style={{ background: "#D4AF37" }} />
        </div>
      </motion.div>
    </section>
  );
}
