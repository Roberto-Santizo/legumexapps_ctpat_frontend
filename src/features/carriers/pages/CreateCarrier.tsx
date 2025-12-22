import type { createCarrierFormSchema } from "@/features/carriers/schemas/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {createCarriersAPI} from "@/features/carriers/api/CarriersAPI"
import CarrierForm from "@/features/carriers/components/CarriersForm"
import type {CreateCarrierResponse} from "@/features/carriers/schemas/types"
import {createCarrierResponseSchema} from "@/features/carriers/schemas/types"
import { useForm, FormProvider } from "react-hook-form";



export default function CreateCarrier() {
  const navigate = useNavigate();
  const initialValues: createCarrierFormSchema = { name: "" };
  const methods = useForm<createCarrierFormSchema>({
    defaultValues: initialValues,
    mode: "onChange"
  })
  const { handleSubmit } = methods;
  
  const { mutate } = useMutation<CreateCarrierResponse, never, createCarrierFormSchema>({
    mutationFn: async (data) => {
      const response = await createCarriersAPI(data);
      return createCarrierResponseSchema.parse(response);
    },
    onSuccess: (response) => {
      if (response.statusCode === 201) {
        toast.success(response.message);
        setTimeout(() => navigate("/carriers"), 100);
      } else {
        toast.error(response.message);
      }
    },
  });

  const handleForm = async (data: createCarrierFormSchema) =>{
    mutate(data);
  } 

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] bg-clip-text text-transparent mb-3">
            Crear Nuevo Transportista
          </h1>
        </div>

        <div className="mb-6">
          <Link
            to="/carriers"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--color-primary-dark)] font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-[var(--color-bg-secondary)] transition-all duration-200 border border-[var(--color-border-light)]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Regresar
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-[var(--color-border-light)] overflow-hidden">
          <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] h-2"></div>

          <form className="p-8 space-y-6" onSubmit={handleSubmit(handleForm)} noValidate>
              <FormProvider {...methods}>
                <CarrierForm />
              </FormProvider>

            <input
              type="submit"
              value="Crear Transportista"
              className="w-full bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] hover:from-[var(--color-primary-darker)] hover:to-[var(--color-primary-dark)] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-amber)] transform hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-wide"
            />
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-[var(--color-text-tertiary)]">
          <p>Los cambios se aplicarán inmediatamente después de crear transportista</p>
        </div>
      </div>
    </div>
  );
}
