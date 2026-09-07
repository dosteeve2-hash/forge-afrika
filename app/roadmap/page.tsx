"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import { PHASES_ROADMAP } from "@/lib/constants";

export default function RoadmapPage() {
  return (
    <main className="min-h-screen" style={{ background: "#0A1628" }}>
      <Nav />

      <div className="pt-28 pb-24 px-4 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
            style={{ background: "rgba(0,188,212,0.15)", border: "1px solid rgba(0,188,212,0.3)", color: "#00BCD4" }}>
            🗺️ Vision 2026–2030+
          </span>
          <h1 className="text-5xl font-bold text-white mb-4">Roadmap FORGE Afrika</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            De la startup burkinabè au conglomérat industriel panafricain.
            Chaque phase est une étape vers un empire centenaire.
          </p>
        </motion.div>

        {/* Timeline phases */}
        <div className="relative">
          {/* Ligne verticale */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 hidden md:block"
            style={{ background: "linear-gradient(to bottom, #D4AF37, rgba(212,175,55,0.1))" }} />

          <div className="space-y-12">
            {PHASES_ROADMAP.map((phase, i) => (
              <motion.div key={phase.phase}
                initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12, type: "spring" as const }}
                viewport={{ once: true, margin: "-50px" }}>
                <div className="md:flex gap-8">
                  {/* Circle */}
                  <div className="hidden md:flex w-12 shrink-0 justify-center">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl z-10 relative"
                      style={{ background: "rgba(212,175,55,0.15)", border: "2px solid #D4AF37" }}>
                      {phase.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 rounded-2xl p-6"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl md:hidden">{phase.icon}</span>
                      <span className="text-xs font-bold px-2 py-1 rounded"
                        style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37" }}>
                        Phase {phase.phase} · {phase.annee}
                      </span>
                      <h2 className="text-xl font-bold text-white">{phase.titre}</h2>
                    </div>
                    <p className="text-gray-400 mb-5">{phase.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {phase.milestones.map((m) => (
                        <div key={m.label} className="flex items-center gap-2 text-sm">
                          <span style={{ color: m.done ? "#22C55E" : "#4B5563" }}>
                            {m.done ? "✓" : "○"}
                          </span>
                          <span style={{ color: m.done ? "#D1FAE5" : "#6B7280" }}>{m.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section investisseurs */}
        <motion.div className="mt-24 rounded-2xl p-10 text-center"
          style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.08), rgba(0,188,212,0.05))", border: "1px solid rgba(212,175,55,0.2)" }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-white mb-3">Vous croyez en l'Afrique ?</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            FORGE Afrika cherche des partenaires stratégiques et investisseurs qui partagent la vision
            d'un conglomérat industriel panafricain.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact"
              className="px-6 py-3 rounded-xl font-semibold text-sm"
              style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}>
              Nous écrire
            </Link>
            <Link href="/ecosystem"
              className="px-6 py-3 rounded-xl font-semibold text-sm text-gray-300 hover:text-white transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
              Voir les filiales
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
