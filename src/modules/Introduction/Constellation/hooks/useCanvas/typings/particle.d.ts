import { CanvasEl, Position } from "@src/typings/canvas";
import EffectParticles from "../classes/EffectParticles";

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
