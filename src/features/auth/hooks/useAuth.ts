import { useContext } from "react";
import { authContext } from "@/features/auth";

export const useAuth = () => useContext(authContext);
