import { motion } from "framer-motion";
import chameleonSilhouette from "@/assets/chameleon-silhouette.png";

const ease = [0.22, 1, 0.36, 1] as const;

export const AboutSection = () => {
  return (
    <section id="sobre" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle chameleon silhouette */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] w-[600px]">
        <img src={chameleonSilhouette} alt="" className="w-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="inline-block text-xs font-display uppercase tracking-[0.2em] text-primary mb-4"
          >
            Sobre
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-semibold tracking-tighter text-foreground"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            A Camaly nasceu para transformar presença digital em{" "}
            <span className="text-gradient">percepção de valor</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="mt-8 text-lg text-muted-foreground leading-relaxed"
          >
            A Camaly Digital une estratégia, design e tecnologia para desenvolver projetos que
            elevam marcas, organizam a comunicação e posicionam empresas com mais força no
            ambiente online.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
