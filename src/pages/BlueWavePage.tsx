import { Link } from "react-router-dom";
import BlueWave from "../App";

export default function BlueWavePage() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <BlueWave />
      <Link to="/" style={styles.back}>← Back</Link>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  back: {
    position: "absolute",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "8px 20px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(8px)",
    borderRadius: "999px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
    fontFamily: "'Lato', sans-serif",
    border: "1px solid rgba(255,255,255,0.25)",
    pointerEvents: "auto",
  },
};
