"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatFCFA } from "@/lib/constants";
import { calculerLignes, calculerMetriques, pct1 } from "@/lib/kibare/engine";
import { PERSONAS, LIBELLES_THEMES } from "@/lib/kibare/personas";
import { PORTEFEUILLE_DEMO, SECTEURS_SUGGERES } from "@/lib/kibare/demo";
import { useAuditReseau } from "@/lib/kibare/audit";
import type { Constat, Gravite, Ligne, Portefeuille } from "@/lib/kibare/types";

const CLE_STOCKAGE = "kibare-portefeuille-v1";

const COULEURS_GRAVITE: Record<Gravite, string> = {
  critique: "#EF4444",
  attention: "#F97316",
  ok: "#22C55E",
};

const LIBELLES_GRAVITE: Record<Gravite, string> = {
  critique: "Critique",
  attention: "À surveiller",
  ok: "Conforme",
};

function nouvelId(): string {
  return `l${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

/* ─── Carte de métrique ──────────────────────────────── */
function Metrique({ label, valeur, note }: { label: string; valeur: string; note?: string }) {
  return (
    <div className="card-navy rounded-xl p-4">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-xl font-bold text-white">{valeur}</div>
      {note && <div className="text-xs text-gray-500 mt-1">{note}</div>}
    </div>
  );
}

/* ─── Graphique d'allocation ─────────────────────────── */
function Allocation({ donnees }: { donnees: { nom: string; valeur: number }[] }) {
  const [monte, setMonte] = useState(false);
  useEffect(() => setMonte(true), []);

  if (!monte) return <div className="h-64" />;
  if (donnees.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-gray-600">
        Ajoutez une ligne pour voir la répartition
      </div>
    );
  }

  const palette = ["#D4AF37", "#00BCD4", "#22C55E", "#A78BFA", "#F97316", "#F5D76E", "#38BDF8"];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={donnees} dataKey="valeur" nameKey="nom" innerRadius={55} outerRadius={90} paddingAngle={2}>
            {donnees.map((d, i) => (
              <Cell key={d.nom} fill={palette[i % palette.length]} stroke="#0A1628" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v: number) => formatFCFA(v)}
            contentStyle={{
              background: "#0A1628",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: 8,
              color: "#fff",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────── */
export default function KibarePage() {
  const [portefeuille, setPortefeuille] = useState<Portefeuille>(PORTEFEUILLE_DEMO);
  const [charge, setCharge] = useState(false);
  const [personaActif, setPersonaActif] = useState<string>("tous");

  // Chargement local — le portefeuille ne quitte jamais le navigateur.
  useEffect(() => {
    try {
      const brut = window.localStorage.getItem(CLE_STOCKAGE);
      if (brut) setPortefeuille(JSON.parse(brut) as Portefeuille);
    } catch {
      /* stockage indisponible : on garde le portefeuille de démonstration */
    }
    setCharge(true);
  }, []);

  useEffect(() => {
    if (!charge) return;
    try {
      window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(portefeuille));
    } catch {
      /* navigation privée : on continue sans persistance */
    }
  }, [portefeuille, charge]);

  const audit = useAuditReseau(portefeuille);

  const lignes = useMemo(() => calculerLignes(portefeuille), [portefeuille]);
  const metriques = useMemo(() => calculerMetriques(portefeuille, lignes), [portefeuille, lignes]);

  const constats = useMemo<Constat[]>(
    () => PERSONAS.flatMap((p) => p.analyser(metriques, lignes)),
    [metriques, lignes]
  );

  // Consensus : sur quels thèmes plusieurs écoles alertent-elles en même temps ?
  const consensus = useMemo(() => {
    const parTheme = new Map<string, Set<string>>();
    for (const c of constats) {
      if (c.gravite === "ok") continue;
      const set = parTheme.get(c.theme) ?? new Set<string>();
      set.add(c.personaId);
      parTheme.set(c.theme, set);
    }
    return [...parTheme.entries()]
      .map(([theme, personas]) => ({ theme, nb: personas.size }))
      .filter((x) => x.nb >= 2)
      .sort((a, b) => b.nb - a.nb);
  }, [constats]);

  const constatsAffiches =
    personaActif === "tous" ? constats : constats.filter((c) => c.personaId === personaActif);

  const majLigne = (id: string, champ: keyof Ligne, valeur: string): void => {
    setPortefeuille((p) => ({
      ...p,
      lignes: p.lignes.map((l) =>
        l.id !== id
          ? l
          : {
              ...l,
              [champ]:
                champ === "quantite" || champ === "pru" || champ === "cours"
                  ? Number(valeur) || 0
                  : valeur,
            }
      ),
    }));
  };

  const ajouterLigne = (): void => {
    setPortefeuille((p) => ({
      ...p,
      lignes: [
        ...p.lignes,
        { id: nouvelId(), nom: "", secteur: "Autre", marche: "BRVM", quantite: 0, pru: 0, cours: 0 },
      ],
    }));
  };

  const supprimerLigne = (id: string): void => {
    setPortefeuille((p) => ({ ...p, lignes: p.lignes.filter((l) => l.id !== id) }));
  };

  const donneesAllocation = [
    ...lignes.map((l) => ({ nom: l.nom || "Sans nom", valeur: l.valeur })),
    ...(portefeuille.cash > 0 ? [{ nom: "Liquidités", valeur: portefeuille.cash }] : []),
  ].filter((d) => d.valeur > 0);

  return (
    <main className="min-h-screen" style={{ background: "#0A1628" }}>
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{
          background: "rgba(10,22,40,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
        }}
      >
        <Link href="/" className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-bold"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}
          >
            F
          </div>
          <span className="font-bold text-white">FORGE Afrika</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/ecosystem" className="text-sm text-gray-400 hover:text-white transition-colors">
            Écosystème
          </Link>
          <Link href="/roadmap" className="text-sm text-gray-400 hover:text-white transition-colors">
            Roadmap
          </Link>
          <Link
            href="/dashboard"
            className="text-sm px-4 py-2 rounded-lg font-medium"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}
          >
            QG
          </Link>
        </div>
      </nav>

      <div className="pt-28 pb-24 px-4 max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }}
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
            style={{
              background: "rgba(249,115,22,0.15)",
              border: "1px solid rgba(249,115,22,0.35)",
              color: "#F97316",
            }}
          >
            Prototype de démonstration · moteur d'analyse local
          </span>
          <h1 className="text-5xl font-bold text-white mb-4">
            KIBARÉ <span className="text-gradient-gold">·</span> Le Conseil
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Votre portefeuille passe devant cinq des plus grands investisseurs de l'histoire.
            Là où ils s'accordent, écoutez. Là où ils s'opposent, réfléchissez.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7 text-xs">
            {[
              "Aucun compte, aucune inscription",
              "Vos données restent dans ce navigateur",
              "Journal d'audit réseau vérifiable en bas de page",
            ].map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(34,197,94,0.12)",
                  border: "1px solid rgba(34,197,94,0.3)",
                  color: "#22C55E",
                }}
              >
                ✓ {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Portefeuille */}
        <section className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className="text-2xl font-bold text-white">Votre portefeuille</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setPortefeuille(PORTEFEUILLE_DEMO)}
                className="text-xs px-3 py-2 rounded-lg text-gray-300 transition-colors hover:text-white"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
              >
                Charger l'exemple
              </button>
              <button
                onClick={() => setPortefeuille({ lignes: [], cash: 0 })}
                className="text-xs px-3 py-2 rounded-lg text-gray-300 transition-colors hover:text-white"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
              >
                Vider
              </button>
              <button
                onClick={ajouterLigne}
                className="text-xs px-3 py-2 rounded-lg font-medium"
                style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}
              >
                + Ligne
              </button>
            </div>
          </div>

          <div className="card-navy rounded-xl p-4 overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-xs text-gray-500 text-left">
                  <th className="pb-3 font-medium">Titre</th>
                  <th className="pb-3 font-medium">Secteur</th>
                  <th className="pb-3 font-medium">Marché</th>
                  <th className="pb-3 font-medium text-right">Qté</th>
                  <th className="pb-3 font-medium text-right">PRU</th>
                  <th className="pb-3 font-medium text-right">Cours</th>
                  <th className="pb-3 font-medium text-right">Valeur</th>
                  <th className="pb-3 font-medium text-right">+/−</th>
                  <th className="pb-3" />
                </tr>
              </thead>
              <tbody>
                {lignes.map((l) => (
                  <tr key={l.id} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <td className="py-2 pr-2">
                      <input
                        value={l.nom}
                        onChange={(e) => majLigne(l.id, "nom", e.target.value)}
                        placeholder="Nom du titre"
                        className="bg-transparent text-white w-32 outline-none"
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <select
                        value={l.secteur}
                        onChange={(e) => majLigne(l.id, "secteur", e.target.value)}
                        className="bg-transparent text-gray-300 outline-none"
                      >
                        {SECTEURS_SUGGERES.map((s) => (
                          <option key={s} value={s} style={{ background: "#0A1628" }}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-2 pr-2">
                      <select
                        value={l.marche}
                        onChange={(e) => majLigne(l.id, "marche", e.target.value)}
                        className="bg-transparent text-gray-300 outline-none"
                      >
                        <option value="BRVM" style={{ background: "#0A1628" }}>BRVM</option>
                        <option value="International" style={{ background: "#0A1628" }}>International</option>
                      </select>
                    </td>
                    <td className="py-2">
                      <input
                        type="number"
                        value={l.quantite || ""}
                        onChange={(e) => majLigne(l.id, "quantite", e.target.value)}
                        className="bg-transparent text-white w-16 text-right outline-none"
                      />
                    </td>
                    <td className="py-2">
                      <input
                        type="number"
                        value={l.pru || ""}
                        onChange={(e) => majLigne(l.id, "pru", e.target.value)}
                        className="bg-transparent text-white w-20 text-right outline-none"
                      />
                    </td>
                    <td className="py-2">
                      <input
                        type="number"
                        value={l.cours || ""}
                        onChange={(e) => majLigne(l.id, "cours", e.target.value)}
                        className="bg-transparent text-white w-20 text-right outline-none"
                      />
                    </td>
                    <td className="py-2 text-right text-gray-300 whitespace-nowrap">
                      {formatFCFA(l.valeur)}
                    </td>
                    <td
                      className="py-2 text-right whitespace-nowrap font-medium"
                      style={{ color: l.plusValue >= 0 ? "#22C55E" : "#EF4444" }}
                    >
                      {l.plusValue >= 0 ? "+" : ""}
                      {l.plusValuePct.toFixed(1)} %
                    </td>
                    <td className="py-2 text-right">
                      <button
                        onClick={() => supprimerLigne(l.id)}
                        className="text-gray-600 hover:text-red-400 transition-colors px-1"
                        aria-label={`Supprimer ${l.nom}`}
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              className="flex items-center gap-3 mt-4 pt-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-sm text-gray-400">Liquidités</span>
              <input
                type="number"
                value={portefeuille.cash || ""}
                onChange={(e) =>
                  setPortefeuille((p) => ({ ...p, cash: Number(e.target.value) || 0 }))
                }
                className="bg-transparent text-white w-32 outline-none"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}
              />
              <span className="text-sm text-gray-500">FCFA</span>
            </div>
          </div>
        </section>

        {/* Métriques */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Ce que disent les chiffres</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="grid grid-cols-2 gap-3">
              <Metrique label="Patrimoine total" valeur={formatFCFA(metriques.total)} />
              <Metrique
                label="Plus/moins-value latente"
                valeur={`${metriques.plusValuePct >= 0 ? "+" : ""}${metriques.plusValuePct.toFixed(1)} %`}
                note={formatFCFA(metriques.plusValueTotale)}
              />
              <Metrique
                label="Première position"
                valeur={pct1(metriques.poidsMax)}
                note={metriques.ligneMax}
              />
              <Metrique
                label="Liquidités"
                valeur={pct1(metriques.poidsCash)}
                note={`${metriques.nbLignes} ligne(s) · ${metriques.nbSecteurs} secteur(s)`}
              />
              <Metrique
                label="Concentration (HHI)"
                valeur={metriques.hhi.toFixed(2)}
                note={metriques.hhi > 0.25 ? "au-dessus du seuil de 0,25" : "sous le seuil de 0,25"}
              />
              <Metrique
                label="Exposition BRVM"
                valeur={pct1(metriques.poidsBRVM)}
                note={`Secteur dominant : ${metriques.secteurMax}`}
              />
            </div>
            <div className="card-navy rounded-xl p-4">
              <Allocation donnees={donneesAllocation} />
            </div>
          </div>
        </section>

        {/* Le Conseil */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Le Conseil</h2>
          <p className="text-gray-500 text-sm mb-5">
            Cinq écoles, cinq grilles chiffrées, appliquées au même portefeuille.
          </p>

          {consensus.length > 0 && (
            <div
              className="rounded-xl p-4 mb-5"
              style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.3)" }}
            >
              <div className="text-xs font-medium mb-2" style={{ color: "#D4AF37" }}>
                LÀ OÙ ILS S'ACCORDENT
              </div>
              <div className="flex flex-wrap gap-2">
                {consensus.map((c) => (
                  <span key={c.theme} className="text-sm text-white">
                    <strong>{c.nb} écoles sur 5</strong> alertent sur{" "}
                    <span style={{ color: "#D4AF37" }}>
                      {LIBELLES_THEMES[c.theme]?.toLowerCase() ?? c.theme}
                    </span>
                    {consensus.indexOf(c) < consensus.length - 1 ? " · " : ""}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-5">
            <button
              onClick={() => setPersonaActif("tous")}
              className="text-xs px-3 py-2 rounded-lg transition-colors"
              style={{
                background: personaActif === "tous" ? "rgba(212,175,55,0.2)" : "transparent",
                border: "1px solid rgba(255,255,255,0.12)",
                color: personaActif === "tous" ? "#D4AF37" : "#9CA3AF",
              }}
            >
              Tous
            </button>
            {PERSONAS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPersonaActif(p.id)}
                className="text-xs px-3 py-2 rounded-lg transition-colors"
                style={{
                  background: personaActif === p.id ? `${p.couleur}22` : "transparent",
                  border: `1px solid ${personaActif === p.id ? p.couleur : "rgba(255,255,255,0.12)"}`,
                  color: personaActif === p.id ? p.couleur : "#9CA3AF",
                }}
              >
                {p.nom}
              </button>
            ))}
          </div>

          {personaActif !== "tous" && (
            <div className="card-navy rounded-xl p-5 mb-5">
              {PERSONAS.filter((p) => p.id === personaActif).map((p) => (
                <div key={p.id}>
                  <div className="text-sm font-bold mb-1" style={{ color: p.couleur }}>
                    {p.ecole}
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{p.principe}</p>
                  <p className="text-gray-500 text-sm italic">{p.citation}</p>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3">
            {constatsAffiches.length === 0 && (
              <div className="card-navy rounded-xl p-6 text-center text-gray-500 text-sm">
                Saisissez au moins une ligne pour obtenir une analyse.
              </div>
            )}
            {constatsAffiches.map((c, i) => {
              const persona = PERSONAS.find((p) => p.id === c.personaId);
              return (
                <motion.div
                  key={`${c.personaId}-${c.titre}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03, type: "spring" as const }}
                  className="card-navy rounded-xl p-5"
                  style={{ borderLeft: `3px solid ${COULEURS_GRAVITE[c.gravite]}` }}
                >
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-medium" style={{ color: persona?.couleur ?? "#fff" }}>
                      {persona?.nom}
                    </span>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs" style={{ color: COULEURS_GRAVITE[c.gravite] }}>
                      {LIBELLES_GRAVITE[c.gravite]}
                    </span>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-gray-500">{LIBELLES_THEMES[c.theme] ?? c.theme}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{c.titre}</h3>
                  <p className="text-gray-400 text-sm mb-3">{c.detail}</p>
                  <p className="text-sm" style={{ color: "#00BCD4" }}>
                    → {c.action}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Journal d'audit */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">Journal d'audit réseau</h2>
          <p className="text-gray-500 text-sm mb-5">
            Cette page intercepte réellement <code className="text-gray-400">fetch</code>,{" "}
            <code className="text-gray-400">XMLHttpRequest</code> et{" "}
            <code className="text-gray-400">sendBeacon</code>, et vérifie si une requête sortante
            contient un nom de titre ou un montant de votre portefeuille. Le compteur ci-dessous
            n'est pas une illustration : c'est la mesure.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Metrique label="Requêtes sortantes interceptées" valeur={String(audit.total)} />
            <div
              className="card-navy rounded-xl p-4"
              style={{ borderColor: audit.fuites > 0 ? "#EF4444" : "rgba(34,197,94,0.4)" }}
            >
              <div className="text-xs text-gray-500 mb-1">Contenant une donnée du portefeuille</div>
              <div
                className="text-xl font-bold"
                style={{ color: audit.fuites > 0 ? "#EF4444" : "#22C55E" }}
              >
                {audit.fuites}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {audit.fuites === 0 ? "Aucune fuite détectée" : "Fuite détectée — anomalie"}
              </div>
            </div>
          </div>
          <div className="card-navy rounded-xl p-4 max-h-56 overflow-y-auto">
            {audit.entrees.length === 0 ? (
              <p className="text-sm text-gray-600">
                Aucune requête sortante depuis le chargement de cette page.
              </p>
            ) : (
              <ul className="space-y-1 text-xs font-mono">
                {audit.entrees.map((e, i) => (
                  <li key={`${e.horodatage}-${i}`} className="text-gray-500">
                    <span className="text-gray-600">{e.horodatage}</span>{" "}
                    <span style={{ color: e.fuite ? "#EF4444" : "#22C55E" }}>
                      {e.fuite ? "FUITE" : "OK"}
                    </span>{" "}
                    {e.methode} {e.cible}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="text-xs text-gray-600 mt-3">
            Les requêtes listées ici, s'il y en a, proviennent du framework de la page (navigation),
            jamais du portefeuille. Le second compteur est celui qui compte.
          </p>
        </section>

        {/* Limites */}
        <section
          className="rounded-xl p-6"
          style={{ background: "rgba(249,115,22,0.07)", border: "1px solid rgba(249,115,22,0.25)" }}
        >
          <h2 className="text-lg font-bold text-white mb-3">
            Ce que ce prototype ne fait pas encore
          </h2>
          <ul className="text-sm text-gray-400 space-y-2 mb-4">
            <li>
              • <strong className="text-gray-300">Pas de LLM.</strong> L'analyse vient de règles
              chiffrées déterministes, pas d'un modèle de langage. Le produit final fait tourner un
              modèle local (Ollama) qui raisonne sur le corpus des grands investisseurs.
            </li>
            <li>
              • <strong className="text-gray-300">Pas de données de marché.</strong> Les cours sont
              saisis à la main. Le produit final télécharge l'univers boursier en bloc, pour que même
              la liste de vos titres ne révèle rien.
            </li>
            <li>
              • <strong className="text-gray-300">Pas d'analyse fondamentale ni technique.</strong>{" "}
              Ici, seule la structure du portefeuille est analysée — pas la qualité des sociétés.
            </li>
            <li>
              • <strong className="text-gray-300">Pas de journal de décision.</strong> Le produit
              final note ses propres conseils trois mois plus tard.
            </li>
          </ul>
          <p className="text-xs text-gray-500 mb-4">
            Ceci est un outil pédagogique de démonstration. Ce n'est pas un conseil en investissement
            personnalisé. Les cours de l'exemple sont fictifs.
          </p>
          <Link
            href="https://github.com/dosteeve2-hash/forge-afrika/blob/main/LOGICIELS/kibare-spec.md"
            className="text-sm font-medium"
            style={{ color: "#D4AF37" }}
          >
            Lire la spécification complète de KIBARÉ →
          </Link>
        </section>
      </div>
    </main>
  );
}
