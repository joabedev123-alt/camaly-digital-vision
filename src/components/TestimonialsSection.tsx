import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    name: "Rafael Mendes",
    role: "CEO, TechForward",
    text: "A Camaly transformou nossa presença digital por completo. O resultado superou todas as expectativas — design premium e performance impecável.",
    stars: 5,
  },
  {
    name: "Juliana Alves",
    role: "Diretora, Studio Belle",
    text: "Profissionalismo e criatividade em outro nível. O site que criaram para nós transmite exatamente a sofisticação que nossa marca precisa.",
    stars: 5,
  },
  {
    name: "Carlos Eduardo",
    role: "Fundador, NovaTech",
    text: "Desde o diagnóstico até o lançamento, a experiência com a Camaly foi impecável. Nosso site agora converte 3x mais leads.",
    stars: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-display uppercase tracking-[0.2em] text-primary mb-4">
            Depoimentos
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tighter text-foreground">
            O que nossos clientes dizem
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-card/50 border border-border/20"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div>
                <div className="font-display font-semibold text-foreground text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
