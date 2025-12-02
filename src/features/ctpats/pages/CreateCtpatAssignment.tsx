import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CtpatTruckDriverAssignmentForm from "../components/CtpatTruckDriverAssignmentForm";
import type { CreateCtpatAssignmentForm } from "../components/CtpatTruckDriverAssignmentForm";
import { updateCtpatTruckDriver } from "../api/CtpatTruckDriverAssignmentAPI";
import { useUpdateCtpatStatus } from "@/features/ctpats/hooks/useUpdateCtpatStatus";


export default function CreateCtpatAssignment({ ctpatId }: { ctpatId: number }) {
  const updateStatus = useUpdateCtpatStatus();

  const navigate = useNavigate();
  const methods = useForm<CreateCtpatAssignmentForm>({
    defaultValues: {
      truck_id: 0,
      driver_id: 0,
    },
    mode: "onChange",
  });

  const { mutate } = useMutation({
    mutationFn: (formData: CreateCtpatAssignmentForm) =>
      updateCtpatTruckDriver({
        ctpatId: Number(ctpatId),
        formData,
      }),

    onSuccess: (response) => {
      toast.success(response.message || "Asignación registrada correctamente");
      updateStatus.mutate({ id: ctpatId, status: 5 });
      navigate("/ctpats");
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleForm = (data: CreateCtpatAssignmentForm) => {
    const parsedData = {
      truck_id: Number(data.truck_id),
      driver_id: Number(data.driver_id),
    };

    if (!parsedData.truck_id || !parsedData.driver_id) {
      toast.error("Debes seleccionar camión y piloto");
      return;
    }

    mutate(parsedData);
  };
    if (!ctpatId) {
    return <p>Error: No se encontró el ID del CTPAT.</p>;
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] bg-clip-text text-transparent mb-3">
            Asignar Camión y Piloto (CTPAT)
          </h1>
        </div>

        <div className="mb-6">
          <Link
            to={"/ctpats"}
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
              onSubmit={methods.handleSubmit(handleForm)}
              noValidate
            >
              <CtpatTruckDriverAssignmentForm
                register={methods.register}
                errors={methods.formState.errors}
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white font-bold py-4 px-6 rounded-xl shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-wide"
              >
                Guardar Asignación
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
