import Breadcrumbs from "@src/components/Breadcrumbs";
import Canvas from "@src/components/canvas";
import React, { useRef } from "react";
import useCanvas from "./hooks/useCanvas";

const ConstellationPage: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useCanvas(ref);
  return (
    <>
      <Breadcrumbs currentPage="Constellation" parent="Sample" />
      <div className="flex items-center justify-center w-full mt-3">
        <div className="relative">
          <div className="absolute left-0 top-0  w-full h-full flex justify-end items-end text-2xl dark:text-blue-100 text-blue-600 font-bold">
            Constellation Effect
          </div>
          <Canvas className=" w-full" ref={ref} />
        </div>
      </div>
    </>
  );
};
export default ConstellationPage;
