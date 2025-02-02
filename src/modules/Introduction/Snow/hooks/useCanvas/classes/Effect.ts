import { CanvasEl } from "@src/typings/canvas";
import Particle from "./Particle";

const TOTAL_PARTICLES = 200;
interface Props {
  canvasEl: CanvasEl;
}
class Effect {
  canvasEl: CanvasEl = {} as CanvasEl;

  isPlaying = false;

  particles: Particle[] = [];

  constructor(props: Props) {
    this.canvasEl = props.canvasEl;
    this.createParticles();
  }

  update() {
    if (this.isPlaying) {
      this.particles.forEach((p) => p.update());
    }
  }

  updateIsPlaying(play: boolean) {
    this.isPlaying = play;
  }

  createParticles() {
    const { context: ctx, canvas } = this.canvasEl;
    const radius = Math.random() * (2.5 - 0.8) + 0.8; // between 2 and 5
    ctx.fillStyle = "white";

    for (let i = 0; i < TOTAL_PARTICLES; i++) {
      this.particles.push(
        new Particle({
          canvasEl: this.canvasEl,
          position: {
            x:
              Math.random() *
                (canvas.width / 3 + canvas.width / 3 - canvas.width) +
              canvas.width,
            y: Math.random() * (0 - -canvas.height) + -canvas.height, // between 0 and minus canvas height
          },
          radius,
        })
      );
    }
  }
}

export default Effect;
