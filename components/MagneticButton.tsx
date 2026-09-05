"use client";

import { useRef } from "react";
import gsap from "gsap";

export default function MagneticButton({
  children,
  className,
  style,
  href,
  onClick,
  strength = 0.4,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const quickX = useRef<gsap.QuickToFunc | null>(null);
  const quickY = useRef<gsap.QuickToFunc | null>(null);

  const ensureQuick = () => {
    if (!ref.current) return;
    if (!quickX.current) quickX.current = gsap.quickTo(ref.current, "x", { duration: 0.5, ease: "power3.out" });
    if (!quickY.current) quickY.current = gsap.quickTo(ref.current, "y", { duration: 0.5, ease: "power3.out" });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    ensureQuick();
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    quickX.current?.(relX * strength);
    quickY.current?.(relY * strength);
  };

  const handleMouseLeave = () => {
    ensureQuick();
    quickX.current?.(0);
    quickY.current?.(0);
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
