"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { FILIALES_FORGE } from "@/lib/constants";

const SOCIALS = [
  { icon: Mail, href: "mailto:docompaore2@gmail.com", label: "Email" },
  { icon: Github, href: "https://github.com/dosteeve2-hash/forge-afrika", label: "Code source sur GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer id="contact" className="py-16 px-4" style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex flex-col items-center text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl"
              style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}
            >
              F
            </div>
            <span className="font-bold text-white text-lg" style={{ fontFamily: "var(--font-display)" }}>
              FORGE Afrika
            </span>
          </div>
          <p className="text-gray-500 text-sm mb-6">© 2026 FORGE Afrika. Bâtir l&apos;Afrique de demain.</p>

          <div className="flex items-center gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-[#0A1628] transition-all hover:scale-110"
                style={{ border: "1px solid rgba(212,175,55,0.25)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(135deg, #D4AF37, #F5D76E)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-10">
          <Link href="/ecosystem" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Nos Filiales</Link>
          <Link href="/roadmap" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Roadmap</Link>
          <Link href="/dashboard" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">QG</Link>
        </div>

        <div className="pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-center text-xs text-gray-600 uppercase tracking-wider mb-4">Toutes les filiales</p>
          <div className="flex flex-wrap justify-center gap-2">
            {FILIALES_FORGE.map((f) => (
              <a
                key={f.slug}
                href={f.url !== "#" ? f.url : "/ecosystem"}
                target={f.url !== "#" ? "_blank" : undefined}
                rel={f.url !== "#" ? "noopener noreferrer" : undefined}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{ background: `${f.couleur}15`, color: f.couleur, border: `1px solid ${f.couleur}30` }}
              >
                {f.icon} {f.nom}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
