import { getCurrentUser } from "@/features/user";
import { ReactNode, useCallback, useEffect, useReducer } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  AuthAction,
  AuthContext,
  AuthState,
  authContext,
} from "@/features/auth";

const initialState: AuthState = {
  user: null,
  isLoadingUser: true,
};

function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGGED_IN":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGGED_OUT":
      return {
        ...state,
        user: null,
      };

    case "LOADED_USER":
      return {
        ...state,
        user: action.payload,
        isLoadingUser: false,
      };

    case "UNSET_USER":
      return {
        ...state,
        isLoadingUser: false,
        user: null,
      };

    default:
      return state;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const queryClient = useQueryClient();

  const onLogin: AuthContext["onLogin"] = useCallback(({ user, token }) => {
    localStorage.setItem("accessToken", token);
    dispatch({ type: "LOGGED_IN", payload: user });
  }, []);

  const onLogout: AuthContext["onLogout"] = useCallback(() => {
    queryClient.clear();
    localStorage.removeItem("accessToken");
    dispatch({ type: "LOGGED_OUT" });
  }, [queryClient]);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        dispatch({ type: "LOADED_USER", payload: user });
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch(() => dispatch({ type: "UNSET_USER" }));
  }, []);

  return (
    <authContext.Provider
      value={{
        onLogin,
        onLogout,
        ...state,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
