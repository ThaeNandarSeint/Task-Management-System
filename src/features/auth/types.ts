import { User } from "@/features/user";

export type AuthContext = {
  user: User | null;
  onLogin: (value: { user: User }) => void;
  onLogout: () => void;
  isLoadingUser: boolean;
};

export type AuthState = {
  user: User | null;
  isLoadingUser: boolean;
};

export type AuthAction =
  | {
      type: "LOGGED_IN";
      payload: User;
    }
  | {
      type: "LOADED_USER";
      payload: User;
    }
  | {
      type: "UNSET_USER";
    }
  | {
      type: "LOGGED_OUT";
    };
