import { RefObject, useEffect } from "react";
import EffectParticles from "./classes/EffectParticles";

const useCanvas = (ref: RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    //settings

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const effectParticles = new EffectParticles({
      canvasEl: {
        canvas,
        context,
      },
      size: {
        width: canvas.width,
        height: canvas.height,
      },
    });

    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      context?.clearRect(0, 0, canvas.width, canvas.height);
      effectParticles.handleParticles();
    }

    animate();

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId); // Stop animation loop
      effectParticles.destroy(); // Call the cleanup method
    };
  }, [ref]);
};

export default useCanvas;
