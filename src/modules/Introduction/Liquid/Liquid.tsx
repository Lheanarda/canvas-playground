import Breadcrumbs from "@src/components/Breadcrumbs";
import Canvas from "@src/components/canvas";
import React, { useRef } from "react";
import useCanvas from "./useCanvas";

const LiquidPage: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useCanvas(ref);
  return (
    <>
      <Breadcrumbs currentPage="Liquid" parent="Sample" />
      <div className="flex items-center justify-center w-full mt-3">
        <div className="relative">
          <Canvas
            className="w-full bg-neutral-900 blur-[7px] contrast-[20]"
            ref={ref}
          />
          <div className="absolute left-0 top-0  w-full h-full flex justify-end items-end text-2xl dark:text-blue-100 text-blue-600 font-bold">
            Liquid Effect
          </div>
        </div>
      </div>
    </>
  );
};
export default LiquidPage;
