
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import AppLayout from '@/app/layouts/AppLayout';
import { Spinner } from "../../shared/components/Spinner";

const routes = [
  { path: "/404", component: lazy(() => import("@/features/not-found-Page/NotFound")), roles: [] },
  { path: "*", component: lazy(() => import("@/features/not-found-Page/NotFound")), roles: [] },
  
  { path: "/rol", component: lazy(() => import("../../features/roles/pages/TableRoleView")), roles: [] },
  { path: "/rol/create", component: lazy(() => import("../../features/roles/pages/CreateRol")), roles: [] },
  { path: "/user", component: lazy(() => import("../../features/users/pages/TableUserView")), roles: [] },
  { path: "/user/create", component: lazy(() => import("@/features/users/pages/CreateUser")), roles: [] },
  { path: "/driver", component: lazy(() => import("../../features/drivers/pages/TableDriver")), roles: [] },

  { path: "/driver/create", component: lazy(() => import("../../features/drivers/pages/CreateDriver")), roles: [] },
  { path: "/driver/:driverId/edit", component: lazy(() => import("@/features/drivers/pages/EditDriverView")), roles: [] },

  { path: "/carriers", component: lazy(() => import("../../features/carriers/pages/TableCarriers")), roles: [] },
  { path: "/carriers/create", component: lazy(() => import("../../features/carriers/pages/CreateCarrier")), roles: [] },
  { path: "/carriers/:carriersId/edit", component: lazy(() => import("@/features/carriers/pages/EditCarrierView")), roles: [] },

  { path: "/container", component: lazy(() => import("../../features/containers/pages/TableContainer")), roles: [] },
  { path: "/container/create", component: lazy(() => import("@/features/containers/pages/CreateContainer")), roles: [] },
  { path: "/container/:containerId/edit", component: lazy(() => import("@/features/containers/pages/EditContainerView")), roles: [] },
  
  { path: "/ctpats", component: lazy(() => import("@/features/ctpats/pages/TableCtpat")), roles: [] },
  { path: "/ctpats/create", component: lazy(() => import("@/features/ctpats/pages/CreateCtpats")), roles: [] },
  {path: "/steps/:id",component: lazy(() => import("@/features/process/page/FlowCtpatSteps")),},

  {path: "/steps",component: lazy(() => import("@/features/process/page/FlowCtpatSteps")),},

  { path: "/products", component: lazy(() => import("@/features/products/pages/TableProducts")), roles: [] },
  { path: "/products/create", component: lazy(() => import("@/features/products/pages/CreateProduct")), roles: [] },
  { path: "/products/:productId/edit", component: lazy(() => import("@/features/products/pages/EditProduct")), roles: [] },

  { path: "/conditions", component: lazy(() => import("@/features/conditions/pages/TableConditions")), roles: [] },
  { path: "/conditions/create", component: lazy(() => import("@/features/conditions/pages/CreateCondition")), roles: [] },
  { path: "/conditions/:conditionId/edit", component: lazy(() => import("@/features/conditions/pages/EditConditionView")), roles: [] },

  { path: "/containerLoad", component: lazy(() => import("@/features/conditions/pages/EditConditionView")), roles: [] },

  { path: "/packingList", component: lazy(() => import("@/features/packing-List/pages/CreatePackingList")), roles: [] },
  
  { path: "/trucks", component: lazy(() => import("@/features/trucks/pages/TableTruck")), roles: [] },
  { path: "/trucks/create", component: lazy(() => import("@/features/trucks/pages/CreateTruck")), roles: [] },
  { path: "/trucks/:truckId/edit", component: lazy(() => import("@/features/trucks/pages/EditTruckView")), roles: [] },

  { path: "/observations", component: lazy(() => import("@/features/observations/pages/TableObservation")), roles: [] },
  { path: "/observations/create", component: lazy(() => import("@/features/observations/pages/CreateObservation")), roles: [] },
  { path: "/observations/:observationId/edit", component: lazy(() => import("@/features/observations/pages/EditObservationView")), roles: [] },

  {path: "/ctpats/document/:id",component: lazy(() => import("@/features/ctpats/ctpatsDocument/CtpatDocument")),roles: [],},
  
  {path: "/document",component: lazy(() => import("@/features/ctpats/packingListDocument/PackingListDocument")),roles: [],},



];

export default function AdminRoutes() {
  return (
    <Route element={<AppLayout />}>
      {routes.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<Spinner />}>
              <Component />
            </Suspense>
          }
        />
      ))}
    </Route>
  );
}
