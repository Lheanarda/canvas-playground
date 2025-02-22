import Breadcrumbs from "@src/components/Breadcrumbs";
import Canvas from "@src/components/canvas";
import React, { useRef } from "react";
import useCanvas from "./hooks/useCanvas";

const SnackAndLaddersPage: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const { debug, handleUpdateDebug } = useCanvas(ref);
  return (
    <>
      <Breadcrumbs currentPage="Snake and Ladders" parent="Sample" />
      <div className="flex items-center justify-center w-full mt-3">
        <div className="relative">
          <div className="absolute  right-0 top-0">
            <div className="space-x-1 text-sm flex items-center cursor-pointer   font-bold">
              <input
                type="checkbox"
                id="debug"
                className="cursor-pointer"
                checked={debug}
                onChange={(e) => handleUpdateDebug(e.target.checked)}
              />
              <label htmlFor="debug" className="cursor-pointer">
                Debug
              </label>
            </div>
          </div>
          <div className="absolute right-0 bottom-8 text-xs ">
            Press <span className="font-bold">WASD</span> to move the player
          </div>
          <div className="absolute right-0 bottom-0 text-2xl font-bold">
            Snack And Ladders
          </div>
          <Canvas className="w-full" ref={ref} />
        </div>
      </div>
    </>
  );
};
export default SnackAndLaddersPage;
