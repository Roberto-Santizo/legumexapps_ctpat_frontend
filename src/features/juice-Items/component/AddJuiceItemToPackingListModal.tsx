import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import BaseModal from "@/shared/components/BaseModal";
import CreateJuiceItemForm from "@/features/juice-Items/component/CreateJuiceItemForm";
import { createJuiceItemAPI } from "@/features/juice-Items/api/JuiceItemAPI";
import type { CreateJuiceItemFormData } from "@/features/juice-Items/schema/juiceItemType";

type Props = {
  open: boolean;
  onClose: () => void;
  juicePackingListId: number;
  ctpatId?: number;
};

export default function AddJuiceItemToPackingListModal({
  open,
  onClose,
  juicePackingListId,
  ctpatId,
}: Props) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateJuiceItemFormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateJuiceItemFormData) =>
      createJuiceItemAPI(juicePackingListId, data),

    onSuccess: async () => {
      toast.success("Ítem de jugo agregado correctamente");
      // Invalidar la query específica del packing list
      await queryClient.invalidateQueries({
        queryKey: ["juicePackingList", juicePackingListId],
      });
      // También invalidar la query por CTPAT (usada en el flujo dinámico)
      await queryClient.invalidateQueries({
        queryKey: ["juicePackingListByCtpat"],
      });
      // Invalidar la query del ctpat para actualizar el documento PDF
      if (ctpatId) {
        await queryClient.invalidateQueries({
          queryKey: ["ctpat", ctpatId],
        });
      }
      reset();
      onClose();
    },

    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
      console.error("Error creando item:", error);
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      title="Agregar Ítem de Jugo"
    >
      <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-6" noValidate>
        <CreateJuiceItemForm register={register} errors={errors} />

        {/* FOOTER */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700
                       hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors font-medium"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-700
                       text-white disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors font-medium shadow-md"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Guardando...
              </span>
            ) : (
              "Guardar Ítem"
            )}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}