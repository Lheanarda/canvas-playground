import { CanvasEl } from "@src/typings/canvas";
import Effect from "./Effect";

interface Props {
  canvasEl: CanvasEl;
  x: number;
  y: number;
  radius: number;
  effect: Effect;
  index: number;
}
class Particle {
  canvasEl = {} as CanvasEl;

  index = 0;

  x = 0;

  y = 0;

  effect = {} as Effect;

  radius = 0;

  vx = 0;

  vy = 0;

  buffer = 0;

  pushX = 0;

  pushY = 0;

  friction = 0;

  constructor({ x, y, radius, effect, index, canvasEl }: Props) {
    this.canvasEl = canvasEl;
    this.index = index;
    this.x = x;
    this.y = y;
    this.effect = effect;
    this.radius = radius;
    this.vx = Math.random() * 1 - 0.5;
    this.vy = Math.random() * 1 - 0.5;

    this.buffer = this.radius * 4;

    this.pushX = 0;
    this.pushY = 0;
    this.friction = 0.5;

    if (this.index % 100 === 0) {
      this.radius = Math.floor(Math.random() * 10 + 10);
    }
  }

  draw() {
    const ctx = this.canvasEl.context;
    ctx.beginPath();
    // ctx.fillStyle = `hsl(${this.x * 0.5}, 100%, 50%)`
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }

  update() {
    this.draw();

    if (this.effect.mouse.pressed) {
      const dx = this.x - this.effect.mouse.x;
      const dy = this.y - this.effect.mouse.y;
      const distance = Math.hypot(dx, dy);

      //touch / click radius formula
      const force = distance / this.effect.mouse.radius;
      if (distance < this.effect.mouse.radius) {
        const angle = Math.atan2(dy, dx);
        this.pushX -= Math.cos(angle) * force;
        this.pushY -= Math.sin(angle) * force;
      }
    }

    this.x += (this.pushX *= this.friction) + this.vx;
    this.y += (this.pushY *= this.friction) + this.vy;

    //not push particles out of canvas
    if (this.x < this.buffer) {
      this.x = this.buffer;
      this.vx *= -1;
    } else if (this.x > this.effect.width - this.buffer) {
      this.x = this.effect.width - this.buffer;
      this.vx *= -1;
    }

    if (this.y < this.buffer) {
      this.y = this.buffer;
      this.vy *= -1;
    } else if (this.y > this.effect.height - this.buffer) {
      this.y = this.effect.height - this.buffer;
      this.vy *= -1;
    }
  }

  reset() {
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      this.radius + Math.random() * (this.effect.height - this.radius * 2);
  }
}

export default Particle;
