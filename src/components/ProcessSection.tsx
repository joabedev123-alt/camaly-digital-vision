import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Stethoscope, Compass, Paintbrush, Code2, Rocket, RefreshCw,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Dados dos steps ── */
const steps = [
  { Icon: Stethoscope, title: "Diagnóstico",      desc: "Entendemos seu negócio, público e objetivos.",        color: "hsl(162,100%,42%)" },
  { Icon: Compass,     title: "Estratégia",        desc: "Definimos posicionamento, estrutura e direção.",      color: "hsl(210,100%,60%)" },
  { Icon: Paintbrush,  title: "Direção visual",    desc: "Criamos a identidade visual do projeto.",             color: "hsl(28,100%,55%)"  },
  { Icon: Code2,       title: "Desenvolvimento",   desc: "Construímos com tecnologia moderna e limpa.",         color: "hsl(300,80%,65%)"  },
  { Icon: Rocket,      title: "Lançamento",        desc: "Publicamos com performance e segurança.",             color: "hsl(48,100%,55%)"  },
  { Icon: RefreshCw,   title: "Evolução contínua", desc: "Otimizamos resultados com base em dados.",            color: "hsl(162,100%,42%)" },
];

/* ─────────────────────────────────────────────────────────────────────────
   SVG full-width: viewBox 0 0 1000 180
   Ícones posicionados via % da largura, consistente com o viewBox.
   ───────────────────────────────────────────────────────────────────────── */
const VB_W   = 1000;   // viewBox width
const VB_H   = 180;    // viewBox height
const MID    = VB_H / 2;

/* Posições X dos ícones em % da largura total (0–100) */
const NODE_X_PCT = [10, 24, 38, 62, 76, 90];

/* Posições X em coords viewBox */
const NODE_X_VB  = NODE_X_PCT.map(p => (p / 100) * VB_W);

/* Progressão vertical: começa embaixo-esquerda e sobe até cima-direita */
const NODE_Y_VB = steps.map((_, i) => {
  const progress = i / (steps.length - 1);   // 0 → 1
  return (MID + 58) - progress * 116;         // MID+58 → MID-58
});

/* Gera path ECG passando pelos nós */
function buildEcgPath(): string {
  const pts: string[] = [];
  steps.forEach((_, i) => {
    const x  = NODE_X_VB[i];
    const y  = NODE_Y_VB[i];
    const nx = i < steps.length - 1 ? NODE_X_VB[i + 1] : null;
    const ny = i < steps.length - 1 ? NODE_Y_VB[i + 1] : null;

    if (i === 0) pts.push(`M ${x} ${y}`);
    else         pts.push(`L ${x} ${y}`);

    if (nx !== null && ny !== null) {
      const mx  = (x + nx) / 2;
      const dir = ny < y ? -1 : 1;
      const pk  = y + dir * -75;
      pts.push(
        `L ${mx - 16} ${y}`,
        `L ${mx - 7}  ${pk}`,
        `L ${mx + 7}  ${y + dir * 22}`,
        `L ${mx + 16} ${y}`,
      );
    }
  });
  return pts.join(" ");
}
const ECG_PATH = buildEcgPath();

/* ── Pulso SVG full-width ── */
const EcgPulse = ({ active }: { active: boolean }) => (
  <svg
    viewBox={`0 0 ${VB_W} ${VB_H}`}
    preserveAspectRatio="none"
    className="w-full"
    style={{ height: VB_H, overflow: "visible" }}
    aria-hidden
  >
    <defs>
      <linearGradient id="ecg-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="hsl(162,100%,42%)" />
        <stop offset="30%"  stopColor="hsl(210,100%,60%)" />
        <stop offset="60%"  stopColor="hsl(28,100%,55%)"  />
        <stop offset="100%" stopColor="hsl(48,100%,55%)"  />
      </linearGradient>
      <filter id="ecg-glow">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    {/* Trilha base */}
    <path
      d={ECG_PATH}
      fill="none"
      stroke="hsla(162,100%,42%,0.12)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Traço animado */}
    <motion.path
      d={ECG_PATH}
      fill="none"
      stroke="url(#ecg-grad)"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#ecg-glow)"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{
        pathLength: { duration: 6, ease: "linear" },
        opacity:    { duration: 0.3 },
      }}
    />
  </svg>
);

