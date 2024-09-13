import { useNavigate } from "react-router-dom";
import { Button, Text } from "..";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-[200px] flex items-center justify-center flex-col">
      <h2>404 Page Not Found</h2>
      <Text>The page you were looking for was not found.</Text>
      <Button onClick={() => navigate("/")} className="mt-4">
        Go to Home Page
      </Button>
    </div>
  );
};
