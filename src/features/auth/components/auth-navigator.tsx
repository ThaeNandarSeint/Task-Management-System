import { Link, Text } from "@/components";
import { Link as RouterLink } from "react-router-dom";

export const AuthNavigator = ({
  description,
  href,
  title,
}: {
  description: string;
  href: string;
  title: string;
}) => {
  return (
    <div className="flex justify-center items-center gap-1">
      <Text className="text-gray-500">{description}</Text>
      <Link
        className="underline"
        color="secondary"
        component={RouterLink}
        to={href}
      >
        {title}
      </Link>
    </div>
  );
};
