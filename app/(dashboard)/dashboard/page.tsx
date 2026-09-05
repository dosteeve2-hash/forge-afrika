"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FILIALES_FORGE, formatFCFA } from "@/lib/constants";

const CHART_DATA = [
  { mois: "Jan", utilisateurs: 420, ca: 12 },
  { mois: "Fév", utilisateurs: 680, ca: 18 },
  { mois: "Mar", utilisateurs: 950, ca: 24 },
  { mois: "Avr", utilisateurs: 1240, ca: 31 },
  { mois: "Mai", utilisateurs: 1680, ca: 42 },
  { mois: "Jun", utilisateurs: 2100, ca: 56 },
  { mois: "Jul", utilisateurs: 2800, ca: 71 },
  { mois: "Aoû", utilisateurs: 3400, ca: 89 },
  { mois: "Sep", utilisateurs: 4200, ca: 108 },
  { mois: "Oct", utilisateurs: 5100, ca: 134 },
  { mois: "Nov", utilisateurs: 6300, ca: 165 },
  { mois: "Déc", utilisateurs: 7800, ca: 198 },
];

const ACTIVITE = [
  { action: "Nouveau membre coopérative", produit: "AgroTrack BF", time: "il y a 2 min", icon: "🌿" },
  { action: "Transaction validée", produit: "ValueChain Connect", time: "il y a 8 min", icon: "🔗" },
  { action: "Facture générée", produit: "CompTrack", time: "il y a 15 min", icon: "📊" },
  { action: "Collecte enregistrée", produit: "TAAMA", time: "il y a 23 min", icon: "🌾" },
  { action: "Commande expédiée", produit: "FORJA", time: "il y a 41 min", icon: "⚙️" },
];

