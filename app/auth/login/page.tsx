"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0A1628" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)" }} />

      <motion.div className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" as const }}>

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-2xl"
              style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}>F</div>
            <span className="font-bold text-white text-xl">FORGE Afrika</span>
          </Link>
          <p className="text-gray-400 mt-3 text-sm">Accéder au QG de l'écosystème</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <h1 className="text-2xl font-bold text-white mb-6">Connexion</h1>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#EF4444" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@forgeafrika.com"
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Mot de passe</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-semibold transition-all hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}>
              {loading ? "Connexion..." : "Accéder au QG"}
            </button>
          </form>

          <p className="text-center text-gray-500 text-xs mt-6">
            Accès réservé aux membres de l'équipe FORGE Afrika.
          </p>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            ← Retour à l'accueil
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
