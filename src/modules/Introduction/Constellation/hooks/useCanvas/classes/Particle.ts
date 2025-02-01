import { CanvasEl, Position } from "../typings/canvas";
import { ParticleProps, Velocity } from "../typings/particle";
import {
  handleGetRandomVelocity,
  hanldeGetDistanceBetween2Circle,
} from "../utils";
import EffectParticles from "./EffectParticles";

class Particle {
  position: Position = {
    x: 0,
    y: 0,
  };

  canvasEl: CanvasEl = {} as CanvasEl;

  radius = 0;

  velocity: Velocity = {
    x: handleGetRandomVelocity(),
    y: handleGetRandomVelocity(),
  };

  friction = 0.95;

  pushX = 0;

  pushY = 0;

  effectParticles: EffectParticles = {} as EffectParticles;

  constructor({ canvasEl, position, radius, effectParticle }: ParticleProps) {
    this.canvasEl = canvasEl;
    this.position = position;
    this.radius = radius;
    this.effectParticles = effectParticle;
  }

  draw() {
    const { context } = this.canvasEl;
    const { x, y } = this.position;
    context.beginPath();
    context.arc(x, y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  }

  update() {
    this.draw();

    const { canvas } = this.canvasEl;

    if (this.effectParticles.cursor.pressed) {
      const dx = this.position.x - this.effectParticles.cursor.x;
      const dy = this.position.y - this.effectParticles.cursor.y;
      const distance = hanldeGetDistanceBetween2Circle(
        this.position,
        this.effectParticles.cursor
      );

      const force = this.effectParticles.cursor.radius / distance;
      if (distance < this.effectParticles.cursor.radius) {
        const angle = Math.atan2(dy, dx);
        this.pushX += Math.cos(angle) * force;
        this.pushY += Math.sin(angle) * force;
      }
    }

    this.position.x += (this.pushX *= this.friction) + this.velocity.x;

    this.position.y += (this.pushY *= this.friction) + this.velocity.y;

    if (this.position.x < this.radius) {
      this.position.x = this.radius;
      this.velocity.x *= -1;
    } else if (
      this.position.x >
      this.effectParticles.size.width - this.radius
    ) {
      this.position.x = this.effectParticles.size.width - this.radius;
      this.velocity.x *= -1;
    }

    if (this.position.y < this.radius) {
      this.position.y = this.radius;
      this.velocity.y *= -1;
    } else if (
      this.position.y >
      this.effectParticles.size.height - this.radius
    ) {
      this.position.y = this.effectParticles.size.height - this.radius;
      this.velocity.y *= -1;
    }
  }
}

export default Particle;