/* ── Nó individual ── */
const StepNode = ({
  step, index, lit,
}: {
  step: typeof steps[number];
  index: number;
  lit: boolean;
}) => {
  const { Icon } = step;
  const isTop   = index % 2 === 0;

  /* A posição Y do ícone relativa ao container.
     SVG tem height=180 e o container tem paddingTop=80 para texto acima.
     ícone fica em: paddingTop + nodeY em proporcional ao VB_H */
  const nodePct  = NODE_X_PCT[index];
  const nodeYraw = NODE_Y_VB[index];  // 0-180

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        left:      `${nodePct}%`,
        top:       `calc(80px + ${nodeYraw}px)`,   /* 80px = offset de padding do container */
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Texto: acima ou abaixo do ícone */}
      <motion.div
        initial={{ opacity: 0, y: isTop ? -16 : 16 }}
        animate={lit ? { opacity: 1, y: 0 } : { opacity: 0, y: isTop ? -16 : 16 }}
        transition={{ duration: 0.7, ease, delay: 0.2 }}
        className={`absolute text-center ${isTop ? "bottom-full pb-5" : "top-full pt-5"}`}
        style={{ width: "clamp(120px, 14vw, 200px)" }}
      >
        <p
          className="font-display font-black leading-tight"
          style={{
            color:    step.color,
            fontSize: "clamp(0.95rem, 1.4vw, 1.25rem)",
          }}
        >
          {step.title}
        </p>
        <p
          className="leading-snug mt-2 font-medium"
          style={{
            color:    step.color,
            opacity:  0.72,
            fontSize: "clamp(0.78rem, 1.1vw, 1rem)",
          }}
        >
          {step.desc}
        </p>
      </motion.div>

      {/* Anel de pulso pequeno */}
      {lit && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          initial={{ scale: 0.8, opacity: 0.9 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut", repeat: Infinity, repeatDelay: 0.8 }}
          style={{
            width:      22,
            height:     22,
            border:     `1.5px solid ${step.color}`,
            top:        "50%",
            left:       "50%",
            transform:  "translate(-50%,-50%)",
          }}
        />
      )}

      {/* Ícone */}
      <motion.div
        initial={{ scale: 0.35, opacity: 0 }}
        animate={lit
          ? { scale: 1,   opacity: 1 }
          : { scale: 0.35, opacity: 0 }
        }
        transition={{ duration: 0.7, ease }}
        className="relative z-10 rounded-2xl flex items-center justify-center"
        style={{
          width:      "clamp(64px, 6vw, 88px)",
          height:     "clamp(64px, 6vw, 88px)",
          background: `linear-gradient(135deg, ${step.color}28, ${step.color}0a)`,
          border:     `2px solid ${lit ? step.color : step.color + "33"}`,
          boxShadow:  lit ? `0 0 32px 10px ${step.color}44` : "none",
          transition: "border 0.3s, box-shadow 0.3s",
        }}
      >
        <Icon
          style={{
            color:  step.color,
            width:  "clamp(28px, 2.8vw, 40px)",
            height: "clamp(28px, 2.8vw, 40px)",
          }}
          strokeWidth={1.6}
        />

        {/* Número */}
        <span
          className="absolute -top-2 -right-2 font-display font-black rounded-full flex items-center justify-center"
          style={{
            background: step.color,
            color:      "#000",
            fontSize:   "0.6rem",
            width:      18,
            height:     18,
          }}
        >
          {index + 1}
        </span>
      </motion.div>
    </div>
  );
};

/* ── Componente principal ── */
export const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: false, margin: "-100px" });

  const [litNodes, setLitNodes] = useState<boolean[]>(Array(steps.length).fill(false));
  const [replay,   setReplay]   = useState(0);

  useEffect(() => {
    if (!inView) {
      setLitNodes(Array(steps.length).fill(false));
      return;
    }

    setReplay(r => r + 1);

    const totalMs = 6000;
    const timers  = steps.map((_, i) => {
      const frac  = i / (steps.length - 1);
      return setTimeout(() => {
        setLitNodes(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, frac * totalMs);
    });

    return () => timers.forEach(clearTimeout);
  }, [inView]);

  /* Altura do container desktop:
     80px padding topo (texto acima) + VB_H (180) + 80px fundo (texto abaixo) */
  const containerH = 80 + VB_H + 80;

  return (
    <section id="processo" ref={sectionRef} className="relative py-24 md:py-36 overflow-hidden">
      {/* Fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(200,45%,3%)] to-background" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, hsla(162,100%,42%,0.05) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 w-full px-0">
        {/* ── Cabeçalho ── */}
        <div className="px-6 md:px-12 mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="inline-block text-xs font-display uppercase tracking-[0.25em] border px-4 py-1.5 rounded-full mb-6"
            style={{
              color:       "hsl(162,100%,42%)",
              borderColor: "hsla(162,100%,42%,0.35)",
              background:  "hsla(162,100%,42%,0.08)",
              boxShadow:   "0 0 20px hsla(162,100%,42%,0.15)",
            }}
          >
            Processo
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.18 }}
            className="font-display text-3xl md:text-5xl font-black tracking-tighter"
          >
            <span
              style={{
                background:           "linear-gradient(90deg,hsl(28,100%,55%),hsl(162,100%,42%),hsl(210,100%,60%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor:  "transparent",
                backgroundClip:       "text",
                filter:               "drop-shadow(0 0 14px hsla(162,100%,42%,0.35))",
              }}
            >
              Processo simples, resultado extraordinário
            </span>
          </motion.h2>
        </div>

        {/* ── Área do ECG desktop: ocupa 100% da largura ── */}
        <div
          className="relative w-full hidden md:block"
          style={{ height: containerH }}
        >
          {/* SVG full-width posicionado no centro vertical */}
          <div
            className="absolute inset-x-0"
            style={{ top: 80 }}
          >
            <EcgPulse key={replay} active={inView} />
          </div>

          {/* Ícones com left em % */}
          {steps.map((step, i) => (
            <StepNode
              key={step.title}
              step={step}
              index={i}
              lit={litNodes[i]}
            />
          ))}
        </div>

        {/* ── Versão mobile ── */}
        <div className="md:hidden space-y-8 px-6">
          {steps.map((step, i) => {
            const { Icon } = step;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -24 }}
                animate={litNodes[i] ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease }}
                className="flex gap-5 items-start"
              >
                <div
                  className="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${step.color}18`,
                    border:     `1.5px solid ${step.color}`,
                    boxShadow:  litNodes[i] ? `0 0 20px ${step.color}55` : "none",
                  }}
                >
                  <Icon className="w-7 h-7" style={{ color: step.color }} strokeWidth={1.6} />
                </div>
                <div>
                  <h3
                    className="font-display font-black text-xl leading-tight"
                    style={{ color: step.color }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-base mt-1 leading-relaxed"
                    style={{ color: step.color, opacity: 0.68 }}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
