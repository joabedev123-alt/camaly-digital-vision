import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/* ══════════════════════════════════════════════════
   Chuva de Meteoros (Rastros rápidos)
   ══════════════════════════════════════════════════ */
const MeteorField = () => {
  const meteors = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    // Quantidade reduzida conforme solicitado
    const count = isMobile ? 6 : 10;
    
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      // Pontos de partida mais variados (saindo da esquerda/inferior)
      x: -20 + Math.random() * 100, 
      y: 40 + Math.random() * 80,  
      size: 1 + Math.random() * 2,
      // Duração aumentada para câmera lenta (12s a 25s)
      duration: 12 + Math.random() * 13,
      delay: Math.random() * 15,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {meteors.map((m) => (
        <motion.span
          key={m.id}
          // Trajetória oposta: gradiente agora vai da direita para a esquerda (rastro)
          className="absolute bg-gradient-to-r from-transparent via-primary/30 to-white"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            width: `${150 + Math.random() * 200}px`, 
            height: "1px",
            rotate: "-25deg", // Ângulo ajustado para a nova direção
            filter: "drop-shadow(0 0 4px white)",
          }}
          animate={{
            // Trajeto oposto: da esquerda para a direita, de baixo para cima
            x: ["0vw", "140vw"],
            y: ["0vh", "-140vh"],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: m.duration,
            repeat: Infinity,
            delay: m.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════
   Estrelas Cadentes (Orbitais ao redor do círculo)
   ══════════════════════════════════════════════════ */
const ShootingStarsCircle = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => {
      const angle = Math.random() * 360;
      const distance = 800 + Math.random() * 600; // Distância para sair da tela
      return {
        id: i,
        angle,
        targetX: Math.cos(angle * Math.PI / 180) * distance,
        targetY: Math.sin(angle * Math.PI / 180) * distance,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 10,
        size: 2 + Math.random() * 2,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            width: s.size,
            height: s.size,
            filter: "blur(1px) drop-shadow(0 0 12px white)",
            boxShadow: "0 0 20px 4px hsla(162,100%,42%,0.3)",
          }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1.2, 0],
            x: [0, s.targetX],
            y: [0, s.targetY],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            repeatDelay: Math.random() * 5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════
   Globo SVG (Adaptado do ImpactBlock)
   ══════════════════════════════════════════════════ */
const HeroGlobe = () => {
  const R = 320;
  const meridians = Array.from({ length: 12 }, (_, i) => i * 15);
  const parallels = [-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75];
  const COLORS = [
    "hsl(162,100%,42%)", "hsl(28,100%,55%)", "hsl(210,100%,60%)",
    "hsl(48,100%,55%)", "hsl(300,80%,65%)", "hsl(0,84%,58%)"
  ];

  return (
    <svg viewBox={`0 0 ${R * 2} ${R * 2}`} width={R * 2} height={R * 2} className="overflow-visible">
      <defs>
        <clipPath id="hero-globe-clip"><circle cx={R} cy={R} r={R} /></clipPath>
        <radialGradient id="hero-globe-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(162,100%,42%)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={R} cy={R} r={R} fill="url(#hero-globe-glow)" />
      <g clipPath="url(#hero-globe-clip)">
        {meridians.map((deg, i) => (
          <ellipse key={deg} cx={R} cy={R} rx={R * 0.15} ry={R} fill="none" 
            stroke={COLORS[i % COLORS.length]} strokeWidth="1" opacity="0.4"
            transform={`rotate(${deg} ${R} ${R})`} />
        ))}
        {parallels.map((lat, i) => {
          const rx = R * Math.cos((lat * Math.PI) / 180);
          const cy = R + R * Math.sin((lat * Math.PI) / 180);
          if (rx < 2) return null;
          return <ellipse key={lat} cx={R} cy={cy} rx={rx} ry={rx * 0.25} fill="none"
            stroke={COLORS[(i + 2) % COLORS.length]} strokeWidth="1" opacity="0.4" />;
        })}
      </g>
    </svg>
  );
};

export const HeroBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Fundo ultra-escuro */}
      <div className="absolute inset-0 bg-[#020408]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      {/* Meteoros */}
      <MeteorField />

      {/* Globo e Efeitos de Centro */}
      <div className="absolute inset-0 flex items-center justify-center scale-[0.6] md:scale-100 opacity-60">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease }}
          className="relative"
        >
          {/* Halos de brilho */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full" />
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            <HeroGlobe />
          </motion.div>

          <ShootingStarsCircle />
        </motion.div>
      </div>
    </div>
  );
};
