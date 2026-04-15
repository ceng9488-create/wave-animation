import { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";

const WAVES = [
  { amp:  9, freq: 0.005, speed: 0.004, yOff: 0.30, color: "rgba(63,  160, 216, 0.30)" },
  { amp: 13, freq: 0.007, speed: 0.005, yOff: 0.42, color: "rgba(26,  122, 191, 0.45)" },
  { amp: 16, freq: 0.006, speed: 0.004, yOff: 0.54, color: "rgba(18,  100, 160, 0.60)" },
  { amp: 12, freq: 0.008, speed: 0.006, yOff: 0.66, color: "rgba(13,  79,  138, 0.75)" },
  { amp: 30, freq: 0.005, speed: 0.003, yOff: 0.80, color: "rgba(10,  42,  74,  0.85)" },
];

const STEP = 2;

function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef   = useRef(0);
  const rafRef    = useRef<number>(0);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr  = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (ctx) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr); }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    function draw() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      for (const wave of WAVES) {
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += STEP) {
          const primary   = Math.sin(x * wave.freq + t * wave.speed) * wave.amp;
          const secondary = Math.sin(x * wave.freq * 1.8 + t * wave.speed * 0.7) * wave.amp * 0.4;
          ctx.lineTo(x, h * wave.yOff + primary + secondary);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      }

      timeRef.current += 1;
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleResize]);

  return <canvas ref={canvasRef} style={styles.canvas} />;
}

export default function AngledWavePage() {
  return (
    <div style={styles.page}>

      {/* Wave rotated from bottom-right origin */}
      <div style={styles.canvasWrapper}>
        <WaveCanvas />
      </div>

      {/* Content layered on top */}
      <div style={styles.overlay}>
        <div style={styles.textBlock}>
          <h1 style={styles.title}>Angled Wave</h1>
          <p style={styles.subtitle}>Diagonal swell from the bottom-right</p>
        </div>
        <Link to="/" style={styles.back}>← Back</Link>
      </div>

    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    position: "relative",
    width: "100%",
    height: "100vh",
    background: "#020c1b",
    overflow: "hidden",
  },
  // Rotate from bottom-right corner, scale up so waves fill after rotation
  canvasWrapper: {
    position: "absolute",
    inset: 0,
    transform: "rotate(-35deg) scale(1.9)",
    transformOrigin: "90% 90%",
  },
  canvas: {
    width: "100%",
    height: "100%",
    display: "block",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "2.5rem",
    pointerEvents: "none",
  },
  textBlock: {
    pointerEvents: "none",
  },
  title: {
    margin: 0,
    fontSize: "36px",
    fontWeight: 700,
    color: "rgba(255,255,255,0.92)",
    fontFamily: "'Pacifico', cursive",
  },
  subtitle: {
    margin: "8px 0 0",
    fontSize: "14px",
    color: "rgba(255,255,255,0.45)",
    fontFamily: "'Lato', sans-serif",
  },
  back: {
    alignSelf: "flex-start",
    padding: "8px 20px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(8px)",
    borderRadius: "999px",
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    fontSize: "14px",
    fontFamily: "'Lato', sans-serif",
    border: "1px solid rgba(255,255,255,0.2)",
    pointerEvents: "auto",
  },
};
