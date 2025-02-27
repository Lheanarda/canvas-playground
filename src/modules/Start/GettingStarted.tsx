import Breadcrumbs from "@src/components/Breadcrumbs";
import Canvas from "@src/components/canvas";
import React, { useRef } from "react";
import useCanvas from "./hooks/useCanvas";
import CanvasPresentation from "./Claude";

const StartPage: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useCanvas(ref);
  return (
    <>
      <Breadcrumbs currentPage=" Getting Started" parent="Canvas HTML" />
      {/* <Canvas className=" w-full" ref={ref} /> */}
      <CanvasPresentation />
    </>
  );
};
export default StartPage;
