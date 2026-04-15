export interface WaveEntry {
  id: string;
  title: string;
  description: string;
  path: string;
  gradient: string;
  tags: string[];
}

export const CATALOG: WaveEntry[] = [
  {
    id: "blue-wave",
    title: "Blue Wave",
    description: "Layered ocean swell with per-wave amplitude, frequency and speed controls.",
    path: "/blue-wave",
    gradient: "linear-gradient(160deg, #3fa0d8 0%, #0d4f8a 50%, #020c1b 100%)",
    tags: ["canvas", "interactive", "ocean"],
  },
  // {
  //   id: "angled-wave",
  //   title: "Angled Wave",
  //   description: "Five-layer wave rotated from the bottom-right corner — a diagonal swell across the canvas.",
  //   path: "/angled-wave",
  //   gradient: "linear-gradient(160deg, #3fa0d8 0%, #0d4f8a 50%, #020c1b 100%)",
  //   tags: ["canvas", "diagonal", "blue"],
  // },
  // {
  //   id: "wave-cards",
  //   title: "Wave Cards",
  //   description: "UI cards with live animated wave backgrounds — showing how wave design applies to components.",
  //   path: "/wave-cards",
  //   gradient: "linear-gradient(160deg, #a18cd1 0%, #fbc2eb 50%, #f9a8d4 100%)",
  //   tags: ["canvas", "ui", "cards"],
  // },
];
