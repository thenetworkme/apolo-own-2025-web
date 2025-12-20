import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import SlideIndicator from "@/components/SlideIndicator";
import SaveTheDateSection from "@/components/SaveTheDateSection";
import RoverAchievementsSection from "@/components/RoverAchievementsSection";
import RoverRoadmapSection from "@/components/RoverRoadmapSection";
import SponsorsSection from "@/components/SponsorsSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <Header />
      <HeroSection />

      {/* Sections with Animated Grid Pattern Background */}
      <div className="relative">
        {/* Animated Grid Pattern - visible on all sections after Hero */}


        <div className="relative z-10">
          <SaveTheDateSection />
          <RoverAchievementsSection />
          <AnimatedGridPattern
            className=" fill-red-500/10 stroke-zinc-500/20 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
            numSquares={50}
            maxOpacity={1}
            duration={4}
            width={50}
            height={350}
          />
          {/* <RoverRoadmapSection /> */}
          <SponsorsSection />
          <SocialMediaSection />
        </div>
      </div>

      {/* Slide Navigation Dots */}
      {/* <SlideIndicator totalSlides={4} currentSlide={0} /> */}
    </main>
  );
}
