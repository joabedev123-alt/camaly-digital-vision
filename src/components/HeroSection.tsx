import { motion } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import { FloatingParticles } from "./FloatingParticles";

const ease = [0.22, 1, 0.36, 1] as const;

export const HeroSection = () => {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideo.url}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-background/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />

      {/* Particles */}
      <FloatingParticles count={20} />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs font-display uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};
