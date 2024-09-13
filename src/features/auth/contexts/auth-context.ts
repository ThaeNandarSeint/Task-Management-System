import { createContext } from "react";
import { AuthContext } from "../types";

export const authContext = createContext<AuthContext>({
  user: null,
  onLogin: () => {},
  onLogout: () => {},
  isLoadingUser: true,
});
