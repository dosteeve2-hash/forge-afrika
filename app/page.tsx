"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { FILIALES_FORGE } from "@/lib/constants";

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

const NB_SECTEURS = new Set(FILIALES_FORGE.map((f) => f.categorie)).size;
const NB_ACTIVES = FILIALES_FORGE.filter((f) => f.statut === "Actif").length;

const STATS = [
  { label: "Filiales", target: FILIALES_FORGE.length, suffix: "" },
  { label: "Secteurs couverts", target: NB_SECTEURS, suffix: "" },
  { label: "Filiales en production", target: NB_ACTIVES, suffix: "" },
  { label: "Année de fondation", target: 2026, suffix: "" },
];

/* ─── Carte d'écosystème (organigramme radial) ────────── */
function EcosystemMap() {
  const total = FILIALES_FORGE.length;
  const radius = 40;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {FILIALES_FORGE.map((f, i) => {
          const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          return (
            <motion.line
              key={f.slug}
              x1="50" y1="50" x2={x} y2={y}
              stroke={f.couleur} strokeWidth="0.35" strokeOpacity="0.4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.4 }}
              transition={{ duration: 0.8, delay: i * 0.06 }}
              viewport={{ once: true }}
            />
          );
        })}
      </svg>

      {/* Hub central */}
      <motion.div
        className="absolute z-10 flex flex-col items-center justify-center rounded-full text-center px-2"
        style={{
          left: "50%", top: "50%", transform: "translate(-50%,-50%)",
          width: "26%", aspectRatio: "1",
          background: "linear-gradient(135deg, #D4AF37, #F5D76E)",
          boxShadow: "0 0 60px rgba(212,175,55,0.45)",
        }}
        initial={{ scale: 0 }} whileInView={{ scale: 1 }}
        transition={{ type: "spring" as const, duration: 0.6 }}
        viewport={{ once: true }}>
        <span className="font-bold leading-tight" style={{ color: "#0A1628", fontSize: "clamp(0.6rem, 2vw, 0.95rem)" }}>
          FORGE<br />AFRIKA
        </span>
      </motion.div>

      {/* Noeuds filiales */}
      {FILIALES_FORGE.map((f, i) => {
        const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        return (
          <motion.a
            key={f.slug}
            href={f.url !== "#" ? f.url : "/ecosystem"}
            target={f.url !== "#" ? "_blank" : undefined}
            rel={f.url !== "#" ? "noopener noreferrer" : undefined}
            className="absolute flex flex-col items-center gap-1 group"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)", width: "68px" }}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05, type: "spring" as const }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.15 }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-base transition-shadow"
              style={{ background: "#0A1628", border: `2px solid ${f.couleur}` }}>
              {f.icon}
            </div>
            <span className="text-[10px] text-center leading-tight text-gray-300 group-hover:text-white transition-colors">
              {f.nom}
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
          <Link href="/ecosystem" className="text-sm text-gray-400 hover:text-white transition-colors">Nos Filiales</Link>
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
          {mounted && PARTICLES.map((p) => (
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
              🏛️ Entreprise Mère · Groupe Panafricain
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
            L'Écosystème des Entreprises Africaines du Futur
          </motion.p>

          <motion.blockquote
            className="text-base italic text-gray-400 mb-12 max-w-2xl mx-auto"
            style={{ borderLeft: "3px solid #D4AF37", paddingLeft: "1.5rem" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}>
            « Nous ne construisons pas des outils. Nous forgeons l'Afrique. »
          </motion.blockquote>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, type: "spring" as const }}>
            <Link href="/ecosystem"
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}>
              Découvrir nos filiales
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

      {/* ── NOS FILIALES ── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" as const }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-white mb-4">Nos Filiales</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {FILIALES_FORGE.length} entreprises opérationnelles, chacune souveraine sur son secteur, toutes gouvernées depuis le QG.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {FILIALES_FORGE.map((filiale, i) => (
              <motion.div key={filiale.slug}
                className="rounded-xl p-5 border-gold-hover cursor-pointer group relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05, type: "spring" as const }}
                viewport={{ once: true }}
                whileHover={{ y: -4, borderColor: "#D4AF37", boxShadow: "0 0 30px rgba(212,175,55,0.12)" }}>
                {/* Colour accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl" style={{ background: filiale.couleur }} />
                <div className="text-3xl mb-3">{filiale.icon}</div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-white">{filiale.nom}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full ml-2 shrink-0"
                    style={{
                      background: filiale.statut === "Actif" ? "rgba(34,197,94,0.15)" : "rgba(212,175,55,0.15)",
                      color: filiale.statut === "Actif" ? "#22C55E" : "#D4AF37",
                    }}>
                    {filiale.statut}
                  </span>
                </div>
                <div className="text-xs font-medium mb-3" style={{ color: filiale.couleur }}>{filiale.categorie}</div>
                <p className="text-gray-400 text-sm leading-relaxed">{filiale.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/ecosystem"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
              style={{ border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37" }}>
              Voir tous les détails et accéder aux filiales →
            </Link>
          </div>
        </div>
      </section>

      {/* ── L'ÉCOSYSTÈME (organigramme) ── */}
      <section className="py-24 px-4" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" as const }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-white mb-4">L'Écosystème</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              FORGE Afrika au centre. Chaque filiale, une ramification autonome, connectée au QG.
            </p>
          </motion.div>

          <EcosystemMap />
        </div>
      </section>

      {/* ── NOTRE VISION ── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" as const }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-white mb-4">Notre Vision</h2>
            <p className="text-gray-400 text-lg">Bâtir le Rockefeller africain, une filiale à la fois.</p>
          </motion.div>

          <motion.div className="rounded-2xl p-8 md:p-12 space-y-6 text-gray-300 leading-relaxed text-lg"
            style={{ background: "rgba(212,175,55,0.04)", border: "1px solid rgba(212,175,55,0.15)" }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" as const }} viewport={{ once: true }}>
            <p>
              L'Afrique n'a pas besoin d'un outil de plus. Elle a besoin d'une <strong style={{ color: "#D4AF37" }}>infrastructure</strong> —
              des fondations technologiques que ses propres entrepreneurs construisent, possèdent et gouvernent.
            </p>
            <p>
              FORGE Afrika n'est pas une startup. C'est une <strong style={{ color: "#D4AF37" }}>entreprise mère</strong> :
              chaque filiale résout un problème réel dans un secteur réel — le commerce informel, la mode, l'industrie,
              la finance, l'agriculture, l'élevage, la communauté. Chacune est autonome. Toutes sont connectées.
            </p>
            <p>
              À la manière des grands conglomérats qui ont bâti les économies occidentales, FORGE Afrika ambitionne
              de devenir <strong style={{ color: "#D4AF37" }}>l'infrastructure économique critique</strong> de l'Afrique de l'Ouest —
              puis du continent. Pas en imposant un outil unique, mais en forgeant, filiale après filiale, un
              écosystème que rien ne pourra déloger.
            </p>
            <p className="italic" style={{ color: "#00BCD4" }}>
              Le Burkina Faso comme point de départ. L'Afrique comme terrain de jeu. Un siècle comme horizon.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-4" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl"
                style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}>
                F
              </div>
              <span className="font-bold text-white text-lg">FORGE Afrika</span>
            </div>
            <p className="text-gray-500 text-sm">© 2026 FORGE Afrika. Bâtir l'Afrique de demain.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-10">
            <Link href="/ecosystem" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Nos Filiales</Link>
            <Link href="/roadmap" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Roadmap</Link>
            <Link href="/dashboard" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">QG</Link>
          </div>

          <div className="pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-center text-xs text-gray-600 uppercase tracking-wider mb-4">Toutes les filiales</p>
            <div className="flex flex-wrap justify-center gap-2">
              {FILIALES_FORGE.map((f) => (
                <a key={f.slug} href={f.url !== "#" ? f.url : "/ecosystem"}
                  target={f.url !== "#" ? "_blank" : undefined}
                  rel={f.url !== "#" ? "noopener noreferrer" : undefined}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                  style={{ background: `${f.couleur}15`, color: f.couleur, border: `1px solid ${f.couleur}30` }}>
                  {f.icon} {f.nom}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
