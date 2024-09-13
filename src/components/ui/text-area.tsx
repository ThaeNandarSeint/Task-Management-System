import { Textarea as MantineTextarea, TextareaProps } from "@mantine/core";
import { ComponentProps, ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label?: ReactNode;
  registration?: Partial<UseFormRegisterReturn>;
  size?: TextareaProps["size"];
  error?: string | boolean;
  withAsterisk?: boolean;
  autosize?: boolean;
  minRows?: number;
  maxRows?: number;
  placeholder?: string;
  rows?: number;
  readonly?: boolean;
  disabled?: boolean;
} & Pick<
  ComponentProps<"textarea">,
  "onChange" | "className" | "disabled" | "value" | "defaultValue"
>;

export const Textarea = ({ registration, ...props }: Props) => {
  return <MantineTextarea {...props} {...registration} />;
};
