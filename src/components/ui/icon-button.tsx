import { ActionIcon, ActionIconProps } from "@mantine/core";
import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react";

type Props = ComponentPropsWithoutRef<"button"> & {
  icon: ReactNode;
  variant?: "fill" | "outline" | "subtle" | "transparent";
  size?: ActionIconProps["size"];
};

export const IconButton = forwardRef<HTMLButtonElement, Props>(
  ({ icon, variant = "subtle", ...rest }, ref) => {
    return (
      <ActionIcon {...rest} variant={variant} ref={ref}>
        {icon}
      </ActionIcon>
    );
  },
);
