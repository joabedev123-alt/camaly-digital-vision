import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { WhatsAppIconFlat } from "./WhatsAppIcon";
import ctaVideo from "@/assets/cta-video.mp4.asset.json";
import { FloatingParticles } from "./FloatingParticles";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Título em uma linha com palavras gradativas ── */
const AnimatedTitle = ({ inView }: { inView: boolean }) => {
  const words = ["Pronto", "para", "transformar", "sua"];

  return (
    <h2
      className="font-display font-black tracking-tighter text-center"
      style={{
        fontSize:   "clamp(0.85rem, 4.5vw, 2.6rem)",
        lineHeight: 1.1,
        whiteSpace: "nowrap",
      }}
    >
      {/* Palavras normais */}
      {words.map((word, i) => (
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.55, ease, delay: 0.1 + i * 0.11 }}
          style={{ color: "hsl(0,0%,92%)", display: "inline-block", marginRight: "0.35em" }}
        >
          {word}
        </motion.span>
      ))}
      {/* “presênca digital” em gradiente */}
      <motion.span
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.7, ease, delay: 0.52 }}
        style={{
          background:           "linear-gradient(90deg, hsl(162,100%,42%), hsl(210,100%,60%), hsl(28,100%,55%))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor:  "transparent",
          backgroundClip:       "text",
          filter:               "drop-shadow(0 0 18px hsla(162,100%,42%,0.55))",
          display:              "inline-block",
          marginRight:          "0.1em",
        }}
      >
        presença digital
      </motion.span>
      <motion.span
        initial={{ opacity: 0, scale: 0.3 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, ease, delay: 0.82 }}
        style={{ color: "hsl(162,100%,55%)", display: "inline-block", fontWeight: 900 }}
      >
        ?
      </motion.span>
    </h2>
  );
};

/* ── Parágrafo com fade gradativo por trecho ── */
const AnimatedParagraph = ({ inView }: { inView: boolean }) => {
  const chunks = [
    "Se sua marca precisa de um site ",
    "à altura do que entrega, ",
    "a Camaly pode criar uma experiência digital ",
    "realmente memorável.",
  ];

  return (
    <p className="mt-7 text-lg leading-relaxed max-w-xl mx-auto text-center">
      {chunks.map((chunk, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease, delay: 0.9 + i * 0.18 }}
          style={{
            color:   i === 3 ? "hsl(162,100%,65%)" : "hsl(200,15%,60%)",
            fontWeight: i === 3 ? 700 : 400,
            display: "inline",
          }}
        >
          {chunk}
        </motion.span>
      ))}
    </p>
  );
};


export const FinalCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: false, margin: "-80px" });

  return (
    <section id="contato" ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden">
      {/* Vídeo de fundo */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={ctaVideo.url}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-background/72" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />

      <FloatingParticles count={25} />

      {/* Glow central respirando */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.35, 1], opacity: [0.25, 0.55, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, hsla(162,100%,42%,0.22) 0%, transparent 70%)",
          filter:     "blur(20px)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center max-w-3xl">

        {/* Título palavra por palavra */}
        <AnimatedTitle inView={inView} />

        {/* Parágrafo gradativo por trecho */}
        <AnimatedParagraph inView={inView} />

        {/* Botão CTA — pulsa em scale, sem anéis */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.55, ease, delay: 1.62 }}
        >
          <motion.a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="px-12 py-5 rounded-xl font-display font-bold text-xl flex items-center gap-3"
            style={{
              background: "linear-gradient(135deg, hsl(162,100%,38%), hsl(162,100%,26%))",
              color:      "#000",
              boxShadow:  "0 0 36px hsla(162,100%,42%,0.50), 0 4px 24px hsla(0,0%,0%,0.4)",
            }}
            whileHover={{ scale: 1.1 }}
          >
            <WhatsAppIconFlat size={26} />
            Fale conosco
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
