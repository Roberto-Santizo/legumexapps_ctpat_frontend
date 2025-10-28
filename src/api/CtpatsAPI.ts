import api from "@/components/config/axios";
import { isAxiosError } from "axios";
import type { CreateCtpatFormData } from "@/schemas/types";
import { CtpatSchema } from "@/schemas/types";
import { getCtpatsSchema } from "@/schemas/types";

export async function createCtpatsAPI(formData: CreateCtpatFormData) {
  console.log("Formulario recibido en API function:", formData);
  try {
    const { data } = await api.post("/ctpat", formData);
    console.log("Respuesta cruda del backend:", data);

    const parsedData = CtpatSchema.parse(data);
    console.log("Ctpat creado:", parsedData);

    return parsedData;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error desde backend:", error.response.data);
      throw new Error(error.response.data.error || "Error al crear el ctpats");
    }
    throw error;
  }
}

export async function getDriverByIdAPI(id: number) {
  try {
    const { data } = await api.get(`/drivers/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error en getDriverByIdAPI", error.response.data);
    } else {
      console.error("Error desconocido en getDriverByIdAPI:", error);
    }
    throw error;
  }
}

export async function getCtpatsAPI(page: number = 1) {
  try {
    const limit = 10;
    const offset = page;

    const { data } = await api.get("/ctpat", { params: { limit, offset } });
    const response = getCtpatsSchema.safeParse(data);
    console.log(response)

    if (response.success) {
      return response.data; // Esto contiene { response, page, total, lastPage }
    }

    throw new Error("Formato de respuesta inválido");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}
