import ToggleScreen from "@src/components/ToggleScreen";
import ToggleTheme from "@src/components/ToggleTheme";
import { SM_BREAKPOINT } from "@src/lib/constants/constant";
import useTheme from "@src/lib/hooks/useTheme";
import useWindowDimensions from "@src/lib/hooks/useWindowDimension";
import React from "react";
import ToggleMenu from "./ToggleMenu";
import { GlobeAltIcon } from "@heroicons/react/outline";
import ToggleSnow from "./ToggleSnow";

const Navbar: React.FC = ({}) => {
  const appTheme = useTheme();
  const { width } = useWindowDimensions();

  return (
    <>
      <div className="pt-8 flex justify-between px-5 w-full lg:pt-14 lg:px-10">
        <div className="flex items-center">
          <ToggleMenu />
          <ToggleTheme />
          {width > SM_BREAKPOINT && <ToggleScreen />}
          <ToggleSnow />
        </div>
        <div className={`relative flex items-center  ${appTheme.text}`}>
          <GlobeAltIcon className={` w-7 h-7 mr-2`} />
          <div>Canvas Playground</div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
