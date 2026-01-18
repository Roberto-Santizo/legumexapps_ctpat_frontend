
import { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "@/context/AuthContext";
import type { AuthContextType } from "@/context/AuthContext";

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  const queryClient = useQueryClient();
  
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  
  // Envolver logout para limpiar TODAS las queries
  const enhancedLogout = () => {
    // Primero limpia todas las queries en cache
    queryClient.clear();
    
    // Luego ejecuta el logout original
    ctx.logout();
  };
  
  return {
    ...ctx,
    logout: enhancedLogout
  };
}