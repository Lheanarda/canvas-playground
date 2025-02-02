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

  debug = false;

  constructor(props: Props) {
    this.canvasEl = props.canvasEl;
    this.size = props.size;
    this.x = props.x;
    this.y = props.y;
    this.boardIndex = props.boardIndex;
    this.direction = props.direction;
    this.action = props.action;
    this.debug = false;
  }

  draw() {
    const ctx = this.canvasEl.context;
    ctx.lineWidth = 1;
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.x, this.y, this.size, this.size);

    ctx.font = "14px Permanent Marker";
    ctx.fillStyle = "orangered";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.strokeStyle = "black";

    if (this.debug) {
      const centerX = this.x + this.size / 2; // Horizontal center of the area
      const centerY = this.y + this.size / 2; // Vertical center of the area
      ctx.fillText(this.boardIndex.toString(), centerX, centerY);
      ctx.strokeRect(this.x, this.y, this.size, this.size);
    }
  }

  getCenter() {
    return {
      x: this.x + this.size / 2,
      y: this.y + this.size / 2,
    };
  }

  setDebug(isDebug: boolean) {
    this.debug = isDebug;
  }
}

export default Block;
