"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

const TYPES = [
  "Site web",
  "Application ou outil de gestion",
  "Intégration d'IA",
  "Design",
  "Vidéo / motion design",
  "Un produit Forge Afrika",
  "Autre",
];

// Pas de serveur ni de base : le formulaire prépare un e-mail dans la
// messagerie du visiteur. Rien n'est stocké par le site.
export default function ContactForm({ sujetInitial }: { sujetInitial?: string }) {
  const [form, setForm] = useState({
    nom: "",
    organisation: "",
    type: sujetInitial ? "Un produit Forge Afrika" : TYPES[0],
    message: sujetInitial ? `Au sujet de ${sujetInitial} : ` : "",
  });
  const [ouvert, setOuvert] = useState(false);

  const champ = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value.slice(0, k === "message" ? 3000 : 120) }));

  function envoyer(e: React.FormEvent) {
    e.preventDefault();
    const sujet = `[Forge Afrika] ${form.type}${form.organisation ? ` — ${form.organisation}` : ""}`;
    const corps = `${form.message}\n\n— ${form.nom}${form.organisation ? `, ${form.organisation}` : ""}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
    setOuvert(true);
  }

  const input = "mt-1 w-full rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2.5 text-white placeholder:text-gray-400 focus:border-gold focus:outline-none";

  return (
    <form onSubmit={envoyer} className="space-y-4 rounded-xl border border-white/10 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-gray-200">
          Votre nom *
          <input required value={form.nom} onChange={champ("nom")} className={input} autoComplete="name" />
        </label>
        <label className="block text-sm text-gray-200">
          Organisation
          <input value={form.organisation} onChange={champ("organisation")} className={input} autoComplete="organization" />
        </label>
      </div>
      <label className="block text-sm text-gray-200">
        Type de demande
        <select value={form.type} onChange={champ("type")} className={input}>
          {TYPES.map((t) => <option key={t} className="bg-navy">{t}</option>)}
        </select>
      </label>
      <label className="block text-sm text-gray-200">
        Votre besoin *
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={champ("message")}
          className={input}
          placeholder="Ce que vous voulez faire, pour qui, et dans quel délai."
        />
      </label>
      <button type="submit" className="w-full rounded-lg bg-gold px-5 py-3 font-bold text-navy hover:opacity-90">
        Préparer l&apos;e-mail
      </button>
      <p className="text-xs text-gray-400">
        Le bouton ouvre votre messagerie avec un e-mail prérempli adressé à {SITE.email}. Le site ne stocke aucune donnée.
      </p>
      {ouvert && (
        <p role="status" className="text-sm text-emerald-300">
          Votre messagerie devrait s&apos;ouvrir. Si rien ne se passe, écrivez directement à {SITE.email}.
        </p>
      )}
    </form>
  );
}
