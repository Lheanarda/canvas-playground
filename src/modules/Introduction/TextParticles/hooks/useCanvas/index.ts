import { RefObject, useEffect, useState } from "react";
import TextEffect from "./classes/TextEffect";
import { CanvasEl } from "@src/typings/canvas";
import useDebouncedValue from "../useDebouncedValue";
import { FONT_FAMILY } from "./constants";

const useCanvas = (ref: RefObject<HTMLCanvasElement>) => {
  const { currentValue, debouncedValue, setCurrentValue } = useDebouncedValue(
    "Hello World",
    1000
  );

  const {
    currentValue: currentValueFF,
    debouncedValue: debouncedValueFF,
    setCurrentValue: setCurrentValueFF,
  } = useDebouncedValue(FONT_FAMILY, 1000);

  const [textEffect, setTextEffect] = useState<TextEffect | null>(null);
  const [canvasEl, setCanvasEl] = useState<null | CanvasEl>(null);
  useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    //settings

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const effect = new TextEffect({
      canvasEl: {
        canvas,
        context,
      },
      text: debouncedValue,
      fontFamily: debouncedValueFF,
    });

    setCanvasEl({ context, canvas });
    setTextEffect(effect);

    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);
      context?.clearRect(0, 0, canvas.width, canvas.height);
      effect.render();
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      effect.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  // update the render when text has been finished typing
  useEffect(() => {
    if (!debouncedValue || !canvasEl || !textEffect || !debouncedValueFF)
      return;
    const { context, canvas } = canvasEl;
    context.clearRect(0, 0, canvas.width, canvas.height);
    textEffect.updateFontFamily(debouncedValueFF);
    textEffect.wrapText(debouncedValue);
  }, [debouncedValue, canvasEl, textEffect, debouncedValueFF]);

  return {
    text: currentValue,
    handleTextChange: setCurrentValue,
    fontFamily: currentValueFF,
    handleFontFamilyChange: setCurrentValueFF,
  };
};

export default useCanvas;
