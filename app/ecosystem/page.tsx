"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import { FILIALES_FORGE, CATEGORIES } from "@/lib/constants";

export default function EcosystemPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Tous");

  const filtered = activeCategory === "Tous"
    ? FILIALES_FORGE
    : FILIALES_FORGE.filter((f) => f.categorie === activeCategory);

  const nbSecteurs = new Set(FILIALES_FORGE.map((f) => f.categorie)).size;

  return (
    <main className="min-h-screen" style={{ background: "#0A1628" }}>
      <Nav />

      <div className="pt-28 pb-20 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
            style={{ background: "rgba(0,188,212,0.15)", border: "1px solid rgba(0,188,212,0.3)", color: "#00BCD4" }}>
            {FILIALES_FORGE.length} filiales · {nbSecteurs} secteurs · entreprise mère
          </span>
          <h1 className="text-5xl font-bold text-white mb-4">Nos Filiales</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            FORGE Afrika est l'entreprise mère. Chaque filiale ci-dessous est une ramification autonome,
            gouvernée depuis le QG, qui forge l'infrastructure économique de l'Afrique de demain.
          </p>
        </motion.div>

        {/* Filtres */}
        <motion.div className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={activeCategory === cat
                ? { background: "#D4AF37", color: "#0A1628" }
                : { background: "rgba(255,255,255,0.05)", color: "#9CA3AF", border: "1px solid rgba(255,255,255,0.1)" }}>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid filiales */}
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            {filtered.map((filiale, i) => {
              const hasSite = filiale.url !== "#";
              return (
                <motion.div key={filiale.slug}
                  className="rounded-2xl p-6 relative overflow-hidden group"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06, type: "spring" as const }}
                  whileHover={{ borderColor: "#D4AF37", boxShadow: "0 0 40px rgba(212,175,55,0.1)" }}>
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: filiale.couleur }} />

                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{filiale.icon}</div>
                    <span className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: filiale.statut === "Actif" ? "rgba(34,197,94,0.15)" : "rgba(212,175,55,0.15)",
                        color: filiale.statut === "Actif" ? "#22C55E" : "#D4AF37",
                      }}>
                      {filiale.statut}
                    </span>
                  </div>

                  <Link href={`/ecosystem/${filiale.slug}`}>
                    <h3 className="text-xl font-bold text-white mb-1 hover:text-[#D4AF37] transition-colors">{filiale.nom}</h3>
                  </Link>
                  <span className="text-xs font-semibold mb-3 block" style={{ color: filiale.couleur }}>{filiale.categorie}</span>
                  <p className="text-gray-400 text-sm mb-5 leading-relaxed">{filiale.description}</p>

                  {/* Métriques */}
                  {filiale.metriques.utilisateurs > 0 && (
                    <div className="grid grid-cols-3 gap-3 mb-5 py-4 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.04)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="text-center">
                        <div className="text-white font-bold text-sm">{filiale.metriques.utilisateurs.toLocaleString("fr-FR")}</div>
                        <div className="text-gray-500 text-xs">Utilisateurs</div>
                      </div>
                      <div className="text-center" style={{ borderLeft: "1px solid rgba(255,255,255,0.06)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="text-white font-bold text-sm">{filiale.metriques.transactions.toLocaleString("fr-FR")}</div>
                        <div className="text-gray-500 text-xs">Transactions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-sm">{(filiale.metriques.ca / 1000000).toFixed(0)}M</div>
                        <div className="text-gray-500 text-xs">CA FCFA</div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Link href={`/ecosystem/${filiale.slug}`}
                      className="flex-1 flex items-center justify-center py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
                      style={{ background: "rgba(255,255,255,0.05)", color: "#E5E7EB", border: "1px solid rgba(255,255,255,0.12)" }}>
                      La fiche →
                    </Link>
                    {hasSite ? (
                      <a href={filiale.url} target="_blank" rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
                        style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.2)" }}>
                        Le site ↗
                      </a>
                    ) : (
                      <span className="flex-1 flex items-center justify-center py-2.5 rounded-xl text-sm font-medium cursor-not-allowed"
                        style={{ background: "rgba(255,255,255,0.03)", color: "#6B7280", border: "1px solid rgba(255,255,255,0.08)" }}>
                        Bientôt
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Section Synergie */}
        <motion.div className="mt-24 rounded-2xl p-10 text-center"
          style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.15)" }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-white mb-4">La Synergie FORGE</h2>
          <p className="text-gray-400 max-w-3xl mx-auto mb-8">
            SUGU digitalise le commerce informel → TAAMA trace la qualité industrielle → AgroTrack BF gère les coopératives
            → ValueChain Connect connecte acheteurs et vendeurs → MillTrack transforme les matières →
            CompTrack tient la comptabilité → FORJA exporte les produits finis. Un écosystème complet, bout-en-bout,
            gouverné depuis un seul QG.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {FILIALES_FORGE.map((f) => (
              <span key={f.slug} className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: `${f.couleur}20`, color: f.couleur, border: `1px solid ${f.couleur}40` }}>
                {f.icon} {f.nom}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
