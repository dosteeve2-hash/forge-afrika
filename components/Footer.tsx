import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-black tracking-wider text-white">
            FORGE <span className="text-gold">AFRIKA</span>
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Startup technologique en phase de démarrage. Projet porté par {SITE.fondateur}, pas encore immatriculé.
          </p>
        </div>
        <nav aria-label="Pied de page" className="grid grid-cols-2 gap-2 text-sm">
          <Link href="/produits" className="text-gray-300 hover:text-white">Produits</Link>
          <Link href="/services" className="text-gray-300 hover:text-white">Services</Link>
          <Link href="/a-propos" className="text-gray-300 hover:text-white">À propos</Link>
          <Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link>
          <Link href="/confidentialite" className="text-gray-300 hover:text-white">Confidentialité</Link>
        </nav>
        <div className="text-sm">
          <a href={`mailto:${SITE.email}`} className="text-gold hover:underline">{SITE.email}</a>
          <p className="mt-2">
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              GitHub
            </a>
          </p>
          <p className="mt-2 text-gray-400">{SITE.localisation}</p>
        </div>
      </div>
      <p className="border-t border-white/5 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Forge Afrika
      </p>
    </footer>
  );
}
