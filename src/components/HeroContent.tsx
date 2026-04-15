import { motion, useInView } from "framer-motion";
import { TrendingUp, Globe, Users, Award } from "lucide-react";
import { FloatingParticles } from "./FloatingParticles";
import { useRef, useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Cores únicas por card ── */
const CARD_THEMES = [
  {
    color:   "hsl(28, 100%, 55%)",   // laranja
    glow:    "hsla(28,100%,55%,0.18)",
    border:  "hsla(28,100%,55%,0.35)",
    bg:      "hsla(28,100%,55%,0.08)",
    shadow:  "0 0 40px hsla(28,100%,55%,0.25)",
  },
  {
    color:   "hsl(210, 100%, 60%)",  // azul
    glow:    "hsla(210,100%,60%,0.18)",
    border:  "hsla(210,100%,60%,0.35)",
    bg:      "hsla(210,100%,60%,0.08)",
    shadow:  "0 0 40px hsla(210,100%,60%,0.25)",
  },
  {
    color:   "hsl(162, 100%, 42%)",  // verde (primary)
    glow:    "hsla(162,100%,42%,0.18)",
    border:  "hsla(162,100%,42%,0.35)",
    bg:      "hsla(162,100%,42%,0.08)",
    shadow:  "0 0 40px hsla(162,100%,42%,0.25)",
  },
  {
    color:   "hsl(48, 100%, 55%)",   // amarelo
    glow:    "hsla(48,100%,55%,0.18)",
    border:  "hsla(48,100%,55%,0.35)",
    bg:      "hsla(48,100%,55%,0.08)",
    shadow:  "0 0 40px hsla(48,100%,55%,0.25)",
  },
] as const;

const metrics = [
  { icon: TrendingUp, value: "3x",   numEnd: 3,   suffix: "x",  label: "Mais conversão",         desc: "comparado à média do mercado" },
  { icon: Globe,      value: "120+", numEnd: 120,  suffix: "+",  label: "Projetos entregues",     desc: "para empresas de todo o Brasil" },
  { icon: Users,      value: "98%",  numEnd: 98,   suffix: "%",  label: "Satisfação dos clientes",desc: "que indicam para outros" },
  { icon: Award,      value: "100%", numEnd: 100,  suffix: "%",  label: "Atendimento estratégico",desc: "do início ao resultado" },
];

/* ── Hook: contador animado ── */
function useCounter(end: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return count;
}

/* ── Card individual ── */
const MetricCard = ({
  metric, theme, index,
}: {
  metric: typeof metrics[number];
  theme: typeof CARD_THEMES[number];
  index: number;
}) => {
  const ref      = useRef<HTMLDivElement>(null);
  const inView   = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const count    = useCounter(metric.numEnd, 1600, inView);
  const Icon     = metric.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease, delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl p-8 flex flex-col gap-4 cursor-default overflow-hidden"
      style={{
        background:    `linear-gradient(135deg, ${theme.bg} 0%, hsla(0,0%,7%,0.6) 100%)`,
        border:        `1px solid ${hovered ? theme.border : "hsla(0,0%,100%,0.07)"}`,
        boxShadow:     hovered ? theme.shadow : "none",
        backdropFilter:"blur(12px)",
        transition:    "border 0.35s, box-shadow 0.35s",
      }}
    >
      {/* Glow interno no hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          background: `radial-gradient(ellipse at top left, ${theme.glow} 0%, transparent 65%)`,
        }}
      />

      {/* Linha brilhante no topo */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          background:    `linear-gradient(90deg, transparent, ${theme.color}, transparent)`,
          transformOrigin: "center",
        }}
      />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Ícone rotativo */}
        <motion.div
          animate={{ rotate: hovered ? 360 : 0 }}
          transition={{
            duration: hovered ? 0.65 : 0,
            ease: "easeInOut",
          }}
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: theme.bg, border: `1px solid ${theme.border}` }}
        >
          <Icon
            className="w-6 h-6"
            style={{ color: theme.color }}
          />
        </motion.div>

        {/* Número com contador */}
        <div
          className="font-display text-4xl sm:text-5xl font-black leading-none"
          style={{
            color:      theme.color,
            textShadow: hovered ? `0 0 24px ${theme.color}` : "none",
            transition: "text-shadow 0.35s",
          }}
        >
          {inView ? count : 0}{metric.suffix}
        </div>

        {/* Textos */}
        <div>
          <div
            className="font-display text-base font-bold leading-tight"
            style={{ color: theme.color }}
          >
            {metric.label}
          </div>
          <div
            className="text-sm mt-1 leading-relaxed font-medium"
            style={{ color: theme.color, opacity: 0.65 }}
          >
            {metric.desc}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Componente principal ── */
export const HeroContent = () => {
  return (
    <section
      id="diferenciais-hero"
      className="relative py-24 md:py-32 overflow-hidden noise-overlay"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(200,45%,4%)] to-background" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />
      <FloatingParticles count={12} />

      <div className="relative z-10 container mx-auto px-6 md:px-16">

        {/* ── Título da seção ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-16 text-center"
        >
          {/* Badge animado */}
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="inline-block text-xs font-display uppercase tracking-[0.25em] border px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm"
            style={{
              color:        "hsl(162,100%,42%)",
              borderColor:  "hsla(162,100%,42%,0.35)",
              background:   "hsla(162,100%,42%,0.08)",
              boxShadow:    "0 0 20px hsla(162,100%,42%,0.15)",
            }}
          >
            Por que a Camaly?
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter"
          >
            <span
              style={{
                background:           "linear-gradient(90deg, hsl(28,100%,55%), hsl(300,80%,65%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor:  "transparent",
                backgroundClip:       "text",
              }}
            >
              Números que{" "}
            </span>
            <span
              style={{
                background:           "linear-gradient(90deg, hsl(28,100%,55%), hsl(162,100%,42%), hsl(210,100%,60%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor:  "transparent",
                backgroundClip:       "text",
                filter:               "drop-shadow(0 0 12px hsla(162,100%,42%,0.4))",
              }}
            >
              provam nosso resultado
            </span>
          </motion.h2>

          {/* Divisor decorativo animado */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: 0.35 }}
            className="mx-auto mt-5 mb-5 h-[2px] w-32 rounded-full"
            style={{
              background: "linear-gradient(90deg, hsl(28,100%,55%), hsl(162,100%,42%), hsl(210,100%,60%))",
              transformOrigin: "center",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.4 }}
            className="text-lg max-w-xl mx-auto leading-relaxed font-medium"
            style={{
              background:           "linear-gradient(90deg, hsl(180,80%,65%), hsl(162,100%,42%), hsl(210,100%,70%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
              backgroundClip:       "text",
            }}
          >
            Não trabalhamos com achismo. Cada projeto é orientado por dados, estratégia e design que converte.
          </motion.p>
        </motion.div>

        {/* ── Cards de métricas ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <MetricCard
              key={m.label}
              metric={m}
              theme={CARD_THEMES[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
