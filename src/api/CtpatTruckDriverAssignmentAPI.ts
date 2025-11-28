// src/api/CtpatAssignmentAPI.ts
import api from "@/components/config/axios";
import { isAxiosError } from "axios";
import type { CtpatTruckDriverAssignment } from "@/schemas/types";

type AssignmentAPIType = {
  formData: CtpatTruckDriverAssignment;
  ctpatId: number;
};

export async function updateCtpatTruckDriver({ formData, ctpatId }: AssignmentAPIType) {
  try {
    const { data } = await api.put(`/ctpat/carrierInformation/${ctpatId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error en el servidor");
    }
    throw error;
  }
}
