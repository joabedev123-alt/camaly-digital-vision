import { motion } from "framer-motion";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

const ease = [0.22, 1, 0.36, 1] as const;

const projects = [
  { image: portfolio1, title: "Site Institucional Premium", category: "Landing Page", href: "#" },
  { image: portfolio2, title: "E-commerce de Alto Impacto", category: "E-commerce", href: "#" },
  { image: portfolio3, title: "Dashboard Analítico", category: "Sistema Web", href: "#" },
];

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs font-display uppercase tracking-wider text-primary">{project.category}</span>
                <h3 className="font-display font-semibold text-foreground text-lg mt-1">{project.title}</h3>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 shadow-[inset_0_0_30px_hsla(162,100%,42%,0.1)]" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
