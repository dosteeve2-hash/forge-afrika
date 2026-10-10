"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ForgeLogoSVG from "@/components/ForgeLogoSVG";

const LIENS = [
  { label: "Produits", href: "/produits" },
  { label: "Services", href: "/services" },
  { label: "À propos", href: "/a-propos" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const lien = (href: string) =>
    pathname === href || pathname.startsWith(href + "/") ? "text-white" : "text-gray-300 hover:text-white";

  return (
    <header className="sticky top-0 z-50 border-b border-gold/15 bg-navy/95 backdrop-blur">
      <nav aria-label="Navigation principale" className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <ForgeLogoSVG size={34} variant="icon" />
          <span className="leading-none">
            <span className="block text-sm font-black tracking-wider text-white">FORGE</span>
            <span className="block text-[10px] font-semibold tracking-[0.3em] text-gold">AFRIKA</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {LIENS.map((l) => (
            <Link key={l.href} href={l.href} className={`text-sm transition-colors ${lien(l.href)}`}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="rounded-lg bg-gold px-4 py-2 text-sm font-bold text-navy transition-opacity hover:opacity-90">
            Parler d&apos;un projet
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-white md:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div id="menu-mobile" className="border-t border-white/5 px-4 pb-4 md:hidden">
          {LIENS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block border-b border-white/5 py-3 ${lien(l.href)}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-lg bg-gold px-4 py-3 text-center text-sm font-bold text-navy"
          >
            Parler d&apos;un projet
          </Link>
        </div>
      )}
    </header>
  );
}
