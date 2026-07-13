"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PRODUITS_FORGE, CATEGORIES, formatFCFA } from "@/lib/constants";

export default function EcosystemPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Tous");

  const filtered = activeCategory === "Tous"
    ? PRODUITS_FORGE
    : PRODUITS_FORGE.filter((p) => p.categorie === activeCategory);

  return (
    <main className="min-h-screen" style={{ background: "#0A1628" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: "rgba(10,22,40,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(212,175,55,0.1)" }}>
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}>F</div>
          <span className="font-bold text-white">FORGE Afrika</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/roadmap" className="text-sm text-gray-400 hover:text-white transition-colors">Roadmap</Link>
          <Link href="/dashboard" className="text-sm px-4 py-2 rounded-lg font-medium"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}>QG</Link>
        </div>
      </nav>

      <div className="pt-28 pb-20 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
            style={{ background: "rgba(0,188,212,0.15)", border: "1px solid rgba(0,188,212,0.3)", color: "#00BCD4" }}>
            9 produits · 5 secteurs · 3 pays
          </span>
          <h1 className="text-5xl font-bold text-white mb-4">L'Écosystème FORGE Afrika</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Chaque produit est une brique. Ensemble, ils forment l'infrastructure technologique de l'Afrique de demain.
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

        {/* Grid produits */}
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            {filtered.map((produit, i) => (
              <motion.div key={produit.slug}
                className="rounded-2xl p-6 relative overflow-hidden group"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06, type: "spring" as const }}
                whileHover={{ borderColor: "#D4AF37", boxShadow: "0 0 40px rgba(212,175,55,0.1)" }}>
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: produit.couleur }} />

                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{produit.icon}</div>
                  <span className="text-xs px-2 py-1 rounded-full"
                    style={{
                      background: produit.statut === "Actif" ? "rgba(34,197,94,0.15)" : "rgba(212,175,55,0.15)",
                      color: produit.statut === "Actif" ? "#22C55E" : "#D4AF37",
                    }}>
                    {produit.statut}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{produit.nom}</h3>
                <span className="text-xs font-semibold mb-3 block" style={{ color: produit.couleur }}>{produit.categorie}</span>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{produit.description}</p>

                {/* Métriques */}
                {produit.metriques.utilisateurs > 0 && (
                  <div className="grid grid-cols-3 gap-3 mb-5 py-4 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.04)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="text-center">
                      <div className="text-white font-bold text-sm">{produit.metriques.utilisateurs.toLocaleString("fr-FR")}</div>
                      <div className="text-gray-500 text-xs">Utilisateurs</div>
                    </div>
                    <div className="text-center" style={{ borderLeft: "1px solid rgba(255,255,255,0.06)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="text-white font-bold text-sm">{produit.metriques.transactions.toLocaleString("fr-FR")}</div>
                      <div className="text-gray-500 text-xs">Transactions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold text-sm">{(produit.metriques.ca / 1000000).toFixed(0)}M</div>
                      <div className="text-gray-500 text-xs">CA FCFA</div>
                    </div>
                  </div>
                )}

                <a href={produit.url}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{ background: "rgba(212,175,55,0.1)", color: "#D4AF37", border: "1px solid rgba(212,175,55,0.2)" }}>
                  Accéder au produit →
                </a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Section Synergie */}
        <motion.div className="mt-24 rounded-2xl p-10 text-center"
          style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.15)" }}
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-white mb-4">La Synergie FORGE</h2>
          <p className="text-gray-400 max-w-3xl mx-auto mb-8">
            TAAMA collecte les données agricoles → AgroTrack BF gère les coopératives → ValueChain Connect connecte acheteurs et vendeurs
            → MillTrack transforme les matières → CompTrack gère la comptabilité → FORJA exporte les produits finis.
            Un écosystème complet, bout-en-bout.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {PRODUITS_FORGE.slice(0, 8).map((p) => (
              <span key={p.slug} className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: `${p.couleur}20`, color: p.couleur, border: `1px solid ${p.couleur}40` }}>
                {p.icon} {p.nom}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
