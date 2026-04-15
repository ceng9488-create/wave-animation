import { Link } from "react-router-dom";
import { CATALOG } from "../catalog";
import type { WaveEntry } from "../catalog";

export default function Home() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Wave</h1>
        <p style={styles.subtitle}>A collection of wave animation experiments</p>
      </header>

      <main style={styles.grid}>
        {CATALOG.map(entry => (
          <WaveCard key={entry.id} entry={entry} />
        ))}
      </main>
    </div>
  );
}

function WaveCard({ entry }: { entry: WaveEntry }) {
  return (
    <Link to={entry.path} style={styles.cardLink}>
      <div style={styles.card}>
        <div style={{ ...styles.preview, background: entry.gradient }}>
          <div style={styles.previewWaves} />
        </div>

        <div style={styles.cardBody}>
          <div style={styles.cardTop}>
            <h2 style={styles.cardTitle}>{entry.title}</h2>
            <div style={styles.tags}>
              {entry.tags.map(tag => (
                <span key={tag} style={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
          <p style={styles.cardDesc}>{entry.description}</p>
        </div>
      </div>
    </Link>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f8f9fb",
    padding: "3rem 2rem",
    boxSizing: "border-box",
  },
  header: {
    marginBottom: "3rem",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "48px",
    fontWeight: 700,
    color: "#1a1a2e",
    fontFamily: "'Pacifico', cursive",
    letterSpacing: "-1px",
  },
  subtitle: {
    marginTop: "10px",
    fontSize: "16px",
    color: "#888",
    fontFamily: "'Lato', sans-serif",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  cardLink: {
    textDecoration: "none",
    display: "block",
  },
  card: {
    borderRadius: "16px",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
  },
  preview: {
    height: "180px",
    position: "relative",
    overflow: "hidden",
  },
  previewWaves: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "repeating-linear-gradient(transparent, transparent 28px, rgba(255,255,255,0.07) 28px, rgba(255,255,255,0.07) 30px)",
  },
  cardBody: {
    padding: "1.2rem 1.4rem",
  },
  cardTop: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "8px",
    marginBottom: "8px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 600,
    color: "#1a1a2e",
    fontFamily: "'Lato', sans-serif",
  },
  tags: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  tag: {
    fontSize: "11px",
    padding: "2px 8px",
    borderRadius: "999px",
    background: "#eef2ff",
    color: "#4a5de8",
    fontFamily: "monospace",
  },
  cardDesc: {
    margin: 0,
    fontSize: "13px",
    color: "#777",
    lineHeight: "1.6",
    fontFamily: "'Lato', sans-serif",
  },
};
