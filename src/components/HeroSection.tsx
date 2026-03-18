import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import { FloatingParticles } from "./FloatingParticles";

const ease = [0.22, 1, 0.36, 1] as const;

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showBrand, setShowBrand] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setShowBrand(true);
      setTimeout(() => {
        setShowBrand(false);
        video.play();
      }, 2500);
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video background — no loop, controlled manually */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideo.url}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-background/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />

      <FloatingParticles count={20} />

      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />

      {/* Brand flash between loops */}
      <AnimatePresence>
        {showBrand && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center bg-background/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -10 }}
              transition={{ duration: 0.7, ease }}
              className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-gradient"
            >
              CAMALY <span className="text-foreground">DIGITAL</span>
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

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
