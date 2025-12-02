// src/api/CtpatAssignmentAPI.ts
import api from "@/shared/api/axios";
import { isAxiosError } from "axios";
import type { CtpatTruckDriverAssignment } from "@/features/ctpats/schemas/typeAssignment";

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
