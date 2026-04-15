import { motion } from "framer-motion";
import { TrendingUp, Globe, Users, Award } from "lucide-react";
import { FloatingParticles } from "./FloatingParticles";

const ease = [0.22, 1, 0.36, 1] as const;

const metrics = [
  {
    icon: TrendingUp,
    value: "3x",
    label: "Mais conversão",
    desc: "comparado à média do mercado",
  },
  {
    icon: Globe,
    value: "120+",
    label: "Projetos entregues",
    desc: "para empresas de todo o Brasil",
  },
  {
    icon: Users,
    value: "98%",
    label: "Satisfação dos clientes",
    desc: "que indicam para outros",
  },
  {
    icon: Award,
    value: "100%",
    label: "Atendimento estratégico",
    desc: "do início ao resultado",
  },
];

export const HeroContent = () => {
  return (
    <section
      id="diferenciais-hero"
      className="relative py-24 md:py-32 overflow-hidden noise-overlay"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(200,45%,4%)] to-background" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />
      <FloatingParticles count={12} />

      <div className="relative z-10 container mx-auto px-6 md:px-16">

        {/* Título da seção */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-16 text-center"
        >
          <span className="inline-block text-xs font-display uppercase tracking-[0.25em] text-primary border border-primary/30 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            Por que a Camaly?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
            Números que provam{" "}
            <span className="text-gradient">nosso resultado</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Não trabalhamos com achismo. Cada projeto é orientado por dados,
            estratégia e design que converte.
          </p>
        </motion.div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                className="group relative rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm p-8 flex flex-col gap-4 hover:border-primary/30 hover:bg-card/50 transition-all duration-400"
              >
                {/* Glow no hover */}
                <div className="absolute inset-0 rounded-2xl bg-primary/0 group-hover:bg-primary/5 transition-all duration-400" />

                <div className="relative z-10 flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="font-display text-4xl font-bold text-gradient">
                    {m.value}
                  </div>
                  <div>
                    <div className="font-display text-base font-semibold text-foreground">
                      {m.label}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {m.desc}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
