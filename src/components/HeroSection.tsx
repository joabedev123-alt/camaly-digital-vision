import { motion } from "framer-motion";
import heroChameleon from "@/assets/hero-chameleon.png";

const ease = [0.22, 1, 0.36, 1] as const;

const services = [
  "Sites Institucionais",
  "Landing Pages",
  "Sistemas Web",
  "Experiências Imersivas",
  "SEO",
  "UI/UX",
];

const metrics = [
  { value: "120+", label: "Projetos entregues" },
  { value: "98.4%", label: "Precisão em UI/UX" },
  { value: "3x", label: "Mais conversão" },
  { value: "100%", label: "Atendimento estratégico" },
];

export const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden noise-overlay">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(200,45%,4%)] to-background" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

      {/* Chameleon hero image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.4, ease, delay: 0.3 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] max-w-[900px] hidden md:block z-[2]"
      >
        <img
          src={heroChameleon}
          alt="Camaleão digital emergindo de um planeta"
          className="w-full h-auto object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 pt-32 pb-20">
        <div className="max-w-2xl">
          {/* Service tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {services.map((s, i) => (
              <span
                key={s}
                className="text-xs font-display tracking-wider uppercase text-muted-foreground border border-border/50 px-3 py-1.5 rounded-full"
              >
                {s}
              </span>
            ))}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[0.95] text-foreground"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Sua presença digital precisa causar{" "}
            <span className="text-gradient">impacto de verdade</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.4 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg"
          >
            Criamos sites, landing pages e sistemas com design imersivo, estratégia
            comercial e tecnologia moderna para transformar marcas em experiências memoráveis.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-base glow-primary hover:scale-105 transition-transform duration-200"
            >
              Falar no WhatsApp
            </a>
            <a
              href="#projetos"
              className="px-8 py-4 rounded-lg border border-border/50 text-foreground font-display font-semibold text-base hover:border-primary/30 hover:text-primary transition-all duration-300"
            >
              Ver projetos
            </a>
          </motion.div>
        </div>

        {/* Mobile chameleon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.5 }}
          className="mt-12 md:hidden"
        >
          <img
            src={heroChameleon}
            alt="Camaleão digital"
            className="w-full max-w-md mx-auto"
          />
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-2xl"
        >
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="font-display text-2xl md:text-3xl font-bold text-gradient">{m.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
