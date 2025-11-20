import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import UploadImagesForm from "./UploadImagesForm";
import { uploadImagesAPI } from "@/api/CtpatsAPI";
import type { uploadImagesFormData } from "@/schemas/types";

export default function CreateUploadImages() {
  const { id } = useParams();
  const ctpatId = Number(id);

  if (isNaN(ctpatId)) {
    return <p>Error: ID inválido</p>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mutate } = useMutation({
    mutationFn: (data: uploadImagesFormData) => uploadImagesAPI(ctpatId, data),

    onSuccess: (res) => {
      if (res.success) toast.success(res.message);
      else toast.error(res.message);
    },

    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Subir Imágenes</h1>
      <UploadImagesForm
        onSubmit={(data) => {
          mutate(data);
        }}
      />
    </div>
  );
}
