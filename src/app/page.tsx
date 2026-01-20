import HeroSection from "@/components/HeroSection";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import Header from "@/components/Header";
import SlideIndicator from "@/components/SlideIndicator";
import SaveTheDateSection from "@/components/SaveTheDateSection";
import RoverAchievementsSection from "@/components/RoverAchievementsSection";
import RoverRoadmapSection from "@/components/RoverRoadmapSection";
import SponsorsSection from "@/components/SponsorsSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import STEMSection from "@/components/STEMSection";
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

      {/* Sections with Meteors Background */}
      <div className="relative overflow-hidden">
        <div className="relative z-10">
          {/* <div className="absolute inset-0 z-[1] overflow-hidden">
            <Meteors number={5} />
          </div> */}

          {/* Achievements - Build credibility */}
          <RoverAchievementsSection />

          {/* Social Proof - Testimonials and Social Media */}
          <SocialMediaSection />

          {/* STEM Impact - Educational CTA */}
          <STEMSection />

          {/* Save the Date - Urgency */}
          <SaveTheDateSection />

          {/* Sponsors - Who supports us */}
          <SponsorsSection />
        </div>
      </div>

      {/* Footer with Globe */}
      <Footer />

      {/* Slide Navigation Dots */}
      {/* <SlideIndicator totalSlides={4} currentSlide={0} /> */}
    </main>
  );
}
