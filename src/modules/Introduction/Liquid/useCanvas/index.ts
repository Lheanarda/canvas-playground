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

    const effect = new Effect({
      canvasEl: { context, canvas },
    });

    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);
      context?.clearRect(0, 0, canvas.width, canvas.height);
      effect.handleParticles();
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      effect.destroy();
    };
  }, [ref]);
};

export default useCanvas;
