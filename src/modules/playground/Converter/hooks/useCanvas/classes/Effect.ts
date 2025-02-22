import { CanvasEl, Cursor } from "@src/typings/canvas";
import Particle from "./Particle";
import { getCenterXandY } from "@src/modules/Introduction/SnakeAndLadders/hooks/useCanvas/utils";

interface Props {
  canvasEl: CanvasEl;
  gap: number;
}
class Effect {
  particles: Particle[] = [];

  canvasEl = {} as CanvasEl;

  gap = 3;

  cursor: Cursor = {
    pressed: false,
    radius: 200,
    x: 0,
    y: 0,
  };

  img = new Image();

  constructor(props: Props) {
    this.canvasEl = props.canvasEl;
    this.gap = props.gap;
    this.img.src = "/images/Queens-Gambit.webp";
    this.draw();
  }

  draw() {
    const { context, canvas } = this.canvasEl;

    this.img.onload = () => {
      const { x, y } = getCenterXandY(canvas);
      context.drawImage(
        this.img,
        x - this.img.width / 2,
        y - this.img.height / 2
      );
      this.convertToParticles();
    };
  }

  convertToParticles() {
    const { canvas, context } = this.canvasEl;

    this.particles = [];
    context.strokeStyle = "#5C738A";

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
              position: { x, y },
              size: this.gap,
              color,
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
