import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { HeroContent } from "@/components/HeroContent";
import { ImpactBlock } from "@/components/ImpactBlock";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Differentials } from "@/components/Differentials";
import { ProcessSection } from "@/components/ProcessSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesGrid />
      <ProcessSection />
      <HeroContent />
      <ImpactBlock />

      <Differentials />
      <ProjectsSection />
      <TestimonialsSection />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
