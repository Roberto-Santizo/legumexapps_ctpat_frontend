import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import BaseModal from "@/features/packing-List/components/BaseModal";
import CreateItemForm from "@/features/packing-List/components/CreateItemForm";
import { addItemToPackingListAPI } from "../api/PackingListAPI";
import type { AddItemToPackingListFormData } from "@/features/packing-List/schemas/createItemSchema";

type Props = {
  open: boolean;
  onClose: () => void;
  packingListId: number;
  ctpatId: number;
};

export default function AddItemToPackingListModal({
  open,
  onClose,
  packingListId,
  ctpatId,
}: Props) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddItemToPackingListFormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: AddItemToPackingListFormData) =>
      addItemToPackingListAPI(packingListId, data),

    onSuccess: async () => {
      toast.success("Ítem agregado");
      await queryClient.invalidateQueries({
        queryKey: ["packingList", ctpatId],
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
      <form onSubmit={handleSubmit((data) => mutate(data))}>
        <CreateItemForm register={register} errors={errors} />

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
            className="px-4 py-2 rounded-lg bg-[var(--color-primary)]
                       text-white disabled:opacity-50"
          >
            {isPending ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
