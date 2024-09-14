import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export const TaskCard = ({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-full p-3 rounded-lg text-black font-medium flex justify-between items-center bg-white shadow-md",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
