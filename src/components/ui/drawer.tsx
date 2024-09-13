import { Drawer as MantineDrawer } from "@mantine/core";
import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  position?: "right" | "left" | "top" | "bottom";
  size?: string | number;
};

export const Drawer = ({
  children,
  isOpen,
  onClose,
  title,
  position = "right",
  ...props
}: Props) => {
  return (
    <MantineDrawer
      {...props}
      opened={isOpen}
      onClose={onClose}
      title={title}
      position={position}
      classNames={{
        body: "p-0",
      }}
    >
      {children}
    </MantineDrawer>
  );
};
