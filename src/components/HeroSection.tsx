import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import heroChameleon from "@/assets/hero-chameleon.png";
import { FloatingParticles } from "./FloatingParticles";

const ease = [0.22, 1, 0.36, 1] as const;

// Fases da intro:
// "intro"   → camaleão cresce do nada e explode para fora
// "content" → conteúdo principal aparece

export const HeroSection = () => {
  const [phase, setPhase] = useState<"intro" | "content">("intro");

  useEffect(() => {
    // Após 3.2s o camaleão some e o conteúdo aparece
    const timer = setTimeout(() => setPhase("content"), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Fundo permanente ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(200,45%,4%)] to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[140px] animate-pulse-glow pointer-events-none" />
      <FloatingParticles count={20} />

      {/* ── FASE 1: INTRO — camaleão cresce e some ── */}
      <AnimatePresence>
        {phase === "intro" && (
          <motion.div
            key="chameleon-intro"
            className="absolute inset-0 flex items-center justify-center z-20 bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            {/* Glow pulsante atrás da imagem */}
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Camaleão: cresce de pequeno → gigante → some */}
            <motion.img
              src={heroChameleon}
              alt="Camaleão Camaly"
              className="relative z-10 w-[80vw] max-w-[700px] object-contain drop-shadow-[0_0_60px_hsl(var(--primary)/0.5)]"
              initial={{ scale: 0.15, opacity: 0 }}
              animate={{
                scale:  [0.15, 0.15, 1.0,  1.6],
                opacity:[0,    1,    1,    0],
              }}
              transition={{
                duration: 3.0,
                times:    [0,   0.1,  0.65, 1],
                ease:     "easeInOut",
              }}
            />

            {/* Partículas de luz ao redor do camaleão */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, delay: 0.3 }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary"
                  style={{
                    top:  `${30 + Math.sin((i / 8) * Math.PI * 2) * 25}%`,
                    left: `${50 + Math.cos((i / 8) * Math.PI * 2) * 30}%`,
                  }}
                  animate={{
                    scale:   [0, 1.5, 0],
                    opacity: [0, 1,   0],
                  }}
                  transition={{
                    duration: 1.8,
                    delay:    0.4 + i * 0.1,
                    ease:     "easeOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FASE 2: CONTEÚDO PRINCIPAL ── */}
      <AnimatePresence>
        {phase === "content" && (
          <motion.div
            key="hero-content"
            className="relative z-10 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease }}
          >
            {/* Imagem de fundo sutil */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.img
                src={heroChameleon}
                alt=""
                aria-hidden
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[55vw] max-w-[700px] object-contain opacity-10 blur-[2px] select-none"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 0.10, x: 0 }}
                transition={{ duration: 1.2, ease }}
              />
            </div>

            <div className="container mx-auto px-6 md:px-16 py-32 md:py-40 flex flex-col items-start max-w-4xl">

              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
                className="inline-block text-xs font-display uppercase tracking-[0.25em] text-primary border border-primary/30 px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm"
              >
                Agência Digital Especializada
              </motion.span>

              {/* Headline principal */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease }}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] text-foreground mb-6"
              >
                Não espere sua empresa{" "}
                <span className="text-gradient">falir</span>{" "}
                <br className="hidden sm:block" />
                para criar um site!
              </motion.h1>

              {/* Subtítulo de impacto */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease }}
                className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mb-3"
              >
                Se sua empresa não aparece na internet,{" "}
                <span className="text-foreground font-semibold">ela some.</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease }}
                className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10"
              >
                O cliente procura no Google, não acha você… e{" "}
                <span className="text-foreground font-semibold">compra do concorrente.</span>
              </motion.p>

              {/* Divisor com proposta */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease }}
                className="border-l-2 border-primary pl-5 mb-10 max-w-lg"
              >
                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                  A <span className="text-primary font-bold">Camaly</span> corta esse prejuízo:{" "}
                  criamos seu site, colocamos sua empresa na frente e fazemos{" "}
                  <span className="text-foreground font-semibold">clientes chegarem até você.</span>
                </p>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65, ease }}
              >
                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-primary text-primary-foreground font-display font-bold text-lg glow-primary hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  <MessageCircle className="w-6 h-6" />
                  Falar no WhatsApp
                </a>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <span className="text-xs font-display uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
              <motion.div
                className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent"
                animate={{ scaleY: [1, 0.5, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
