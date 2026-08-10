import Navbar from "@/components/Navbar";
import CursorGlow from "@/components/CursorGlow";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import FiliaresSection from "@/components/FiliaresSection";
import EcosystemVisionSection from "@/components/EcosystemVisionSection";
import MissionSection from "@/components/MissionSection";
import EcosystemSection from "@/components/EcosystemSection";
import InvestorSection from "@/components/InvestorSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen relative" style={{ background: "#0A1628" }}>
      <CursorGlow />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <FiliaresSection />
      <EcosystemVisionSection />
      <MissionSection />
      <EcosystemSection />
      <InvestorSection />
      <Footer />
    </main>
  );
}
