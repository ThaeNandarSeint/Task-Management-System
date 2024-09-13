import { Text as MantineText, TextProps } from "@mantine/core";
import { ComponentPropsWithoutRef } from "react";

type Props = {
  fz?: TextProps["fz"];
  fw?: TextProps["fw"];
  ta?: TextProps["ta"];
  truncate?: boolean;
} & ComponentPropsWithoutRef<"p">;

export const Text = ({ ...rest }: Props) => {
  return <MantineText {...rest}></MantineText>;
};
