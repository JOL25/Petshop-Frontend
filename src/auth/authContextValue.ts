import { createContext } from "react";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "CLIENT";
};

export type AuthContextValue = {
  user: AuthUser | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
