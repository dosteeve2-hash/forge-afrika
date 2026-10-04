"use client";

import { MotionConfig } from "framer-motion";

/**
 * Un seul endroit où le réglage système « moins de mouvement » est respecté
 * par TOUTES les animations framer-motion du site, y compris les boucles
 * infinies du hero et des anneaux de l'écosystème.
 *
 * `reducedMotion="user"` laisse les animations de position et d'échelle au
 * repos quand l'utilisateur a demandé moins de mouvement, et garde les
 * transitions d'opacité — qui ne provoquent pas de nausée et portent le sens
 * (un élément qui apparaît reste visible). Règle 3 du playbook 05.
 */
export default function MotionGlobale({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
