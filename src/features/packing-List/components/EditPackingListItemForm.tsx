import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useEffect } from "react";
import AddItemToPackingListForm from "./AddItemToPackingListForm";
import { updatePackingListItemAPI } from "../api/PackingListAPI";
import type { AddItemToPackingListFormData } from "../schemas/addItemToPackingList";

type Props = {
  open: boolean;
  onClose: () => void;
  packingListId: number;
  itemId: number;
  ctpatId: number;
  initialData: AddItemToPackingListFormData;
};

export default function EditPackingListItemForm({
  open,
  onClose,
  packingListId,
  itemId,
  ctpatId,
  initialData,
}: Props) {
  const queryClient = useQueryClient();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddItemToPackingListFormData>({
    defaultValues: initialData,
  });

  // Actualizar el formulario cuando cambien los datos iniciales
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: AddItemToPackingListFormData) =>
      updatePackingListItemAPI({
        packingListId,
        itemId,
        formData,
      }),

    onSuccess: async () => {
      toast.success("Ítem actualizado correctamente");
      
      // Invalidar queries para actualizar la tabla
      await queryClient.invalidateQueries({
        queryKey: ["packingList", ctpatId],
      });
      
      // Invalidar query del item específico por si se usa en otro lugar
      await queryClient.invalidateQueries({
        queryKey: ["packingListItem", itemId],
      });

      onClose();
    },

    onError: (error: Error) => toast.error(error.message),
  });

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        px-3 sm:px-4
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white
          w-full
          sm:max-w-lg
          md:max-w-xl
          rounded-2xl
          shadow-xl
          flex flex-col
          max-h-[90vh]
        "
      >
        {/* HEADER */}
        <div className="text-center mb-8 pt-6 px-5">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] bg-clip-text text-transparent mb-3">
            Editar Ítem del Packing List
          </h1>
        </div>

        {/* BODY */}
        <div className="px-5 py-4 overflow-y-auto">
          <form onSubmit={handleSubmit((data) => mutate(data))}>
            <AddItemToPackingListForm register={register} errors={errors} />

            {/* FOOTER */}
            <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className={`
                  px-4 py-2
                  rounded-lg
                  border border-gray-300
                  text-gray-700
                  transition
                  ${
                    isPending
                      ? "opacity-50 cursor-not-allowed bg-gray-50"
                      : "hover:bg-gray-100"
                  }
                `}
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isPending}
                className={`
                  px-4 py-2
                  rounded-lg
                  bg-[var(--color-primary)]
                  text-white
                  transition
                  ${
                    isPending
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:opacity-90"
                  }
                `}
              >
                {isPending ? "Actualizando..." : "Actualizar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}