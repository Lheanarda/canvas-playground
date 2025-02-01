import EffectParticles from "../classes/EffectParticles";
import { CanvasEl, Position } from "./canvas";

export interface Velocity {
  x: number;
  y: number;
}

export interface ParticleProps {
  canvasEl: CanvasEl;
  position: Position;
  radius: number;
  effectParticle: EffectParticles;
}
