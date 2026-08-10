"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import ForgeLogoSVG from "@/components/ForgeLogoSVG";

const NAV_LINKS = [
  { label: "Projets",    href: "#filiales",    scroll: true  },
  { label: "Écosystème", href: "#ecosysteme",  scroll: true  },
  { label: "Mission",    href: "#mission",     scroll: true  },
  { label: "Roadmap",    href: "/roadmap",     scroll: false },
  { label: "Contact",    href: "/contact",     scroll: false },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.2 }
    );
  }, { scope: navRef });

  const handleNavClick = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-3"
      style={{
        background: "rgba(10,22,40,0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(212,175,55,0.15)",
      }}
    >
      {/* Logo */}
      <a href="#hero" className="flex items-center gap-3 group"
        onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}>
        <ForgeLogoSVG size={38} variant="icon" className="transition-transform group-hover:scale-105" />
        <div>
          <div className="font-black text-white text-sm leading-none tracking-wider">FORGE</div>
          <div className="text-[10px] font-semibold tracking-[0.3em] leading-none" style={{ color: "#D4AF37" }}>AFRIKA</div>
        </div>
      </a>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map((link) =>
          link.scroll ? (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          )
        )}
        <Link
          href="/dashboard"
          className="text-sm px-4 py-2 rounded-lg font-bold transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}
        >
          ⌘ QG
        </Link>
      </div>

      <button
        className="md:hidden text-white"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-0 right-0 flex flex-col gap-1 px-6 py-4"
            style={{ background: "rgba(10,22,40,0.97)", borderBottom: "1px solid rgba(212,175,55,0.15)" }}
          >
            {NAV_LINKS.map((link) =>
              link.scroll ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="py-3 text-gray-300 hover:text-white transition-colors border-b border-white/5"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-gray-300 hover:text-white transition-colors border-b border-white/5"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/dashboard"
              className="mt-3 text-center text-sm px-4 py-3 rounded-lg font-bold"
              style={{ background: "linear-gradient(135deg, #D4AF37, #F5D76E)", color: "#0A1628" }}
            >
              Accéder au QG
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
