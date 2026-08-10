import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FiliaresSection from "@/components/FiliaresSection";
import MissionSection from "@/components/MissionSection";
import EcosystemSection from "@/components/EcosystemSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ background: "#0A1628" }}>
      <Navbar />
      <HeroSection />
      <FiliaresSection />
      <MissionSection />
      <EcosystemSection />
      <Footer />
    </main>
  );
}
