import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import chameleonSilhouette from "@/assets/chameleon-silhouette.png";

const ease = [0.22, 1, 0.36, 1] as const;

const team = [
  { initial: "J", name: "Jonatan Drumond", role: "CEO", color: "hsl(162,100%,42%)" },
  { initial: "J", name: "Joabe Ávila",     role: "CPO", color: "hsl(28,100%,55%)"  },
  { initial: "I", name: "Igor Martins",    role: "CIO", color: "hsl(210,100%,60%)" },
];


/* ──────────────────────────────────────────────────────
   Diagrama triangular com órbita rotativa em pirâmide
   ────────────────────────────────────────────────────── */

// Centros finais (px) dentro de um container 380×440
const PJ = { x: 190, y: 88  };   // Jonatan — topo centro
const PA = { x: 78,  y: 340 };   // Joabe   — inferior esquerdo
const PI = { x: 302, y: 340 };   // Igor    — inferior direito

const SJ = 148;  // diâmetro do avatar Jonatan
const SM = 130;  // diâmetro dos avatares Joabe e Igor

/* 5 voltas × 3 posições = 15 keyframes por eixo */
const lap5 = (a: number, b: number, c: number) =>
  Array.from({ length: 5 }).flatMap(() => [a, b, c]);

const TIMES_15 = Array.from({ length: 15 }, (_, i) => i / 14);

const MEMBERS = [
  {
    id: "jonatan", label: "Jonatan Drumond", ini: "J", role: "CEO",
    color: "hsl(162,100%,42%)",
    size:  SJ,
    fLeft: PJ.x - SJ / 2,
    fTop:  PJ.y - SJ / 2,
    // Horário: Igor → Joabe → Casa (x5)
    xK: lap5(PI.x - PJ.x, PA.x - PJ.x, 0),
    yK: lap5(PI.y - PJ.y, PA.y - PJ.y, 0),
  },
  {
    id: "joabe", label: "Joabe Ávila", ini: "J", role: "CPO",
    color: "hsl(28,100%,55%)",
    size:  SM,
    fLeft: PA.x - SM / 2,
    fTop:  PA.y - SM / 2,
    // Horário: Jonatan → Igor → Casa (x5)
    xK: lap5(PJ.x - PA.x, PI.x - PA.x, 0),
    yK: lap5(PJ.y - PA.y, PI.y - PA.y, 0),
  },
  {
    id: "igor", label: "Igor Martins", ini: "I", role: "CIO",
    color: "hsl(210,100%,60%)",
    size:  SM,
    fLeft: PI.x - SM / 2,
    fTop:  PI.y - SM / 2,
    // Horário: Joabe → Jonatan → Casa (x5)
    xK: lap5(PA.x - PI.x, PJ.x - PI.x, 0),
    yK: lap5(PA.y - PI.y, PJ.y - PI.y, 0),
  },
];

