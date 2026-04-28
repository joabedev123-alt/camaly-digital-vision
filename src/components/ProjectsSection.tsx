import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import spaceParkImg from "@/assets/Plataforma/space park.png";
import zapyImg from "@/assets/Plataforma/zapy.png";
import megaPixImg from "@/assets/Plataforma/mega pix.png";
import portfolioEcommerce1 from "@/assets/IMG/portfolio-ecommerce-1.png";
import portfolioEcommerce2 from "@/assets/IMG/portfolio-ecommerce-2.png";
import portfolioEcommerce3 from "@/assets/IMG/portfolio-ecommerce-3.png";
import andersonImg from "@/assets/landing page/anderson .png";
import landscapImg from "@/assets/landing page/landscap.png";
import thaynaraImg from "@/assets/landing page/thaynara.png";
import domMiguelImg from "@/assets/institucional/dommiguel.png";
import genesisImg from "@/assets/institucional/genesis tatoo.png";
import starKaseImg from "@/assets/institucional/star kase.png";
import douglasImg from "@/assets/Imobiliario/douglas.png";
import mansaoImg from "@/assets/Imobiliario/mansao venda nova.png";

const ease = [0.22, 1, 0.36, 1] as const;

const projects = [
  { 
    items: [
      { image: spaceParkImg, url: "https://www.estacionamentospacepark.com.br" },
      { image: zapyImg, url: "https://zapybr.com.br" },
      { image: megaPixImg, url: "https://megapixx.net" }
    ], 
    title: "Sistemas e Aplicações", 
    category: "Plataforma", 
  },
  { 
    items: [
      { image: portfolioEcommerce1, url: "#" },
      { image: portfolioEcommerce2, url: "#" },
      { image: portfolioEcommerce3, url: "#" }
    ], 
    title: "Lojas Virtuais de Alta Conversão", 
    category: "(Ecommerce)", 
  },
  { 
    items: [
      { image: andersonImg, url: "http://andersonsilvatreinador.com.br" },
      { image: landscapImg, url: "https://mdlandiscapellc.com" },
      { image: thaynaraImg, url: "https://thaynaravertelo.com.br" }
    ], 
    title: "Páginas de Venda e Captura", 
    category: "(Landing Page)", 
  },
  { 
    items: [
      { image: domMiguelImg, url: "https://dommiguelindustria.com.br" },
      { image: genesisImg, url: "https://www.genesistattoo.com.br" },
      { image: starKaseImg, url: "https://starcases.com.br" }
    ], 
    title: "Identidade Digital Profissional", 
    category: "(Institucional)", 
  },
  { 
    items: [
      { image: douglasImg, url: "https://douglasazevedoimoveis.com.br" },
      { image: mansaoImg, url: "https://mansaovendanova.com.br" }
    ], 
    title: "Soluções para o Mercado Imobiliário", 
    category: "Imobiliária e Aluguel", 
  },
];

const ProjectImage = ({ image, images, items, alt }: { image?: string; images?: string[]; items?: { image: string; url: string }[]; alt: string }) => {
  const [index, setIndex] = useState(0);
  const displayItems = items || (images ? images.map(img => ({ image: img, url: "" })) : (image ? [{ image, url: "" }] : []));

  useEffect(() => {
    if (displayItems.length > 1) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % displayItems.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [displayItems.length]);

  const currentItem = displayItems[index];

  const content = (
    <motion.img
      key={index}
      src={currentItem.image}
      alt={alt}
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  );

  return (
    <div className="aspect-[4/3] overflow-hidden relative">
      <AnimatePresence mode="wait">
        {currentItem.url ? (
          <a 
            href={currentItem.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block w-full h-full cursor-pointer"
          >
            {content}
          </a>
        ) : (
          content
        )}
      </AnimatePresence>
      
      {displayItems.length > 1 && (
        <div className="absolute bottom-4 right-4 flex gap-1 z-10">
          {displayItems.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-4 bg-primary' : 'w-1 bg-white/30'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const ProjectsSection = () => {
  return (
    <section id="projetos" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-display uppercase tracking-[0.2em] text-primary mb-4">
            Portfólio
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tighter text-foreground">
            Projetos que transformam negócios
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const hasItems = "items" in project;
            const Wrapper = hasItems ? motion.div : motion.a;
            
            return (
              <Wrapper
                key={project.title}
                {...(hasItems ? {} : { href: (project as any).href })}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                className={`group block ${hasItems ? 'lg:col-span-3 mb-20' : 'cursor-pointer mb-12'}`}
              >
                {hasItems ? (
                  <div className="space-y-12">
                    <div className="px-1 text-center">
                      <span className="text-[10px] md:text-xs font-display uppercase tracking-[0.3em] text-primary mb-3 block opacity-90">
                        {project.category}
                      </span>
                      <h3 className="font-display font-bold text-foreground text-2xl md:text-5xl leading-[1.1] tracking-tighter group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 gap-6 md:gap-8 pb-4 -mx-6 px-6 md:mx-0 md:px-0">
                      {(project as any).items.map((item: any, idx: number) => (
                        <a 
                          key={idx}
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="relative rounded-2xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-500 aspect-[4/3] group/item block shadow-2xl shadow-primary/5 flex-shrink-0 w-[85vw] md:w-auto snap-center"
                        >
                          <img 
                            src={item.image} 
                            alt={`${project.title} - ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-105" 
                          />
                          <div className="absolute inset-0 bg-background/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {/* Header Info - Now on Top and Centered */}
                    <div className="mb-8 px-1 text-center order-first">
                      <span className="text-[10px] md:text-xs font-display uppercase tracking-[0.3em] text-primary mb-3 block opacity-90">
                        {project.category}
                      </span>
                      <h3 className="font-display font-bold text-foreground text-xl md:text-4xl leading-tight tracking-tighter group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>

                    {/* Image Box */}
                    <div className="relative rounded-2xl overflow-hidden border border-border/20 group-hover:border-primary/30 transition-all duration-500 bg-background/5">
                      <ProjectImage 
                        image={(project as any).image} 
                        images={(project as any).images} 
                        items={(project as any).items} 
                        alt={project.title} 
                      />
                      {/* Subtle overlay on hover */}
                      <div className="absolute inset-0 bg-background/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                )}
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
};
