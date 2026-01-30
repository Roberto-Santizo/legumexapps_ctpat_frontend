import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import UploadImagesForm from "../components/UploadImagesForm";
import { uploadImagesAPI } from "@/features/ctpats/api/CtpatsAPI";
import type { uploadImagesFormData } from "@/features/ctpats/schemas/types";

type Props = {
  ctpatId: number;
  /** Opcional: solo para mostrar título diferente */
  type?: "ctpat" | "juice";
  /** Callback que se ejecuta después de subir imágenes exitosamente */
  onSuccess?: () => void;
};

export default function CreateUploadImages({ ctpatId, type = "ctpat", onSuccess }: Props) {
  const queryClient = useQueryClient();

  const { mutate: uploadImages, isPending } = useMutation({
    mutationFn: (data: uploadImagesFormData) => uploadImagesAPI(ctpatId, data),

    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.message);
        // Invalidar la query del ctpat para que se actualice automáticamente
        queryClient.invalidateQueries({ queryKey: ["ctpat", String(ctpatId)] });
        // Llamar callback de éxito (para cerrar modal, etc.)
        onSuccess?.();
      } else {
        toast.error(data?.message);
      }
    },

    onError: (err: Error) => toast.error(err.message),
  });

  if (isNaN(ctpatId)) return <p>Error: ID inválido</p>;

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        {type === "juice" ? "Subir Imágenes de Jugos" : "Subir Imágenes"}
      </h1>

      <UploadImagesForm onSubmit={(data) => uploadImages(data)} isPending={isPending} />
    </div>
  );
}
