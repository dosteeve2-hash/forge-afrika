import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Confidentialité",
  description: "Quelles données ce site collecte, et ce qu'il en fait.",
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-14 text-gray-300 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-white">Confidentialité</h1>
      <p>Dernière mise à jour : octobre 2026.</p>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-white">Responsable</h2>
        <p>
          Ce site est édité par {SITE.fondateur}, fondateur du projet Forge Afrika (non immatriculé à ce jour).
          Contact : <a href={`mailto:${SITE.email}`} className="text-gold underline">{SITE.email}</a>.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-white">Ce que le site collecte</h2>
        <p>
          Rien directement. Le site n&apos;a ni compte utilisateur, ni base de données, ni cookie publicitaire, ni outil de
          mesure d&apos;audience. Le formulaire de contact ne fait que préparer un e-mail dans votre propre messagerie.
        </p>
        <p>
          L&apos;hébergeur (Vercel) peut enregistrer des journaux techniques, dont l&apos;adresse IP, pour assurer la
          sécurité et le fonctionnement du service.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-white">Les e-mails que vous nous envoyez</h2>
        <p>
          Ils servent uniquement à vous répondre. Ils ne sont ni vendus, ni partagés, ni utilisés pour de la prospection
          sans votre accord. Vous pouvez demander leur suppression à tout moment à l&apos;adresse ci-dessus.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-white">Les produits Forge Afrika</h2>
        <p>Ce texte ne couvre que ce site. Chaque application Forge Afrika devra avoir sa propre politique de confidentialité avant d&apos;accueillir des utilisateurs réels.</p>
      </section>
    </div>
  );
}
