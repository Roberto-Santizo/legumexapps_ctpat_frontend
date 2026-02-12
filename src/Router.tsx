
import {Routes } from "react-router";
import PublicRoutes from "./app/routes/PublicRoutes";
import AdminRoutes from "./app/routes/AdminRoutes"

export default function AppRouter() {
  return (
      <Routes>
        {PublicRoutes()}
        {AdminRoutes()}
      </Routes>
  );
}

