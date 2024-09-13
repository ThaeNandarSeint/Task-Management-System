import { Group, Radio as MantineRadio, RadioGroupProps } from "@mantine/core";
import { Text } from ".";

export const RadioInput = ({
  items,
  label,
  ...props
}: {
  items: { value: string; label: string }[];
  label: string;
} & Omit<RadioGroupProps, "children">) => {
  return (
    <div className="flex flex-col gap-5">
      <Text className="font-medium">{label}</Text>
      <MantineRadio.Group {...props}>
        <Group className="flex flex-col items-start">
          {items.map((item) => (
            <MantineRadio value={item.value} label={item.label} />
          ))}
        </Group>
      </MantineRadio.Group>
    </div>
  );
};
