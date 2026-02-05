import { Link, useNavigate } from "react-router-dom";
import DriverForm from "./CreateDriverForm";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { EditDriverFormData, CreateDriver, DriverFormData } from "@/features/drivers/schemas/types";
import { updateDriver } from "@/features/drivers/api/DriversAPI";
import { useEffect } from "react";

type EditDriverFormProps = {
  data: EditDriverFormData;
  driverId: CreateDriver["id"];
};

export default function EditDriverForm({data,driverId,}: EditDriverFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const methods = useForm<DriverFormData>({
    defaultValues: {
      name: data.name,
      identification: data.identification,
      license: data.license,
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        identification: data.identification,
        license: data.license,
      });
    }
  }, [data, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateDriver,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["driver"] });
      queryClient.invalidateQueries({ queryKey: ["editDriver", driverId] });
      toast.success(data.message);
      navigate("/driver");
    },
  });

  const handleForm = (formData: DriverFormData) => {
    const payload: EditDriverFormData = {
      name: formData.name,
      identification: formData.identification,
      license: formData.license,
    };

    mutate({
      formData: payload,
      driverId,
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] bg-clip-text text-transparent mb-3">
            Editar Piloto
          </h1>
        </div>
        <div className="mb-6">
          <Link
            to="/driver"
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

          <FormProvider {...methods}>
            <form
              className="p-8 space-y-6"
              onSubmit={handleSubmit(handleForm)}
              noValidate
            >
              <DriverForm
                showCarrierField={false}
                showPhotoFields={false} 
              />
              <button
                type="submit"
                disabled={isPending}
                className={`w-full font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 uppercase tracking-wide ${
                  isPending
                    ? "bg-gray-400 cursor-not-allowed text-gray-200"
                    : "bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] hover:from-[var(--color-primary-darker)] hover:to-[var(--color-primary-dark)] text-white hover:shadow-[var(--shadow-amber)] transform hover:-translate-y-0.5"
                }`}
              >
                {isPending ? "Guardando..." : "Guardar Cambios"}
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
