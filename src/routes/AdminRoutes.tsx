
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import AppLayout from '../layouts/AppLayout';
import { Spinner } from "../components/utilities-components/Spinner";

const routes = [
  { path: "/404", component: lazy(() => import("@/views/404/NotFound")), roles: [] },
  { path: "*", component: lazy(() => import("@/views/404/NotFound")), roles: [] },
  
  { path: "/rol", component: lazy(() => import("../views/adminPanel/TableRoleView")), roles: [] },
  { path: "/rol/create", component: lazy(() => import("../views/adminPanel/CreateRol")), roles: [] },
  { path: "/user", component: lazy(() => import("../views/adminPanel/TableUserView")), roles: [] },
  { path: "/user/create", component: lazy(() => import("@/views/adminPanel/CreateUser")), roles: [] },
  { path: "/driver", component: lazy(() => import("../views/TableDriver")), roles: [] },

  { path: "/driver/create", component: lazy(() => import("../views/CreateDriver")), roles: [] },
  { path: "/driver/:driverId/edit", component: lazy(() => import("@/views/EditDriverView")), roles: [] },

  { path: "/carriers", component: lazy(() => import("../views/TableCarriers")), roles: [] },
  { path: "/carriers/create", component: lazy(() => import("../views/CreateCarrier")), roles: [] },
  { path: "/carriers/:carriersId/edit", component: lazy(() => import("@/views/EditCarrierView")), roles: [] },

  { path: "/container", component: lazy(() => import("../views/TableContainer")), roles: [] },
  { path: "/container/create", component: lazy(() => import("@/views/CreateContainer")), roles: [] },
  { path: "/container/:containerId/edit", component: lazy(() => import("@/views/EditContainerView")), roles: [] },
  
  { path: "/ctpats", component: lazy(() => import("@/views/TableCtpat")), roles: [] },
  { path: "/ctpats/create", component: lazy(() => import("@/views/CreateCtpats")), roles: [] },
  { path: "/ctpats/uploadImagenes", component: lazy(() => import("@/views/uploadImagesCtp/CreateUploadImages")), roles: [] }, 
  {path: "/steps/:id",component: lazy(() => import("@/views/process/FlowCtpatSteps")),},

  {path: "/steps",component: lazy(() => import("@/views/process/FlowCtpatSteps")),},

  { path: "/products", component: lazy(() => import("@/views/TableProducts")), roles: [] },
  { path: "/products/create", component: lazy(() => import("@/views/CreateProduct")), roles: [] },
  { path: "/products/:productId/edit", component: lazy(() => import("@/views/EditProduct")), roles: [] },

  { path: "/conditions", component: lazy(() => import("@/views/TableConditions")), roles: [] },
  { path: "/conditions/create", component: lazy(() => import("@/views/CreateCondition")), roles: [] },
  { path: "/conditions/:conditionId/edit", component: lazy(() => import("@/views/EditConditionView")), roles: [] },

  { path: "/containerLoad", component: lazy(() => import("@/views/EditConditionView")), roles: [] },

  { path: "/packingList", component: lazy(() => import("@/views/CreatePackingList")), roles: [] },
  
  { path: "/trucks", component: lazy(() => import("@/views/TableTruck")), roles: [] },
  { path: "/trucks/create", component: lazy(() => import("@/views/CreateTruck")), roles: [] },
  { path: "/trucks/:truckId/edit", component: lazy(() => import("@/views/EditTruckView")), roles: [] },

  { path: "/observations", component: lazy(() => import("@/views/TableObservation")), roles: [] },
  { path: "/observations/create", component: lazy(() => import("@/views/CreateObservation")), roles: [] },
  { path: "/observations/:observationId/edit", component: lazy(() => import("@/views/EditObservationView")), roles: [] },


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
