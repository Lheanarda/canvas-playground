import { PauseIcon, PlayIcon } from "@heroicons/react/outline";
import Canvas from "@src/components/canvas";
import useThemeColor from "@src/lib/hooks/useTheme";
import useCanvas from "@src/modules/Introduction/Snow/hooks/useCanvas";
import React, { useRef } from "react";

const ToggleTheme: React.FC = ({}) => {
  const appTheme = useThemeColor();
  const ref = useRef<HTMLCanvasElement>(null);
  const { handleToggleSnow, isSnowing } = useCanvas(ref);

  const RenderedIcon: React.FC<{ className: string }> = ({ className }) => {
    if (isSnowing) return <PauseIcon className={className} />;
    return <PlayIcon className={className} />;
  };

  return (
    <>
      <Canvas
        className="w-full absolute z-50 pointer-events-none left-0 top-0"
        ref={ref}
      />
      <button
        onClick={handleToggleSnow}
        className="flex space-x-2 items-center"
      >
        <RenderedIcon className={`${appTheme.text} w-8 h-8 ml-3`} />
        <span className="font-bold text-xs">
          {isSnowing ? "Snow off" : "Snow on"}
        </span>
      </button>
    </>
  );
};
export default ToggleTheme;
