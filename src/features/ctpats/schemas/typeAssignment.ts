import { z } from "zod";
//ctpatTruckDriverAssignment
export const ctpatTruckDriverSchema = z.object({
  truck_id: z.number(),
  driver_id: z.number(),
})
export type CtpatTruckDriverAssignment = z.infer<typeof ctpatTruckDriverSchema>;