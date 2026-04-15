export interface Wave {
  amp: number;
  freq: number;
  speed: number;
  yOff: number;
  color: string;
}

export type WaveCtrl = { amp: number; freq: number; speed: number };

export const DEFAULT_CTRL: WaveCtrl = { amp: 2, freq: 1, speed: 1 };

export const STEP = 2;
