import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import {
  Globe2,
  Megaphone,
  ShoppingCart,
  Cpu,
  PenTool,
  TrendingUp,
  Fingerprint,
  LayoutDashboard,
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Temas de cor por card ── */
const THEMES = [
  { color: "hsl(210,100%,60%)",  bg: "hsla(210,100%,60%,0.08)",  border: "hsla(210,100%,60%,0.35)",  shadow: "0 0 35px hsla(210,100%,60%,0.22)"  },
  { color: "hsl(28,100%,55%)",   bg: "hsla(28,100%,55%,0.08)",   border: "hsla(28,100%,55%,0.35)",   shadow: "0 0 35px hsla(28,100%,55%,0.22)"   },
  { color: "hsl(162,100%,42%)",  bg: "hsla(162,100%,42%,0.08)",  border: "hsla(162,100%,42%,0.35)",  shadow: "0 0 35px hsla(162,100%,42%,0.22)"  },
  { color: "hsl(300,80%,65%)",   bg: "hsla(300,80%,65%,0.08)",   border: "hsla(300,80%,65%,0.35)",   shadow: "0 0 35px hsla(300,80%,65%,0.22)"   },
  { color: "hsl(48,100%,55%)",   bg: "hsla(48,100%,55%,0.08)",   border: "hsla(48,100%,55%,0.35)",   shadow: "0 0 35px hsla(48,100%,55%,0.22)"   },
  { color: "hsl(162,100%,42%)",  bg: "hsla(162,100%,42%,0.08)",  border: "hsla(162,100%,42%,0.35)",  shadow: "0 0 35px hsla(162,100%,42%,0.22)"  },
  { color: "hsl(0,84%,58%)",     bg: "hsla(0,84%,58%,0.08)",     border: "hsla(0,84%,58%,0.35)",     shadow: "0 0 35px hsla(0,84%,58%,0.22)"     },
  { color: "hsl(270,80%,65%)",   bg: "hsla(270,80%,65%,0.08)",   border: "hsla(270,80%,65%,0.35)",   shadow: "0 0 35px hsla(270,80%,65%,0.22)"   },
] as const;

const services = [
  {
    Icon: Globe2,
    title: "Sites institucionais",
    desc:  "Presença digital sólida com design que transmite autoridade.",
    num:   "01",
  },
  {
    Icon: Megaphone,
    title: "Landing pages",
    desc:  "Páginas de alta conversão com foco em resultado.",
    num:   "02",
  },
  {
    Icon: ShoppingCart,
    title: "E-commerces",
    desc:  "Lojas digitais premium com experiência de compra fluida.",
    num:   "03",
  },
  {
    Icon: Cpu,
    title: "Sistemas web",
    desc:  "Plataformas sob medida para gestão e operação.",
    num:   "04",
  },
  {
    Icon: PenTool,
    title: "UI/UX design",
    desc:  "Interfaces pensadas para usabilidade e impacto visual.",
    num:   "05",
  },
  {
    Icon: TrendingUp,
    title: "SEO estratégico",
    desc:  "Posicionamento orgânico com estratégia de longo prazo.",
    num:   "06",
  },
  {
    Icon: Fingerprint,
    title: "Identidade digital",
    desc:  "Construção de marca visual para o ambiente online.",
    num:   "07",
  },
  {
    Icon: LayoutDashboard,
    title: "Estruturação visual",
    desc:  "Organização e hierarquia visual para comunicar melhor.",
    num:   "08",
  },
];

/* ── Card individual ── */
const ServiceCard = ({
  service,
  theme,
  index,
}: {
  service: typeof services[number];
  theme: typeof THEMES[number];
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const { Icon } = service;

  return (
    <motion.div
      /* Recebe variants do container pai (stagger) */
      variants={{
        hidden:  { opacity: 0, scale: 0.45, y: 60 },
        visible: {
          opacity: 1,
          scale:   1,
          y:       0,
          transition: { duration: 1.1, ease },  // mais lento
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl p-6 flex flex-col gap-4 overflow-hidden cursor-default"
      style={{
        background:    theme.bg,
        border:        `1px solid ${hovered ? theme.border : "hsla(0,0%,100%,0.06)"}`,
        boxShadow:     hovered ? theme.shadow : "none",
        backdropFilter:"blur(10px)",
        transition:    "border 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Linha de topo brilhante no hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          background:      `linear-gradient(90deg, transparent, ${theme.color}, transparent)`,
          transformOrigin: "center",
        }}
      />

      {/* Glow radial no hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(ellipse at top left, ${theme.bg.replace("0.08", "0.25")} 0%, transparent 65%)`,
        }}
      />

      <div className="relative z-10 flex flex-col gap-3">
        {/* Cabeçalho: número + ícone */}
        <div className="flex items-center justify-between">
          {/* Número do serviço */}
          <span
            className="font-display text-xs font-bold tracking-widest"
            style={{ color: theme.color, opacity: 0.7 }}
          >
            {service.num}
          </span>

          {/* Ícone rotativo */}
          <motion.div
            animate={{ rotate: hovered ? 360 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{
              background: theme.bg,
              border:     `1.5px solid ${theme.border}`,
              boxShadow:  hovered ? `0 0 16px ${theme.color}55` : "none",
              transition: "box-shadow 0.3s",
            }}
          >
            <Icon
              className="w-5 h-5"
              style={{ color: theme.color }}
              strokeWidth={1.8}
            />
          </motion.div>
        </div>

        {/* Título */}
        <h3
          className="font-display text-base font-bold leading-tight"
          style={{ color: theme.color }}
        >
          {service.title}
        </h3>

        {/* Descrição */}
        <p
          className="text-sm leading-relaxed font-medium"
          style={{ color: theme.color, opacity: 0.62 }}
        >
          {service.desc}
        </p>

        {/* Linha decorativa inferior */}
        <motion.div
          className="h-[1px] rounded-full mt-1"
          animate={{ scaleX: hovered ? 1 : 0.3, opacity: hovered ? 0.7 : 0.2 }}
          transition={{ duration: 0.35 }}
          style={{
            background:      theme.color,
            transformOrigin: "left",
          }}
        />
      </div>
    </motion.div>
  );
};

/* ── Componente principal ── */
export const ServicesGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  // once: false → reseta e re-dispara toda vez que a seção entra no viewport
  const inView     = useInView(sectionRef, { once: false, margin: "-80px" });

  return (
    <section id="servicos" ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Fundo sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(205,40%,3%)] to-background" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, hsla(162,100%,42%,0.05) 0%, transparent 70%)",
          filter:     "blur(40px)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {/* ── Cabeçalho da seção ── */}
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
            className="inline-block text-xs font-display uppercase tracking-[0.25em] border px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm"
            style={{
              color:       "hsl(162,100%,42%)",
              borderColor: "hsla(162,100%,42%,0.35)",
              background:  "hsla(162,100%,42%,0.08)",
              boxShadow:   "0 0 20px hsla(162,100%,42%,0.15)",
            }}
          >
            Serviços
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.18 }}
            className="font-display text-3xl md:text-5xl font-black tracking-tighter"
          >
            <span
              style={{
                background:           "linear-gradient(90deg, hsl(28,100%,55%), hsl(162,100%,42%), hsl(210,100%,60%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor:  "transparent",
                backgroundClip:       "text",
                filter:               "drop-shadow(0 0 14px hsla(162,100%,42%,0.35))",
              }}
            >
              O que criamos
            </span>
          </motion.h2>

          {/* Divisor animado */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.32 }}
            className="mx-auto mt-5 h-[2px] w-28 rounded-full"
            style={{
              background:      "linear-gradient(90deg, hsl(28,100%,55%), hsl(162,100%,42%), hsl(210,100%,60%))",
              transformOrigin: "center",
            }}
          />
        </motion.div>

        {/* ── Grid de serviços ── */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={{
            hidden:  {},
            visible: {
              transition: {
                staggerChildren: 0.20,   // 0.20s entre cada card (mais lento)
                delayChildren:   0.18,
              },
            },
          }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}  /* re-dispara ao voltar */
        >
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              theme={THEMES[i]}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
