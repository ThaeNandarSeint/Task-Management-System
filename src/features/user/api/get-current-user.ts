import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { User } from "../types";

export const getCurrentUser = async () =>
  api.get<{ payload: User }>("/users/me").then((res) => res.data);

export const useGetCurrentUser = () =>
  useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getCurrentUser(),
  });
