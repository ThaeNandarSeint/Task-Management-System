import { Error } from "..";
import { Outlet, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Protected } from "@/features/auth";

export const MainLayout = () => {
  const navigate = useNavigate();

  return (
    <Protected>
      <div className="border-2 py-3 flex flex-col gap-3 xs:px-3 sm:px-3 lg:px-32">
        <ErrorBoundary
          fallbackRender={Error}
          key={location.pathname}
          onReset={() => {
            navigate("/");
          }}
        >
          <Outlet />
        </ErrorBoundary>
      </div>
    </Protected>
  );
};
