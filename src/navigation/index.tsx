import { LibraryIcon, PlayIcon } from "@heroicons/react/outline";
import { Navigations } from "@src/typings/navigation";

const EmptyIcon = () => null;
const navigations: Navigations = [
  {
    id: "basic",
    navLink: "#",
    Icon: () => <LibraryIcon className="w-6 h-6" />,
    title: "Introduction",
    children: [
      {
        id: "constellation",
        navLink: "/constellation",
        Icon: EmptyIcon,
        title: "Constellation",
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
        navLink: "/users",
        Icon: EmptyIcon,
        title: "Gravity",
      },
    ],
  },
];

export default navigations;
