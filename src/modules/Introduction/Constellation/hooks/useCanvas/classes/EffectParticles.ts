import { COLOR_STROKE, MAX_DISTANCE, TOTAL_PARTICLES } from "../constants";
import {
  Cursor,
  EffectParticlesProps,
  SizeEffect,
} from "../typings/effect-particles";
import {
  handleCreateGradient,
  handleGetRandomCirclePosition,
  handleRandomRadius,
  hanldeGetDistanceBetween2Circle,
} from "../utils";
import Particle from "./Particle";
import { CanvasEl } from "@src/typings/canvas";

class EffectParticles {
  canvasEl: CanvasEl = {} as CanvasEl;

  particles: Particle[] = [];

  totalParticles: number = TOTAL_PARTICLES;

  size: SizeEffect = {
    height: 0,
    width: 0,
  };

  cursor: Cursor = {
    pressed: false,
    radius: 200,
    x: 0,
    y: 0,
  };

  constructor({ canvasEl, size }: EffectParticlesProps) {
    this.canvasEl = canvasEl;
    this.size = size;

    //create style
    canvasEl.context.strokeStyle = COLOR_STROKE;
    const gradient = handleCreateGradient(canvasEl.context, canvasEl.canvas);
    this.canvasEl.context.fillStyle = gradient;

    this.createParticles();

    window.addEventListener("mousemove", (e) => {
      if (!this.cursor.pressed) return;
      this.cursor.x = e.x;
      this.cursor.y = e.y;
    });

    window.addEventListener("touchmove", (e) => {
      if (!this.cursor.pressed) return;
      this.cursor.x = e.touches[0].clientX;
      this.cursor.y = e.touches[0].clientY;
    });

    window.addEventListener("mousedown", (e) => {
      this.cursor.pressed = true;
      this.cursor.x = e.x;
      this.cursor.y = e.y;
    });

    window.addEventListener("touchstart", (e) => {
      this.cursor.pressed = true;
      this.cursor.x = e.touches[0].clientX;
      this.cursor.y = e.touches[0].clientY;
    });

    window.addEventListener("mouseup", () => {
      this.cursor.pressed = false;
    });

    window.addEventListener("touchend", () => {
      this.cursor.pressed = false;
    });
  }

  createParticles() {
    for (let i = 0; i < this.totalParticles; i++) {
      const radius = handleRandomRadius();
      const { x, y } = handleGetRandomCirclePosition(
        radius,
        this.size.width,
        this.size.height
      );

      this.particles.push(
        new Particle({
          canvasEl: this.canvasEl,
          position: { x, y },
          radius,
          effectParticle: this,
        })
      );
    }
  }

  handleParticles() {
    this.particles.forEach((p) => p.update());
    this.connectParticles();
  }

  connectParticles() {
    const { context } = this.canvasEl;
    for (let a = 0; a < this.totalParticles; a++) {
      for (let b = a; b < this.totalParticles; b++) {
        const { x: xA, y: yA } = this.particles[a].position;
        const { x: xB, y: yB } = this.particles[b].position;
        const distance = hanldeGetDistanceBetween2Circle(
          this.particles[a].position,
          this.particles[b].position
        );

        if (distance <= MAX_DISTANCE) {
          context.save();
          const opacity = 1 - distance / MAX_DISTANCE;
          context.globalAlpha = opacity;
          context.beginPath();
          context.moveTo(xA, yA);
          context.lineTo(xB, yB);

          context.stroke();
          context.restore();
        }
      }
    }
  }
}

export default EffectParticles;
