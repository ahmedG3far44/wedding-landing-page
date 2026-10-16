import { createContext, useContext, useState, type ReactNode } from "react";
const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: (u: string, p: string) => boolean;
  logout: () => void;
} | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: (u, p) => {
          const ok = u === "admin" && p === "admin";
          setAuthenticated(ok);
          return ok;
        },
        logout: () => setAuthenticated(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthProvider is required");
  return ctx;
}
