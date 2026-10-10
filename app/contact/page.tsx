import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Parler d'un projet avec Forge Afrika.",
};

type Props = { searchParams: Promise<{ sujet?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { sujet } = await searchParams;

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_1.4fr]">
      <div>
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Contact</h1>
        <p className="mt-3 text-gray-300">
          Un projet, une question sur un produit, une proposition de partenariat : écrivez-nous. C&apos;est le
          fondateur, {SITE.fondateur}, qui vous répond.
        </p>
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="text-gray-400">E-mail</dt>
            <dd><a href={`mailto:${SITE.email}`} className="text-gold hover:underline">{SITE.email}</a></dd>
          </div>
          <div>
            <dt className="text-gray-400">Basé en</dt>
            <dd className="text-gray-200">{SITE.localisation}</dd>
          </div>
          <div>
            <dt className="text-gray-400">Langues</dt>
            <dd className="text-gray-200">Français, anglais</dd>
          </div>
        </dl>
      </div>
      <ContactForm sujetInitial={sujet?.slice(0, 60)} />
    </div>
  );
}
