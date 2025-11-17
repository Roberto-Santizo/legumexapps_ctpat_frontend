import api from "@/components/config/axios";
import { isAxiosError } from "axios";
import type { CreateCtpatFormData,uploadImagesFormData  } from "@/schemas/types";
import { getCtpatsSchema } from "@/schemas/types";

export async function createCtpatsAPI(formData: CreateCtpatFormData) {
  try {
    const { data } = await api.post("/ctpat", formData);
    if (data && typeof data === "object" && "message" in data) {
      return {
        success: data.statusCode === 200,
        message: data.message,
      };
    }
    throw new Error("Respuesta inesperada del servidor");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al crear el CTPAT");
    }
    console.error("Error desconocido:", error);
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


export async function uploadImagesAPI(ctpatId: number, formData: uploadImagesFormData) {
  console.log("Formulario recibido en API function:", formData);
  try {
    const { data } = await api.post(`/ctpat/uploadImages/${ctpatId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }); 
    if (data && typeof data === "object" && "message" in data) {
      return {
        success: data.statusCode === 200,
        message: data.message,
      };
    }
    throw new Error("Respuesta inesperada del servidor");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error desde backend:", error.response.data);
      throw new Error(error.response.data.message || "Error al subir imágenes del CTPAT");
    }
    console.error("Error desconocido:", error);
    throw error;
  }
}

