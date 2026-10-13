import { useMemo, useState, type ReactNode } from "react";
import {
  AuthContext,
  type AuthContextValue,
  type AuthUser,
} from "./authContextValue";

function readStoredUser(): AuthUser | null {
  const storedUser = localStorage.getItem("petshop-user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    localStorage.removeItem("petshop-user");
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (token, nextUser) => {
        localStorage.setItem("petshop-token", token);
        localStorage.setItem("petshop-user", JSON.stringify(nextUser));
        setUser(nextUser);
      },
      logout: () => {
        localStorage.removeItem("petshop-token");
        localStorage.removeItem("petshop-user");
        setUser(null);
      },
      updateUser: (nextUser) => {
        localStorage.setItem("petshop-user", JSON.stringify(nextUser));
        setUser(nextUser);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
