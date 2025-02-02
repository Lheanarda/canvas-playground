// eslint-disable-next-line import/extensions
import { Theme } from "./../lib/contexts/ThemeContext";

interface ThemeConfig {
  defaultSkin: Theme;
  defaultFullscreen: boolean;
}

const themeConfig: ThemeConfig = {
  defaultSkin: "dark", //light | dark
  defaultFullscreen: false,
};

export default themeConfig;
