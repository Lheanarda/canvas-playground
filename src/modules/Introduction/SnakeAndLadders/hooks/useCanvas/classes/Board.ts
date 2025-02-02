import { CanvasEl } from "@src/typings/canvas";

interface Props {
  imageSrc: string;
  width: number;
  height: number;
  x: number;
  y: number;
  canvasEl: CanvasEl;
}
class Board {
  canvasEl = {} as CanvasEl;

  imageSrc = "";

  image = {} as HTMLImageElement;

  x = 0;

  y = 0;

  width = 0;

  height = 0;

  constructor(props: Props) {
    this.canvasEl = props.canvasEl;
    this.imageSrc = props.imageSrc;
    this.image = new Image();
    this.image.src = this.imageSrc;

    this.x = props.x;
    this.y = props.y;
    this.width = props.width;
    this.height = props.height;
  }

  draw() {
    const ctx = this.canvasEl.context;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export default Board;
