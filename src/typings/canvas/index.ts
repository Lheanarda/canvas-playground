export interface Cursor {
  x: number;
  y: number;
  radius: number;
  pressed: boolean;
}
export interface Position {
  x: number;
  y: number;
}

export interface CanvasEl {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
}
