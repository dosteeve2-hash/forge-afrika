"use client";

import { useState } from "react";
import Link from "next/link";

const LIENS = [
  { href: "/ecosystem", label: "Écosystème" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/kibare", label: "KIBARÉ" },
  { href: "/contact", label: "Contact" },
];

/**
 * Barre de navigation commune à toutes les pages du QG.
 * Menu déroulant en dessous de `sm` : sans lui, un visiteur sur téléphone
 * n'a accès à aucune page du site — contrainte mobile-first du projet.
 */
export default function Nav() {
  const [ouvert, setOuvert] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(10,22,40,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(212,175,55,0.1)",
      }}
    >
      <div className="flex items-center justify-between px-4 sm:px-8 py-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOuvert(false)}>
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-bold"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}
          >
            F
          </div>
          <span className="font-bold text-white">FORGE Afrika</span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          {LIENS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:inline"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="text-sm px-4 py-2 rounded-lg font-medium"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}
          >
            QG
          </Link>
          <button
            onClick={() => setOuvert((o) => !o)}
            className="sm:hidden flex flex-col justify-center gap-1.5 w-8 h-8 items-center"
            aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={ouvert}
          >
            <span
              className="block h-0.5 w-5 bg-white transition-transform"
              style={ouvert ? { transform: "translateY(4px) rotate(45deg)" } : undefined}
            />
            <span
              className="block h-0.5 w-5 bg-white transition-opacity"
              style={ouvert ? { opacity: 0 } : undefined}
            />
            <span
              className="block h-0.5 w-5 bg-white transition-transform"
              style={ouvert ? { transform: "translateY(-4px) rotate(-45deg)" } : undefined}
            />
          </button>
        </div>
      </div>

      {ouvert && (
        <div
          className="sm:hidden px-4 pb-4 flex flex-col gap-1"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {LIENS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOuvert(false)}
              className="text-base text-gray-300 hover:text-white transition-colors py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
