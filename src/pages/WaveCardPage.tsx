import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ---------- wave config per card ----------

interface WaveCfg {
  bg: string;
  waves: { amp: number; freq: number; speed: number; yOff: number; color: string }[];
}

const CARDS: { title: string; body: string; cta: string; cfg: WaveCfg }[] = [
  {
    title: "Ocean Depth",
    body: "Dive into layered deep-sea blues. Calm, slow swells that carry you to the ocean floor.",
    cta: "Explore",
    cfg: {
      bg: "#020c1b",
      waves: [
        { amp: 8,  freq: 0.012, speed: 0.006, yOff: 0.55, color: "rgba(63,160,216,0.35)" },
        { amp: 12, freq: 0.009, speed: 0.008, yOff: 0.65, color: "rgba(13,79,138,0.65)"  },
        { amp: 10, freq: 0.007, speed: 0.005, yOff: 0.78, color: "rgba(10,42,74,0.80)"   },
      ],
    },
  },
  {
    title: "Sunset Tide",
    body: "Warm coral and amber waves at golden hour. The shore meets the sky in soft motion.",
    cta: "Discover",
    cfg: {
      bg: "#1a0a00",
      waves: [
        { amp: 10, freq: 0.010, speed: 0.007, yOff: 0.52, color: "rgba(255,160,80,0.35)" },
        { amp: 14, freq: 0.008, speed: 0.006, yOff: 0.65, color: "rgba(220,80,40,0.60)"  },
        { amp: 12, freq: 0.006, speed: 0.004, yOff: 0.78, color: "rgba(140,30,10,0.80)"  },
      ],
    },
  },
  {
    title: "Aurora Swell",
    body: "Northern lights ripple across the water. Teal and violet blend in a midnight dance.",
    cta: "Wander",
    cfg: {
      bg: "#050d12",
      waves: [
        { amp: 9,  freq: 0.011, speed: 0.006, yOff: 0.50, color: "rgba(100,220,180,0.30)" },
        { amp: 13, freq: 0.008, speed: 0.007, yOff: 0.64, color: "rgba(60,140,180,0.55)"  },
        { amp: 11, freq: 0.006, speed: 0.004, yOff: 0.78, color: "rgba(80,40,140,0.80)"   },
      ],
    },
  },
  {
    title: "Rose Drift",
    body: "Soft pinks and lavender wash gently across the surface. Dreamy and serene.",
    cta: "Float",
    cfg: {
      bg: "#120a10",
      waves: [
        { amp: 8,  freq: 0.010, speed: 0.005, yOff: 0.50, color: "rgba(240,160,200,0.35)" },
        { amp: 12, freq: 0.007, speed: 0.006, yOff: 0.64, color: "rgba(190,80,140,0.55)"  },
        { amp: 10, freq: 0.005, speed: 0.004, yOff: 0.78, color: "rgba(120,30,80,0.80)"   },
      ],
    },
  },
];

// ---------- mini wave canvas ----------

function WaveCanvas({ cfg }: { cfg: WaveCfg }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const timeRef   = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function resize() {
      if (!canvas) return;
      const dpr  = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr); }
    }

    function draw() {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      const STEP = 2;
      for (const wave of cfg.waves) {
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += STEP) {
          const p = Math.sin(x * wave.freq + t * wave.speed) * wave.amp;
          const s = Math.sin(x * wave.freq * 1.8 + t * wave.speed * 0.7) * wave.amp * 0.4;
          ctx.lineTo(x, h * wave.yOff + p + s);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      }

      timeRef.current += 1;
      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [cfg]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}

// ---------- card ----------

function WaveCard({ title, body, cta, cfg }: (typeof CARDS)[number]) {
  return (
    <div style={{ ...styles.card, background: cfg.bg }}>
      <WaveCanvas cfg={cfg} />

      <div style={styles.cardContent}>
        <h2 style={styles.cardTitle}>{title}</h2>
        <p style={styles.cardBody}>{body}</p>
        <button style={styles.cta}>{cta}</button>
      </div>
    </div>
  );
}

// ---------- page ----------

export default function WaveCardPage() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <Link to="/" style={styles.back}>← Back</Link>
        <h1 style={styles.pageTitle}>Wave Cards</h1>
        <p style={styles.pageSubtitle}>Wave design applied as card backgrounds</p>
      </header>

      <main style={styles.grid}>
        {CARDS.map(card => (
          <WaveCard key={card.title} {...card} />
        ))}
      </main>
    </div>
  );
}

// ---------- styles ----------

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f0f2f8",
    padding: "2.5rem 2rem 4rem",
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  back: {
    display: "inline-block",
    marginBottom: "1.5rem",
    fontSize: "14px",
    color: "#666",
    textDecoration: "none",
    fontFamily: "'Lato', sans-serif",
  },
  pageTitle: {
    margin: 0,
    fontSize: "42px",
    fontWeight: 700,
    color: "#1a1a2e",
    fontFamily: "'Pacifico', cursive",
  },
  pageSubtitle: {
    marginTop: "8px",
    fontSize: "15px",
    color: "#888",
    fontFamily: "'Lato', sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    position: "relative",
    borderRadius: "20px",
    overflow: "hidden",
    height: "340px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
  },
  cardContent: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "2rem",
    background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
  },
  cardTitle: {
    margin: "0 0 8px",
    fontSize: "22px",
    fontWeight: 700,
    color: "#fff",
    fontFamily: "'Pacifico', cursive",
  },
  cardBody: {
    margin: "0 0 16px",
    fontSize: "13px",
    color: "rgba(255,255,255,0.8)",
    lineHeight: "1.6",
    fontFamily: "'Lato', sans-serif",
  },
  cta: {
    alignSelf: "flex-start",
    padding: "8px 20px",
    border: "1px solid rgba(255,255,255,0.6)",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(6px)",
    color: "#fff",
    fontSize: "13px",
    fontFamily: "'Lato', sans-serif",
    cursor: "pointer",
  },
};
