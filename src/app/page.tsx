import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import SlideIndicator from "@/components/SlideIndicator";
import SaveTheDateSection from "@/components/SaveTheDateSection";
import RoverAchievementsSection from "@/components/RoverAchievementsSection";
import RoverRoadmapSection from "@/components/RoverRoadmapSection";
import SponsorsSection from "@/components/SponsorsSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import Footer from "@/components/Footer";
import { Meteors } from "@/components/ui/meteors";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <Header />
      <HeroSection />

      {/* Sections with Meteors + Dot Pattern Background */}
      <div className="relative overflow-hidden">
        {/* Dot Pattern Background - subtle grid effect */}


        {/* Meteors - falling stars effect */}


        <div className="relative z-10">
          <div className="absolute inset-0 z-[1] overflow-hidden">
            <Meteors number={5} />
          </div>
          <SaveTheDateSection />
          <RoverAchievementsSection />
          {/* <RoverRoadmapSection /> */}
          <SponsorsSection />

          <SocialMediaSection />
        </div>
      </div>

      {/* Footer with Globe */}
      <Footer />

      {/* Slide Navigation Dots */}
      {/* <SlideIndicator totalSlides={4} currentSlide={0} /> */}
    </main>
  );
}