const TeamDiagram = ({ inView }: { inView: boolean }) => {
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    if (inView) setReplay(r => r + 1);
  }, [inView]);

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 400) {
        setScale(width / 410); // margem de segurança
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center items-center w-full overflow-hidden py-4">
      <div
        className="relative origin-center transition-transform duration-300"
        style={{ 
          width: 380, 
          height: 440,
          transform: `scale(${scale})`
        }}
      >
      {/* ── Linhas SVG — aparecem após o pouso ── */}
      <svg
        className="absolute inset-0"
        width={380} height={440}
        aria-hidden
      >
        <motion.line
          x1={PJ.x} y1={PJ.y} x2={PA.x} y2={PA.y}
          stroke="hsla(162,100%,42%,0.4)" strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease, delay: 2.2 }}
          strokeDasharray="1"
        />
        <motion.line
          x1={PJ.x} y1={PJ.y} x2={PI.x} y2={PI.y}
          stroke="hsla(210,100%,60%,0.4)" strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease, delay: 2.4 }}
          strokeDasharray="1"
        />
      </svg>

      {/* ── Avatares com órbita triangular ── */}
      {MEMBERS.map((m) => (
        <motion.div
          key={`${m.id}-${replay}`}
          className="absolute flex flex-col items-center"
          style={{ left: m.fLeft, top: m.fTop }}
          initial={{ x: m.xK[0], y: m.yK[0], opacity: 0, scale: 0.75 }}
          animate={inView
            ? {
                x:       m.xK,
                y:       m.yK,
                // opacidade aparece rápido no início, permanece 1
                opacity: [0, 1, ...Array(13).fill(1)],
                scale:   [0.75, 0.9, ...Array(12).fill(0.92), 0.96, 1],
              }
            : { x: m.xK[0], y: m.yK[0], opacity: 0, scale: 0.75 }
          }
          transition={{
            duration: 1.8,          // 5 voltas em 1.8s ≈ 0.36s por volta
            ease:     "easeInOut",
            times:    TIMES_15,
            delay:    0.15,
          }}
        >
          {/* Círculo do avatar */}
          <div
            className="rounded-full flex items-center justify-center font-display font-black relative overflow-hidden border-4"
            style={{
              width:       m.size,
              height:      m.size,
              fontSize:    m.size > 140 ? "2rem" : "1.75rem",
              background:  `linear-gradient(135deg, ${m.color}33, ${m.color}0a)`,
              borderColor: `${m.color}66`,
              color:        m.color,
              boxShadow:   `0 0 40px ${m.color}33, inset 0 1px 0 hsla(255,100%,100%,0.1)`,
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full"
              style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)" }}
            />
            <span className="relative z-10">{m.ini}</span>
          </div>

          {/* Label */}
          <div className="mt-3 text-center">
            <p className="font-display font-bold text-base" style={{ color: m.color }}>
              {m.label}
            </p>
            <p className="text-sm" style={{ color: m.color, opacity: 0.62 }}>{m.role}</p>
          </div>
        </motion.div>
      ))}
      </div>
    </div>
  );
};

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: false, margin: "-80px" });

  return (
    <section id="sobre" ref={sectionRef} className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(205,40%,3%)] to-background" />

      {/* Silhueta decorativa */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] w-[480px] pointer-events-none"
        initial={{ x: 60, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 0.03 } : {}}
        transition={{ duration: 1.4, ease }}
      >
        <img src={chameleonSilhouette} alt="" className="w-full" />
      </motion.div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 25% 50%, hsla(162,100%,42%,0.06) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ══════════════════════════════
              COLUNA ESQUERDA
             ══════════════════════════════ */}
          <div className="flex flex-col">
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.1 }}
              className="inline-block self-start text-xs font-display uppercase tracking-[0.25em] border px-4 py-1.5 rounded-full mb-8"
              style={{
                color:       "hsl(162,100%,42%)",
                borderColor: "hsla(162,100%,42%,0.35)",
                background:  "hsla(162,100%,42%,0.08)",
                boxShadow:   "0 0 20px hsla(162,100%,42%,0.15)",
              }}
            >
              Quem Somos
            </motion.span>

            {/* Título */}
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.85, ease, delay: 0.18 }}
              className="font-display font-black tracking-tighter leading-tight mb-8"
              style={{ fontSize: "clamp(1.9rem, 3.5vw, 3rem)" }}
            >
              <span style={{
                background: "linear-gradient(90deg, hsl(28,100%,55%), hsl(300,80%,65%))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                display: "block",
              }}>
                A Camaly nasceu da
              </span>
              <span style={{
                background: "linear-gradient(90deg, hsl(162,100%,42%), hsl(210,100%,60%), hsl(48,100%,55%))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: "drop-shadow(0 0 18px hsla(162,100%,42%,0.4))",
                display: "block",
              }}>
                paixão por transformar
              </span>
            </motion.h2>

            {/* Divisor */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              className="h-[2px] w-20 rounded-full mb-7"
              style={{ background: "linear-gradient(90deg, hsl(162,100%,42%), hsl(210,100%,60%))", transformOrigin: "left" }}
            />

            {/* Parágrafo 1 */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.38 }}
              className="text-base md:text-lg leading-relaxed mb-5 font-medium"
              style={{ color: "hsl(200,30%,72%)" }}
            >
              Somos uma agência digital formada por três amigos especialistas em
              desenvolvimento web, design e marketing digital. Nosso nome e filosofia são
              inspirados no camaleão — um animal que representa adaptação, criatividade e evolução.
            </motion.p>

            {/* Parágrafo 2 */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.46 }}
              className="text-sm md:text-base leading-relaxed mb-10"
              style={{ color: "hsl(200,15%,58%)" }}
            >
              Assim como o camaleão muda de cor para se adaptar ao ambiente, a{" "}
              <span style={{ color: "hsl(162,100%,55%)", fontWeight: 700 }}>Camaly</span>{" "}
              personaliza cada solução digital para se encaixar às necessidades do seu negócio.
              Nossa missão é transformar presença digital em{" "}
              <span style={{ color: "hsl(28,100%,60%)", fontWeight: 700 }}>resultados reais.</span>
            </motion.p>

            {/* ── Nosso time — compacto em linha ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.55 }}
            >
              <p
                className="text-[10px] font-display uppercase tracking-[0.2em] mb-3 font-bold"
                style={{ color: "hsl(162,100%,42%)", opacity: 0.65 }}
              >
                Nosso time de especialistas
              </p>

              <div className="flex items-center gap-4">
                {team.map((m, i) => (
                  <motion.div
                    key={m.name}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, ease, delay: 0.6 + i * 0.12 }}
                    title={`${m.name} — ${m.role}`}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-sm border-2 relative overflow-hidden flex-shrink-0"
                      style={{
                        background:  `linear-gradient(135deg, ${m.color}33, ${m.color}0a)`,
                        borderColor: `${m.color}66`,
                        color:       m.color,
                        boxShadow:   `0 0 12px ${m.color}44`,
                      }}
                    >
                      {m.initial}
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-none" style={{ color: m.color }}>{m.name}</p>
                      <p className="text-[10px] leading-none mt-0.5" style={{ color: m.color, opacity: 0.6 }}>{m.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ══════════════════════════════
              COLUNA DIREITA — Diagrama triangular
             ══════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
          >
            <TeamDiagram inView={inView} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
