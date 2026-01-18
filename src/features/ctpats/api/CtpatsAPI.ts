import api from "@/shared/api/axios";
import { isAxiosError } from "axios";
import type { CreateCtpatFormData,uploadImagesFormData  } from "@/features/ctpats/schemas/types";
import { getCtpatsSchema } from "@/features/ctpats/schemas/types";

export async function createCtpatsAPI(formData: CreateCtpatFormData){
 try {
  const { data } = await api.post("/ctpat", formData);
  return data
 } catch (error) {
    if(isAxiosError(error)&& error.response){
      throw new Error(error.response.data.error)
    }
 }
}

export async function getCtpatsAPI(page: number = 1) {
  try {
    const limit = 10;
    const offset = page;
    const { data } = await api.get("/ctpat", { params: { limit, offset } });
    const response = getCtpatsSchema.safeParse(data);
    if (response.success) {
      return response.data; 
    }
    throw new Error("Formato de respuesta inválido");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function getCtpatsWithFiltersAPI(filters: {
  page: number;
  container?: string;
  product?: string;
  order?: string;
}) {
  try {
    const limit = 10;
    const offset = filters.page;

    const { data } = await api.get("/ctpat", {
      params: {
        limit,
        offset,
        container: filters.container || undefined,
        product: filters.product || undefined,
        order: filters.order || undefined,
      },
    });

    const response = getCtpatsSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }

    throw new Error("Formato de respuesta inválido");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}


export async function getCtpatByIdAPI(id: number) {
  try {
    const { data } = await api.get(`/ctpat/${id}`);
    return data; 
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
}

export async function uploadImagesAPI(ctpatId: number, formData: uploadImagesFormData) {
  try {
    const { data } = await api.post(`/ctpat/uploadImages/${ctpatId}`, formData);
    return {
        success: true,
        message: data.message,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error desde backend:", error.response.data);
      throw new Error(error.response.data.message);
    }
  }
}

export async function updateCtpatStatusAPI(id: number, status: number) {
  try {
    const body = { status }; 
    const { data } = await api.patch(`/ctpat/${id}`, body);
    if (data && typeof data === "object" && "message" in data) {
      return {
        success: true,
        message: data.message,
      };
    }
    throw new Error("Respuesta inesperada del servidor");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al actualizar el estado del CTPAT");
    }
    throw error;
  }
}


