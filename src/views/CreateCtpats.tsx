import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import CtpatForm from "@/components/forms/CtpatsForm";
import { createCtpatsAPI } from "@/api/CtpatsAPI";
import type { CreateCtpatFormData } from "@/schemas/types";

export default function CreateCtpat() {
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateCtpatFormData>({
    defaultValues: {
      destination: "",
      container_id: 0,
      departure_site: "",
      images: [],
    },
  });

  const { mutate } = useMutation({
    mutationFn: createCtpatsAPI,
    onError: (error: Error) => toast.error(error.message),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      // navigate("/ctpats");
    },
  });

  const handleForm = (data: CreateCtpatFormData) => {
      console.log("Datos que estoy tratando de enviar al backend :", data); //Delete this when all is working correctly

      
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

        <Link
          to="/ctpats"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--color-primary-dark)] font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-[var(--color-bg-secondary)] transition-all duration-200 border border-[var(--color-border-light)] mb-6"
        >
          ← Regresar
        </Link>

        <form
          className="bg-white rounded-2xl shadow-xl border p-8 space-y-6"
          onSubmit={handleSubmit(handleForm)}
        >
          <CtpatForm register={register} errors={errors} setValue={setValue} watch={watch} />
          <input
            type="submit"
            value="Crear CTPAT"
            className="w-full bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-amber)] transform hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-wide"
          />
        </form>
      </div>
    </div>
  );
}
