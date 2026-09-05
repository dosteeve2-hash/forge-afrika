"use client";

import { motion } from "framer-motion";
import { TrendingUp, Globe, Shield, Zap, Mail, ArrowUpRight } from "lucide-react";

const ATOUTS = [
  {
    icon: Globe,
    titre: "Marché continental",
    desc: "1,4 milliard d'Africains, 60% sous-bancarisés, 30-40% de pertes post-récolte. Le besoin est massif, urgent, non-servi.",
    color: "#00BCD4",
  },
  {
    icon: TrendingUp,
    titre: "Croissance prouvée",
    desc: "10 filiales fondées, 6 en production, 5 000+ utilisateurs actifs. Chaque vertical génère des revenus récurrents dès le lancement.",
    color: "#D4AF37",
  },
  {
    icon: Shield,
    titre: "Avantage structurel",
    desc: "Conçu pour le terrain africain : offline-first, mobile-first, SYSCOHADA, FCFA, langues locales. Impossible à dupliquer depuis l'extérieur.",
    color: "#10B981",
  },
  {
    icon: Zap,
    titre: "Stratégie pioche",
    desc: "FORGE ne choisit pas un secteur — elle équipe tous les acteurs. Comme Levi Strauss pendant la ruée vers l'or : on vend les outils, pas l'or.",
    color: "#8B5CF6",
  },
];

export default function InvestorSection() {
  return (
    <section id="investisseurs" className="py-24 px-4 relative overflow-hidden">
      {/* Halo de fond */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(212,175,55,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }}
          viewport={{ once: true }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.25)", color: "#D4AF37" }}
          >
            💼 Opportunité d&apos;investissement
          </span>
          <h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Rejoindre FORGE Afrika
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Nous recherchons des partenaires qui comprennent que l&apos;Afrique n&apos;est pas un marché
            émergent — c&apos;est le <em style={{ color: "#D4AF37" }}>marché du siècle</em>.
          </p>
        </motion.div>

        {/* Grille des atouts */}
        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {ATOUTS.map((a, i) => (
            <motion.div
              key={a.titre}
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, type: "spring" as const }}
              viewport={{ once: true }}
              whileHover={{ y: -4, borderColor: a.color + "44" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: a.color + "18" }}
              >
                <a.icon className="w-5 h-5" style={{ color: a.color }} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{a.titre}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA investissement */}
        <motion.div
          className="rounded-2xl p-8 md:p-12 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.06), rgba(0,188,212,0.04))",
            border: "1px solid rgba(212,175,55,0.2)",
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" as const }}
          viewport={{ once: true }}
        >
          <p className="text-white/60 text-sm font-mono mb-2 uppercase tracking-widest">Seed Round — 2026</p>
          <h3 className="text-3xl font-bold text-white mb-4">
            On bâtit le{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #D4AF37, #F5D76E)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              conglomérat africain
            </span>{" "}
            de demain.
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Deck disponible sur demande. Échangeons — pour les investisseurs qui pensent à 10 ans, pas à 10 trimestres.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:docompaore2@gmail.com?subject=FORGE%20Afrika%20%E2%80%94%20Investissement"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #F5D76E)",
                color: "#0A1628",
              }}
            >
              <Mail className="w-4 h-4" />
              Contacter Steeve
            </a>
            <a
              href="https://linkedin.com/in/steeve-donald-compaore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:scale-105"
              style={{
                border: "1px solid rgba(212,175,55,0.35)",
                color: "#D4AF37",
                background: "rgba(212,175,55,0.06)",
              }}
            >
              LinkedIn <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <p className="text-xs text-gray-600 mt-6">
            docompaore2@gmail.com · Ouagadougou, Burkina Faso · Paris, France
          </p>
        </motion.div>
      </div>
    </section>
  );
}
