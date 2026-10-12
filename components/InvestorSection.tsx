"use client";

import { motion } from "framer-motion";
import { Target, Wrench, Handshake, ShieldCheck, Mail, ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL, GITHUB_URL } from "@/lib/constants";

const POINTS = [
  {
    icon: Target,
    titre: "Un problème réel",
    desc: "Dans beaucoup de coopératives, d'élevages et de PME de transformation, le suivi se fait encore sur cahier ou sur tableur. C'est là que nous travaillons.",
    color: "#00BCD4",
  },
  {
    icon: Wrench,
    titre: "Des outils déjà en ligne",
    desc: "Plusieurs outils sont disponibles en version pilote. Vous pouvez les ouvrir, les essayer et nous dire ce qui manque.",
    color: "#D4AF37",
  },
  {
    icon: Handshake,
    titre: "Partenaires pilotes",
    desc: "Nous cherchons des coopératives, éleveurs, transformateurs et PME prêts à tester un outil et à nous faire des retours francs.",
    color: "#10B981",
  },
  {
    icon: ShieldCheck,
    titre: "Transparence",
    desc: "Nous indiquons ce qui est disponible et ce qui est encore en développement. Le code du site est public.",
    color: "#8B5CF6",
  },
];

export default function InvestorSection() {
  return (
    <section id="partenaires" className="py-24 px-4 relative overflow-hidden">
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
            🤝 Partenaires pilotes
          </span>
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Testez un outil avec nous
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Vous gérez une coopérative, un élevage, une unité de transformation ou une PME ? Utilisez nos outils
            et aidez-nous à les rendre vraiment utiles.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {POINTS.map((a, i) => (
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
          <h3 className="text-3xl font-bold text-white mb-4">
            Devenez{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #D4AF37, #F5D76E)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              partenaire pilote
            </span>
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Écrivez-nous en quelques lignes : votre activité, votre problème du moment, l&apos;outil qui vous intéresse.
            Nous vous répondons personnellement. Investisseurs et partenaires institutionnels sont aussi les bienvenus pour échanger.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=FORGE%20Afrika%20%E2%80%94%20Partenaire%20pilote`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}
            >
              <Mail className="w-4 h-4" />
              Contacter Steeve
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:scale-105"
              style={{
                border: "1px solid rgba(212,175,55,0.35)",
                color: "#D4AF37",
                background: "rgba(212,175,55,0.06)",
              }}
            >
              Voir le code sur GitHub <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <p className="text-xs text-gray-600 mt-6">
            {CONTACT_EMAIL} · Burkina Faso · Tokat, Turquie
          </p>
        </motion.div>
      </div>
    </section>
  );
}
