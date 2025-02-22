import Breadcrumbs from "@src/components/Breadcrumbs";
import Canvas from "@src/components/canvas";
import React, { useRef } from "react";
import useCanvas from "./hooks/useCanvas";

const TextParticlesPage: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const { handleTextChange, text, fontFamily, handleFontFamilyChange } =
    useCanvas(ref);
  return (
    <>
      <Breadcrumbs currentPage="Text Particles" parent="Sample" />
      <div className="flex items-center justify-center w-full mt-3">
        <div className="relative">
          <div className="absolute left-0 top-0 space-y-3 w-full h-full flex flex-col justify-start items-start   font-bold">
            <div className="space-y-1">
              <div className="text-xs">Font Family</div>
              <input
                type="text"
                placeholder="Text"
                className="py-1 px-2 text-sm rounded text-black"
                value={fontFamily}
                onChange={(e) => handleFontFamilyChange(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <div className="text-xs">Particled Text </div>
              <input
                type="text"
                placeholder="Text"
                className="py-1 px-2 text-sm rounded text-black"
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
              />
            </div>
          </div>
          <Canvas className=" w-[90%]" ref={ref} />
          <div className="absolute right-0 bottom-0 text-2xl dark:text-blue-100 text-blue-600 font-bold">
            Text Particles
          </div>
        </div>
      </div>
    </>
  );
};
export default TextParticlesPage;
