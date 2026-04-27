import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sparkles, Target, Zap, Crown, Users, Wrench } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const INTERVAL_MS = 1000; // 1s entre cada card

const THEMES = [
  { color: "hsl(162,100%,42%)", bg: "hsla(162,100%,42%,0.08)", border: "hsla(162,100%,42%,0.30)", shadow: "0 0 60px 10px hsla(162,100%,42%,0.30)" },
  { color: "hsl(210,100%,60%)", bg: "hsla(210,100%,60%,0.08)", border: "hsla(210,100%,60%,0.30)", shadow: "0 0 60px 10px hsla(210,100%,60%,0.30)" },
  { color: "hsl(28,100%,55%)",  bg: "hsla(28,100%,55%,0.08)",  border: "hsla(28,100%,55%,0.30)",  shadow: "0 0 60px 10px hsla(28,100%,55%,0.30)"  },
  { color: "hsl(300,80%,65%)",  bg: "hsla(300,80%,65%,0.08)",  border: "hsla(300,80%,65%,0.30)",  shadow: "0 0 60px 10px hsla(300,80%,65%,0.30)"  },
  { color: "hsl(48,100%,55%)",  bg: "hsla(48,100%,55%,0.08)",  border: "hsla(48,100%,55%,0.30)",  shadow: "0 0 60px 10px hsla(48,100%,55%,0.30)"  },
  { color: "hsl(0,84%,60%)",    bg: "hsla(0,84%,60%,0.08)",    border: "hsla(0,84%,60%,0.30)",    shadow: "0 0 60px 10px hsla(0,84%,60%,0.30)"    },
] as const;

const items = [
  { Icon: Sparkles, title: "Design autoral e memorável",         desc: "Cada projeto é único — sem templates genéricos."           },
  { Icon: Target,   title: "Estrutura com foco em conversão",    desc: "Páginas pensadas para gerar resultado comercial."          },
  { Icon: Zap,      title: "Tecnologia atual e performance",     desc: "Stack moderna, carregamento rápido, código limpo."         },
  { Icon: Crown,    title: "Visual premium com identidade forte",desc: "Estética de alto nível que posiciona sua marca."           },
  { Icon: Users,    title: "Atendimento estratégico",            desc: "Parceria real, não apenas execução."                       },
  { Icon: Wrench,   title: "Projetos personalizados",            desc: "Cada solução sob medida para seu negócio."                 },
];

/* ── Variantes de explosão → assentamento ── */
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.01,
  },
  explode: {
    opacity: 1,
    scale: 1.25,
    transition: { duration: 0.22, ease: "easeOut" },
  },
  settle: (color: string) => ({
    opacity: 1,
    scale: 1,
    boxShadow: `0 0 0px 0px ${color}00`,
    transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }, // spring-like
  }),
};

/* ── Card individual com efeito de explosão ── */
const DifferentialCard = ({
  item,
  theme,
  index,
  visible,
}: {
  item: typeof items[number];
  theme: typeof THEMES[number];
  index: number;
  visible: boolean;
}) => {
  const { Icon } = item;
  const [phase, setPhase] = useState<"hidden" | "explode" | "settle">("hidden");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!visible) { setPhase("hidden"); return; }

    // Explode primeiro, depois assenta
    setPhase("explode");
    const t = setTimeout(() => setPhase("settle"), 220);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence mode="wait">
      {phase !== "hidden" && (
        <motion.div
          key={`card-${index}-${visible}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          initial="hidden"
          animate={phase}
          custom={theme.color}
          variants={cardVariants}
          className="relative rounded-3xl flex gap-6 overflow-hidden cursor-default"
          style={{
            padding:       window.innerWidth < 768 ? "1.25rem" : "2rem 2.25rem",
            background:    theme.bg,
            border:        `1.5px solid ${hovered ? theme.border : theme.border.replace("0.30", "0.12")}`,
            boxShadow:     hovered ? theme.shadow : "none",
            backdropFilter:"blur(12px)",
            transition:    "border 0.3s, box-shadow 0.3s",
          }}
        >
          {/* Flash de explosão — pisca no momento do explode */}
          {phase === "explode" && (
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none z-20"
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ background: theme.color }}
            />
          )}

          {/* Glow de fundo no hover */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            style={{
              background: `radial-gradient(ellipse at top left, ${theme.bg.replace("0.08", "0.22")} 0%, transparent 65%)`,
            }}
          />

          {/* Linha de topo brilhante no hover */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-3xl"
            animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            style={{
              background:      `linear-gradient(90deg, transparent, ${theme.color}, transparent)`,
              transformOrigin: "center",
            }}
          />

          <div className="relative z-10 flex flex-col sm:flex-row gap-5 sm:gap-6 items-center sm:items-start w-full text-center sm:text-left">
            {/* Ícone grande */}
            <motion.div
              animate={{ rotate: hovered ? 360 : 0 }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
              className="shrink-0 rounded-2xl flex items-center justify-center"
              style={{
                width:      window.innerWidth < 768 ? 64 : 72,
                height:     window.innerWidth < 768 ? 64 : 72,
                background: theme.bg,
                border:     `2px solid ${theme.border}`,
                boxShadow:  hovered ? `0 0 20px 4px ${theme.color}55` : "none",
                transition: "box-shadow 0.3s",
              }}
            >
              <Icon
                style={{ width: window.innerWidth < 768 ? 28 : 34, height: window.innerWidth < 768 ? 28 : 34, color: theme.color }}
                strokeWidth={1.6}
              />
            </motion.div>
[diff_block_end]
            {/* Textos */}
            <div className="flex flex-col gap-2 pt-1">
              <h3
                className="font-display font-black text-2xl leading-tight"
                style={{ color: theme.color }}
              >
                {item.title}
              </h3>
              <p
                className="text-lg leading-relaxed font-medium"
                style={{ color: theme.color, opacity: 0.68 }}
              >
                {item.desc}
              </p>
            </div>
          </div>
        </motion.div>
      )}
      {phase === "hidden" && (
        /* Placeholder invisível para manter espaço no grid */
        <div key={`placeholder-${index}`} style={{ height: 0, overflow: "hidden" }} />
      )}
    </AnimatePresence>
  );
};

/* ── Componente principal ── */
export const Differentials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: false, margin: "-80px" });

  const [visible, setVisible] = useState<boolean[]>(Array(items.length).fill(false));

  useEffect(() => {
    if (!inView) {
      setVisible(Array(items.length).fill(false));
      return;
    }

    const timers = items.map((_, i) =>
      setTimeout(() => {
        setVisible(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * INTERVAL_MS)
    );

    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section id="diferenciais" ref={sectionRef} className="relative py-24 md:py-36 overflow-hidden">
      {/* Fundo */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(205,40%,3%)] to-background" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, hsla(162,100%,42%,0.05) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {/* ── Cabeçalho ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-16"
        >
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
            Diferenciais
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
              Por que a Camaly entrega diferente
            </span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="mx-auto mt-5 h-[2px] w-32 rounded-full"
            style={{
              background:      "linear-gradient(90deg,hsl(28,100%,55%),hsl(162,100%,42%),hsl(210,100%,60%))",
              transformOrigin: "center",
            }}
          />
        </motion.div>

        {/* ── Grid de cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <DifferentialCard
              key={item.title}
              item={item}
              theme={THEMES[i]}
              index={i}
              visible={visible[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
