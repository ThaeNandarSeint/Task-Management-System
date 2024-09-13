import { ReactNode } from "react";
import { Tooltip as MantineTooltip, TooltipProps } from "@mantine/core";
import clsx from "clsx";

type Props = {
  children?: ReactNode;
  label: ReactNode;
  position?: TooltipProps["position"];
  width?: string | number;
  multiline?: boolean;
  className?: string;
};

export const Tooltip = ({
  children,
  label,
  position = "right",
  width,
  multiline,
  className,
}: Props) => {
  return (
    <MantineTooltip
      label={label}
      position={position}
      withArrow
      className={clsx(["bg-white text-black shadow-xl", className])}
      w={width}
      multiline={multiline}
      arrowSize={7}
    >
      {children}
    </MantineTooltip>
  );
};
