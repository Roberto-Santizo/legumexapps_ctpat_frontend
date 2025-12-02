import { useParams,useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import UploadImagesForm from "../components/UploadImagesForm";
import { uploadImagesAPI } from "@/features/ctpats/api/CtpatsAPI";
import type { uploadImagesFormData } from "@/features/ctpats/schemas/types";
import { useUpdateCtpatStatus } from "@/features/ctpats/hooks/useUpdateCtpatStatus";
type Props = {
  nextStatus: number; // estado al que debe avanzar después de subir imágenes
};

export default function CreateUploadImages({ nextStatus }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const ctpatId = Number(id);

  const { mutate: updateStatus } = useUpdateCtpatStatus();

  const { mutate: uploadImages } = useMutation({
    mutationFn: (data: uploadImagesFormData) => uploadImagesAPI(ctpatId, data),

    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
        updateStatus({ id: ctpatId, status: nextStatus });

        navigate("/ctpats");
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
