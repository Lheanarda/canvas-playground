import Breadcrumbs from "@src/components/Breadcrumbs";
import Canvas from "@src/components/canvas";
import React, { useRef } from "react";
import useCanvas from "./hooks/useCanvas";

const ConstellationPage: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useCanvas(ref, containerRef);
  return (
    <>
      <Breadcrumbs currentPage="Constellation" parent="introduction" />
      <div
        className="flex items-center justify-center w-full mt-3"
        ref={containerRef}
      >
        <div className="relative">
          <div className="absolute left-0 top-0  w-full h-full flex justify-end items-end text-2xl dark:text-blue-100 text-blue-600 font-bold">
            Constilleation Effect
          </div>
          <Canvas className=" w-full" ref={ref} />
        </div>
      </div>
    </>
  );
};
export default ConstellationPage;
