import { useState } from "react";
import PackingListHeader from "@/features/packing-List/components/PackingListHeader";
import PackingListItemsTable from "@/features/packing-List/components/PackingListItemsTable";
import AddItemModal from "@/features/packing-List/components/AddItemToPackingListModal";
import type { PackingListHeader as PackingListType } from "@/features/packing-List/schemas/packingList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteItemAPI } from "@/features/packing-List/api/PackingListAPI";

type Props = {
  packingList: PackingListType;
  ctpatId: number;
  onContinue: () => void;
};

export default function PackingListDetailPage({ 
  packingList, 
  ctpatId, 
  onContinue 
}: Props) {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();

  const deleteItemMutation = useMutation({
    mutationFn: (itemId: number) => deleteItemAPI(itemId),

    onSuccess: async () => {
      toast.success("Ítem eliminado correctamente");

      // 3. USAMOS LA PROP ctpatId (QUE SÍ TIENE VALOR)
      await queryClient.invalidateQueries({
        queryKey: ["ctpat", ctpatId], 
      });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteItem = (itemId: number) => {
    deleteItemMutation.mutate(itemId);
  };

  const hasItems = packingList.items.length > 0;

  return (
    <div className="p-6 space-y-6">
      <PackingListHeader packingList={packingList} />

      <div className="flex justify-between">
        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg"
        >
          + Agregar ítem
        </button>

        <button
          onClick={onContinue}
          disabled={!hasItems}
          className={`px-4 py-2 rounded-lg text-white ${
            hasItems
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continuar a Checklist
        </button>
      </div>

      <PackingListItemsTable
        items={packingList.items}
        onDelete={handleDeleteItem}
      />

      <AddItemModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        packingListId={packingList.id}
        ctpatId={ctpatId} 
      />
    </div>
  );
}
