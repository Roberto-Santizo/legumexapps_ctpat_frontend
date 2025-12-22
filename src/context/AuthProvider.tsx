import { useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "@/features/auth/api/LoginAPI";
import { checkStatusAPI } from "@/features/auth/api/CheckStatusAPI";
import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "./AuthContext";
import type { LoginRequest, LoginResponse } from "@/features/auth/schemas/types";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";


type AuthUser = LoginResponse["response"];

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
   const queryClient = useQueryClient();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const login = async (credentials: LoginRequest) => {
    const data: LoginResponse = await loginApi(credentials);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    setUser(data.response);
    navigate("/ctpats");
  };

  const logout = useCallback(() => {
    queryClient.clear();
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate,queryClient]);

  // Verificar sesión al cargar
  useEffect(() => {
    const checkSession = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await checkStatusAPI();
        setUser(data.response);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [token, logout]);

  // Logout por inactividad
  useEffect(() => {
    if (!token) return;

    let timeoutId: number;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        toast("Sesión cerrada por inactividad");
        logout();
      },  15 * 60 * 1000); // 15 minutos
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [token, logout]);

  const value: AuthContextType = { user, token, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
