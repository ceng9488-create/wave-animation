import type React from "react";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}

export function Slider({ label, value, min, max, step, onChange }: SliderProps) {
  return (
    <div style={styles.row}>
      <span style={styles.label}>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={styles.input}
      />
      <span style={styles.value}>{value.toFixed(2)}</span>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  label: {
    width: "80px",
    fontSize: "13px",
    color: "#555",
    fontFamily: "'Lato', sans-serif",
  },
  input: {
    flex: 1,
    accentColor: "#0d4f8a",
  },
  value: {
    width: "38px",
    fontSize: "12px",
    color: "#888",
    textAlign: "right",
    fontFamily: "monospace",
  },
};
