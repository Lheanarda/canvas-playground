import { CanvasEl } from "@src/typings/canvas";

export type Direction = "left" | "right" | "up";
export type BoardAction = {
  boardIndex: number;
  type: "up" | "down";
  boardIndexDestination: number;
};
interface Props {
  canvasEl: CanvasEl;
  x: number;
  y: number;
  size: number;
  boardIndex: number;
  direction: Direction;
  action: BoardAction;
}
class Block {
  canvasEl: CanvasEl = {} as CanvasEl;

  size = 0;

  x = 0;

  y = 0;

  boardIndex = 0;

  direction: Direction = "right";

  action: BoardAction = {} as BoardAction;

  constructor(props: Props) {
    this.canvasEl = props.canvasEl;
    this.size = props.size;
    this.x = props.x;
    this.y = props.y;
    this.boardIndex = props.boardIndex;
    this.direction = props.direction;
    this.action = props.action;
  }

  draw() {
    const ctx = this.canvasEl.context;
    ctx.lineWidth = 1;
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.x, this.y, this.size, this.size);

    ctx.font = "14px Permanent Marker";
    ctx.fillStyle = "#991b1b";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
  }

  getCenter() {
    console.log(this.x, this.y);
    return {
      x: this.x + this.size / 2,
      y: this.y + this.size / 2,
    };
  }
}

export default Block;
