import { useState } from "react";
import PackingListHeader from "@/features/packing-List/components/PackingListHeader";
import PackingListItemsTable from "@/features/packing-List/pages/PackingListItemsTable";
import AddItemModal from "@/features/packing-List/components/AddItemToPackingListModal";
import { useMutation, useQueryClient,useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteItemAPI } from "@/features/packing-List/api/PackingListAPI";
import { getPackingListById } from "@/features/packing-List/api/PackingListAPI";

type Props = {
  packingListId: number;
  ctpatId: number;
  onContinue: () => void;
};


export default function PackingListDetailPage({ packingListId, ctpatId, onContinue }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();

  const {data: packingList,isLoading,isError,} = useQuery({
    queryKey: ["packingList", packingListId],
    queryFn: () => getPackingListById(ctpatId),
    enabled: !!packingListId,
  });

  const deleteItemMutation = useMutation({
    mutationFn: (itemId: number) => deleteItemAPI(itemId),

    onSuccess: async () => {
      toast.success("Ítem eliminado correctamente");

      // 3. USAMOS LA PROP ctpatId (QUE SÍ TIENE VALOR)
      await queryClient.invalidateQueries({
        queryKey: ["packingList", packingListId], 
      });
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteItem = (itemId: number) => {
    deleteItemMutation.mutate(itemId);
  };

  
  if (isLoading) {
    return <p>Cargando packing list...</p>;
  }
  
  if (isError || !packingList) {
    return <p>Error al cargar la packing list</p>;
  }
  const hasItems = packingList.items.length > 0;

  const headerData = {
    id: packingList.id,
    carrier: packingList.carrier,
    order: packingList.order,
    client: packingList.client,
    no_container: packingList.no_container,
    container_type: packingList.container_type,
    seal: packingList.seal,
    boxes: packingList.boxes,
    beginning_date: packingList.beginning_date,
  };


  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <PackingListHeader packingList={headerData} />

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

      {/* Tabla */}
      <PackingListItemsTable
        items={packingList.items}
        onDelete={handleDeleteItem}
      />

      {/* Modal */}
      <AddItemModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        packingListId={packingList.id}
        ctpatId={ctpatId}
      />
    </div>
  );
}
