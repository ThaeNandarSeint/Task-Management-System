import { MantineProvider } from "@mantine/core";
import { theme } from "@/styles/theme";
import { AuthProvider } from "@/features/auth";
import { RouterProvider } from "react-router-dom";
import { routes } from "@/routes";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/react-query";

export const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications position="top-right" />
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};
