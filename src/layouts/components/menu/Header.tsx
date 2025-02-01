import { LogoTraveloka, LogoTravelokawhite } from "@src/lib/constants/imgSrc";
import useTheme from "@src/lib/hooks/useTheme";
import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  t?: boolean;
}

const Header: React.FC<HeaderProps> = ({}) => {
  const { theme } = useTheme();

  return (
    <Link to="/" className="flex items-center ">
      <img
        src={theme === "dark" ? LogoTravelokawhite : LogoTraveloka}
        alt="Emos"
        className="w-[80%] ml-2 mt-2 -mb-2"
      />
    </Link>
  );
};
export default Header;
