import { motion } from "framer-motion";
import { Sparkles, Target, Zap, Crown, Users, Wrench } from "lucide-react";
import { FloatingParticles } from "./FloatingParticles";

const ease = [0.22, 1, 0.36, 1] as const;

const items = [
  { icon: Sparkles, title: "Design autoral e memorável", desc: "Cada projeto é único — sem templates genéricos." },
  { icon: Target, title: "Estrutura com foco em conversão", desc: "Páginas pensadas para gerar resultado comercial." },
  { icon: Zap, title: "Tecnologia atual e performance", desc: "Stack moderna, carregamento rápido, código limpo." },
  { icon: Crown, title: "Visual premium com identidade forte", desc: "Estética de alto nível que posiciona sua marca." },
  { icon: Users, title: "Atendimento estratégico", desc: "Parceria real, não apenas execução." },
  { icon: Wrench, title: "Projetos personalizados", desc: "Cada solução sob medida para seu negócio." },
];

export const Differentials = () => {
  return (
    <section id="diferenciais" className="relative py-24 md:py-32">
      <FloatingParticles count={10} />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-display uppercase tracking-[0.2em] text-primary mb-4">
            Diferenciais
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tighter text-foreground">
            Por que a Camaly entrega diferente
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              whileHover={{ scale: 1.02, borderColor: "hsla(162, 100%, 42%, 0.3)" }}
              className="flex gap-4 p-6 rounded-2xl bg-card/30 border border-border/20 transition-all duration-500 group"
            >
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <item.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
