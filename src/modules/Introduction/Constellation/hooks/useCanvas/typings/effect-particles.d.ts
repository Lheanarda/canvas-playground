import { CanvasEl } from "@src/typings/canvas";
import Particle from "../classes/Particle";

export interface SizeEffect {
  width: number;
  height: number;
}

export interface EffectParticlesProps {
  canvasEl: CanvasEl;
  size: SizeEffect;
}

export interface Cursor {
  x: number;
  y: number;
  radius: number;
  pressed: boolean;
}
