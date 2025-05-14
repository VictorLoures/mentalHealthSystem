import { createContext, useState, useEffect, ReactNode } from "react";
import { logout, validateToken } from "../api/auth";
import { LoggedDoctor } from "../model/LoggedDoctor";

interface AuthContextType {
  loggedDoctor: LoggedDoctor | null;
  setLoggedDoctor: (value: LoggedDoctor) => void;
  logoutDoctor: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedDoctor, setLoggedDoctor] = useState<LoggedDoctor | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      setLoggedDoctor(await validateToken());
    };
    checkAuth();
  }, []);

  const logoutDoctor = () => {
    logout();
    setLoggedDoctor(null);
  };

  return (
    <AuthContext.Provider
      value={{ loggedDoctor, setLoggedDoctor, logoutDoctor }}
    >
      {children}
    </AuthContext.Provider>
  );
};
