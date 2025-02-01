import Breadcrumbs from "@src/components/Breadcrumbs";
import Canvas from "@src/components/canvas";
import React, { useRef } from "react";

const FractalsPage: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  return (
    <>
      <Breadcrumbs currentPage="Constellation" parent="Introduction" />
      <div className="flex items-center justify-center w-full mt-3">
        <div className="relative">
          <Canvas className=" w-full" ref={ref} />
        </div>
      </div>
    </>
  );
};
export default FractalsPage;
