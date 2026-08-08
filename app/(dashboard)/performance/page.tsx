"use client";

import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { FILIALES_FORGE, formatFCFA } from "@/lib/constants";
import { TrendingUp, Users, DollarSign, Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react";

/* ── Types et scores synthétiques ───────────────────────────────────────── */
const SCORES: Record<string, { sante: number; croissance: number; retention: number; monetisation: number }> = {
  sugu:              { sante: 82, croissance: 74, retention: 68, monetisation: 71 },
  "mifa-life":       { sante: 88, croissance: 91, retention: 79, monetisation: 85 },
  taama:             { sante: 76, croissance: 65, retention: 72, monetisation: 68 },
  comptrack:         { sante: 80, croissance: 58, retention: 75, monetisation: 72 },
  forja:             { sante: 92, croissance: 88, retention: 84, monetisation: 90 },
  "ueemt-tokat":     { sante: 45, croissance: 30, retention: 55, monetisation: 5  },
  "agrotrack-bf":    { sante: 60, croissance: 72, retention: 50, monetisation: 20 },
  milltrack:         { sante: 65, croissance: 68, retention: 55, monetisation: 25 },
  livestockos:       { sante: 62, croissance: 70, retention: 52, monetisation: 18 },
  "valuechain-connect": { sante: 40, croissance: 55, retention: 35, monetisation: 10 },
};

function scoreGlobal(slug: string): number {
  const s = SCORES[slug];
  if (!s) return 0;
  return Math.round((s.sante + s.croissance + s.retention + s.monetisation) / 4);
}

function scoreColor(score: number): string {
  if (score >= 75) return "#22c55e";
  if (score >= 55) return "#f59e0b";
  return "#ef4444";
}

function scoreLabel(score: number): string {
  if (score >= 75) return "Sain";
  if (score >= 55) return "A surveiller";
  return "Critique";
}

/* ── Données chart barres ────────────────────────────────────────────────── */
const caData = FILIALES_FORGE.filter(f => f.metriques.ca > 0).map(f => ({
  nom: f.nom, ca: f.metriques.ca, couleur: f.couleur,
})).sort((a, b) => b.ca - a.ca);

const usersData = FILIALES_FORGE.filter(f => f.metriques.utilisateurs > 0).map(f => ({
  nom: f.nom, users: f.metriques.utilisateurs, couleur: f.couleur,
})).sort((a, b) => b.users - a.users);

/* ── Radar data pour une filiale ─────────────────────────────────────────── */
function radarData(slug: string) {
  const s = SCORES[slug] ?? { sante:0, croissance:0, retention:0, monetisation:0 };
  return [
    { dim: "Santé", val: s.sante },
    { dim: "Croissance", val: s.croissance },
    { dim: "Rétention", val: s.retention },
    { dim: "Monétisation", val: s.monetisation },
  ];
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function PerformancePage() {
  const [selectedSlug, setSelectedSlug] = useState<string>("forja");
  const selected = FILIALES_FORGE.find(f => f.slug === selectedSlug) ?? FILIALES_FORGE[0];
  const sg = scoreGlobal(selectedSlug);

  const totalCA    = FILIALES_FORGE.reduce((s, f) => s + f.metriques.ca, 0);
  const totalUsers = FILIALES_FORGE.reduce((s, f) => s + f.metriques.utilisateurs, 0);
  const totalTx    = FILIALES_FORGE.reduce((s, f) => s + f.metriques.transactions, 0);
  const avgScore   = Math.round(
    FILIALES_FORGE.reduce((s, f) => s + scoreGlobal(f.slug), 0) / FILIALES_FORGE.length
  );

  const card = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 24,
  };

  return (
    <div className="min-h-screen" style={{ background: "#0A1628" }}>
      {/* Topbar */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(10,22,40,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div>
          <h1 className="text-lg font-bold text-white">Tableau de Performance</h1>
          <p className="text-xs text-gray-500">FORGE Afrika — Scores & KPIs consolides</p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(212,175,55,0.15)", color: "#D4AF37" }}>
          Score ecosysteme : {avgScore}/100
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* KPIs globaux */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label:"CA consolide",    value:`${(totalCA/1_000_000).toFixed(0)}M FCFA`, icon:"💰", color:"#D4AF37" },
            { label:"Utilisateurs",    value:totalUsers.toLocaleString("fr-FR"),         icon:"👥", color:"#00BCD4" },
            { label:"Transactions",    value:totalTx.toLocaleString("fr-FR"),            icon:"📈", color:"#22C55E" },
            { label:"Score sante moy", value:`${avgScore}/100`,                          icon:"❤️", color:"#8B5CF6" },
          ].map((kpi) => (
            <div key={kpi.label} style={{ ...card }}>
              <div className="text-2xl mb-2">{kpi.icon}</div>
              <div className="text-2xl font-bold text-white font-mono">{kpi.value}</div>
              <div className="text-xs text-gray-500 mt-1">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Scorecard toutes filiales */}
        <div style={card}>
          <h2 className="text-white font-semibold mb-4">Score de sante par filiale</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {FILIALES_FORGE.map(f => {
              const score = scoreGlobal(f.slug);
              const c = scoreColor(score);
              return (
                <button key={f.slug} onClick={() => setSelectedSlug(f.slug)}
                  style={{
                    background: selectedSlug === f.slug ? `${f.couleur}18` : "rgba(255,255,255,0.02)",
                    border: `1px solid ${selectedSlug === f.slug ? f.couleur : "rgba(255,255,255,0.06)"}`,
                    borderRadius: 12, padding: "14px 12px", cursor: "pointer", textAlign: "left",
                    transition: "all 0.15s",
                  }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                    <span style={{ fontSize:18 }}>{f.icon}</span>
                    <span style={{ fontSize:12, fontWeight:600, color:"#f0f4ff" }}>{f.nom}</span>
                  </div>
                  {/* Score bar */}
                  <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:4, height:5, marginBottom:6 }}>
                    <div style={{ width:`${score}%`, height:5, borderRadius:4, background:c, transition:"width 0.3s" }} />
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:11, color:c, fontWeight:700 }}>{score}/100</span>
                    <span style={{ fontSize:9, background:`${c}15`, color:c, borderRadius:4, padding:"2px 6px", fontWeight:600 }}>
                      {scoreLabel(score)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail filiale selectionnee */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar */}
          <div style={card}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
              <span style={{ fontSize:24 }}>{selected.icon}</span>
              <div>
                <div style={{ fontSize:16, fontWeight:700, color:"#f0f4ff" }}>{selected.nom}</div>
                <div style={{ fontSize:12, color:"#6b7280" }}>{selected.description}</div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <div style={{ background:scoreColor(sg)+'18', color:scoreColor(sg),
                borderRadius:8, padding:"6px 14px", fontSize:20, fontWeight:800, fontFamily:"monospace" }}>
                {sg}/100
              </div>
              <span style={{ fontSize:12, color:scoreColor(sg), fontWeight:600 }}>{scoreLabel(sg)}</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData(selectedSlug)} margin={{ top:0, right:20, bottom:0, left:20 }}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="dim" tick={{ fontSize:11, fill:"#9ca3af" }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="val" stroke={selected.couleur} fill={selected.couleur} fillOpacity={0.25} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Stats filiale */}
          <div style={card}>
            <h3 style={{ fontSize:14, fontWeight:600, color:"#f0f4ff", marginBottom:16 }}>Metriques — {selected.nom}</h3>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[
                { label:"Utilisateurs actifs", value:selected.metriques.utilisateurs > 0 ? selected.metriques.utilisateurs.toLocaleString("fr-FR") : "—", icon:Users, color:"#00D4FF" },
                { label:"Transactions", value:selected.metriques.transactions > 0 ? selected.metriques.transactions.toLocaleString("fr-FR") : "—", icon:Activity, color:"#22c55e" },
                { label:"CA estime", value:selected.metriques.ca > 0 ? formatFCFA(selected.metriques.ca) : "—", icon:DollarSign, color:"#D4AF37" },
                { label:"Statut", value:selected.statut, icon:selected.statut === "Actif" ? CheckCircle : Clock, color:selected.statut === "Actif" ? "#22c55e" : "#f59e0b" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} style={{ display:"flex", alignItems:"center", gap:14,
                  background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)",
                  borderRadius:10, padding:"12px 16px" }}>
                  <div style={{ background:`${color}18`, borderRadius:8, padding:8, display:"flex" }}>
                    <Icon size={15} color={color} />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:11, color:"#6b7280" }}>{label}</div>
                    <div style={{ fontSize:15, fontWeight:700, color:"#f0f4ff", fontFamily:"monospace" }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
            {selected.url !== "#" && (
              <a href={selected.url} target="_blank" rel="noopener noreferrer"
                style={{ display:"block", marginTop:14, textAlign:"center", padding:"10px",
                  background:"rgba(212,175,55,0.1)", border:"1px solid rgba(212,175,55,0.2)",
                  borderRadius:10, color:"#D4AF37", fontSize:13, fontWeight:600, textDecoration:"none" }}>
                Ouvrir {selected.nom} →
              </a>
            )}
          </div>
        </div>

        {/* Charts CA et Users */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div style={card}>
            <h3 style={{ fontSize:13, fontWeight:600, color:"#f0f4ff", marginBottom:16 }}>CA par filiale (FCFA)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={caData} barSize={32} margin={{ top:0, right:0, bottom:0, left:-10 }}>
                <XAxis dataKey="nom" tick={{ fontSize:9, fill:"#6b7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:9, fill:"#6b7280" }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `${((v as number)/1_000_000).toFixed(0)}M`} />
                <Tooltip contentStyle={{ background:"#0c1a34", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, fontSize:12 }}
                  cursor={{ fill:"rgba(255,255,255,0.04)" }}
                  formatter={(v) => [formatFCFA(v as number), "CA"]} />
                <Bar dataKey="ca" radius={[5,5,0,0]}>
                  {caData.map((e, i) => <Cell key={i} fill={e.couleur} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={card}>
            <h3 style={{ fontSize:13, fontWeight:600, color:"#f0f4ff", marginBottom:16 }}>Utilisateurs par filiale</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={usersData} barSize={32} margin={{ top:0, right:0, bottom:0, left:-10 }}>
                <XAxis dataKey="nom" tick={{ fontSize:9, fill:"#6b7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize:9, fill:"#6b7280" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background:"#0c1a34", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, fontSize:12 }}
                  cursor={{ fill:"rgba(255,255,255,0.04)" }}
                  formatter={(v) => [(v as number).toLocaleString("fr-FR"), "Utilisateurs"]} />
                <Bar dataKey="users" radius={[5,5,0,0]}>
                  {usersData.map((e, i) => <Cell key={i} fill={e.couleur} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alertes filiales critiques */}
        {FILIALES_FORGE.filter(f => scoreGlobal(f.slug) < 55).length > 0 && (
          <div style={{ background:"rgba(239,68,68,0.06)", border:"1px solid rgba(239,68,68,0.2)",
            borderRadius:16, padding:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <AlertTriangle size={16} color="#ef4444" />
              <span style={{ fontSize:13, fontWeight:600, color:"#f87171" }}>Filiales en situation critique</span>
            </div>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              {FILIALES_FORGE.filter(f => scoreGlobal(f.slug) < 55).map(f => (
                <span key={f.slug} style={{ background:"rgba(239,68,68,0.1)", color:"#f87171",
                  border:"1px solid rgba(239,68,68,0.25)", borderRadius:8, padding:"6px 14px",
                  fontSize:12, fontWeight:600 }}>
                  {f.icon} {f.nom} — {scoreGlobal(f.slug)}/100
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
