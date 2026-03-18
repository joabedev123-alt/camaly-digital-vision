import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import heroChameleon3d from "@/assets/hero-chameleon-3d.png";
import { FloatingParticles } from "./FloatingParticles";

const ease = [0.22, 1, 0.36, 1] as const;

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showBrand, setShowBrand] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden" style={{ perspective: "1200px" }}>
      {/* Video background */}
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

      {/* Glow orbs for 3D depth */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/8 blur-[100px] animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />

      {/* 3D Chameleon with parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 150 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.8, ease, delay: 0.5 }}
        className="absolute right-[-3%] bottom-[5%] w-[55%] max-w-[900px] z-[5] hidden md:block"
        style={{
          transformStyle: "preserve-3d",
          transform: `
            rotateY(${mousePos.x * -8}deg)
            rotateX(${mousePos.y * 5}deg)
            translateX(${mousePos.x * -15}px)
            translateY(${mousePos.y * -10}px)
          `,
          transition: "transform 0.15s ease-out",
        }}
      >
        <img
          src={heroChameleon3d}
          alt="Camaleão digital 3D"
          className="w-full h-auto object-contain"
          style={{
            filter: "drop-shadow(0 0 60px hsla(162, 100%, 42%, 0.35)) drop-shadow(0 20px 40px hsla(0, 0%, 0%, 0.5))",
          }}
        />
        {/* Reflection / ground glow */}
        <div
          className="absolute bottom-[-10%] left-[10%] right-[10%] h-[30%] rounded-full blur-[40px]"
          style={{
            background: "radial-gradient(ellipse, hsla(162, 100%, 42%, 0.15), transparent 70%)",
          }}
        />
      </motion.div>

      {/* Mobile chameleon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease, delay: 0.5 }}
        className="absolute bottom-[8%] right-[-5%] w-[75%] z-[5] md:hidden"
      >
        <img
          src={heroChameleon3d}
          alt="Camaleão digital 3D"
          className="w-full h-auto object-contain"
          style={{
            filter: "drop-shadow(0 0 30px hsla(162, 100%, 42%, 0.25)) drop-shadow(0 10px 20px hsla(0, 0%, 0%, 0.4))",
          }}
        />
      </motion.div>

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
