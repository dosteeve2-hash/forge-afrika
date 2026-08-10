"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import { MARKETING_DATA } from "@/lib/marketing";
import { FILIALES_FORGE } from "@/lib/constants";
import { use } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProduitPage({ params }: Props) {
  const { slug } = use(params);
  const data = MARKETING_DATA[slug];
  const filiale = FILIALES_FORGE.find((f) => f.slug === slug);

  if (!data || !filiale) notFound();

  const c = data.couleur;

  return (
    <main className="min-h-screen" style={{ background: "#0A1628", color: "#F8F9FA" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(10,22,40,0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <Link
          href="/ecosystem"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Retour à l&apos;écosystème
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{filiale.icon}</span>
          <span className="font-bold text-white">{data.nom}</span>
        </div>
        <a
          href={data.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
          style={{ background: c, color: "#0A1628" }}
        >
          {data.ctaText}
        </a>
      </nav>

      {/* HERO */}
      <section
        className="pt-32 pb-20 px-4 text-center relative overflow-hidden"
        style={{ background: data.bgGradient }}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${c}, transparent)`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block text-6xl mb-6"
              style={{ filter: `drop-shadow(0 0 24px ${c})` }}
            >
              {filiale.icon}
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: `${c}25`, border: `1px solid ${c}40`, color: c }}
            >
              ✦ {filiale.categorie} · FORGE Afrika
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
              {data.headline}
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {data.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={data.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: c, color: "#0A1628", boxShadow: `0 4px 32px ${c}50` }}
              >
                {data.ctaText} <ArrowUpRight className="w-5 h-5" />
              </a>
              {data.ctaSecondText && (
                <a
                  href={data.ctaSecondUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
                  style={{
                    border: `1px solid ${c}50`,
                    color: c,
                    background: `${c}10`,
                  }}
                >
                  {data.ctaSecondText}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-20">
        {/* PROBLÈME */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div
            className="rounded-3xl p-10"
            style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">⚠️</span>
              <h2 className="text-2xl font-bold text-white">{data.problemTitle}</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">{data.problem}</p>
          </div>
        </motion.section>

        {/* SOLUTION */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div
            className="rounded-3xl p-10"
            style={{ background: `${c}08`, border: `1px solid ${c}20` }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">💡</span>
              <h2 className="text-2xl font-bold" style={{ color: c }}>
                {data.solutionTitle}
              </h2>
            </div>
            <p className="text-gray-200 text-lg leading-relaxed">{data.solution}</p>
          </div>
        </motion.section>

        {/* FEATURES */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">
              Tout ce que{" "}
              <span style={{ color: c }}>{data.nom}</span>{" "}
              fait pour vous
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Des fonctionnalités conçues pour votre réalité, pas pour un marché occidental.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.features.map((f, i) => (
              <motion.div
                key={f.titre}
                className="rounded-2xl p-6 group"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: `1px solid ${c}20`,
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = c + "50";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 24px ${c}15`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = c + "20";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: `${c}15` }}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{f.titre}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* POUR QUI */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div
            className="rounded-3xl p-10"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <h2 className="text-2xl font-bold text-white mb-7">
              {data.nom} est fait pour vous si…
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {data.audiences.map((a) => (
                <div key={a} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: c }} />
                  <span className="text-gray-300 text-sm leading-relaxed">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* TÉMOIGNAGES */}
        {data.testimonials.length > 0 && (
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Ce que disent nos utilisateurs
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {data.testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  className="rounded-2xl p-7"
                  style={{ background: `${c}08`, border: `1px solid ${c}20` }}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="text-gray-200 text-base italic mb-5 leading-relaxed">
                    &ldquo;{t.texte}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{ background: c, color: "#0A1628" }}
                    >
                      {t.auteur[0]}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{t.auteur}</p>
                      <p className="text-gray-500 text-xs">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* MÉTRIQUES de la filiale */}
        {filiale.metriques.utilisateurs > 0 && (
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div
              className="grid grid-cols-3 gap-4 rounded-2xl p-8"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {[
                { v: filiale.metriques.utilisateurs.toLocaleString("fr"), l: "Utilisateurs actifs" },
                { v: filiale.metriques.transactions.toLocaleString("fr"), l: "Transactions" },
                { v: `${(filiale.metriques.ca / 1_000_000).toFixed(0)}M FCFA`, l: "Chiffre d'affaires" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <p className="text-3xl font-black mb-1" style={{ color: c }}>{s.v}</p>
                  <p className="text-xs text-gray-500">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA FINAL */}
        <motion.section
          className="rounded-3xl p-12 text-center"
          style={{
            background: data.bgGradient,
            border: `1px solid ${c}30`,
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-5xl mb-5 block">{filiale.icon}</span>
          <h2 className="text-3xl font-black text-white mb-4">
            Prêt à transformer votre activité avec {data.nom} ?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Rejoignez des centaines d&apos;entreprises africaines qui ont choisi de se digitaliser avec FORGE Afrika.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={data.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
              style={{ background: c, color: "#0A1628", boxShadow: `0 4px 32px ${c}50` }}
            >
              {data.ctaText} <ArrowUpRight className="w-5 h-5" />
            </a>
            <Link
              href="/ecosystem"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
              style={{ border: `1px solid ${c}40`, color: c, background: `${c}10` }}
            >
              Voir tous les produits <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
