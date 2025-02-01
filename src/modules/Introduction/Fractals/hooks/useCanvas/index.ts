import { RefObject, useEffect, useState } from "react";
import Fractal from "./classes/Fractal";

const useCanvas = (ref: RefObject<HTMLCanvasElement>) => {
  const [spread, setSpread] = useState(1);
  const [offsideBranchEffect, setOffsideBranchEffect] = useState(0);
  const [pageFractal, setPageFractal] = useState<Fractal | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!context) return;

    //settings
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fractal = new Fractal({
      canvasEl: { canvas, context },
      lineWidth: Math.floor(Math.random() * 20 + 10),
      maxLevel: 3,
      scale: 0.7,
      sides: 5,
      spread,
    });
    setPageFractal(fractal);
    function animate() {
      fractal.update();
      requestAnimationFrame(animate);
    }
    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  const handleSpread = (newSpreadValue: number) => {
    if (!pageFractal) return;
    setSpread(newSpreadValue);
    pageFractal.updateSpread(newSpreadValue);
  };

  const handleOffsideBranchEffect = (newOffsideBranchEffect: number) => {
    if (!pageFractal) return;
    setOffsideBranchEffect(newOffsideBranchEffect);
    pageFractal.updateOffsideBranchEffect(newOffsideBranchEffect);
  };

  return {
    Spread: { value: spread, set: handleSpread },
    OffsieBranchEffect: {
      value: offsideBranchEffect,
      set: handleOffsideBranchEffect,
    },
  };
};

export default useCanvas;
