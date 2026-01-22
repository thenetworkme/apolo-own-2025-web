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
import CircularGallery from "@/components/ui/circular-gallery";

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
          {/* <STEMSection /> */}

          <div style={{ height: '600px', position: 'relative' }} className="flex flex-col items-center justify-center pt-20">
            <div className="text-center mb-0 relative z-10 pointer-events-none">
              <p className="text-zinc-400 text-xs sm:text-sm font-light tracking-[0.3em] uppercase mb-4">
                Educational Impact
              </p>
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Contributing to the{' '}
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  STEM Future
                </span>
              </h2>
            </div>
            <CircularGallery
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              items={[
                { image: '/stem/WhatsApp Image 2026-01-04 at 7.10.20 PM (1).jpeg', text: '' },
                { image: '/stem/WhatsApp Image 2026-01-04 at 7.11.03 PM (2).jpeg', text: '' },
                { image: '/stem/WhatsApp Image 2026-01-04 at 7.11.03 PM (3).jpeg', text: '' },
                { image: '/stem/WhatsApp Image 2026-01-04 at 7.12.41 PM (1).jpeg', text: '' }
              ]}
            />
          </div>

          <div className="w-full flex justify-center items-center pb-12 relative z-20 force-stem-spacing">
            <a
              href="#stem-visit"
              className="flex items-center justify-center p-[15px] bg-red-600 hover:bg-red-700 text-white text-2xl font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg w-full max-w-[600px]"
              style={{ padding: '15px' }}
            >
              Request a Visit
            </a>
          </div>

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
