import { CanvasEl, Position } from "@src/typings/canvas";

interface Props {
  position: Position;
  canvasEl: CanvasEl;
  size: number;
  color: string;
}
class Particle {
  canvasEl = {} as CanvasEl;

  position: Position = {
    x: 0,
    y: 0,
  };

  size = 0;

  color = "";

  constructor(props: Props) {
    this.position = props.position;
    this.canvasEl = props.canvasEl;
    this.size = props.size;
    this.color = props.color;
  }

  draw() {
    const { context } = this.canvasEl;
    context.strokeRect(this.position.x, this.position.y, this.size, this.size);
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  update() {
    this.draw();
  }
}

export default Particle;
