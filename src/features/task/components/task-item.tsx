import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export const TaskItem = ({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={cn(
        "border border-solid w-2/3 p-3 rounded-lg border-black text-black font-medium flex justify-between items-center",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
