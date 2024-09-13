import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const getCurrentUser = async () =>
  api.get("/customers/me").then((res) => res.data);

export const useGetCurrentUser = () =>
  useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getCurrentUser(),
  });
