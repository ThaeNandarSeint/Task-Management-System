import { FallbackProps } from "react-error-boundary";
import { Button, Text } from "..";
import { isAxiosError } from "axios";
import { isRouteErrorResponse } from "react-router";

export const Error = (props: FallbackProps) => {
  const { error, resetErrorBoundary } = props;

  let message = "Something went wrong!";
  const isApiError = isAxiosError(error);

  if (isApiError) {
    message = error.response?.data?.message;
  } else if (isRouteErrorResponse(error)) {
    message = error.statusText;
  } else {
    message = (error as Error)?.message;
  }

  // eslint-disable-next-line no-console
  console.log({ message });

  return (
    <div
      className="w-full min-h-[300px] flex items-center justify-center flex-col"
      role="alert"
    >
      <h2>Oh no! Something went wrong!</h2>
      <Text className="italic">
        Please contact the developers if you see this happening frequently!
      </Text>
      <Button onClick={resetErrorBoundary} className="mt-4">
        Click to go back to Home Page
      </Button>
    </div>
  );
};
