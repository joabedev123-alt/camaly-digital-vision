import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { WhatsAppIconFlat } from "./WhatsAppIcon";
import { HeroBackground } from "./HeroBackground";

const ease = [0.22, 1, 0.36, 1] as const;

const INTRO_MS   = 6300;
const LOGO_MS    = 1000;  // fixação da logo (ms) — total ~2s com os fades
const CONTENT_MS = 6800;

/** Sequência de cores que passa em CADA letra do título — reduzida para 3 cores */
const COLORS = [
  "hsl( 28, 100%, 55%)",  // 🟠 laranja
  "hsl(210, 100%, 60%)",  // 🔵 azul
  "hsl(  0,   0%, 96%)",  // ⬜ branco — estado final
] as const;
const TIMES      = [0, 0.5, 1.0];

const TITLE     = "Não espere sua empresa falir para criar um site!";
const CHARS     = [...TITLE];                     // 48 chars, unicode-safe
const CHAR_DUR  = 6.5;                            // segundos por letra (bem mais lento)
const STAGGER   = 3.5 / CHARS.length;             // spread de 3.5s entre primeira e última
const SHIMMER_MS = Math.ceil((CHAR_DUR + 3.5) * 1000) + 1000; // ~11000ms

/** Classes exatamente iguais para base e overlay — garantem alinhamento pixel-perfect */
const H1_CLASS =
  "font-display font-bold tracking-tighter leading-tight text-center w-full block";
const H1_STYLE = { fontSize: "clamp(1.7rem, 9vw, 4rem)", margin: 0 } as const;

export const HeroSection = () => {
  const [replay,      setReplay     ] = useState(0);
  const [phase,       setPhase      ] = useState<"intro" | "logo" | "content">("content");
  const [showShimmer, setShowShimmer] = useState(true);

  const sectionRef  = useRef<HTMLElement>(null);
  const initialObs  = useRef(true);
  const wasOut      = useRef(false);
  const exitScrollY = useRef(0);

  /* ── Reinicia a sequência cada vez que replay muda ── */
  useEffect(() => {
    setPhase("content");
    setShowShimmer(true);

    const shimmerTimer = setTimeout(
      () => setShowShimmer(false),
      SHIMMER_MS,
    );

    return () => {
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
      {/* Novo Fundo Dinâmico com Meteoros e Globo */}
      <HeroBackground />


      {/* O conteúdo agora inicia diretamente com o novo fundo */}

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

            {/*
             * Container sem max-w fixo → texto centraliza corretamente
             * independente do tamanho do viewport
             */}
            <div className="w-full mx-auto px-4 sm:px-6 md:px-16 pt-32 pb-16 md:py-40 flex flex-col items-center text-center">

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
                <h1 className={H1_CLASS + " text-foreground"} style={{ ...H1_STYLE, fontSize: "clamp(1.7rem, 9vw, 4.2rem)" }}>
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
                      <h1 className={H1_CLASS} style={{ ...H1_STYLE, fontSize: "clamp(1.7rem, 9vw, 4.2rem)" }}>
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