const totalUsers = FILIALES_FORGE.reduce((s, p) => s + p.metriques.utilisateurs, 0);
const totalCA = FILIALES_FORGE.reduce((s, p) => s + p.metriques.ca, 0);
const totalTx = FILIALES_FORGE.reduce((s, p) => s + p.metriques.transactions, 0);
const totalActives = FILIALES_FORGE.filter((p) => p.statut === "Actif").length;

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex" style={{ background: "#0A1628" }}>
      {/* ── SIDEBAR ── */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0"
        style={{ background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(212,175,55,0.1)" }}>
        <div className="p-6 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}>F</div>
          <div>
            <div className="font-bold text-white text-sm">FORGE Afrika</div>
            <div className="text-xs" style={{ color: "#00BCD4" }}>QG — Centre de commande</div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Filiales</div>
          {FILIALES_FORGE.map((p) => (
            <a key={p.slug} href={p.url}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
              <span>{p.icon}</span>
              <span className="flex-1">{p.nom}</span>
              <span className="text-xs px-1.5 py-0.5 rounded"
                style={{
                  background: p.statut === "Actif" ? "rgba(34,197,94,0.1)" : "rgba(212,175,55,0.1)",
                  color: p.statut === "Actif" ? "#22C55E" : "#D4AF37",
                }}>
                {p.statut === "Actif" ? "●" : "◐"}
              </span>
            </a>
          ))}
        </nav>
        <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Link href="/" className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors">
            ← Accueil
          </Link>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 overflow-y-auto">
        {/* Topbar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
          style={{ background: "rgba(10,22,40,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <h1 className="text-lg font-bold text-white">Centre de Commande</h1>
            <p className="text-xs text-gray-500">FORGE Afrika HQ — Vue consolidée</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(0,188,212,0.15)", color: "#00BCD4" }}>
              🟢 Tous les systèmes opérationnels
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Filiales actives", value: `${totalActives} / ${FILIALES_FORGE.length}`, icon: "🏛️", color: "#D4AF37" },
              { label: "Utilisateurs totaux", value: totalUsers.toLocaleString("fr-FR"), icon: "👥", color: "#00BCD4" },
              { label: "Transactions", value: totalTx.toLocaleString("fr-FR"), icon: "📈", color: "#22C55E" },
              { label: "CA Global estimé", value: `${(totalCA / 1000000).toFixed(0)}M FCFA`, icon: "💰", color: "#8B5CF6" },
            ].map((kpi, i) => (
              <motion.div key={kpi.label}
                className="rounded-xl p-5"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, type: "spring" as const }}>
                <div className="text-2xl mb-2">{kpi.icon}</div>
                <div className="text-2xl font-bold text-white">{kpi.value}</div>
                <div className="text-xs text-gray-500 mt-1">{kpi.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <motion.div className="rounded-xl p-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, type: "spring" as const }}>
            <h2 className="text-white font-semibold mb-6">Croissance de l'Écosystème (2026)</h2>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={CHART_DATA} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradCA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00BCD4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00BCD4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="mois" tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6B7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#0F2040", border: "1px solid rgba(212,175,55,0.3)", borderRadius: 8, color: "#fff" }} />
                <Area type="monotone" dataKey="utilisateurs" stroke="#D4AF37" strokeWidth={2} fill="url(#gradUsers)" name="Utilisateurs" />
                <Area type="monotone" dataKey="ca" stroke="#00BCD4" strokeWidth={2} fill="url(#gradCA)" name="CA (M FCFA)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Activité + Actions rapides */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activité récente */}
            <motion.div className="rounded-xl p-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, type: "spring" as const }}>
              <h2 className="text-white font-semibold mb-4">Activité Récente</h2>
              <div className="space-y-3">
                {ACTIVITE.map((evt, i) => (
                  <div key={i} className="flex items-center gap-3 py-2"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span className="text-xl">{evt.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">{evt.action}</div>
                      <div className="text-xs text-gray-500">{evt.produit}</div>
                    </div>
                    <span className="text-xs text-gray-600 shrink-0">{evt.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Actions rapides */}
            <motion.div className="rounded-xl p-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring" as const }}>
              <h2 className="text-white font-semibold mb-4">Actions Rapides</h2>
              <div className="space-y-3">
                {[
                  { label: "Voir la Roadmap", icon: "🗺️", href: "/roadmap" },
                  { label: "Explorer l'Écosystème", icon: "🌐", href: "/ecosystem" },
                  { label: "Lancer un produit", icon: "🚀", href: "/ecosystem" },
                ].map((action) => (
                  <Link key={action.label} href={action.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:scale-[1.01]"
                    style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}>
                    <span>{action.icon}</span>
                    <span className="text-sm font-medium" style={{ color: "#D4AF37" }}>{action.label}</span>
                    <span className="ml-auto text-gray-600">→</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Table produits */}
          <motion.div className="rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, type: "spring" as const }}>
            <div className="px-6 py-4" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 className="text-white font-semibold">État des Filiales</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {["Filiale", "Catégorie", "Utilisateurs", "CA (FCFA)", "Statut"].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FILIALES_FORGE.map((p, i) => (
                    <tr key={p.slug} style={{ borderBottom: i < FILIALES_FORGE.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                      className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span>{p.icon}</span>
                          <span className="font-medium text-white">{p.nom}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-medium" style={{ color: p.couleur }}>{p.categorie}</td>
                      <td className="px-6 py-4 text-gray-300">{p.metriques.utilisateurs > 0 ? p.metriques.utilisateurs.toLocaleString("fr-FR") : "—"}</td>
                      <td className="px-6 py-4 text-gray-300">{p.metriques.ca > 0 ? formatFCFA(p.metriques.ca) : "—"}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs px-2 py-1 rounded-full"
                          style={{
                            background: p.statut === "Actif" ? "rgba(34,197,94,0.15)" : "rgba(212,175,55,0.15)",
                            color: p.statut === "Actif" ? "#22C55E" : "#D4AF37",
                          }}>
                          {p.statut}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
