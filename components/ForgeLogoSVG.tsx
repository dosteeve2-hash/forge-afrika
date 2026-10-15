// Composant logo SVG officiel FORGE Afrika
// Usage : <ForgeLogoSVG size={40} /> ou <ForgeLogoSVG variant="full" />

interface ForgeLogoSVGProps {
  size?: number;
  variant?: "icon" | "full" | "wordmark";
  className?: string;
}

export default function ForgeLogoSVG({ size = 40, variant = "icon", className = "" }: ForgeLogoSVGProps) {
  if (variant === "icon") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="FORGE Afrika"
      >
        {/* Fond hexagone */}
        <polygon
          points="20,2 36,11 36,29 20,38 4,29 4,11"
          fill="#0A1628"
          stroke="#D4AF37"
          strokeWidth="1.5"
        />
        {/* Lettre F stylisée — 3 barres horizontales avec barre verticale */}
        {/* Barre verticale */}
        <rect x="13" y="11" width="3" height="18" rx="1" fill="#D4AF37" />
        {/* Barre supérieure */}
        <rect x="13" y="11" width="13" height="3" rx="1" fill="#D4AF37" />
        {/* Barre médiane */}
        <rect x="13" y="18.5" width="9" height="3" rx="1" fill="#D4AF37" />
        {/* Point doré — accent Afrika */}
        <circle cx="28" cy="29" r="2" fill="#00BCD4" />
      </svg>
    );
  }

  if (variant === "full") {
    const h = Math.round(size * 0.4);
    return (
      <svg
        width={size}
        height={h}
        viewBox="0 0 200 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="FORGE Afrika"
      >
        {/* Icône hexagone */}
        <polygon
          points="40,4 71,22 71,58 40,76 9,58 9,22"
          fill="#0A1628"
          stroke="#D4AF37"
          strokeWidth="2.5"
        />
        <rect x="26" y="22" width="5" height="36" rx="1.5" fill="#D4AF37" />
        <rect x="26" y="22" width="24" height="6" rx="1.5" fill="#D4AF37" />
        <rect x="26" y="37" width="17" height="6" rx="1.5" fill="#D4AF37" />
        <circle cx="56" cy="58" r="3.5" fill="#00BCD4" />

        {/* Texte FORGE */}
        <text x="88" y="42" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900"
          fontSize="26" fill="#FFFFFF" letterSpacing="3">FORGE</text>
        {/* Texte Afrika */}
        <text x="89" y="62" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="400"
          fontSize="14" fill="#D4AF37" letterSpacing="6">AFRIKA</text>
      </svg>
    );
  }

  // wordmark seul
  return (
    <svg
      width={size}
      height={Math.round(size * 0.35)}
      viewBox="0 0 180 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="FORGE Afrika"
    >
      <text x="0" y="38" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900"
        fontSize="36" fill="#FFFFFF" letterSpacing="2">FORGE</text>
      <text x="2" y="58" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="400"
        fontSize="14" fill="#D4AF37" letterSpacing="8">AFRIKA</text>
    </svg>
  );
}
