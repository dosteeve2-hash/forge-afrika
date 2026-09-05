"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Github, Send, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

const SUJETS = [
  "Investissement / Partenariat",
  "Collaboration technique",
  "Intégrer une filiale",
  "Presse / Média",
  "Autre",
];

export default function ContactPage() {
  const [form, setForm] = useState({ nom: "", email: "", sujet: SUJETS[0], message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function patch(k: keyof typeof form, v: string) {
    setForm(f => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulation d'envoi — à brancher sur une API réelle
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
  }

  return (
    <main className="min-h-screen" style={{ background: "#0A1628" }}>
      {/* Navbar simple */}
      <nav className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <Link href="/" className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}>
            F
          </div>
          <span className="font-bold">FORGE Afrika</span>
        </Link>
        <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.25)", color: "#D4AF37" }}>
            ✉️ Contact & Partenariats
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}>
            Échangeons
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Investisseur, partenaire, ou simplement curieux — chaque message est lu personnellement par Steeve.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar infos */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring" as const, delay: 0.1 }}
          >
            {/* Profil */}
            <div className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black mb-4"
                style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}>
                S
              </div>
              <h3 className="text-white font-bold text-lg mb-1">Steeve Donald Compaore</h3>
              <p className="text-sm mb-4" style={{ color: "#00BCD4" }}>Fondateur & PDG, FORGE Afrika</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ingénieur, entrepreneur, et bâtisseur d&apos;infrastructure africaine. Basé entre Ouagadougou et Paris.
              </p>
            </div>

            {/* Coordonnées */}
            <div className="rounded-2xl p-6 space-y-4"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {[
                { icon: Mail, label: "Email", value: "docompaore2@gmail.com", href: "mailto:docompaore2@gmail.com" },
                { icon: MapPin, label: "Localisation", value: "Ouagadougou · Paris", href: null },
                { icon: Linkedin, label: "LinkedIn", value: "steeve-donald-compaore", href: "https://linkedin.com/in/steeve-donald-compaore" },
                { icon: Github, label: "GitHub", value: "dosteeve2-hash", href: "https://github.com/dosteeve2-hash" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(212,175,55,0.1)" }}>
                    <c.icon className="w-4 h-4" style={{ color: "#D4AF37" }} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sm text-white hover:text-yellow-400 transition-colors">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-sm text-white">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Délai de réponse */}
            <div className="rounded-xl px-4 py-3 flex items-center gap-3"
              style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#10B981" }} />
              <p className="text-sm" style={{ color: "#10B981" }}>Répond généralement en moins de 48h</p>
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring" as const, delay: 0.15 }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center min-h-[400px]"
                style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}
              >
                <CheckCircle className="w-14 h-14 mb-4" style={{ color: "#10B981" }} />
                <h3 className="text-white font-bold text-2xl mb-2">Message envoyé !</h3>
                <p className="text-gray-400 mb-6">Steeve te répondra dans les 48 heures.</p>
                <button onClick={() => setSent(false)}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.08)", color: "white" }}>
                  Envoyer un autre message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}
                className="rounded-2xl p-8 space-y-5"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Nom complet *</label>
                    <input value={form.nom} onChange={e => patch("nom", e.target.value)} required
                      placeholder="Jean Dupont"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-yellow-500/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Email *</label>
                    <input type="email" value={form.email} onChange={e => patch("email", e.target.value)} required
                      placeholder="jean@exemple.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-yellow-500/50 transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Sujet</label>
                  <div className="flex flex-wrap gap-2">
                    {SUJETS.map(s => (
                      <button key={s} type="button" onClick={() => patch("sujet", s)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={form.sujet === s
                          ? { background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }
                          : { background: "rgba(255,255,255,0.06)", color: "#94A3B8", border: "1px solid rgba(255,255,255,0.08)" }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Message *</label>
                  <textarea value={form.message} onChange={e => patch("message", e.target.value)} required
                    rows={5} placeholder="Décris ton projet, ta proposition, ou ta question…"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-yellow-500/50 transition-colors resize-none" />
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-60"
                  style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}>
                  {loading ? (
                    <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> Envoi…</>
                  ) : (
                    <><Send className="w-4 h-4" /> Envoyer le message</>
                  )}
                </button>

                <p className="text-xs text-center" style={{ color: "#475569" }}>
                  Ou écris directement à{" "}
                  <a href="mailto:docompaore2@gmail.com" className="hover:text-yellow-400 transition-colors" style={{ color: "#D4AF37" }}>
                    docompaore2@gmail.com
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
