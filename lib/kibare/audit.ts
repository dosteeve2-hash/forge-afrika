"use client";

import { useEffect, useRef, useState } from "react";
import type { EntreeAudit, Portefeuille } from "./types";

/** Construit la liste des chaînes qui ne doivent jamais sortir de la machine. */
function jetonsSensibles(p: Portefeuille): string[] {
  const jetons: string[] = [];
  for (const l of p.lignes) {
    if (l.nom.trim().length > 2) jetons.push(l.nom.trim().toLowerCase());
    jetons.push(String(l.quantite * l.cours));
    jetons.push(String(l.pru));
  }
  if (p.cash > 0) jetons.push(String(p.cash));
  return jetons.filter((j) => j.length > 2);
}

/**
 * Journal d'audit réseau — Loi 3 et Loi 6 de l'architecture KIBARÉ.
 *
 * Intercepte réellement `fetch`, `XMLHttpRequest` et `sendBeacon`, journalise
 * chaque requête sortante et vérifie si son URL ou son corps contient une donnée
 * du portefeuille. Ce n'est pas une simulation : le compteur affiché est celui
 * des requêtes que la page a effectivement tentées.
 */
export function useAuditReseau(portefeuille: Portefeuille): {
  entrees: EntreeAudit[];
  total: number;
  fuites: number;
} {
  const [entrees, setEntrees] = useState<EntreeAudit[]>([]);
  const refPortefeuille = useRef(portefeuille);
  refPortefeuille.current = portefeuille;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const enregistrer = (cible: string, methode: string, corps: string): void => {
      const jetons = jetonsSensibles(refPortefeuille.current);
      const contenu = `${cible} ${corps}`.toLowerCase();
      const fuite = jetons.some((j) => contenu.includes(j));
      setEntrees((precedentes) =>
        [
          {
            horodatage: new Date().toLocaleTimeString("fr-FR"),
            cible: cible.slice(0, 120),
            methode,
            fuite,
          },
          ...precedentes,
        ].slice(0, 40)
      );
    };

    const fetchOriginal = window.fetch.bind(window);
    window.fetch = (entree: RequestInfo | URL, init?: RequestInit) => {
      const cible =
        typeof entree === "string"
          ? entree
          : entree instanceof URL
            ? entree.href
            : entree.url;
      const corps = typeof init?.body === "string" ? init.body : "";
      enregistrer(cible, init?.method ?? "GET", corps);
      return fetchOriginal(entree, init);
    };

    const ouvrirOriginal = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (
      this: XMLHttpRequest,
      methode: string,
      url: string | URL,
      ...reste: unknown[]
    ) {
      enregistrer(String(url), methode, "");
      return ouvrirOriginal.apply(
        this,
        [methode, url, ...reste] as Parameters<typeof ouvrirOriginal>
      );
    } as typeof XMLHttpRequest.prototype.open;

    const beaconOriginal = navigator.sendBeacon?.bind(navigator);
    if (beaconOriginal) {
      navigator.sendBeacon = (url: string | URL, data?: BodyInit | null) => {
        enregistrer(String(url), "BEACON", typeof data === "string" ? data : "");
        return beaconOriginal(url, data);
      };
    }

    return () => {
      window.fetch = fetchOriginal;
      XMLHttpRequest.prototype.open = ouvrirOriginal;
      if (beaconOriginal) navigator.sendBeacon = beaconOriginal;
    };
  }, []);

  return {
    entrees,
    total: entrees.length,
    fuites: entrees.filter((e) => e.fuite).length,
  };
}
