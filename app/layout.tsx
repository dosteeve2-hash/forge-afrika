import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Forge Afrika — Logiciels et services numériques pour l'Afrique",
    template: "%s — Forge Afrika",
  },
  description: SITE.phrase,
  openGraph: {
    title: "Forge Afrika",
    description: SITE.phrase,
    type: "website",
    locale: "fr_FR",
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/android-chrome-192x192.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <a href="#contenu" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-gold focus:px-3 focus:py-2 focus:text-navy">
          Aller au contenu
        </a>
        <Navbar />
        <main id="contenu" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
