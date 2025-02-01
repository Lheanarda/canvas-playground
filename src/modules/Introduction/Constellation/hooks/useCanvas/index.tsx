import { RefObject, useEffect } from "react";
import EffectParticles from "./classes/EffectParticles";

const useCanvas = (
  ref: RefObject<HTMLCanvasElement>,
  containerRef: RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    if (!ref.current) return;
    if (!containerRef?.current) return;
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

    function animate() {
      requestAnimationFrame(animate);
      context?.clearRect(0, 0, canvas.width, canvas.height);
      effectParticles.handleParticles();
    }

    animate();
  }, [ref, containerRef]);
};

export default useCanvas;
