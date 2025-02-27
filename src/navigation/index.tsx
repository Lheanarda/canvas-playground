import {
  LibraryIcon,
  PlayIcon,
  AcademicCapIcon,
} from "@heroicons/react/outline";
import { Navigations } from "@src/typings/navigation";

const EmptyIcon = () => null;
const navigations: Navigations = [
  {
    id: "basic",
    navLink: "/start",
    Icon: () => <AcademicCapIcon className="w-6 h-6" />,
    title: "Getting Started",
  },
  {
    id: "basic",
    navLink: "#",
    Icon: () => <LibraryIcon className="w-6 h-6" />,
    title: "Sample",
    children: [
      {
        id: "constellation",
        navLink: "/constellation",
        Icon: EmptyIcon,
        title: "Constellation",
      },
      {
        id: "bubble",
        navLink: "/bubble",
        Icon: EmptyIcon,
        title: "Bubble",
      },
      {
        id: "liquid",
        navLink: "/liquid",
        Icon: EmptyIcon,
        title: "Liquid",
      },
      {
        id: "fractals",
        navLink: "/fractals",
        Icon: EmptyIcon,
        title: "Fractals",
      },
      {
        id: "text-particles",
        navLink: "/text-particles",
        Icon: EmptyIcon,
        title: "Text Particles",
      },
      {
        id: "snake-and-ladders",
        navLink: "/snake-and-ladders",
        Icon: EmptyIcon,
        title: "Snake and Ladders",
      },
      {
        id: "framer",
        navLink: "/framer",
        Icon: EmptyIcon,
        title: "Framer Motion ?",
      },
    ],
  },
  {
    id: "playground",
    navLink: "#",
    Icon: () => <PlayIcon className="w-6 h-6" />,
    title: "Playground",
    children: [
      {
        id: "gravity",
        navLink: "/gravity",
        Icon: EmptyIcon,
        title: "Gravity",
      },
      {
        id: "collision",
        navLink: "/collision",
        Icon: EmptyIcon,
        title: "Collision",
      },
      {
        id: "converter",
        navLink: "/converter",
        Icon: EmptyIcon,
        title: "Converter",
      },
      {
        id: "code",
        navLink: "/code",
        Icon: EmptyIcon,
        title: "Code",
      },
    ],
  },
];

export default navigations;
