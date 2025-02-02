import { Velocity } from "@src/modules/Introduction/Constellation/hooks/useCanvas/typings/particle";
import { CanvasEl, Position } from "@src/typings/canvas";

const RESET_POSITION_PX = 1;
interface Props {
  position: Position;
  canvasEl: CanvasEl;
  radius: number;
}
class Particle {
  position: Position = {
    x: 0,
    y: 0,
  };

  canvasEl: CanvasEl = {} as CanvasEl;

  radius = 0;

  velocity: Velocity = {
    x: Math.random() * -0.4, // between 0.1 and 0.5
    y: Math.random() * 0.5, // between 1 and 0.5
  };

  constructor(props: Props) {
    this.canvasEl = props.canvasEl;
    this.radius = props.radius;
    this.position = props.position;
  }

  draw() {
    const { context } = this.canvasEl;
    const { x, y } = this.position;
    context.beginPath();
    context.arc(x, y, this.radius, 0, Math.PI * 2);
    context.fill();
  }

  update() {
    const { canvas } = this.canvasEl;
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // reset the position and speed logic
    if (this.position.y > canvas.height + RESET_POSITION_PX) {
      this.position.y = -canvas.height / 3; // reset the position y
      this.position.x =
        Math.random() * (canvas.width / 3 + canvas.width / 3 - canvas.width) +
        canvas.width;
    }
    if (this.position.x < -canvas.width - RESET_POSITION_PX) {
      this.position.y = -canvas.height / 3; // reset the position y
      this.position.x =
        Math.random() * (canvas.width / 3 + canvas.width / 3 - canvas.width) +
        canvas.width; // reset the position x
    }
  }
}

export default Particle;
