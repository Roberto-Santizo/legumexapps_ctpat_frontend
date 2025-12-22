import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {createCarrierFormSchema,CarrierUpdateData,} from "@/features/carriers/schemas/types";
import { updateCarrierAPI } from "@/features/carriers/api/CarriersAPI";
import CarrierForm from "./CarriersForm";

type EditCarrierFormProps = {
  data: CarrierUpdateData;
  id: number;
};

export default function EditCarrierForm({ data, id }: EditCarrierFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const methods = useForm<createCarrierFormSchema>({
    defaultValues: {
      name:data.name,
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
      });
    }
  }, [data, reset]);

  const { mutate } = useMutation({
    mutationFn: updateCarrierAPI,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carriers"] });
      queryClient.invalidateQueries({ queryKey: ["editCarrier", id] });
      toast.success("Transportista actualizado");
      navigate("/carriers");
    },
  });

  const handleForm = (formData: createCarrierFormSchema) => {
    const payload: CarrierUpdateData = {
      name: formData.name,
    }
    mutate({
      formData: payload,
      id,
    });
  };

return (
  <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl mx-auto">

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] bg-clip-text text-transparent mb-3">
          Editar Transportista
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-[var(--color-border-light)] overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] h-2"></div>

        <FormProvider {...methods}>
          <form
            className="p-8 space-y-6"
            onSubmit={handleSubmit(handleForm)}
            noValidate
          >
            <CarrierForm />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)]
                         hover:from-[var(--color-primary-darker)] hover:to-[var(--color-primary-dark)]
                         text-white font-bold py-4 px-6 rounded-xl shadow-lg
                         hover:shadow-[var(--shadow-amber)]
                         transform hover:-translate-y-0.5 transition-all duration-200
                         uppercase tracking-wide"
            >
              Guardar Cambios
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  </div>
);

}
