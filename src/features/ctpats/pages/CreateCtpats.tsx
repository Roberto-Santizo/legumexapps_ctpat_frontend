import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CtpatForm from "@/features/ctpats/components/CtpatsForm";
import { createCtpatsAPI} from "@/features/ctpats/api/CtpatsAPI";
import type { CreateCtpatFormData, CreateCtpatAPIResponse } from "@/features/ctpats/schemas/types";

export default function CreateCtpat() {
  const navigate = useNavigate();

  const {register, handleSubmit,setValue,watch,formState: { errors },
  } = useForm<CreateCtpatFormData>({
    defaultValues: {
      destination: "",
      container_id: 0,
      departure_site: "",
      images: [],
    },
  });
  const { mutate } = useMutation<CreateCtpatAPIResponse,Error,CreateCtpatFormData>({mutationFn: (formData) => createCtpatsAPI(formData),
  async onSuccess(data) {
    if (data.success) {
      toast.success(data.message);
      navigate(`/ctpats`);
    } else {
      toast.error(data.message);
    }
  },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleForm = (data: CreateCtpatFormData) => {
    mutate({
      ...data,
      container_id: Number(data.container_id),
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] bg-clip-text text-transparent mb-3">
            Crear Nuevo Ctpat
          </h1>
        </div>

        <Link to="/ctpats">← Regresar</Link>

        <form
          className="bg-white rounded-2xl shadow-xl border p-8 space-y-6"
          onSubmit={handleSubmit(handleForm)}
        >
          <CtpatForm
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />

          <input
            type="submit"
            value="Crear CTPAT"
            className="w-full bg-blue-600 text-white py-4 rounded-xl"
          />
        </form>
      </div>
    </div>
  );
}
 