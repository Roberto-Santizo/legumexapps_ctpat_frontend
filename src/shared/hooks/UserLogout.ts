// src/hooks/useUserLogout.ts
import { useNavigate } from "react-router-dom";
import api from "@/shared/api/axios";

export function useUserLogout() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  return { logout };
}
