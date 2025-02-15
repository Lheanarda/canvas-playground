import { CanvasEl } from "@src/typings/canvas";
import Particle from "./Particle";
import { getCursorPosition } from "@src/lib/utils/canvas";

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
    radius: 60,
  };

  // Event handler references for cleanup
  private handleMouseMove = (e: MouseEvent) => {
    if (this.mouse.pressed) {
      const { x, y } = getCursorPosition({
        canvas: this.canvasEl.canvas,
        cursorX: e.x,
        cursorY: e.y,
      });
      this.mouse.x = x;
      this.mouse.y = y;
    }
  };

  private handleMouseDown = (e: MouseEvent) => {
    this.mouse.pressed = true;
    const { x, y } = getCursorPosition({
      canvas: this.canvasEl.canvas,
      cursorX: e.x,
      cursorY: e.y,
    });
    this.mouse.x = x;
    this.mouse.y = y;
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
    this.numberOfParticles = 500;
    this.createParticles();

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "pink");
    gradient.addColorStop(0.5, "red");
    gradient.addColorStop(1, "magenta");
    ctx.fillStyle = gradient;

    this.mouse = {
      x: this.width / 2,
      y: this.height / 2,
      pressed: false,
      radius: 60,
    };

    // Attach event listeners
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mousedown", this.handleMouseDown);
    window.addEventListener("mouseup", this.handleMouseUp);
  }

  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      const radius = Math.floor(Math.random() * 8 + 8);
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
    // this.connectParticles()
    this.particles.forEach((p) => p.update());
  }

  connectParticles() {
    const ctx = this.canvasEl.context;
    const maxDistance = 80;
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.hypot(dx, dy);
        if (distance < maxDistance) {
          ctx.save();
          const opacity = 1 - distance / maxDistance;
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.moveTo(this.particles[a].x, this.particles[a].y);
          ctx.lineTo(this.particles[b].x, this.particles[b].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
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
