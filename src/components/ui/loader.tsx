import clsx from "clsx";
import classes from "@/css/loader.module.css";

export const Loader = ({ className }: { className?: string }) => {
  return <span className={clsx(classes.loader, className)}></span>;
};
