import { CanvasEl } from "@src/typings/canvas";

export function getRandomValueFromArray(array: Array<number>) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}
export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getCenterXandY(canvas: CanvasEl["canvas"]) {
  return {
    x: canvas.width / 2,
    y: canvas.height / 2,
  };
}
