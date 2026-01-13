import {
  UserCog,
  User,
  Truck,
  CircleUserRound,
  Container,
  Apple,
  TruckElectric,
  ClipboardCopy,
  Eye,
  UserRound,
} from "lucide-react";

import NavLinkComponent from "../../shared/components/NavLinkComponent";
import { useAuth } from "@/hooks/useAuth";
import {ROLE_GROUPS} from "@/core/permissions/roles"

/* ================= MENU CONFIG ================= */

const NAV_ITEMS = [

  {
    url: "/user",
    text: "Usuarios",
    icon: User,
    roles: ROLE_GROUPS.ADMIN_ONLY,
  },
  {
    url: "/rol",
    text: "Roles",
    icon: UserCog,
    roles: ROLE_GROUPS.ADMIN_ONLY,
  },
  {
    url: "/driver",
    text: "Piloto",
    icon: CircleUserRound,
    roles: ROLE_GROUPS.CALIDAD,
  },
  {
    url: "/carriers",
    text: "Transportista",
    icon: Truck,
    roles: ROLE_GROUPS.CALIDAD,
  },
  {
    url: "/container",
    text: "Contenedor",
    icon: Container,
    roles: ROLE_GROUPS.CALIDAD,
  },
  {
    url: "/ctpats",
    text: "Listado de Ctpats",
    icon: ClipboardCopy,
    roles: ROLE_GROUPS.CALIDAD_Y_EXPORTACIONES,
  },
  {
    url: "/products",
    text: "Productos",
    icon: Apple,
    roles: ROLE_GROUPS.CALIDAD,
  },
  {
    url: "/customers",
    text: "Clientes",
    icon: UserRound,
    roles: ROLE_GROUPS.CALIDAD,
  },
  {
    url: "/conditions",
    text: "Condiciones",
    icon: TruckElectric,
    roles: ROLE_GROUPS.CALIDAD,
  },
  {
    url: "/trucks",
    text: "Camiones",
    icon: Truck,
    roles: ROLE_GROUPS.CALIDAD,
  },
  {
    url: "/observations",
    text: "Observaciones",
    icon: Eye,
    roles: ROLE_GROUPS.CALIDAD,
  },
];

/* ================= HELPERS ================= */

function canAccess(
  allowedRoles: readonly string[],
  userRole?: string
) {
  if (!userRole) return false;
  return allowedRoles.includes(userRole);
}

/* ================= COMPONENT ================= */

export default function Navegation() {
  const { user, loading } = useAuth();

  // Evita parpadeos mientras valida sesión
  if (loading || !user) return null;

  return (
    <div className="space-y-1.5">
      {NAV_ITEMS
        .filter(item => canAccess(item.roles, user.role))
        .map(({ url, text, icon: Icon }) => (
          <NavLinkComponent key={url} url={url} text={text}>
            <Icon />
          </NavLinkComponent>
        ))}
    </div>
  );
}
