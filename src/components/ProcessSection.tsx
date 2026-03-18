import { motion } from "framer-motion";
import { Stethoscope, Compass, Paintbrush, Code2, Rocket, RefreshCw } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  { icon: Stethoscope, title: "Diagnóstico", desc: "Entendemos seu negócio, público e objetivos." },
  { icon: Compass, title: "Estratégia", desc: "Definimos posicionamento, estrutura e direção." },
  { icon: Paintbrush, title: "Direção visual", desc: "Criamos a identidade visual do projeto." },
  { icon: Code2, title: "Desenvolvimento", desc: "Construímos com tecnologia moderna e limpa." },
  { icon: Rocket, title: "Lançamento", desc: "Publicamos com performance e segurança." },
  { icon: RefreshCw, title: "Evolução contínua", desc: "Otimizamos resultados com base em dados." },
];

export const ProcessSection = () => {
  return (
    <section id="processo" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-display uppercase tracking-[0.2em] text-primary mb-4">
            Processo
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tighter text-foreground">
            Processo simples, resultado extraordinário
          </h2>
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line with animated glow */}
          <motion.div
            className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: i * 0.1 }}
                className="relative flex gap-6 md:gap-8 items-start pl-2 group"
              >
                {/* Node */}
                <div className="relative z-10 shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-card border border-border/30 flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300">
                  <step.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" strokeWidth={1.5} />
                  {/* Glow dot */}
                  <motion.div
                    className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary glow-primary"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                </div>

                <div className="pt-2 md:pt-4">
                  <h3 className="font-display font-semibold text-foreground text-lg">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
