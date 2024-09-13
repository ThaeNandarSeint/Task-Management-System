import { cn } from "@/utils/cn";

interface UserAvatarProps {
  src: string;
  className?: string;
  onClick?: () => void;
}

export const UserAvatar = ({ src, className, onClick }: UserAvatarProps) => {
  return (
    <div className={cn("relative", className)} onClick={onClick}>
      <img
        src={src}
        alt="rounded avatar"
        className="rounded-full w-full h-full object-cover"
      />
    </div>
  );
};
