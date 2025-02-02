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

  x = 0;

  y = 0;

  index = 0;

  effect = {} as Effect;

  radius = 0;

  minRadius = 0;

  maxRadius = 0;

  vx = 0;

  vy = 0;

  constructor(props: Props) {
    this.canvasEl = props.canvasEl;
    this.index = props.index;
    this.x = props.x;
    this.y = props.y;
    this.effect = props.effect;
    this.radius = props.radius;
    this.minRadius = this.radius;
    this.maxRadius = this.radius * 5;
    this.vx = Math.random() * 0.2 - 0.1;
    this.vy = Math.random() * 0.2 - 0.1;
  }

  draw() {
    const { canvas, context: ctx } = this.canvasEl;
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "pink");
    gradient.addColorStop(0.5, "red");
    gradient.addColorStop(1, "magenta");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(
      this.x - this.radius * 0.2,
      this.y - this.radius * 0.3,
      this.radius * 0.6,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }

  update() {
    this.draw();

    if (this.effect.mouse.pressed) {
      const dx = this.x - this.effect.mouse.x;
      const dy = this.y - this.effect.mouse.y;
      const distance = Math.hypot(dx, dy);

      //touch / click radius formula
      if (distance < this.effect.mouse.radius && this.radius < this.maxRadius) {
        this.radius += 2;
      }
    }

    if (this.radius > this.minRadius) {
      this.radius -= 0.1;
    }

    this.x += this.vx;
    this.y += this.vy;

    /*this.x += this.vx
       if(this.x > this.effect.width - this.radius || this.x < this.radius) this.vx *= -1

       this.y += this.vy 
       if(this.y > this.effect.height - this.radius || this.y < this.radius) this.vy *= -1 */

    //not push particles out of canvas
    if (this.x < this.radius) {
      this.x = this.radius;
      this.vx *= -1;
    } else if (this.x > this.effect.width - this.radius) {
      this.x = this.effect.width - this.radius;
      this.vx *= -1;
    }

    if (this.y < this.radius) {
      this.y = this.radius;
      this.vy *= -1;
    } else if (this.y > this.effect.height - this.radius) {
      this.y = this.effect.height - this.radius;
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
