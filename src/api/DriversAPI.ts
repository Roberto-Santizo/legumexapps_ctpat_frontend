import type { DriverFormData } from "@/schemas/types.ts";
import { getDriversSchema } from "@/schemas/types.ts";

import api from "../components/config/axios.ts";
import { isAxiosError } from "axios";

export async function createDriverAPI(formData: DriverFormData) {
  try {
    const { data } = await api.post("/drivers",formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
            if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
    throw error;
  }
}

export async function getDriverAPI(page: number = 1){
  try {
    const limit = 10;
    const offset = page;
    const { data } = await api.get("/drivers", {params: { limit, offset }});
    const response = getDriversSchema.safeParse(data);

    if (response.success){
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error en getDriverAPI", error.response.data);
    } else {
      console.error("Error desconocido en getRoleAPI:", error);
    } 
    throw error;
  }
}
// export async function getDriverByIdAPI(id: CreateDriverFormData['id']) {
//   try {
//     const { data } = await api.get(`/drivers/${id}`);
//     console.log(data)
//     return data;
//   } catch (error) {
//     if (isAxiosError(error) && error.response) {
//       console.error("Error en getDriverByIdAPI", error.response.data);
//     } else {
//       console.error("Error desconocido en getDriverByIdAPI:", error);
//     }
//     throw error;
//   }
// }
// type DriverAPIType = {
//   formData: CreateDriverFormData;
//   driverId: number;
// };

// export async function updateDriverAPI({ formData, driverId }: DriverAPIType) {
//   try {
//     console.log("updateDriverAPI - Enviando PATCH a /drivers/" + driverId);
//     console.log("Datos que se envían:", formData);
//     const { data } = await api.patch<string>(`/drivers/${driverId}`, formData);
//     console.log(" Respuesta del servidor:", {data });
//     return data;
//   } catch (error) {
//     if (isAxiosError(error)) {
//       console.error(" Axios error en updateDriverAPI:", {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw new Error(
//         error.response?.data?.error ||
//           `Error ${error.response?.status}: ${error.message}`
//       );
//     }
//     throw error;
//   }
// }
