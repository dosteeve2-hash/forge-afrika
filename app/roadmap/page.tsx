"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle, Flag, Target, TrendingUp, Users, Zap } from "lucide-react";
import { FILIALES_FORGE, PHASES_ROADMAP, formatFCFA } from "@/lib/constants";

// ─── Calculs live depuis constants ──────────────────────────────────────────
const totalUsers = FILIALES_FORGE.reduce((s, f) => s + f.metriques.utilisateurs, 0);
const totalCA    = FILIALES_FORGE.reduce((s, f) => s + f.metriques.ca, 0);
const activeCount = FILIALES_FORGE.filter(f => f.statut === "Actif").length;
const totalCount  = FILIALES_FORGE.length;

const CURRENT_PHASE = 1; // à mettre à jour manuellement chaque sprint

// ─── Style constants ─────────────────────────────────────────────────────────
const GOLD    = "#D4AF37";
const CYAN    = "#00BCD4";
const GREEN   = "#10B981";
const CARD    = "rgba(255,255,255,0.03)";
const BORDER  = "1px solid rgba(255,255,255,0.07)";
const BG      = "#0A1628";

// ─── Couleurs par phase ───────────────────────────────────────────────────────
const PHASE_COLORS = [GOLD, CYAN, GREEN, "#8B5CF6"];
const PHASE_BG     = [
  "rgba(212,175,55,0.08)",
  "rgba(0,188,212,0.08)",
  "rgba(16,185,129,0.08)",
  "rgba(139,92,246,0.08)",
];
const PHASE_BORDER = [
  "rgba(212,175,55,0.2)",
  "rgba(0,188,212,0.2)",
  "rgba(16,185,129,0.2)",
  "rgba(139,92,246,0.2)",
];

// ─── Composants ──────────────────────────────────────────────────────────────

