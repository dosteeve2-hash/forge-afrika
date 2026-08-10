"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ExternalLink, ChevronRight } from "lucide-react";
import { FILIALES_FORGE, SECTEUR_META, type Secteur } from "@/lib/constants";
import ForgeLogoSVG from "@/components/ForgeLogoSVG";

const SECTEURS: Secteur[] = ["Primaire", "Secondaire", "Tertiaire", "Social"];

/* ── Angles des secteurs autour du QG (0°=droite, 90°=bas) ─────────────── */
const SECTEUR_ANGLES: Record<Secteur, number> = {
  Primaire: -135,
  Secondaire: -45,
  Tertiaire: 45,
  Social: 135,
};

function polar(angleDeg: number, radiusPct: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: 50 + radiusPct * Math.cos(rad), y: 50 + radiusPct * Math.sin(rad) };
}

/* ── Diagramme SVG : FORGE au centre, 4 secteurs, filiales rayonnantes ── */
function EcosystemDiagram() {
  const R_SECTEUR = 27;
  const R_FILIALE = 46;

  const nodes = SECTEURS.map((secteur) => {
    const meta = SECTEUR_META[secteur];
    const angle = SECTEUR_ANGLES[secteur];
    const secteurPos = polar(angle, R_SECTEUR);
    const filiales = FILIALES_FORGE.filter((f) => f.secteur === secteur);
    const span = filiales.length > 1 ? 56 : 0;
    const filialesPos = filiales.map((f, i) => {
      const a =
        filiales.length === 1
          ? angle
          : angle - span / 2 + (span / (filiales.length - 1)) * i;
      return { f, pos: polar(a, R_FILIALE) };
    });
    return { secteur, meta, angle, secteurPos, filialesPos };
  });

  return (
    <motion.div
      className="mb-16 rounded-3xl p-6 md:p-10"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,175,55,0.15)" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" as const }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-8">
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
          style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#D4AF37" }}
        >
          🗺️ Vue d&apos;ensemble
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Le groupe, en un coup d&apos;œil</h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          FORGE Afrika au centre, quatre secteurs, dix filiales rayonnantes.
        </p>
      </div>

      <div className="relative mx-auto" style={{ width: "100%", maxWidth: 640, aspectRatio: "1 / 1" }}>
        {/* Lignes de connexion */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
          {nodes.map(({ secteur, meta, secteurPos, filialesPos }) => (
            <g key={secteur}>
              <line
                x1={50}
                y1={50}
                x2={secteurPos.x}
                y2={secteurPos.y}
                stroke={meta.color}
                strokeWidth={0.4}
                strokeOpacity={0.45}
              />
              {filialesPos.map(({ f, pos }) => (
                <line
                  key={f.slug}
                  x1={secteurPos.x}
                  y1={secteurPos.y}
                  x2={pos.x}
                  y2={pos.y}
                  stroke={f.couleur}
                  strokeWidth={0.25}
                  strokeOpacity={0.35}
                />
              ))}
            </g>
          ))}
        </svg>

        {/* Nœud central FORGE */}
        <motion.div
          className="absolute flex flex-col items-center gap-1.5"
          style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" as const }}
          viewport={{ once: true }}
        >
          <div
            className="rounded-2xl p-2 flex items-center justify-center"
            style={{
              background: "rgba(212,175,55,0.1)",
              border: "1px solid rgba(212,175,55,0.4)",
              boxShadow: "0 0 40px rgba(212,175,55,0.25)",
            }}
          >
            <ForgeLogoSVG size={44} variant="icon" />
          </div>
          <span className="text-[10px] md:text-xs font-bold text-white">FORGE HQ</span>
        </motion.div>

        {/* Nœuds secteurs */}
        {nodes.map(({ secteur, meta, secteurPos, filialesPos }, si) => (
          <div key={secteur}>
            <motion.div
              className="absolute flex flex-col items-center gap-1"
              style={{ left: `${secteurPos.x}%`, top: `${secteurPos.y}%`, transform: "translate(-50%,-50%)" }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15 + si * 0.08, type: "spring" as const }}
              viewport={{ once: true }}
            >
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl"
                style={{ background: `${meta.color}18`, border: `1.5px solid ${meta.color}` }}
              >
                {meta.icon}
              </div>
              <span
                className="text-[9px] md:text-[10px] font-semibold whitespace-nowrap"
                style={{ color: meta.color }}
              >
                {secteur}
              </span>
            </motion.div>

            {/* Nœuds filiales du secteur */}
            {filialesPos.map(({ f, pos }, fi) => (
              <motion.div
                key={f.slug}
                className="absolute flex flex-col items-center group"
                style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%,-50%)" }}
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.3 + si * 0.08 + fi * 0.05, type: "spring" as const }}
                viewport={{ once: true }}
              >
                <div
                  className="w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center text-sm md:text-base cursor-default transition-transform group-hover:scale-125"
                  style={{ background: "#0A1628", border: `1.5px solid ${f.couleur}` }}
                  title={f.nom}
                >
                  {f.icon}
                </div>
                <span
                  className="mt-1 text-[7px] md:text-[8px] text-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity absolute top-full"
                >
                  {f.nom}
                </span>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Flux d'interconnexions entre filiales ─────────────────────────────── */
const FLUX = [
  {
    de: "AgroTrack BF",
    vers: "ValueChain Connect",
    label: "Données collectes agricoles",
    couleur: "#10B981",
  },
  {
    de: "ValueChain Connect",
    vers: "MillTrack",
    label: "Commandes matières premières",
    couleur: "#3B82F6",
  },
  {
    de: "MillTrack",
    vers: "TAAMA",
    label: "Lots de production tracés",
    couleur: "#EAB308",
  },
  {
    de: "TAAMA",
    vers: "FORJA",
    label: "Produits certifiés à l'export",
    couleur: "#22C55E",
  },
  {
    de: "SUGU",
    vers: "CompTrack",
    label: "Transactions boutiques → comptabilité",
    couleur: "#F97316",
  },
  {
    de: "MIFA Life",
    vers: "CompTrack",
    label: "Revenus marketplace → SYSCOHADA",
    couleur: "#F59E0B",
  },
  {
    de: "InduBot Afrika",
    vers: "TAAMA",
    label: "Données capteurs robots → QC",
    couleur: "#F97316",
  },
];

/* ── Filiale card ──────────────────────────────────────────────────────── */
function FilialeCard({ f, i }: { f: (typeof FILIALES_FORGE)[0]; i: number }) {
  const hasSite = f.url !== "#";
  const statutColor =
    f.statut === "Actif"
      ? "#10B981"
      : f.statut === "Planifié"
      ? "#8B5CF6"
      : "#F59E0B";

  return (
    <motion.div
      key={f.slug}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.05, type: "spring" as const }}
      viewport={{ once: true, margin: "-30px" }}
      className="rounded-2xl p-6 group relative overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: `1px solid ${f.couleur}25`,
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = f.couleur + "55";
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 32px ${f.couleur}18`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = f.couleur + "25";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${f.couleur}, transparent)` }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{f.icon}</span>
          <div>
            <h3 className="font-bold text-white text-base">{f.nom}</h3>
            <span className="text-xs" style={{ color: f.couleur }}>
              {f.categorie}
            </span>
          </div>
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-full shrink-0 ml-2"
          style={{ background: `${statutColor}18`, color: statutColor }}
        >
          {f.statut === "Actif" ? "● Actif" : f.statut === "Planifié" ? "◈ Planifié" : "◐ Dev"}
        </span>
      </div>

      {/* Pourquoi */}
      <p className="text-xs text-gray-400 leading-relaxed mb-4 italic">{f.pourquoi}</p>

      {/* Description */}
      <p className="text-sm text-gray-300 leading-relaxed mb-4">{f.description}</p>

      {/* Métriques */}
      {f.metriques.utilisateurs > 0 && (
        <div
          className="grid grid-cols-3 gap-2 mb-4 py-3 rounded-xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="text-center">
            <div className="text-sm font-bold" style={{ color: f.couleur }}>
              {f.metriques.utilisateurs.toLocaleString("fr-FR")}
            </div>
            <div className="text-gray-600 text-xs">Users</div>
          </div>
          <div
            className="text-center"
            style={{
              borderLeft: "1px solid rgba(255,255,255,0.06)",
              borderRight: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="text-sm font-bold text-white">
              {f.metriques.transactions.toLocaleString("fr-FR")}
            </div>
            <div className="text-gray-600 text-xs">Tx</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-white">
              {(f.metriques.ca / 1_000_000).toFixed(0)}M
            </div>
            <div className="text-gray-600 text-xs">CA FCFA</div>
          </div>
        </div>
      )}

      {/* CTA */}
      {hasSite ? (
        <a
          href={f.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-sm font-medium transition-all hover:scale-[1.02]"
          style={{
            background: `${f.couleur}12`,
            color: f.couleur,
            border: `1px solid ${f.couleur}30`,
          }}
        >
          Voir le site <ExternalLink className="w-3.5 h-3.5" />
        </a>
      ) : (
        <div
          className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-sm"
          style={{ background: "rgba(255,255,255,0.03)", color: "#4B5563" }}
        >
          Bientôt disponible
        </div>
      )}
    </motion.div>
  );
}

/* ── Page principale ───────────────────────────────────────────────────── */
export default function EcosystemPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | Secteur>("all");

  const totalUsers = FILIALES_FORGE.reduce((s, f) => s + f.metriques.utilisateurs, 0);
  const totalCA = FILIALES_FORGE.reduce((s, f) => s + f.metriques.ca, 0);
  const totalActives = FILIALES_FORGE.filter((f) => f.statut === "Actif").length;

  return (
    <main className="min-h-screen" style={{ background: "#0A1628" }}>
      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(10,22,40,0.92)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        <Link href="/" className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #F5D76E)",
              color: "#0A1628",
            }}
          >
            F
          </div>
          <span className="font-bold text-white text-sm">FORGE Afrika</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/roadmap"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Roadmap
          </Link>
          <Link
            href="/contact"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/dashboard"
            className="text-sm px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #D4AF37, #F5D76E)",
              color: "#0A1628",
            }}
          >
            QG →
          </Link>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="pt-28 pb-12 px-4 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" as const }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: "rgba(0,188,212,0.12)",
              border: "1px solid rgba(0,188,212,0.25)",
              color: "#00BCD4",
            }}
          >
            🌍 {FILIALES_FORGE.length} filiales · 4 secteurs · Panafricain
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-5">
            L&apos;Écosystème{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #D4AF37, #F5D76E)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              FORGE
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Du champ à l&apos;usine, de la boutique au marché mondial — une infrastructure numérique complète
            pour l&apos;Afrique, gouvernée depuis un seul QG.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          {[
            { v: `${FILIALES_FORGE.length}`, l: "Filiales fondées" },
            { v: `${totalActives}`, l: "En production" },
            { v: totalUsers.toLocaleString("fr"), l: "Utilisateurs" },
            { v: `${(totalCA / 1_000_000).toFixed(0)}M`, l: "CA FCFA" },
          ].map((s) => (
            <div
              key={s.l}
              className="text-center py-4 px-3 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p
                className="text-3xl font-black mb-1"
                style={{
                  background: "linear-gradient(135deg, #D4AF37, #F5D76E)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.v}
              </p>
              <p className="text-xs text-gray-500">{s.l}</p>
            </div>
          ))}
        </motion.div>

        {/* ── DIAGRAMME VISUEL : FORGE + 4 SECTEURS + FILIALES ─────────────── */}
        <EcosystemDiagram />

        {/* ── FILTRES SECTEUR ────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <button
            onClick={() => setActiveFilter("all")}
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
            style={
              activeFilter === "all"
                ? { background: "#D4AF37", color: "#0A1628" }
                : {
                    background: "rgba(255,255,255,0.05)",
                    color: "#9CA3AF",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }
            }
          >
            🌍 Tous les secteurs
          </button>
          {SECTEURS.map((s) => {
            const meta = SECTEUR_META[s];
            return (
              <button
                key={s}
                onClick={() => setActiveFilter(s)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
                style={
                  activeFilter === s
                    ? { background: meta.color, color: "#0A1628" }
                    : {
                        background: `${meta.color}12`,
                        color: meta.color,
                        border: `1px solid ${meta.color}30`,
                      }
                }
              >
                {meta.icon} {meta.label}
              </button>
            );
          })}
        </motion.div>

        {/* ── GRILLE PAR SECTEUR ─────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {(activeFilter === "all" ? SECTEURS : [activeFilter as Secteur]).map((secteur) => {
              const meta = SECTEUR_META[secteur];
              const filiales = FILIALES_FORGE.filter((f) => f.secteur === secteur);
              if (!filiales.length) return null;
              return (
                <div key={secteur} className="mb-16">
                  {/* Secteur header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}30` }}
                    >
                      {meta.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold" style={{ color: meta.color }}>
                        {meta.label}
                      </h2>
                      <p className="text-sm text-gray-500">{meta.description}</p>
                    </div>
                    <div
                      className="h-px flex-1"
                      style={{
                        background: `linear-gradient(to right, ${meta.color}40, transparent)`,
                      }}
                    />
                    <span
                      className="text-xs px-3 py-1 rounded-full font-semibold"
                      style={{ background: `${meta.color}12`, color: meta.color }}
                    >
                      {filiales.length} filiale{filiales.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filiales.map((f, i) => (
                      <FilialeCard key={f.slug} f={f} i={i} />
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── INTERCONNEXIONS ────────────────────────────────────────────── */}
        <motion.div
          className="mt-8 rounded-3xl p-10"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(0,188,212,0.15)",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{
                background: "rgba(0,188,212,0.1)",
                border: "1px solid rgba(0,188,212,0.2)",
                color: "#00BCD4",
              }}
            >
              ⚡ Flux de données entre filiales
            </span>
            <h2 className="text-3xl font-bold text-white mb-3">Comment elles s&apos;interconnectent</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              L&apos;écosystème n&apos;est pas une collection d&apos;apps isolées — c&apos;est un réseau vivant où
              chaque donnée produite par une filiale alimente les autres.
            </p>
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            {FLUX.map((flux, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: `1px solid ${flux.couleur}20`,
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, type: "spring" as const }}
                viewport={{ once: true }}
              >
                <span
                  className="text-sm font-bold shrink-0"
                  style={{ color: flux.couleur, minWidth: 130 }}
                >
                  {flux.de}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-600 shrink-0" />
                <span className="text-xs text-gray-400 flex-1">{flux.label}</span>
                <ChevronRight className="w-4 h-4 text-gray-600 shrink-0" />
                <span
                  className="text-sm font-bold shrink-0"
                  style={{ color: flux.couleur, minWidth: 130, textAlign: "right" }}
                >
                  {flux.vers}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Synergie pills */}
          <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-center text-sm text-gray-500 mb-4">Toutes les filiales de l&apos;écosystème</p>
            <div className="flex flex-wrap justify-center gap-2">
              {FILIALES_FORGE.map((f) => (
                <span
                  key={f.slug}
                  className="px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: `${f.couleur}18`,
                    color: f.couleur,
                    border: `1px solid ${f.couleur}30`,
                  }}
                >
                  {f.icon} {f.nom}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <motion.div
          className="mt-12 rounded-2xl p-8 md:p-12 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.06), rgba(0,188,212,0.04))",
            border: "1px solid rgba(212,175,55,0.2)",
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" as const }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Rejoindre{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #D4AF37, #F5D76E)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              l&apos;aventure
            </span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Seed Round 2026 ouvert. Investisseurs, partenaires et talents — construisons
            ensemble l&apos;infrastructure de l&apos;Afrique de demain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #F5D76E)",
                color: "#0A1628",
              }}
            >
              Contacter Steeve <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105"
              style={{
                border: "1px solid rgba(212,175,55,0.35)",
                color: "#D4AF37",
                background: "rgba(212,175,55,0.06)",
              }}
            >
              Accéder au QG <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
