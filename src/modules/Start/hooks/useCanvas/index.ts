import { RefObject, useEffect } from "react";

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

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      context?.clearRect(0, 0, canvas.width, canvas.height);
    }

    animate();

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId); // Stop animation loop
    };
  }, [ref]);
};

export default useCanvas;