function StatChip({ icon: Icon, value, label, color }: { icon: any; value: string; label: string; color: string }) {
  return (
    <motion.div
      className="rounded-2xl p-5 flex items-start gap-4"
      style={{ background: CARD, border: BORDER }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" as const, stiffness: 120, damping: 20 }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <p className="text-2xl font-black text-white leading-none mb-0.5">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </motion.div>
  );
}

function PhaseBar({ phase, total, done }: { phase: number; total: number; done: number }) {
  const pct = Math.round((done / total) * 100);
  const color = PHASE_COLORS[phase - 1];
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-gray-500">Avancement</span>
        <span className="text-xs font-semibold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          className="h-1.5 rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function RoadmapPage() {
  return (
    <main className="min-h-screen" style={{ background: BG }}>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4"
        style={{ background: "rgba(10,22,40,0.9)", backdropFilter: "blur(12px)", borderBottom: `1px solid rgba(212,175,55,0.1)` }}>
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold"
            style={{ background: `linear-gradient(135deg, ${GOLD}, #F5D76E)`, color: BG }}>F</div>
          <span className="font-bold text-white">FORGE Afrika</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/ecosystem" className="text-sm text-gray-400 hover:text-white transition-colors">Filiales</Link>
          <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link>
          <Link href="/dashboard" className="text-sm px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${GOLD}, #F5D76E)`, color: BG }}>QG</Link>
        </div>
      </nav>

      <div className="pt-28 pb-24 px-4 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: "rgba(0,188,212,0.12)", border: "1px solid rgba(0,188,212,0.25)", color: CYAN }}>
            🗺️ Vision 2026–2030+
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            La route vers le{" "}
            <span style={{ background: `linear-gradient(135deg, ${GOLD}, #F5D76E)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              conglomérat
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            De la startup burkinabè à l'infrastructure économique panafricaine.
            Chaque phase est irréversible — c'est la stratégie pioche.
          </p>
        </motion.div>

        {/* KPIs actuels */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <StatChip icon={Zap}       value={`${activeCount}/${totalCount}`} label="Filiales actives"  color={GOLD} />
          <StatChip icon={Users}     value={totalUsers.toLocaleString("fr")} label="Utilisateurs"     color={CYAN} />
          <StatChip icon={TrendingUp} value={formatFCFA(totalCA)}            label="CA consolidé"     color={GREEN} />
          <StatChip icon={Target}    value={`Phase ${CURRENT_PHASE}`}        label="Phase actuelle"   color="#8B5CF6" />
        </div>

        {/* Barre de progression globale */}
        <motion.div className="rounded-2xl p-6 mb-16"
          style={{ background: "rgba(212,175,55,0.05)", border: `1px solid rgba(212,175,55,0.15)` }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, type: "spring" as const }}>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-white mb-3">Progression globale — Plan 2026–2030+</p>
              <div className="flex gap-1 h-3">
                {PHASES_ROADMAP.map((ph, i) => {
                  const done  = ph.milestones.filter(m => m.done).length;
                  const total = ph.milestones.length;
                  const pct   = Math.round((done / total) * 100);
                  const isActive = i + 1 === CURRENT_PHASE;
                  return (
                    <div key={ph.phase} className="relative group flex-1 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.06)" }}>
                      <motion.div className="absolute inset-y-0 left-0 rounded-full"
                        style={{ background: PHASE_COLORS[i], opacity: isActive ? 1 : 0.4 }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" }} />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[9px] font-bold text-white">{pct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex mt-2">
                {PHASES_ROADMAP.map((ph, i) => (
                  <div key={ph.phase} className="flex-1 text-center">
                    <span className="text-[10px] text-gray-500">Phase {ph.phase}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:text-right">
              <p className="text-2xl font-black text-white">
                {PHASES_ROADMAP.reduce((s, ph) => s + ph.milestones.filter(m => m.done).length, 0)}/
                {PHASES_ROADMAP.reduce((s, ph) => s + ph.milestones.length, 0)}
              </p>
              <p className="text-xs text-gray-400">milestones atteints</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline phases */}
        <div className="relative space-y-8">
          {/* Ligne verticale */}
          <div className="absolute left-5 top-5 bottom-5 w-px hidden md:block"
            style={{ background: `linear-gradient(to bottom, ${GOLD}, rgba(212,175,55,0.05))` }} />

          {PHASES_ROADMAP.map((phase, i) => {
            const done    = phase.milestones.filter(m => m.done).length;
            const total   = phase.milestones.length;
            const isActive  = i + 1 === CURRENT_PHASE;
            const isPast    = i + 1 < CURRENT_PHASE;
            const color     = PHASE_COLORS[i];
            const bg        = PHASE_BG[i];
            const border    = PHASE_BORDER[i];

            return (
              <motion.div key={phase.phase}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, type: "spring" as const }}
                viewport={{ once: true, margin: "-40px" }}
                className="md:flex gap-6"
              >
                {/* Indicateur cercle */}
                <div className="hidden md:flex w-10 shrink-0 flex-col items-center pt-1">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl z-10 relative flex-shrink-0"
                    style={{
                      background: bg,
                      border: `2px solid ${color}`,
                      boxShadow: isActive ? `0 0 16px ${color}44` : undefined,
                    }}>
                    {phase.icon}
                  </div>
                  {isActive && (
                    <motion.div
                      className="mt-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: color, color: BG }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      NOW
                    </motion.div>
                  )}
                </div>

                {/* Carte */}
                <div className="flex-1 rounded-2xl p-6 transition-all"
                  style={{ background: isActive ? bg : CARD, border: `1px solid ${isActive ? color + "30" : "rgba(255,255,255,0.07)"}` }}>

                  {/* En-tête carte */}
                  <div className="flex items-start justify-between mb-4 gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl md:hidden">{phase.icon}</span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold px-2 py-0.5 rounded"
                            style={{ background: `${color}18`, color }}>
                            Phase {phase.phase} · {phase.annee}
                          </span>
                          {isActive && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                              style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}>
                              ▶ En cours
                            </span>
                          )}
                          {isPast && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                              style={{ background: "rgba(16,185,129,0.12)", color: GREEN }}>
                              ✓ Complétée
                            </span>
                          )}
                        </div>
                        <h2 className="text-xl font-bold text-white mt-1">{phase.titre}</h2>
                      </div>
                    </div>
                    <span className="text-2xl font-black tabular-nums" style={{ color }}>
                      {done}/{total}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{phase.description}</p>

                  {/* Milestones */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                    {phase.milestones.map((m) => (
                      <div key={m.label} className="flex items-center gap-2.5">
                        {m.done ? (
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: GREEN }} />
                        ) : (
                          <Circle className="w-4 h-4 flex-shrink-0 text-gray-600" />
                        )}
                        <span className="text-sm" style={{ color: m.done ? "#D1FAE5" : "#6B7280" }}>
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Barre d'avancement */}
                  <PhaseBar phase={phase.phase} total={total} done={done} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section seed round CTA */}
        <motion.div className="mt-20 rounded-2xl p-10 text-center"
          style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.07), rgba(0,188,212,0.04))", border: "1px solid rgba(212,175,55,0.2)" }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }} viewport={{ once: true }}>

          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.3)" }}>
              <Flag className="w-6 h-6" style={{ color: GOLD }} />
            </div>
          </div>

          <p className="text-white/50 text-xs font-mono mb-2 uppercase tracking-widest">Seed Round · 2026</p>
          <h2 className="text-3xl font-bold text-white mb-3">
            La Phase 1 est là.{" "}
            <span style={{ background: `linear-gradient(135deg, ${GOLD}, #F5D76E)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              La Phase 2 commence.
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            {activeCount} filiales actives, {totalUsers.toLocaleString("fr")} utilisateurs.
            Nous levons pour financer l'expansion dans 3 pays d'Afrique de l'Ouest en 2027.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${GOLD}, #F5D76E)`, color: BG }}>
              Investir dans FORGE Afrika
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/ecosystem"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:scale-105"
              style={{ border: `1px solid rgba(212,175,55,0.3)`, color: GOLD, background: "rgba(212,175,55,0.05)" }}>
              Voir les filiales
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
