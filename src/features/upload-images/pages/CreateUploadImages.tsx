import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import UploadImagesForm from "../components/UploadImagesForm";
import { uploadImagesAPI } from "@/features/ctpats/api/CtpatsAPI";
import type { uploadImagesFormData } from "@/features/ctpats/schemas/types";

  type Props = {
      ctpatId: number;
  };


export default function CreateUploadImages({ ctpatId }: Props) {

  const { mutate: uploadImages } = useMutation({
    mutationFn: (data: uploadImagesFormData) => uploadImagesAPI(ctpatId, data),

    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    },

    onError: (err: Error) => toast.error(err.message),
  });

  if (isNaN(ctpatId)) return <p>Error: ID inválido</p>;

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Subir Imágenes</h1>

      <UploadImagesForm onSubmit={(data) => uploadImages(data)} />
    </div>
  );
}
