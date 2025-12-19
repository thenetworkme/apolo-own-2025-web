import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import SlideIndicator from "@/components/SlideIndicator";
import SaveTheDateSection from "@/components/SaveTheDateSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <Header />
      <HeroSection />
      <SaveTheDateSection />
      {/* Slide Navigation Dots */}
      {/* <SlideIndicator totalSlides={4} currentSlide={0} /> */}
    </main>
  );
}
