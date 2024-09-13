import Magnifier from "@/assets/icons/magnifier.svg?react";
import Calendar from "@/assets/icons/calendar.svg?react";
import Export from "@/assets/icons/export.svg?react";
import DashboardActive from "@/assets/icons/dashboard-active.svg?react";
import DashboardInActive from "@/assets/icons/dashboard-inactive.svg?react";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";

import { ComponentProps, ReactElement, forwardRef } from "react";

const icons = {
  magnifier: Magnifier,
  calendar: Calendar,
  export: Export,
  dashboardActive: DashboardActive,
  dashboardInActive: DashboardInActive,
  chevronDown: ChevronDown,
};

export type IconName = keyof typeof icons;

type Props = {
  name: IconName;
} & ComponentProps<"svg">;

export const Icon = forwardRef<SVGSVGElement, Props>(
  ({ name, ...props }, ref) => {
    const Component = icons[name];
    return (<Component fill="white" {...props} ref={ref} />) as ReactElement;
  },
);
