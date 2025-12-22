import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AddPackingListToPackingListForm from "./AddPackingListToPackingListForm";
import { addItemToPackingListAPI } from "../api/PackingListAPI";
import type { AddItemToPackingListFormData } from "../schemas/addItemToPackingList";

type Props = {
  open: boolean;
  onClose: () => void;
  packingListId: number;
};


export default function AddItemToPackingListModal({ open, onClose, packingListId }: Props) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors }, reset } =
    useForm<AddItemToPackingListFormData>();

  const { mutate } = useMutation({
    mutationFn: (data: AddItemToPackingListFormData) =>
      addItemToPackingListAPI(packingListId, data),
    onSuccess: () => {
      toast.success("Ítem agregado");
      queryClient.invalidateQueries({ queryKey: ["ctpat", packingListId] });
      reset();
      onClose();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Agregar ítem</h2>

        <form onSubmit={handleSubmit((data) => mutate(data))}>
          <AddPackingListToPackingListForm register={register} errors={errors} />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
