import Breadcrumbs from "@src/components/Breadcrumbs";
import Canvas from "@src/components/canvas";
import React, { useRef } from "react";
import useCanvas from "./hooks/useCanvas";

const SnowPage: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useCanvas(ref);
  return (
    <>
      <Canvas
        className="w-full absolute -z-10 left-0 top-0 bg-black"
        ref={ref}
      />
      <Breadcrumbs currentPage="Snow" parent="Introduction" />
      <div className="flex items-center justify-center w-full mt-3">
        <div className="relative">
          <div className="absolute left-0 top-0  w-full h-full flex justify-end items-end text-2xl dark:text-blue-100 text-blue-600 font-bold">
            Snow Effect
          </div>
        </div>
      </div>
    </>
  );
};
export default SnowPage;
