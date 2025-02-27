import { CanvasEl } from "@src/typings/canvas";

interface Props {
  x: number;
  y: number;
  radius: number;
  color: string;
  canvasEl: CanvasEl;
}
class Ball {
  x = 0;

  y = 0;

  radius = 0;

  color = "";

  canvasEl = {} as CanvasEl;

  constructor(props: Props) {
    this.x = props.x;
    this.y = props.y;
    this.radius = props.radius;
    this.color = props.color;
    this.canvasEl = props.canvasEl;
  }

  draw() {
    const { context } = this.canvasEl;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }

  updatePosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  updateColor(color: string) {
    this.color = color;
  }

  update() {
    this.draw();
  }
}

export default Ball;
