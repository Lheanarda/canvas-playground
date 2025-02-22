import { RefObject, useEffect } from "react";
import Effect from "./classes/Effect";

const useCanvas = (ref: RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    //settings

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId: number;

    const effect = new Effect({ canvasEl: { canvas, context }, gap: 3 });

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      context?.clearRect(0, 0, canvas.width, canvas.height);
      effect.handleParticles();
    }

    animate();

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId); // Stop animation loop
      effect.destroy();
    };
  }, [ref]);
};

export default useCanvas;
