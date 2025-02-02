import { CanvasEl } from "@src/typings/canvas";
import Particle from "./Particle";

interface Props {
  canvasEl: CanvasEl;
}

class Effect {
  canvasEl = {} as CanvasEl;

  width = 0;

  height = 0;

  particles: Particle[] = [];

  numberOfParticles = 0;

  mouse = {
    x: 0,
    y: 0,
    pressed: false,
    radius: 200,
  };

  // Event handler references for cleanup
  private handleMouseMove = (e: MouseEvent) => {
    if (this.mouse.pressed) {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    }
  };

  private handleMouseDown = (e: MouseEvent) => {
    this.mouse.pressed = true;
    this.mouse.x = e.x;
    this.mouse.y = e.y;
  };

  private handleMouseUp = () => {
    this.mouse.pressed = false;
  };

  constructor(props: Props) {
    this.canvasEl = props.canvasEl;
    const { canvas, context: ctx } = props.canvasEl;
    this.width = canvas.width;
    this.height = canvas.height;
    this.particles = [];
    this.numberOfParticles = 300;
    this.createParticles();

    ctx.fillStyle = "white";
    this.mouse = {
      x: this.width / 2,
      y: this.height / 2,
      pressed: false,
      radius: 200,
    };

    // Attach event listeners
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mousedown", this.handleMouseDown);
    window.addEventListener("mouseup", this.handleMouseUp);

    ctx.lineWidth = 2;
  }

  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      const radius = Math.floor(Math.random() * 15 + 10);
      this.particles.push(
        new Particle({
          x: radius + Math.random() * (this.width - radius * 2), // make sure the particle is inside effect
          y: radius + Math.random() * (this.height - radius * 2),
          radius,
          effect: this,
          index: i,
          canvasEl: this.canvasEl,
        })
      );
    }
  }

  handleParticles() {
    this.particles.forEach((p) => p.update());
  }

  resize(width: number, height: number) {
    const { canvas, context: ctx } = this.canvasEl;
    canvas.width = width;
    canvas.height = height;
    this.width = canvas.width;
    this.height = canvas.height;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";

    this.particles.forEach((p) => p.reset());
  }

  /** Cleanup method to prevent memory leaks */
  destroy() {
    // Remove event listeners
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mousedown", this.handleMouseDown);
    window.removeEventListener("mouseup", this.handleMouseUp);

    // Clear the particles array
    this.particles = [];

    // Clear the canvas
    this.canvasEl.context.clearRect(
      0,
      0,
      this.canvasEl.canvas.width,
      this.canvasEl.canvas.height
    );
  }
}

export default Effect;
