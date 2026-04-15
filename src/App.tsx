import { useEffect, useRef, useCallback, useState } from "react";
import "./App.css";
import { type WaveCtrl, DEFAULT_CTRL, STEP } from "./types";
import { WAVES } from "./waves";
import { Slider } from "./Slider";

function BlueWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef   = useRef(0);
  const rafRef    = useRef<number>(0);

  const ctrlRef = useRef<WaveCtrl[]>(WAVES.map(() => ({ ...DEFAULT_CTRL })));
  const [controls, setControls] = useState<WaveCtrl[]>(WAVES.map(() => ({ ...DEFAULT_CTRL })));
  const [activeTab, setActiveTab] = useState(0);

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

      WAVES.forEach((wave, i) => {
        const c = ctrlRef.current[i];
        const a = wave.amp   * c.amp;
        const f = wave.freq  * c.freq;
        const s = wave.speed * c.speed;

        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += STEP) {
          const primary   = Math.sin(x * f + t * s) * a;
          const secondary = Math.sin(x * f * 1.8 + t * s * 0.7) * a * 0.4;
          ctx.lineTo(x, h * wave.yOff + primary + secondary);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      timeRef.current += 1;
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleResize]);

  function handleChange(param: keyof WaveCtrl, value: number) {
    ctrlRef.current[activeTab][param] = value;
    setControls(prev =>
      prev.map((c, i) => (i === activeTab ? { ...c, [param]: value } : c))
    );
  }

  const c = controls[activeTab];

  return (
    <div style={styles.container}>
      <canvas ref={canvasRef} style={styles.canvas} />

      <div className="wave-overlay">
        <div>
          <h1 style={styles.title}>Blue Wave</h1>
          <p style={styles.subtitle}>Canvas 2D · React · TypeScript</p>
        </div>

        <div className="wave-controls">
          <div style={styles.tabs}>
            {WAVES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                style={{
                  ...styles.tab,
                  ...(activeTab === i ? styles.tabActive : styles.tabInactive),
                }}
              >
                Wave {i + 1}
              </button>
            ))}
          </div>

          <Slider label="Amplitude" value={c.amp}   min={0.1} max={3} step={0.05} onChange={v => handleChange("amp",   v)} />
          <Slider label="Frequency" value={c.freq}  min={0.1} max={3} step={0.05} onChange={v => handleChange("freq",  v)} />
          <Slider label="Speed"     value={c.speed} min={0.1} max={5} step={0.05} onChange={v => handleChange("speed", v)} />
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "relative",
    width: "100%",
    height: "100vh",
    background: "#ffffff",
    overflow: "hidden",
  },
  canvas: {
    width: "100%",
    height: "100%",
    display: "block",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 600,
    color: "#444444",
    letterSpacing: "-0.5px",
    fontFamily: "'Pacifico', cursive",
  },
  subtitle: {
    margin: "6px 0 0",
    fontSize: "14px",
    color: "#999999",
    fontFamily: "'Lato', sans-serif",
  },
  tabs: {
    display: "flex",
    gap: "6px",
    marginBottom: "4px",
  },
  tab: {
    flex: 1,
    padding: "6px 0",
    border: "none",
    borderRadius: "8px",
    fontSize: "12px",
    fontFamily: "'Lato', sans-serif",
    cursor: "pointer",
    transition: "background 0.15s, color 0.15s",
  },
  tabActive: {
    background: "#0d4f8a",
    color: "#fff",
  },
  tabInactive: {
    background: "rgba(0,0,0,0.07)",
    color: "#555",
  },
};

export default BlueWave;
