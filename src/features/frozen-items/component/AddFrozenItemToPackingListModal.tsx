import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import BaseModal from "@/shared/components/BaseModal";
import CreateItemForm from "@/features/frozen-items/component/CreateFrozenItemForm";
import { addItemToPackingListAPI } from "@/features/frozen-items/api/frozenItemAPI";
import type { AddItemToPackingListFormData } from "@/features/frozen-items/schema/frozenItemType";

type Props = {
  open: boolean;
  onClose: () => void;
  ctpatId: number;
};

export default function AddFrozenItemToPackingListModal({
  open,
  onClose,
  ctpatId,
}: Props) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<AddItemToPackingListFormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: AddItemToPackingListFormData) =>
      addItemToPackingListAPI(ctpatId, data),

    onSuccess: async () => {
      toast.success("Ítem agregado");
      // Invalidar la query de items (frozen-items)
      await queryClient.invalidateQueries({
        queryKey: ["frozen-items", ctpatId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["packingList", ctpatId],
      });
      // Invalidar queries del documento PDF (refetchType: 'all' para forzar refetch)
      await queryClient.invalidateQueries({
        queryKey: ["ctpat", ctpatId],
        refetchType: "all",
      });
      await queryClient.invalidateQueries({
        queryKey: ["packing-list-frozen-totals", ctpatId],
        refetchType: "all",
      });
      await queryClient.invalidateQueries({
        queryKey: ["packing-list-totals", ctpatId],
        refetchType: "all",
      });
      await queryClient.invalidateQueries({
        queryKey: ["packing-list-frozen", ctpatId],
        refetchType: "all",
      });
      reset();
      onClose();
    },

    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title="Agregar Ítem al Packing List"
    >
      <form onSubmit={handleSubmit((data) => mutate(data))} noValidate>
        <CreateItemForm register={register} errors={errors} control={control} />

        {/* FOOTER */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700
                       disabled:opacity-50"
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
