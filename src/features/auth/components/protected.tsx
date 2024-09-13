import { ReactNode } from "react";
import { useAuth } from "..";
import { LoadingOverlay } from "@/components/ui";
import { Navigate } from "react-router-dom";

export const Protected = ({ children }: { children: ReactNode }) => {
  const { user, isLoadingUser } = useAuth();

  return (
    <>
      {isLoadingUser ? (
        <LoadingOverlay visible />
      ) : user ? (
        children
      ) : (
        <Navigate to="/auth/login" />
      )}
    </>
  );
};
