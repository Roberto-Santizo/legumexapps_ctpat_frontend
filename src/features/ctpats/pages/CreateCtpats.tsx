import { useMutation,useQueryClient}  from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CtpatForm from "@/features/ctpats/components/CtpatsForm";
import { createCtpatsAPI } from "@/features/ctpats/api/CtpatsAPI";
import type {CreateCtpatFormData,CreateCtpatAPIResponse,} from "@/features/ctpats/schemas/types";

export default function CreateCtpat() {
  const navigate = useNavigate();

  const {register,handleSubmit,setValue,watch,control,formState: { errors },
  } = useForm<CreateCtpatFormData>({
    defaultValues: {
      destination: "",
      container_id: 0,
      departure_site: "",
      images: [],
    },
    mode: "onChange",
  });
  const queryClient = useQueryClient();
  const { mutate,isPending } = useMutation<CreateCtpatAPIResponse,Error,CreateCtpatFormData>({
    mutationFn: (formData) => createCtpatsAPI(formData),
      onSuccess(data) {
            queryClient.invalidateQueries({queryKey:["ctpats"]})
            toast.success(data.message);
            navigate(`/ctpats`);
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

        <div className="mb-6">
          <Link
            to="/ctpats"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--color-primary-dark)] font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-[var(--color-bg-secondary)] transition-all duration-200 border border-[var(--color-border-light)]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Regresar
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-[var(--color-border-light)] overflow-hidden">
          <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] h-2"></div>

          <form
              className={`p-8 space-y-6 ${isPending ? "opacity-60 pointer-events-none" : ""}`}
            onSubmit={handleSubmit(handleForm)}
            noValidate
          >
            <CtpatForm
              register={register}
              errors={errors}
              setValue={setValue}
              watch={watch}
              control={control}
            />
            <button
              type="submit"
              className={`w-full font-bold py-4 px-6 rounded-xl uppercase tracking-wide transition-all duration-200
                  ${
                    isPending
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] hover:from-[var(--color-primary-darker)] hover:to-[var(--color-primary-dark)] text-white shadow-lg hover:-translate-y-0.5"
                  }
                `}
            >
              Crear CTPAT
            </button>

          </form>
        </div>

        <div className="mt-6 text-center text-sm text-[var(--color-text-tertiary)]">
          <p>Los cambios se aplicarán inmediatamente después de crear el CTPAT</p>
        </div>
      </div>
    </div>
  );
}
