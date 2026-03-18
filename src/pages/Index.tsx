import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ImpactBlock } from "@/components/ImpactBlock";
import { ServiceFeature } from "@/components/ServiceFeature";
import { ServicesGrid } from "@/components/ServicesGrid";
import { Differentials } from "@/components/Differentials";
import { ProcessSection } from "@/components/ProcessSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AboutSection } from "@/components/AboutSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <HeroSection />
      <ImpactBlock />

      <ServiceFeature
        tag="Imersivo"
        title="Sites imersivos e interativos"
        description="Desenvolvemos experiências digitais que prendem atenção, aumentam percepção de valor e transformam navegação em presença de marca."
        image={portfolio1}
      />

      <ServiceFeature
        tag="Conversão"
        title="Sites que convertem"
        description="Cada página é pensada para unir estética, clareza e resultado. Estruturamos sites e landing pages com foco em autoridade, geração de leads e performance comercial."
        image={portfolio3}
        reversed
      />

      <ServiceFeature
        tag="Identidade"
        title="Projetos com identidade digital forte"
        description="Criamos interfaces que não apenas apresentam serviços, mas constroem percepção, posicionamento e desejo pela marca."
        image={portfolio2}
      />

      <ServicesGrid />
      <Differentials />
      <ProcessSection />
      <ProjectsSection />
      <AboutSection />
      <TestimonialsSection />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
