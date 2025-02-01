import Breadcrumbs from "@src/components/Breadcrumbs";
import Canvas from "@src/components/canvas";
import React, { useRef } from "react";
import useCanvas from "./hooks/useCanvas";

const FractalsPage: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  const { Spread, OffsieBranchEffect } = useCanvas(ref);
  return (
    <>
      <Breadcrumbs currentPage="Constellation" parent="Introduction" />
      <div className="flex items-center justify-center w-full mt-3">
        <div className="relative">
          <div className="absolute left-0 top-0 space-y-3 w-full h-full flex flex-col justify-start items-start text-2xl dark:text-blue-100 text-blue-600 font-bold">
            <div className="flex-col flex">
              <label htmlFor="spread" className="text-sm mb-1">
                Spread: {Spread.value}
              </label>
              <input
                id="spread"
                type="range"
                min="-3.1"
                max="3.1"
                step="0.1"
                value={Spread.value}
                onChange={(e) => Spread.set(parseFloat(e.target.value))}
              />
            </div>

            <div className="flex-col flex">
              <label htmlFor="spread" className="text-sm mb-1">
                Offside Effect: {OffsieBranchEffect.value}
              </label>
              <input
                id="spread"
                type="range"
                min="-100"
                max="100"
                step="1"
                value={OffsieBranchEffect.value}
                onChange={(e) =>
                  OffsieBranchEffect.set(parseInt(e.target.value))
                }
              />
            </div>
            <div className="absolute right-0 bottom-0 text-2xl dark:text-blue-100 text-blue-600 font-bold">
              Fractals
            </div>
          </div>
          <Canvas className="w-[90%]" ref={ref} />
        </div>
      </div>
    </>
  );
};
export default FractalsPage;
