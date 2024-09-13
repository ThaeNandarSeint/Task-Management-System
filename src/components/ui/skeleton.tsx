import { Skeleton as MantineSkeleton } from "@mantine/core";

type Props = {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  animate?: boolean;
  className?: string;
};

export const Skeleton = (props: Props) => {
  return <MantineSkeleton {...props} />;
};
