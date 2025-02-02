import { CanvasEl } from "@src/typings/canvas";

export function getCenterXandY(canvas: CanvasEl["canvas"]) {
  return {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };
}

export function generateFontSize(canvas: CanvasEl["canvas"]) {
  if (canvas.width <= 600) {
    return 80;
  } else {
    return 130;
  }
}
