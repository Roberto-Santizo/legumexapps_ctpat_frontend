import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import UploadImagesForm from "./UploadImagesForm";
import { uploadImagesAPI } from "@/api/CtpatsAPI";
import type { uploadImagesFormData } from "@/schemas/types";
import { useUpdateCtpatStatus } from "@/hooks/useUpdateCtpatStatus";

export default function CreateUploadImages() {
  const { id } = useParams();
  const ctpatId = Number(id);

  // HOOKS — siempre deben ir antes de cualquier return
  const { mutate: updateStatus } = useUpdateCtpatStatus();

  const { mutate: uploadImages } = useMutation({
    mutationFn: (data: uploadImagesFormData) => uploadImagesAPI(ctpatId, data),

    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);

        updateStatus({ id: ctpatId, status: 2 });
      } else {
        toast.error(res.message);
      }
    },

    onError: (err: Error) => toast.error(err.message),
  });

  // VALIDACIÓN — ahora después de los Hooks
  if (isNaN(ctpatId)) {
    return <p>Error: ID inválido</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Subir Imágenes</h1>

      <UploadImagesForm onSubmit={(data) => uploadImages(data)} />
    </div>
  );
}
