import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { WhatsAppIconFlat } from "./WhatsAppIcon";
import heroChameleon from "@/assets/hero-chameleon.png";
import logoFrente from "@/assets/Logo frente 03-Photoroom.png";
import { FloatingParticles } from "./FloatingParticles";

const ease = [0.22, 1, 0.36, 1] as const;

const INTRO_MS   = 6300;
const LOGO_MS    = 1000;  // fixação da logo (ms) — total ~2s com os fades
const CONTENT_MS = 6800;

/** Sequência de cores que passa em CADA letra do título */
const COLORS = [
  "hsl( 28, 100%, 55%)",  // 🟠 laranja
  "hsl(  0,   0%,  5%)",  // ⚫ preto
  "hsl(210, 100%, 60%)",  // 🔵 azul
  "hsl( 48, 100%, 55%)",  // 🟡 amarelo
  "hsl(  0,  84%, 58%)",  // 🔴 vermelho
  "hsl(  0,   0%, 96%)",  // ⬜ branco — estado final
] as const;
const TIMES      = [0, 0.18, 0.38, 0.58, 0.78, 1.0];

const TITLE     = "Não espere sua empresa falir para criar um site!";
const CHARS     = [...TITLE];                     // 48 chars, unicode-safe
const CHAR_DUR  = 2.8;                            // segundos por letra
const STAGGER   = 1.6 / CHARS.length;             // spread de 1.6s entre primeira e última
const SHIMMER_MS = Math.ceil((CHAR_DUR + 1.6) * 1000) + 600; // ~5000ms

/** Classes exatamente iguais para base e overlay — garantem alinhamento pixel-perfect */
const H1_CLASS =
  "font-display font-bold tracking-tighter leading-tight text-center w-full block";
const H1_STYLE = { fontSize: "clamp(1.8rem, 4.5vw, 4rem)", margin: 0 } as const;

