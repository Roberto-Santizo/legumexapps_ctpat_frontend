import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CreateObservationForm from "@/components/forms/CreateObservationForm";
import { createObservationAPI } from "@/api/Observations";
import type { ObservationCreateData } from "@/schemas/types";

export default function CreateObservation() {
  const navigate = useNavigate();

  const {register,handleSubmit,formState: { errors },} = useForm<ObservationCreateData>({
    defaultValues: { name: "" },
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ObservationCreateData) => createObservationAPI(data),
    onSuccess: (response) => {
      toast.success(response.message);
      navigate("/observations");
    },
    onError: (error: unknown) => {
      const message =  error instanceof Error ? error.message : "Error inesperado";
      toast.error(message);
    },
  });

  const submitForm = (data: ObservationCreateData) => mutate(data);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] bg-clip-text text-transparent mb-3">
            Crear Nueva Observación
          </h1>
        </div>

        <div className="mb-6">
          <Link
            to="/rol"
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

        <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
          <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] h-2"></div>

          <form
            className="p-8 space-y-6"
            onSubmit={handleSubmit(submitForm)}
            noValidate
          >
            <CreateObservationForm register={register} errors={errors} />

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-amber)] transform hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Creando..." : "Crear Observación"}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-[var(--color-text-tertiary)]">
          <p>Los cambios se aplicarán inmediatamente después de la observación.</p>
        </div>
      </div>
    </div>
  );
}
