"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { FILIALES_FORGE } from "@/lib/constants";

const TOTAL = FILIALES_FORGE.length;
const RADIUS = 40;

function nodePosition(i: number) {
  const angle = (i / TOTAL) * 2 * Math.PI - Math.PI / 2;
  return { x: 50 + RADIUS * Math.cos(angle), y: 50 + RADIUS * Math.sin(angle) };
}

export default function EcosystemSection() {
  const ringsRef = useRef<SVGSVGElement>(null);
  const linesRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    if (ringsRef.current) {
      const rings = ringsRef.current.querySelectorAll(".ring");
      rings.forEach((ring, i) => {
        gsap.to(ring, {
          rotate: i % 2 === 0 ? 360 : -360,
          transformOrigin: "50% 50%",
          duration: 40 + i * 15,
          repeat: -1,
          ease: "none",
        });
      });
    }
    if (linesRef.current) {
      const lines = linesRef.current.querySelectorAll(".pulse-line");
      gsap.to(lines, {
        strokeOpacity: 0.75,
        duration: 1.6,
        stagger: { each: 0.15, repeat: -1, yoyo: true },
        ease: "sine.inOut",
      });
    }
  }, {});

  return (
    <section className="py-24 px-4" style={{ background: "rgba(255,255,255,0.015)" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" as const }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            L&apos;Écosystème
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            FORGE Afrika au centre. Chaque filiale, une ramification autonome, connectée au QG.
          </p>
        </motion.div>

        <div className="relative mx-auto aspect-square w-full max-w-[560px]">
          <svg ref={ringsRef} className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {[18, 28].map((r) => (
              <circle
                key={r}
                className="ring"
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke="rgba(212,175,55,0.18)"
                strokeWidth="0.3"
                strokeDasharray="1.5 3"
              />
            ))}
          </svg>

          <svg ref={linesRef} className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {FILIALES_FORGE.map((f, i) => {
              const { x, y } = nodePosition(i);
              return (
                <motion.line
                  key={f.slug}
                  className="pulse-line"
                  x1="50" y1="50" x2={x} y2={y}
                  stroke={f.couleur} strokeWidth="0.35" strokeOpacity="0.35"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: i * 0.06 }}
                  viewport={{ once: true }}
                />
              );
            })}
          </svg>

          <motion.div
            className="absolute z-10 flex flex-col items-center justify-center rounded-full text-center px-2"
            style={{
              left: "50%", top: "50%", transform: "translate(-50%,-50%)",
              width: "26%", aspectRatio: "1",
              background: "linear-gradient(135deg, #D4AF37, #F5D76E)",
              boxShadow: "0 0 60px rgba(212,175,55,0.45)",
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring" as const, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="font-bold leading-tight" style={{ color: "#0A1628", fontSize: "clamp(0.6rem, 2vw, 0.95rem)", fontFamily: "var(--font-display)" }}>
              FORGE<br />AFRIKA
            </span>
          </motion.div>

          {FILIALES_FORGE.map((f, i) => {
            const { x, y } = nodePosition(i);
            return (
              <motion.a
                key={f.slug}
                href={f.url !== "#" ? f.url : "/ecosystem"}
                target={f.url !== "#" ? "_blank" : undefined}
                rel={f.url !== "#" ? "noopener noreferrer" : undefined}
                className="absolute flex flex-col items-center gap-1 group"
                style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)", width: "68px" }}
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05, type: "spring" as const }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.15 }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-base"
                  style={{ background: "#0A1628", border: `2px solid ${f.couleur}` }}
                >
                  {f.icon}
                </div>
                <span className="text-[10px] text-center leading-tight text-gray-300 group-hover:text-white transition-colors">
                  {f.nom}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