export const HeroSection = () => {
  const [replay,      setReplay     ] = useState(0);
  const [phase,       setPhase      ] = useState<"intro" | "logo" | "content">("intro");
  const [showShimmer, setShowShimmer] = useState(false);

  const sectionRef  = useRef<HTMLElement>(null);
  const initialObs  = useRef(true);
  const wasOut      = useRef(false);
  const exitScrollY = useRef(0);

  /* ── Reinicia a sequência cada vez que replay muda ── */
  useEffect(() => {
    setPhase("intro");
    setShowShimmer(false);

    // Após intro do camaleão → mostra a logo por 2s
    const logoTimer = setTimeout(() => {
      setPhase("logo");
    }, INTRO_MS);

    // Após 2s da logo → mostra conteúdo + shimmer
    const contentTimer = setTimeout(() => {
      setPhase("content");
      setShowShimmer(true);
    }, INTRO_MS + LOGO_MS);

    const shimmerTimer = setTimeout(
      () => setShowShimmer(false),
      INTRO_MS + LOGO_MS + SHIMMER_MS,
    );

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(contentTimer);
      clearTimeout(shimmerTimer);
    };
  }, [replay]);

  /* ── IntersectionObserver: replay ao voltar ao hero ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (initialObs.current) { initialObs.current = false; return; }
        if (!entry.isIntersecting) {
          wasOut.current      = true;
          exitScrollY.current = window.scrollY;
        } else if (wasOut.current) {
          wasOut.current = false;
          if (window.scrollY < exitScrollY.current) setReplay(r => r + 1);
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fundo */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[140px] animate-pulse-glow pointer-events-none" />
      <FloatingParticles count={20} />

      {/* ══════════════════════════════════
          FASE 1 — INTRO: camaleão cresce
         ══════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key={`intro-${replay}`}
            className="absolute inset-0 z-20 bg-background flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at center, hsla(162,100%,42%,0.20) 0%, transparent 65%)",
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0"
              style={{ transformOrigin: "center center" }}
              animate={{
                scale:   [0.05, 0.05, 1,    1,    1   ],
                opacity: [0,    1,    1,    1,    0   ],
              }}
              transition={{
                duration: INTRO_MS / 1000,
                times:    [0,   0.048, 0.397, 0.873, 1],
                ease:     "easeInOut",
              }}
            >
              <img
                src={heroChameleon}
                alt="Camaleão Camaly"
                className="w-full h-full object-cover object-center"
                style={{ filter: "drop-shadow(0 0 80px hsla(162,100%,42%,0.45))" }}
              />
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-background pointer-events-none"
              animate={{ opacity: [0, 0, 0, 0.5, 1] }}
              transition={{
                duration: INTRO_MS / 1000,
                times:    [0, 0.048, 0.70, 0.92, 1],
                ease:     "easeIn",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════
          FASE 2 — LOGO CAMALY
         ══════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {phase === "logo" && (
          <motion.div
            key={`logo-${replay}`}
            className="absolute inset-0 z-20 bg-background flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <motion.img
              src={logoFrente}
              alt="Camaly Digital"
              className="w-[min(95vw,900px)] md:w-[min(85vw,1100px)] h-auto object-contain select-none"
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.06, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════
          FASE 3 — CONTEÚDO PRINCIPAL
         ══════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {phase === "content" && (
          <motion.div
            key={`content-${replay}`}
            className="relative z-10 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease }}
          >
            {/* Camaleão sutil ao fundo — oculto no mobile para não poluir */}
            <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
              <motion.img
                src={heroChameleon}
                alt=""
                aria-hidden
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[55vw] max-w-[680px] object-contain select-none"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 0.09, x: 0 }}
                transition={{ duration: 1.4, ease }}
              />
            </div>

            {/*
             * Container sem max-w fixo → texto centraliza corretamente
             * independente do tamanho do viewport
             */}
            <div className="w-full mx-auto px-4 sm:px-6 md:px-16 pt-24 pb-16 md:py-40 flex flex-col items-center text-center">

              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }}
                className="inline-block text-xs font-display uppercase tracking-[0.25em] text-primary border border-primary/30 px-4 py-1.5 rounded-full mb-10 backdrop-blur-sm"
              >
                Agência Digital Especializada
              </motion.span>

              {/* ───────────────────────────────────────
                  TÍTULO — base branca + overlay letra-a-letra
                 ─────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.25, ease }}
                className="relative mb-8 w-full"
                style={{ lineHeight: "1.15" }}
              >
                {/* ① Base estática — branca, sempre visível */}
                <h1 className={H1_CLASS + " text-foreground"} style={{ ...H1_STYLE, fontSize: "clamp(1.5rem, 6vw, 4rem)" }}>
                  {TITLE}
                </h1>

                {/* ② Overlay colorido — cada letra percorre todas as cores
                 *
                 * CORREÇÃO CRÍTICA: initial={{ color: COLORS[0] }} faz com que
                 * TODAS as letras comecem em LARANJA imediatamente (não branco).
                 * O stagger só atrasa o PROGRESSO para a próxima cor, então
                 * nunca haverá letra sem cor durante a animação.
                 */}
                <AnimatePresence>
                  {showShimmer && (
                    <motion.div
                      key={`shimmer-${replay}`}
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none"
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {/*
                       * Usamos <h1> aqui (mesmo elemento da base) para garantir
                       * que fonte, line-height e tamanho sejam byte-a-byte idênticos.
                       */}
                      <h1 className={H1_CLASS} style={{ ...H1_STYLE, fontSize: "clamp(1.5rem, 6vw, 4rem)" }}>
                        {CHARS.map((char, i) => (
                          <motion.span
                            key={`${replay}-${i}`}
                            style={{ display: "inline" }}
                            /* ↓ INICIA EM LARANJA — nenhuma letra começa branca */
                            initial={{ color: COLORS[0] }}
                            animate={{ color: COLORS as unknown as string[] }}
                            transition={{
                              duration: CHAR_DUR,
                              times: TIMES,
                              delay: i * STAGGER,   // última letra começa 1.6s depois
                              ease: "linear",
                            }}
                          >
                            {char === " " ? "\u00a0" : char}
                          </motion.span>
                        ))}
                      </h1>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Subtítulo 1 */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease }}
                className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mb-3 text-center"
              >
                Se sua empresa não aparece na internet,{" "}
                <span className="text-foreground font-semibold">ela some.</span>
              </motion.p>

              {/* Subtítulo 2 — uma linha */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.52, ease }}
                className="w-full text-center text-muted-foreground leading-relaxed mb-10 md:whitespace-nowrap"
                style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.15rem)" }}
              >
                O cliente procura no Google, não acha você… e{" "}
                <span className="text-foreground font-semibold">compra do concorrente.</span>
              </motion.p>

              {/* Bloco proposta */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.64, ease }}
                className="rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5 mb-10 max-w-lg backdrop-blur-sm"
              >
                <p className="text-base sm:text-lg text-foreground/90 leading-relaxed text-center">
                  A <span className="text-primary font-bold">Camaly</span>{" "}
                  corta esse prejuízo: criamos seu site, colocamos sua empresa
                  na frente e fazemos{" "}
                  <span className="text-foreground font-semibold">
                    clientes chegarem até você.
                  </span>
                </p>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.76, ease }}
              >
                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-primary text-primary-foreground font-display font-bold text-lg glow-primary hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  <WhatsAppIconFlat size={26} className="text-primary-foreground" />
                  Falar no WhatsApp
                </a>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
            >
              <span className="text-xs font-display uppercase tracking-[0.2em] text-muted-foreground">
                Scroll
              </span>
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
