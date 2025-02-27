import { CanvasEl } from "@src/typings/canvas";
import Ball from "./Ball";
import { getCursorPosition } from "@src/lib/utils/canvas";

interface Props {
  canvasEl: CanvasEl;
}

class Effect {
  canvasEl = {} as CanvasEl;

  bigBall = {} as Ball;

  smallBall = {} as Ball;

  dx = 0;

  dy = 0;

  distance = 0;

  private handleMouseMove = {} as (e: MouseEvent) => void;

  constructor(props: Props) {
    this.canvasEl = props.canvasEl;
    this.bigBall = new Ball({
      x: this.canvasEl.canvas.width / 2,
      y: this.canvasEl.canvas.height / 2,
      radius: 150,
      color: "blue",
      canvasEl: props.canvasEl,
    });
    this.smallBall = new Ball({
      x: 0,
      y: 0,
      radius: 50,
      color: "red",
      canvasEl: props.canvasEl,
    });

    this.handleMouseMove = (e) => {
      const { canvas } = this.canvasEl;
      const { x, y } = getCursorPosition({
        canvas,
        cursorX: e.x,
        cursorY: e.y,
      });
      this.smallBall.updatePosition?.(x, y);
    };

    window.addEventListener("mousemove", this.handleMouseMove);
    this.canvasEl.context.font = "16px Arial";
  }

  getDistance() {
    this.dx = this.bigBall.x - this.smallBall.x;
    this.dy = this.bigBall.y - this.smallBall.y;
    this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
  }

  drawLineBetweenBalls() {
    const { context } = this.canvasEl;

    context.beginPath();

    // x line
    context.moveTo(this.bigBall.x, this.bigBall.y);
    context.lineTo(this.smallBall.x, this.bigBall.y);
    context.fillText(
      `dx: ${this.dx.toFixed(2)}`,
      (this.bigBall.x - this.smallBall.x) / 2 + this.smallBall.x,
      this.bigBall.y + 20
    );
    context.stroke();

    // y line
    context.moveTo(this.smallBall.x, this.bigBall.y);
    context.lineTo(this.smallBall.x, this.smallBall.y);
    context.fillText(
      `dy: ${this.dy.toFixed(2)}`,
      this.smallBall.x + 15,
      (this.bigBall.y - this.smallBall.y) / 2 + this.smallBall.y
    );
    context.stroke();

    // distance line
    context.moveTo(this.bigBall.x, this.bigBall.y);
    context.lineTo(this.smallBall.x, this.smallBall.y);
    context.stroke();
    context.fillText(
      `d: ${this.distance.toFixed(2)}`,
      (this.bigBall.x - this.smallBall.x) / 2 + this.smallBall.x,
      (this.bigBall.y - this.smallBall.y) / 2 + this.smallBall.y
    );
    context.closePath();
  }

  update() {
    this.bigBall.update();
    this.smallBall.update();

    // assign distance to classes property
    this.getDistance();

    // collision detection
    if (this.distance < this.bigBall.radius + this.smallBall.radius) {
      this.bigBall.updateColor("brown");
    } else {
      this.bigBall.updateColor("blue");
    }

    this.drawLineBetweenBalls();
  }

  destroy() {
    this.canvasEl.context.clearRect(
      0,
      0,
      this.canvasEl.canvas.width,
      this.canvasEl.canvas.height
    );
    window.removeEventListener("mousemove", this.handleMouseMove);
  }
}

export default Effect;
