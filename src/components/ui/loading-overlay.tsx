import clsx from "clsx";
import { Loader } from "..";
import { OptionalPortal } from "@mantine/core";

type Props = {
  visible?: boolean;
  position?: "absolute" | "fixed";
};

export const LoadingOverlay = ({
  visible = false,
  position = "fixed",
}: Props) => {
  const element = (
    <div
      className={clsx([
        "flex items-center justify-center inset-0 w-full h-full absolute z-[9999]",
        position,
      ])}
    >
      <div className="absolute inset-0 bg-black/30 w-full h-full backdrop-blur-sm"></div>
      <span>
        <Loader />
      </span>
    </div>
  );

  return (
    <>
      {visible ? (
        <OptionalPortal withinPortal={false}>{element}</OptionalPortal>
      ) : null}
    </>
  );
};
