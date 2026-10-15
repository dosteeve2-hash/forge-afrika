"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FILIALES_FORGE, SECTEUR_META, type Secteur } from "@/lib/constants";

const SECTEURS: Secteur[] = ["Primaire", "Secondaire", "Tertiaire"];

export default function EcosystemVisionSection() {
  return (
    <section id="ecosysteme" className="py-24 px-4 relative overflow-hidden">
      {/* Halo fond */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,188,212,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }} viewport={{ once: true }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: "rgba(0,188,212,0.12)", border: "1px solid rgba(0,188,212,0.25)", color: "#00BCD4" }}>
            🌍 Du champ à l&apos;usine
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Un maillon à la fois.
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            FORGE Afrika vise à construire{" "}
            <span style={{ color: "#D4AF37" }}>l&apos;infrastructure numérique</span>{" "}
            des filières africaines — du champ à l&apos;usine, de la boutique à l&apos;export. Chaque outil est indépendant et utilisable seul.
          </p>
        </motion.div>

        {/* Schéma pyramide / couches */}
        <div className="space-y-6 mb-20">
          {SECTEURS.map((secteur, si) => {
            const meta     = SECTEUR_META[secteur];
            const filiales = FILIALES_FORGE.filter(f => f.secteur === secteur);
            const delay    = si * 0.1;

            return (
              <motion.div key={secteur}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay, type: "spring" as const }}
                viewport={{ once: true, margin: "-40px" }}
              >
                {/* Label secteur */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{meta.icon}</span>
                  <div>
                    <span className="text-sm font-bold" style={{ color: meta.color }}>{meta.label}</span>
                    <p className="text-xs text-gray-500">{meta.description}</p>
                  </div>
                  <div className="flex-1 h-px ml-2" style={{ background: `linear-gradient(to right, ${meta.color}30, transparent)` }} />
                </div>

                {/* Cartes filiales du secteur */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pl-8">
                  {filiales.map((f, fi) => (
                    <motion.div key={f.slug}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: delay + fi * 0.07, type: "spring" as const }}
                      viewport={{ once: true }}
                      className="rounded-xl p-4 group"
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        border: `1px solid ${f.couleur}22`,
                        transition: "border-color 0.2s, background 0.2s",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = f.couleur + "55";
                        (e.currentTarget as HTMLDivElement).style.background = f.couleur + "08";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = f.couleur + "22";
                        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)";
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{f.icon}</span>
                        <span className="font-bold text-sm text-white">{f.nom}</span>
                        <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full"
                          style={{
                            background: f.statut === "Disponible" ? "rgba(16,185,129,0.12)" : "rgba(255,165,0,0.10)",
                            color: f.statut === "Disponible" ? "#10B981" : "#F59E0B",
                          }}>
                          {f.statut === "Disponible" ? "● Disponible" : "◐ En développement"}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-gray-400 mb-3">{f.pourquoi}</p>
                      <a href={f.url} target="_blank" rel="noopener noreferrer"
                          className="mt-2 text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: f.couleur }}>
                          Voir le projet <ArrowRight className="w-3 h-3" />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div className="text-center mt-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }} viewport={{ once: true }}>
          <Link href="/ecosystem"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
            style={{ color: "#D4AF37" }}>
            Explorer tous les outils <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
