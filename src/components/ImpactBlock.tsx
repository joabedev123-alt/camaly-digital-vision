import { motion } from "framer-motion";
import digitalPlanet from "@/assets/digital-planet.png";
import chameleonSilhouette from "@/assets/chameleon-silhouette.png";
import { FloatingParticles } from "./FloatingParticles";

const ease = [0.22, 1, 0.36, 1] as const;

export const ImpactBlock = () => {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      {/* Background planet with subtle animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.img
          src={digitalPlanet}
          alt=""
          className="w-[500px] h-[500px] object-contain opacity-20"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Chameleon silhouette */}
      <motion.div
        className="absolute bottom-10 right-10 opacity-[0.04]"
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={chameleonSilhouette} alt="" className="w-40 h-auto" />
      </motion.div>

      {/* Particles */}
      <FloatingParticles count={15} />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsla(162,100%,42%,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center max-w-4xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="inline-block text-xs font-display uppercase tracking-[0.2em] text-primary mb-6"
        >
          Manifesto
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-foreground"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          Experiências digitais de{" "}
          <span className="text-gradient">alto impacto</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        >
          A Camaly desenvolve projetos digitais que unem identidade visual forte,
          tecnologia atual e posicionamento estratégico para marcas que querem sair do comum.
        </motion.p>
      </div>
    </section>
  );
};
