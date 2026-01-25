import HeroSection from "@/components/HeroSection";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import Header from "@/components/Header";
import SlideIndicator from "@/components/SlideIndicator";
import SaveTheDateSection from "@/components/SaveTheDateSection";
import HallOfFameSection from "@/components/HallOfFameSection";
import RoverRoadmapSection from "@/components/RoverRoadmapSection";
import SponsorsSection from "@/components/SponsorsSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import STEMSectionNew from "@/components/STEMSectionNew";
import Footer from "@/components/Footer";
import { Meteors } from "@/components/ui/meteors";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <Header />
      <HeroSection />

      {/* Scroll Reveal Section - Immersive text animation */}
      <ScrollRevealSection />

      {/* Save the Date - Urgency */}
      <SaveTheDateSection />

      {/* Sections with Meteors Background */}
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          {/* Hall of Fame - Engineering showcase */}
          <HallOfFameSection />



          {/* STEM Impact - Educational CTA with CircularGallery */}
          <STEMSectionNew />



          {/* Sponsors - Who supports us */}
          <SponsorsSection />

          {/* Social Proof - Testimonials and Social Media */}
          <SocialMediaSection />
        </div>
      </div>

      {/* Footer with Globe */}
      <Footer />
    </main>
  );
}
