import { useEffect, useRef, useState } from "react";

/* ─── Tipos de estado do cursor ─── */
type CursorState = "default" | "hover" | "click";

/* ─── Paleta de cores que vai alternando no halo ─── */
const HALO_COLORS = [
  "hsla(162,100%,42%,VAL)",  // verde
  "hsla(28,100%,55%,VAL)",   // laranja
  "hsla(210,100%,60%,VAL)",  // azul
  "hsla(48,100%,55%,VAL)",   // amarelo
  "hsla(300,80%,65%,VAL)",   // roxo
];

export const CustomCursor = () => {
  const [isMobile, setIsMobile] = useState(false);
  const dotRef   = useRef<HTMLDivElement>(null);
  const haloRef  = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  const pos       = useRef({ x: -200, y: -200 });
  const trailPos  = useRef({ x: -200, y: -200 });
  const haloPos   = useRef({ x: -200, y: -200 });
  const rafId     = useRef<number>(0);
  const colorIdx  = useRef(0);
  const colorTimer= useRef<ReturnType<typeof setInterval>>();

  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [color, setColor] = useState(HALO_COLORS[0]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* ── Cicla cores do halo ── */
  useEffect(() => {
    if (isMobile) return;
    colorTimer.current = setInterval(() => {
      colorIdx.current = (colorIdx.current + 1) % HALO_COLORS.length;
      setColor(HALO_COLORS[colorIdx.current]);
    }, 1800);
    return () => clearInterval(colorTimer.current);
  }, [isMobile]);

  /* ── Tracking do mouse ── */
  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    const onDown = () => setCursorState("click");
    const onUp   = () => setCursorState(s => s === "click" ? "hover" : s);

    /* Detecta hover em qualquer elemento interativo */
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = el.closest(
        "a, button, [role='button'], input, textarea, select, label, [tabindex], [data-cursor='hover']"
      );
      setCursorState(interactive ? "hover" : "default");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  /* ── Loop de animação suave (lerp) ── */
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      const dot   = dotRef.current;
      const halo  = haloRef.current;
      const trail = trailRef.current;
      if (!dot || !halo || !trail) { rafId.current = requestAnimationFrame(loop); return; }

      /* Ponto central — segue instantaneamente */
      dot.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`;

      /* Trail — interpolação rápida */
      trailPos.current.x = lerp(trailPos.current.x, pos.current.x, 0.28);
      trailPos.current.y = lerp(trailPos.current.y, pos.current.y, 0.28);
      trail.style.transform = `translate(${trailPos.current.x - 20}px, ${trailPos.current.y - 20}px)`;

      /* Halo — interpolação lenta */
      haloPos.current.x = lerp(haloPos.current.x, pos.current.x, 0.10);
      haloPos.current.y = lerp(haloPos.current.y, pos.current.y, 0.10);
      halo.style.transform = `translate(${haloPos.current.x - 60}px, ${haloPos.current.y - 60}px)`;

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  /* ── Tamanhos por estado ── */
  const isHover = cursorState === "hover";
  const isClick = cursorState === "click";

  const haloColor    = color.replace("VAL", isHover ? "0.55" : "0.28");
  const haloSize     = isClick ? 100 : isHover ? 110 : 120;
  const trailColor   = color.replace("VAL", isHover ? "0.7"  : "0.45");
  const dotScale     = isClick ? "scale(0.6)" : isHover ? "scale(1.5)" : "scale(1)";

  if (isMobile) return null;

  return (
    <>
      {/* ── Cursor dot (miolo) ── */}
      <div
        ref={dotRef}
        style={{
          position:     "fixed",
          top:          0,
          left:         0,
          width:        10,
          height:       10,
          borderRadius: "50%",
          background:   color.replace("VAL", "1"),
          pointerEvents:"none",
          zIndex:       99999,
          mixBlendMode: "screen",
          transform:    dotScale,
          transition:   "transform 0.15s ease, background 1.8s ease",
          boxShadow:    `0 0 8px 3px ${color.replace("VAL","0.8")}`,
        }}
      />

      {/* ── Trail médio ── */}
      <div
        ref={trailRef}
        style={{
          position:     "fixed",
          top:          0,
          left:         0,
          width:        40,
          height:       40,
          borderRadius: "50%",
          border:       `1.5px solid ${trailColor}`,
          pointerEvents:"none",
          zIndex:       99998,
          mixBlendMode: "screen",
          transition:   "border-color 1.8s ease, width 0.25s ease, height 0.25s ease",
          boxShadow:    `inset 0 0 10px ${trailColor}, 0 0 10px ${trailColor}`,
          ...(isHover && { width: 50, height: 50 }),
          ...(isClick && { width: 30, height: 30 }),
        }}
      />

      {/* ── Halo externo suave ── */}
      <div
        ref={haloRef}
        style={{
          position:     "fixed",
          top:          0,
          left:         0,
          width:        haloSize,
          height:       haloSize,
          borderRadius: "50%",
          background:   `radial-gradient(circle, ${haloColor} 0%, transparent 70%)`,
          pointerEvents:"none",
          zIndex:       99997,
          mixBlendMode: "screen",
          transition:   "background 1.8s ease, width 0.3s ease, height 0.3s ease",
        }}
      />
    </>
  );
};
