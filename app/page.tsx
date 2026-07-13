"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { PRODUITS_FORGE } from "@/lib/constants";

/* ─── Particule flottante ─────────────────────────────── */
function Particle({ x, y, delay, size }: { x: number; y: number; delay: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(212,175,55,0.6) 0%, rgba(212,175,55,0) 70%)`,
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.3, 0.8, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        type: "tween",
      }}
    />
  );
}

/* ─── CountUp ────────────────────────────────────────── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Particles config ───────────────────────────────── */
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 3,
  size: 3 + Math.random() * 8,
}));

const STATS = [
  { label: "Produits actifs", target: 9, suffix: "" },
  { label: "Secteurs industriels", target: 4, suffix: "" },
  { label: "Pays cibles", target: 3, suffix: "" },
  { label: "Année de lancement", target: 2026, suffix: "" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ background: "#0A1628" }}>
      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: "rgba(10,22,40,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(212,175,55,0.15)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}>
            F
          </div>
          <span className="font-bold text-white text-lg">FORGE Afrika</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/ecosystem" className="text-sm text-gray-400 hover:text-white transition-colors">Écosystème</Link>
          <Link href="/roadmap" className="text-sm text-gray-400 hover:text-white transition-colors">Roadmap</Link>
          <Link href="/dashboard"
            className="text-sm px-4 py-2 rounded-lg font-medium transition-all"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}>
            Accéder au QG
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Particules */}
        <div className="absolute inset-0 pointer-events-none">
          {PARTICLES.map((p) => (
            <Particle key={p.id} x={p.x} y={p.y} delay={p.delay} size={p.size} />
          ))}
        </div>
        {/* Gradient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.08) 0%, transparent 70%)"
        }} />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" as const }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
              style={{ background: "rgba(0,188,212,0.15)", border: "1px solid rgba(0,188,212,0.3)", color: "#00BCD4" }}>
              🌍 Écosystème Africain
            </span>
          </motion.div>

          <motion.h1
            className="font-bold mb-6 leading-none"
            style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, type: "spring" as const }}>
            <span style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E, #D4AF37)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              FORGE Afrika
            </span>
          </motion.h1>

          <motion.p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, type: "spring" as const }}>
            Bâtir le premier conglomérat industriel panafricain
          </motion.p>

          <motion.blockquote
            className="text-base italic text-gray-400 mb-12 max-w-2xl mx-auto"
            style={{ borderLeft: "3px solid #D4AF37", paddingLeft: "1.5rem" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}>
            « Je ne veux pas juste réussir, je veux bâtir quelque chose qui dure 100 ans après moi. »
          </motion.blockquote>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, type: "spring" as const }}>
            <Link href="/ecosystem"
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}>
              Découvrir l'écosystème
            </Link>
            <Link href="/dashboard"
              className="px-8 py-4 rounded-xl font-semibold text-lg border transition-all hover:scale-105"
              style={{ border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37", background: "rgba(212,175,55,0.08)" }}>
              Accéder au QG →
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, type: "tween" }}>
          <div className="w-6 h-10 rounded-full border-2 border-gold flex items-start justify-center p-1"
            style={{ borderColor: "rgba(212,175,55,0.4)" }}>
            <div className="w-1.5 h-3 rounded-full" style={{ background: "#D4AF37" }} />
          </div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="py-24 px-4" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(212,175,55,0.1)", borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} className="text-center"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, type: "spring" as const }}
              viewport={{ once: true }}>
              <div className="text-5xl font-bold mb-2"
                style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                <CountUp target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PRODUITS ── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" as const }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-white mb-4">L'Écosystème FORGE</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              9 produits interconnectés couvrant l'agriculture, l'industrie, la finance et le commerce.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {PRODUITS_FORGE.map((produit, i) => (
              <motion.div key={produit.slug}
                className="rounded-xl p-5 border-gold-hover cursor-pointer group relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05, type: "spring" as const }}
                viewport={{ once: true }}
                whileHover={{ y: -4, borderColor: "#D4AF37", boxShadow: "0 0 30px rgba(212,175,55,0.12)" }}>
                {/* Colour accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{ background: produit.couleur }} />
                <div className="text-3xl mb-3">{produit.icon}</div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-white">{produit.nom}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full ml-2 shrink-0"
                    style={{
                      background: produit.statut === "Actif" ? "rgba(34,197,94,0.15)" : "rgba(212,175,55,0.15)",
                      color: produit.statut === "Actif" ? "#22C55E" : "#D4AF37",
                    }}>
                    {produit.statut}
                  </span>
                </div>
                <div className="text-xs font-medium mb-3" style={{ color: produit.couleur }}>{produit.categorie}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{produit.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/ecosystem"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
              style={{ border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37" }}>
              Voir tous les détails →
            </Link>
          </div>
        </div>
      </section>

      {/* ── VISION TIMELINE ── */}
      <section className="py-24 px-4" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" as const }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-white mb-4">La Vision FORGE</h2>
            <p className="text-gray-400 text-lg">De la production locale au monopole continental.</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5" style={{ background: "linear-gradient(to bottom, #D4AF37, rgba(212,175,55,0.1))" }} />
            {[
              { icon: "🌱", titre: "Production", desc: "Digitaliser les coopératives agricoles et industrielles du Burkina Faso." },
              { icon: "🚚", titre: "Distribution", desc: "Connecter producteurs, transformateurs et marchés à l'échelle régionale." },
              { icon: "🏭", titre: "Industrie", desc: "Créer des monopoles sectoriels dans l'agriculture, l'élevage et l'agro-industrie." },
              { icon: "👑", titre: "Monopole", desc: "Devenir l'infrastructure technologique critique de l'Afrique de l'Ouest." },
            ].map((phase, i) => (
              <motion.div key={phase.titre} className="flex items-start gap-6 mb-10"
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15, type: "spring" as const }}
                viewport={{ once: true }}>
                <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl shrink-0"
                  style={{ background: "rgba(212,175,55,0.15)", border: "2px solid #D4AF37" }}>
                  {phase.icon}
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-bold text-white mb-1">{phase.titre}</h3>
                  <p className="text-gray-400">{phase.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-4 text-center" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}>
            F
          </div>
          <span className="font-bold text-white text-lg">FORGE Afrika</span>
        </div>
        <p className="text-gray-500 text-sm">© 2026 FORGE Afrika. Bâtir l'Afrique de demain.</p>
        <div className="flex justify-center gap-8 mt-6">
          <Link href="/ecosystem" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Écosystème</Link>
          <Link href="/roadmap" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Roadmap</Link>
          <Link href="/dashboard" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">QG</Link>
        </div>
      </footer>
    </main>
  );
}
