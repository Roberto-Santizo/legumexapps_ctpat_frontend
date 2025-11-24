import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCtpatStatusAPI } from "@/api/CtpatsAPI";
import { toast } from "react-toastify";

export function useUpdateCtpatStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: number }) =>
      updateCtpatStatusAPI(id, status),

    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({ queryKey: ["ctpats"] });

      queryClient.invalidateQueries({ queryKey: ["ctpat"] });
    },

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
}
