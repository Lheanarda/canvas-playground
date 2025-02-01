import { CanvasHTMLAttributes, forwardRef } from "react";

type CanvasProps = CanvasHTMLAttributes<HTMLCanvasElement>;

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(function Canvas(
  { ...rest },
  ref
) {
  return <canvas {...rest} ref={ref}></canvas>;
});

export default Canvas;
