import { LayoutDashboard, LucideIcon, Music } from "lucide-react";

type TooltipProps =
  | {
      tooltip?: true;
      textTooltip: string;
    }
  | {
      tooltip?: false;
      textTooltip?: never;
    };

type NavLink = TooltipProps & {
  title: string;
  path: string;
  label?: string;
  icon: LucideIcon;
};

export const navLinks: NavLink[] = [
  {
    title: "Dashboard",
    path: "/app",
    icon: LayoutDashboard,
    tooltip: true,
    textTooltip: "Dashboard",
    label: "New",
  },
  {
    title: "Links",
    path: "/app/links",
    icon: Music,
  },
];
