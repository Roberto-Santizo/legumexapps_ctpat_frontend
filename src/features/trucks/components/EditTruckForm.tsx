// EditTruckForm.tsx
import { ErrorMessage } from "../../../shared/components/ErrorMessage";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { getCarriersAPI } from "@/features/carriers/api/CarriersAPI";
import { updateTruckAPI } from "@/features/trucks/api/TruckAPI";
import type { TruckUpdateData  } from "@/features/trucks/schemas/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";

type TruckFormProps = {
  data: TruckUpdateData ;
  truckId: number;
};

export default function EditTruckForm({ data, truckId }: TruckFormProps) {
  const navigate = useNavigate();

  const methods = useForm<TruckUpdateData >({
    defaultValues: {
      plate: data.plate,
      carrier_id: data.carrier_id,
    },
    mode: "onChange",
  });

  const { register, setValue, formState: { errors } } = methods;

  const [carriers, setCarriers] = useState<{ id: number; name: string }[]>([]);
  const [loadingCarriers, setLoadingCarriers] = useState(true);

  // cargar transportistas
  useEffect(() => {
    (async () => {
      try {
        const { response } = await getCarriersAPI();
        setCarriers(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error cargando transportistas", error);
      } finally {
        setLoadingCarriers(false);
      }
    })();
  }, []);

  // cargar valores del camión (por si cambia)
  useEffect(() => {
    setValue("plate", data.plate);
    setValue("carrier_id", data.carrier_id);
  }, [data,setValue]);

  // Mutación
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (payload: TruckUpdateData ) =>
      updateTruckAPI({ formData: payload, truckId }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({queryKey:["editTruck"]})
      queryClient.invalidateQueries({queryKey:["truck"]})
      toast.success(response.message);
      navigate("/trucks");
    },
    onError: () => toast.error("Error al actualizar el camión"),
  });

  // submit
  const onSubmit = (formData: TruckUpdateData ) => {
    mutate({
      ...formData,
      carrier_id: Number(formData.carrier_id),
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] bg-clip-text text-transparent mb-3">
            Editar Camión
          </h1>
        </div>

        <div className="mb-6">
          <Link
            to="/trucks"
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

          {/* FORM */}
          <FormProvider {...methods}>
            <form className="p-8 space-y-6" onSubmit={methods.handleSubmit(onSubmit)}>

              {/* PLACA */}
              <div className="form-group">
                <label htmlFor="plate" className="form-label">
                  Placa <span className="required">*</span>
                </label>
                <input
                  id="plate"
                  type="text"
                  className={`form-input ${errors?.plate ? "form-input-error" : "form-input-normal"}`}
                  {...register("plate", { required: "La placa es obligatoria" })}
                />
                {errors?.plate && <ErrorMessage>{errors.plate.message}</ErrorMessage>}
              </div>

              {/* TRANSPORTISTA */}
              <div className="form-group mt-6">
                <label htmlFor="carrier_id" className="form-label">
                  Transportista <span className="required">*</span>
                </label>
                <select
                  id="carrier_id"
                  className={`form-input ${errors.carrier_id ? "form-input-error" : "form-input-normal"}`}
                  {...register("carrier_id", { required: "El transportista es obligatorio" })}
                  disabled={loadingCarriers}
                >
                  <option value="">Seleccione...</option>
                  {carriers.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {errors.carrier_id && <ErrorMessage>{errors.carrier_id.message}</ErrorMessage>}
              </div>

              {/* BOTÓN GUARDAR */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] hover:from-[var(--color-primary-darker)] hover:to-[var(--color-primary-dark)] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-amber)] transform hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-wide"
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
