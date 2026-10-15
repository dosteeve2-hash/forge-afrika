"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (!glowRef.current) return;

    const quickX = gsap.quickTo(glowRef.current, "x", { duration: 0.7, ease: "power3.out" });
    const quickY = gsap.quickTo(glowRef.current, "y", { duration: 0.7, ease: "power3.out" });

    const handleMove = (e: MouseEvent) => {
      quickX(e.clientX);
      quickY(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="hidden md:block fixed top-0 left-0 pointer-events-none z-[1] -translate-x-1/2 -translate-y-1/2"
      style={{
        width: 500,
        height: 500,
        background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
