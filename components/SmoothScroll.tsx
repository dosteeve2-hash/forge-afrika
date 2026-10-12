"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Un utilisateur qui a demandé moins de mouvement ne reçoit ni défilement
    // inertiel ni boucle d'animation : le navigateur défile normalement et
    // aucune rAF ne tourne. C'est la règle 3 du playbook 05, et c'est aussi
    // de la batterie qui n'est pas brûlée.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Cette fonction doit être nommée : `gsap.ticker.remove(lenis.raf)`
    // retirait une autre fonction que celle ajoutée, donc ne retirait rien.
    // Le ticker continuait d'appeler `lenis.raf` sur une instance détruite.
    const avancer = (time: number) => lenis.raf(time * 1000);

    gsap.ticker.add(avancer);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(avancer);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
