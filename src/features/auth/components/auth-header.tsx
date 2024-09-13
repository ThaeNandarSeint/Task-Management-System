import { Title, Text } from "@/components";

export const AuthHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <Title className="text-4xl font-medium">{title}</Title>
      <Text className="text-gray-500">{description}</Text>
    </div>
  );
};
