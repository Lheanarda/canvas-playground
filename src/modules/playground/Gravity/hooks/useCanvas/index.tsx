import { RefObject, useEffect } from "react";
import Ball from "./classes/Ball";
import { getCenterXandY } from "@src/modules/Introduction/SnakeAndLadders/hooks/useCanvas/utils";
const useCanvas = (ref: RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    //settings

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const canvasCenter = getCenterXandY(canvas);
    const ball = new Ball({
      canvasEl: { canvas, context },
      mass: 1,
      position: canvasCenter,
      radius: 100,
    });

    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      context?.clearRect(0, 0, canvas.width, canvas.height);
      ball.update();
    }

    animate();

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId); // Stop animation loop
    };
  }, [ref]);
};

export default useCanvas;
