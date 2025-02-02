import Breadcrumbs from "@src/components/Breadcrumbs";
import Canvas from "@src/components/canvas";
import React, { useRef } from "react";
import useCanvas from "./hooks/useCanvas";

const SnackAndLaddersPage: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useCanvas(ref);
  return (
    <>
      <Breadcrumbs currentPage="Snake and Ladders" parent="Introduction" />
      <div className="flex items-center justify-center w-full mt-3">
        <div className="relative">
          <Canvas className=" w-full" ref={ref} />
        </div>
      </div>
    </>
  );
};
export default SnackAndLaddersPage;
