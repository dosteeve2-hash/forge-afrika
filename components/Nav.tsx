import Link from "next/link";

const LIENS = [
  { href: "/ecosystem", label: "Écosystème" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/kibare", label: "KIBARÉ" },
  { href: "/contact", label: "Contact" },
];

/** Barre de navigation commune à toutes les pages du QG. */
export default function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4"
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
      </div>
    </nav>
  );
}
