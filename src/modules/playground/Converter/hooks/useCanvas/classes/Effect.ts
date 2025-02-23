import { CanvasEl, Cursor } from "@src/typings/canvas";
import Particle from "./Particle";
import { getCenterXandY } from "@src/modules/Introduction/SnakeAndLadders/hooks/useCanvas/utils";
import { getCursorPosition } from "@src/lib/utils/canvas";

interface Props {
  canvasEl: CanvasEl;
  gap: number;
}
class Effect {
  particles: Particle[] = [];

  canvasEl = {} as CanvasEl;

  gap = 3;

  mouse: Cursor = {
    pressed: false,
    radius: 20000,
    x: 0,
    y: 0,
  };

  img = new Image();

  // Event handler references (to remove them later)
  private handleMouseMove = (e: MouseEvent) => {
    const { x, y } = getCursorPosition({
      canvas: this.canvasEl.canvas,
      cursorX: e.x,
      cursorY: e.y,
    });
    this.mouse.x = x;
    this.mouse.y = y;
  };

  constructor(props: Props) {
    this.canvasEl = props.canvasEl;
    this.gap = props.gap;
    this.img.src = "/images/nezuko.png";
    this.draw();
    window.addEventListener("mousemove", this.handleMouseMove);
  }

  draw() {
    const { context, canvas } = this.canvasEl;

    // improve performance by reducing the pic size
    const scaledWidth = this.img.width / 1;
    const scaledHeight = this.img.height / 1;

    this.img.onload = () => {
      const { x, y } = getCenterXandY(canvas);
      context.drawImage(
        this.img,
        x - scaledWidth / 2,
        y - scaledHeight / 2,
        scaledWidth,
        scaledHeight
      );
      this.convertToParticles();
      console.log(this.particles);
    };
  }

  convertToParticles() {
    const { canvas, context } = this.canvasEl;

    this.particles = [];

    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y += this.gap) {
      for (let x = 0; x < canvas.width; x += this.gap) {
        const index = (y * canvas.width + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 0) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const color = `rgb(${red},${green},${blue})`;
          this.particles.push(
            new Particle({
              canvasEl: this.canvasEl,
              x,
              y,
              color,
              effect: this,
            })
          );
        }
      }
    }
  }

  handleParticles() {
    this.particles.forEach((p) => p.update());
  }

  destroy() {
    this.canvasEl.context.clearRect(
      0,
      0,
      this.canvasEl.canvas.width,
      this.canvasEl.canvas.height
    );
  }
}

export default Effect;
