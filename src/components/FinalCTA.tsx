import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import ctaVideo from "@/assets/cta-video.mp4.asset.json";
import chameleonEye from "@/assets/chameleon-eye.png";
import { FloatingParticles } from "./FloatingParticles";

const ease = [0.22, 1, 0.36, 1] as const;

export const FinalCTA = () => {
  return (
    <section id="contato" className="relative py-32 md:py-44 overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={ctaVideo.url}
      />

      {/* Dark overlays */}
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />


      {/* Floating particles */}
      <FloatingParticles count={25} />

      {/* Glow accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsla(162,100%,42%,0.06)_0%,transparent_60%)]" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-foreground"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          Pronto para transformar sua{" "}
          <span className="text-gradient">presença digital</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto"
        >
          Se sua marca precisa de um site à altura do que entrega, a Camaly pode criar
          uma experiência digital realmente memorável.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 rounded-lg bg-primary text-primary-foreground font-display font-semibold text-lg glow-primary hover:scale-105 transition-transform duration-200 flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Fale conosco
          </a>
          <a
            href="#servicos"
            className="px-10 py-4 rounded-lg border border-border/50 text-foreground font-display font-semibold text-lg hover:border-primary/30 transition-all duration-300 backdrop-blur-sm"
          >
            Solicitar projeto
          </a>
        </motion.div>
      </div>
    </section>
  );
};
