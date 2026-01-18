
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import AppLayout from '@/app/layouts/AppLayout';
import { Spinner } from "../../shared/components/Spinner";
import { ROLE_GROUPS } from "@/core/permissions/roles";


const routes = [
  { path: "/404", component: lazy(() => import("@/features/not-found-Page/NotFound")), roles: ROLE_GROUPS.ALL },
  { path: "*", component: lazy(() => import("@/features/not-found-Page/NotFound")), roles: ROLE_GROUPS.ALL },

  { path: "/rol", component: lazy(() => import("../../features/roles/pages/TableRoleView")), roles: ROLE_GROUPS.ADMIN_ONLY },
  { path: "/rol/create", component: lazy(() => import("../../features/roles/pages/CreateRol")), roles: ROLE_GROUPS.ADMIN_ONLY },

  { path: "/user", component: lazy(() => import("../../features/users/pages/TableUserView")), roles: ROLE_GROUPS.ADMIN_ONLY },
  { path: "/user/create", component: lazy(() => import("@/features/users/pages/CreateUser")), roles: ROLE_GROUPS.ADMIN_ONLY },
  { path: "/user/change-password/:userId", component: lazy(() => import("@/features/users/pages/UpdateUserPasswordView")), roles: ROLE_GROUPS.ADMIN_ONLY },

  { path: "/driver", component: lazy(() => import("../../features/drivers/pages/TableDriver")), roles: ROLE_GROUPS.CALIDAD },
  { path: "/driver/create", component: lazy(() => import("../../features/drivers/pages/CreateDriver")), roles: ROLE_GROUPS.CALIDAD },
  { path: "/driver/:driverId/edit", component: lazy(() => import("@/features/drivers/pages/EditDriverView")), roles: ROLE_GROUPS.CALIDAD },

  { path: "/carriers", component: lazy(() => import("../../features/carriers/pages/TableCarriers")), roles: ROLE_GROUPS.CALIDAD },
  { path: "/carriers/create", component: lazy(() => import("../../features/carriers/pages/CreateCarrier")), roles: ROLE_GROUPS.CALIDAD },
  { path: "/carriers/:id/edit", component: lazy(() => import("@/features/carriers/pages/EditCarrierView")), roles: ROLE_GROUPS.CALIDAD },

  { path: "/container", component: lazy(() => import("../../features/containers/pages/TableContainer")), roles: ROLE_GROUPS.CALIDAD },
  { path: "/container/create", component: lazy(() => import("@/features/containers/pages/CreateContainer")), roles: ROLE_GROUPS.CALIDAD },
  { path: "/container/:containerId/edit", component: lazy(() => import("@/features/containers/pages/EditContainerView")), roles: ROLE_GROUPS.CALIDAD },

  { path: "/ctpats", component: lazy(() => import("@/features/ctpats/pages/TableCtpat")), roles: ROLE_GROUPS.CALIDAD_Y_EXPORTACIONES },
  { path: "/ctpats/create", component: lazy(() => import("@/features/ctpats/pages/CreateCtpats")), roles: ROLE_GROUPS.CALIDAD },
  { path: "/ctpats/document/:id", component: lazy(() => import("@/features/ctpats/ctpatsDocument/CtpatDocument")), roles: ROLE_GROUPS.CALIDAD },
  //this is to add an images 
  {path: "/ctpats/:id/upload-additional-images",component: lazy(() => import("@/features/ctpats/pages/UploadAdditionalImagesView")),roles: ROLE_GROUPS.ADMIN_Y_CALIDAD_ADMIN },

  { path: "/products", component: lazy(() => import("@/features/products/pages/TableProducts")), roles: ROLE_GROUPS.CALIDAD },
  { path: "/products/create", component: lazy(() => import("@/features/products/pages/CreateProduct")), roles: ROLE_GROUPS.CALIDAD },
  { path: "/products/:productId/edit", component: lazy(() => import("@/features/products/pages/EditProduct")), roles: ROLE_GROUPS.CALIDAD },

  { path: "/conditions", component: lazy(() => import("@/features/conditions/pages/TableConditions")), roles: ROLE_GROUPS.ADMIN_Y_CALIDAD_ADMIN },
  { path: "/conditions/create", component: lazy(() => import("@/features/conditions/pages/CreateCondition")), roles: ROLE_GROUPS.ADMIN_Y_CALIDAD_ADMIN },
  { path: "/conditions/:conditionId/edit", component: lazy(() => import("@/features/conditions/pages/EditConditionView")), roles: ROLE_GROUPS.ADMIN_Y_CALIDAD_ADMIN },

  { path: "/packingList", component: lazy(() => import("@/features/packing-List/pages/CreatePackingList")), roles: ROLE_GROUPS.CALIDAD },
  { path: "/packingList/document/:id", component: lazy(() => import("@/features/packing-List/packingListDocument/PackingListDocument")), roles: ROLE_GROUPS.CALIDAD },

  //Edit packingList´s items 
  {path: "/packing-list/editItem/:packingListId/:id/",component: lazy(() => import("@/features/packing-List/pages/EditItemView")),roles:ROLE_GROUPS.CALIDAD},
  {path: "/ctpats/:id/packing-list/manage-items",component: lazy(() => import("@/features/packing-List/pages/ManagePackingListItemsView")),roles: ROLE_GROUPS.ADMIN_Y_CALIDAD_ADMIN},


  { path: "/trucks", component: lazy(() => import("@/features/trucks/pages/TableTruck")), roles: ROLE_GROUPS.CALIDAD },
  { path: "/trucks/create", component: lazy(() => import("@/features/trucks/pages/CreateTruck")), roles: ROLE_GROUPS.CALIDAD },
  { path: "/trucks/:truckId/edit", component: lazy(() => import("@/features/trucks/pages/EditTruckView")), roles: ROLE_GROUPS.CALIDAD },

  { path: "/observations", component: lazy(() => import("@/features/observations/pages/TableObservation")), roles: ROLE_GROUPS.CALIDAD },
  { path: "/observations/create", component: lazy(() => import("@/features/observations/pages/CreateObservation")), roles: ROLE_GROUPS.CALIDAD },
  { path: "/observations/:observationId/edit", component: lazy(() => import("@/features/observations/pages/EditObservationView")), roles: ROLE_GROUPS.CALIDAD },

  { path: "/customers", component: lazy(() => import("@/features/customer/page/CustomerTable")), roles: ROLE_GROUPS.CALIDAD },
  { path: "/customers/create", component: lazy(() => import("@/features/customer/page/CreateCustomerView")), roles: ROLE_GROUPS.CALIDAD },
  { path: "/customers/:customerId/edit", component: lazy(() => import("@/features/customer/page/EditCustomerView")), roles: ROLE_GROUPS },

  { path: "/steps", component: lazy(() => import("@/features/process/page/FlowCtpatSteps")),roles:ROLE_GROUPS.CALIDAD },
  { path: "/steps/:id", component: lazy(() => import("@/features/process/page/FlowCtpatSteps")),roles:ROLE_GROUPS.CALIDAD },
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
