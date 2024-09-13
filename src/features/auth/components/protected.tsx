import { ReactNode } from "react";
import { useAuth } from "..";
import { Navigate } from "react-router-dom";
import { LoadingOverlay } from "@mantine/core";

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
