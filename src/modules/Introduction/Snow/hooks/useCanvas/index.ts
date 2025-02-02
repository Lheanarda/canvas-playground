import { RefObject, useEffect, useState } from "react";
import Effect from "./classes/Effect";
import { CanvasEl } from "@src/typings/canvas";

const useCanvas = (ref: RefObject<HTMLCanvasElement>) => {
  const [startSnow, setStartSnow] = useState(false);
  const [snowEffect, setSnowEffect] = useState<null | Effect>(null);
  const [savedCanvasEl, setSavedCanvasEl] = useState<CanvasEl | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    //settings

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId: number;

    const effect = new Effect({ canvasEl: { canvas, context } });

    setSavedCanvasEl({ canvas, context });
    setSnowEffect(effect);

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      context?.clearRect(0, 0, canvas.width, canvas.height);
      effect.update();
    }

    animate();

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId); // Stop animation loop
      context?.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [ref]);

  const handleToggleSnow = () => {
    if (!snowEffect || !savedCanvasEl) return;
    const newValue = !startSnow;
    setStartSnow(newValue);
    snowEffect.updateIsPlaying(newValue);
  };
  return { handleToggleSnow, isSnowing: startSnow };
};

export default useCanvas;
