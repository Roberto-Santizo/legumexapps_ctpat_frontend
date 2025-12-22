import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "@/context/AuthProvider";
import {BrowserRouter} from "react-router-dom"

const queryClient = new QueryClient();
const token = localStorage.getItem("token");
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* 
        The key prop forces AuthProvider to remount whenever the token changes.
        This ensures a clean auth state reset after logout/login cycles,
        preventing stale user data in the UI.
      */}
        <AuthProvider key= {token}>
          <Router />
        </AuthProvider>
      </BrowserRouter>
      
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
