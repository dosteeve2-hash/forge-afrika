"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Counter({
  target,
  suffix = "",
  duration = 1.6,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const counter = { value: 0 };
    gsap.to(counter, {
      value: target,
      duration,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top bottom", once: true },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(counter.value) + suffix;
      },
    });
  }, { scope: ref, dependencies: [target, suffix, duration] });

  return <span ref={ref}>0{suffix}</span>;
}
