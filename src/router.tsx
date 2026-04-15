import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlueWavePage from "./pages/BlueWavePage";
import AngledWavePage from "./pages/AngledWavePage";
import WaveCardPage from "./pages/WaveCardPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blue-wave" element={<BlueWavePage />} />
      <Route path="/angled-wave" element={<AngledWavePage />} />
      <Route path="/wave-cards" element={<WaveCardPage />} />
    </Routes>
  );
}
