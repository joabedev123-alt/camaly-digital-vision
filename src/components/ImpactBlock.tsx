import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/* ══════════════════════════════════════════════════
   Campo de estrelas animado
   ══════════════════════════════════════════════════ */
const STAR_COLORS = [
  "hsl(0,0%,100%)",
  "hsl(162,100%,80%)",
  "hsl(210,100%,85%)",
  "hsl(48,100%,85%)",
  "hsl(300,80%,90%)",
  "hsl(28,100%,80%)",
];

const StarField = () => {
  /* Gera estrelas uma vez com posições estáveis */
  const stars = useMemo(() => {
    const rng = (seed: number) => {
      let s = seed;
      return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
    };
    const rand = rng(42);
    return Array.from({ length: 160 }, (_, i) => ({
      id:       i,
      x:        rand() * 100,           // % da largura
      y:        rand() * 100,           // % da altura
      size:     0.5 + rand() * 2.5,     // 0.5px – 3px
      color:    STAR_COLORS[Math.floor(rand() * STAR_COLORS.length)],
      opacity:  0.25 + rand() * 0.75,
      twinkle:  2.2 + rand() * 5,       // duração do piscar (s)
      delay:    rand() * 6,             // delay inicial
      driftX:   (rand() - 0.5) * 18,   // deslocamento X em px
      driftY:   (rand() - 0.5) * 18,   // deslocamento Y em px
      driftDur: 10 + rand() * 20,      // duração da deriva (s)
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full"
          style={{
            left:      `${s.x}%`,
            top:       `${s.y}%`,
            width:     s.size,
            height:    s.size,
            background: s.color,
            boxShadow: `0 0 ${s.size * 2}px ${s.size}px ${s.color}`,
          }}
          animate={{
            opacity:    [0, s.opacity, s.opacity * 0.2, s.opacity, 0],
            scale:      [0.6, 1.5, 0.8, 1.4, 0.6],
            x:          [0, s.driftX * 0.4, s.driftX, s.driftX * 0.6, 0],
            y:          [0, s.driftY * 0.3, s.driftY, s.driftY * 0.5, 0],
          }}
          transition={{
            opacity:  { duration: s.twinkle,  repeat: Infinity, ease: "easeInOut", delay: s.delay },
            scale:    { duration: s.twinkle,  repeat: Infinity, ease: "easeInOut", delay: s.delay },
            x:        { duration: s.driftDur, repeat: Infinity, ease: "easeInOut", delay: s.delay * 0.5, repeatType: "mirror" },
            y:        { duration: s.driftDur, repeat: Infinity, ease: "easeInOut", delay: s.delay * 0.5, repeatType: "mirror" },
          }}
        />
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════
   Globo SVG com linhas de grade + glow colorido
   ══════════════════════════════════════════════════ */
const GlobeLines = () => {
  const R = 320; // raio do globo (px)

  /* Meridianos (linhas verticais) — 12 linhas de 0° a 150° */
  const meridians = Array.from({ length: 12 }, (_, i) => i * 15);

  /* Paralelos (linhas horizontais) — 9 linhas espaçadas */
  const parallels = [-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75];

  /* Converte ângulo de paralelo para coordenadas de elipse */
  const parallelPath = (lat: number) => {
    const ry = R * Math.sin((lat * Math.PI) / 180);
    const rx = R * Math.cos((lat * Math.PI) / 180);
    const cy = R * Math.sin((lat * Math.PI) / 180);
    return `M ${R + rx} ${R + cy} A ${rx} ${Math.abs(ry) * 0.28} 0 1 0 ${R - rx} ${R + cy} A ${rx} ${Math.abs(ry) * 0.28} 0 1 0 ${R + rx} ${R + cy}`;
  };

  /* Elipse de meridiano rotacionada */
  const meridianTransform = (deg: number) =>
    `rotate(${deg} ${R} ${R})`;

  const COLORS = [
    "hsl(162,100%,42%)",  // verde
    "hsl(28,100%,55%)",   // laranja
    "hsl(210,100%,60%)",  // azul
    "hsl(48,100%,55%)",   // amarelo
    "hsl(300,80%,65%)",   // roxo
    "hsl(0,84%,58%)",     // vermelho
  ];

  return (
    <svg
      viewBox={`0 0 ${R * 2} ${R * 2}`}
      width={R * 2}
      height={R * 2}
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Máscara circular para o globo */}
        <clipPath id="globe-clip">
          <circle cx={R} cy={R} r={R} />
        </clipPath>

        {/* Gradiente radial para o glow */}
        <radialGradient id="globe-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="hsl(162,100%,42%)" stopOpacity="0.25" />
          <stop offset="60%"  stopColor="hsl(210,100%,60%)" stopOpacity="0.10" />
          <stop offset="100%" stopColor="transparent"        stopOpacity="0" />
        </radialGradient>

        {/* Gradiente de cor que percorre os meridianos */}
        <linearGradient id="meridian-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="hsl(28,100%,55%)" />
          <stop offset="35%"  stopColor="hsl(162,100%,42%)" />
          <stop offset="70%"  stopColor="hsl(210,100%,60%)" />
          <stop offset="100%" stopColor="hsl(300,80%,65%)" />
        </linearGradient>

        <linearGradient id="parallel-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="hsl(48,100%,55%)" />
          <stop offset="50%"  stopColor="hsl(162,100%,55%)" />
          <stop offset="100%" stopColor="hsl(210,100%,60%)" />
        </linearGradient>
      </defs>

      {/* Glow de fundo */}
      <circle cx={R} cy={R} r={R} fill="url(#globe-glow)" />

      {/* Borda externa brilhante */}
      <circle
        cx={R} cy={R} r={R - 1}
        fill="none"
        stroke="url(#meridian-grad)"
        strokeWidth="2"
        opacity="0.6"
      />

      {/* Grupo clippado = linhas dentro da esfera */}
      <g clipPath="url(#globe-clip)">
        {/* Meridianos */}
        {meridians.map((deg, i) => (
          <ellipse
            key={`m-${deg}`}
            cx={R} cy={R}
            rx={R * 0.15}
            ry={R}
            fill="none"
            stroke={COLORS[i % COLORS.length]}
            strokeWidth="1"
            opacity="0.45"
            transform={meridianTransform(deg)}
          />
        ))}

        {/* Paralelos */}
        {parallels.map((lat, i) => {
          const cosLat = Math.cos((lat * Math.PI) / 180);
          const sinLat = Math.sin((lat * Math.PI) / 180);
          const rx = R * cosLat;
          const cy = R + R * sinLat;
          if (rx < 2) return null;
          return (
            <ellipse
              key={`p-${lat}`}
              cx={R} cy={cy}
              rx={rx}
              ry={rx * 0.25}
              fill="none"
              stroke={COLORS[(i + 2) % COLORS.length]}
              strokeWidth="1"
              opacity="0.45"
            />
          );
        })}

        {/* Equador — destaque */}
        <ellipse
          cx={R} cy={R}
          rx={R}
          ry={R * 0.25}
          fill="none"
          stroke="hsl(162,100%,60%)"
          strokeWidth="2"
          opacity="0.7"
        />
      </g>
    </svg>
  );
};

/* ══════════════════════════════════════════════════
   Componente principal
   ══════════════════════════════════════════════════ */
export const ImpactBlock = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-44 overflow-hidden"
    >
      {/* ── Fundo espacial ultraescuro ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,40%,2%)] via-[hsl(220,45%,1%)] to-[hsl(220,40%,2%)]" />
      {/* Vinheta nas bordas para profundidade */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsla(220,50%,1%,0.85) 100%)",
        }}
      />

      {/* ── Campo de estrelas brilhando ── */}
      <StarField />

      {/* ════════════════════════════════
          GLOBO — entra primeiro, grande
         ════════════════════════════════ */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Halo externo grande */}
        <motion.div
          className="absolute rounded-full"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.4, ease }}
          style={{
            width:  760,
            height: 760,
            background: "radial-gradient(circle, hsla(162,100%,42%,0.12) 0%, hsla(210,100%,60%,0.06) 50%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* Segundo halo — laranja */}
        <motion.div
          className="absolute rounded-full"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.6, ease, delay: 0.2 }}
          style={{
            width:  640,
            height: 640,
            background: "radial-gradient(circle, hsla(28,100%,55%,0.08) 0%, transparent 65%)",
            filter: "blur(20px)",
          }}
        />

        {/* Globo SVG girando — anima rotate continuamente */}
        <motion.div
          initial={{ opacity: 0, scale: 0.25, rotate: -40 }}
          animate={inView
            ? { opacity: 1, scale: 1, rotate: 360 }
            : {}
          }
          transition={{
            opacity:  { duration: 0.9, ease },
            scale:    { duration: 1.2, ease },
            rotate:   { duration: 28, repeat: Infinity, ease: "linear", delay: 0 },
          }}
          style={{ willChange: "transform" }}
        >
          <GlobeLines />
        </motion.div>

        {/* Segundo globo — contrarotação lenta, opacidade baixa */}
        <motion.div
          className="absolute"
          initial={{ opacity: 0, scale: 0.2 }}
          animate={inView
            ? { opacity: 0.18, scale: 1.18, rotate: -360 }
            : {}
          }
          transition={{
            opacity: { duration: 1.2, ease, delay: 0.3 },
            scale:   { duration: 1.4, ease, delay: 0.3 },
            rotate:  { duration: 42, repeat: Infinity, ease: "linear", delay: 0.3 },
          }}
          style={{ willChange: "transform" }}
        >
          <GlobeLines />
        </motion.div>
      </div>

      {/* ════════════════════════════════
          TEXTO — aparece após o globo
         ════════════════════════════════ */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center max-w-4xl">

        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.8 }}
          className="inline-block text-xs font-display uppercase tracking-[0.25em] border px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm"
          style={{
            color:       "hsl(162,100%,42%)",
            borderColor: "hsla(162,100%,42%,0.40)",
            background:  "hsla(162,100%,42%,0.08)",
            boxShadow:   "0 0 24px hsla(162,100%,42%,0.18)",
          }}
        >
          Manifesto
        </motion.span>

        {/* Título com gradiente multi-cor */}
        <motion.h2
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease, delay: 1.0 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight"
        >
          <span
            style={{
              background:           "linear-gradient(90deg, hsl(28,100%,55%), hsl(300,80%,65%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
              backgroundClip:       "text",
              display:              "inline",
            }}
          >
            Experiências digitais{" "}
          </span>
          <br className="hidden md:block" />
          <span
            style={{
              background:           "linear-gradient(90deg, hsl(162,100%,42%), hsl(210,100%,60%), hsl(48,100%,55%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor:  "transparent",
              backgroundClip:       "text",
              filter:               "drop-shadow(0 0 20px hsla(162,100%,42%,0.5))",
              display:              "inline",
            }}
          >
            de alto impacto
          </span>
        </motion.h2>

        {/* Divisor animado */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease, delay: 1.25 }}
          className="mx-auto mt-6 mb-6 h-[2px] w-40 rounded-full"
          style={{
            background:      "linear-gradient(90deg, hsl(28,100%,55%), hsl(162,100%,42%), hsl(210,100%,60%))",
            transformOrigin: "center",
          }}
        />

        {/* Parágrafo colorido */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 1.4 }}
          className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium"
          style={{
            background:           "linear-gradient(90deg, hsl(180,70%,70%), hsl(210,100%,75%), hsl(162,80%,65%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor:  "transparent",
            backgroundClip:       "text",
          }}
        >
          A Camaly desenvolve projetos digitais que unem identidade visual forte,
          tecnologia atual e posicionamento estratégico para marcas que querem sair do comum.
        </motion.p>
      </div>
    </section>
  );
};
