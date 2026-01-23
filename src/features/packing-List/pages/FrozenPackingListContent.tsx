import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

import PackingListHeader from "@/features/packing-List/components/PackingListHeader";
import PackingListItemsTable from "@/features/frozen-items/page/FrozenItemsTable";
import AddItemModal from "@/features/frozen-items/component/AddFrozenItemToPackingListModal";
import EditItemForm from "@/features/frozen-items/component/EditFrozenItemForm";
import { getPackingListById } from "@/features/packing-List/api/PackingListAPI";
import { deleteItemAPI } from "@/features/frozen-items/api/frozenItemAPI";
import type { PackingListItemTable } from "@/features/packing-List/schemas/packingList";

type Props = {
  ctpatId: number;
};

export default function FrozenPackingListContent({ ctpatId }: Props) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PackingListItemTable | null>(null);
  const queryClient = useQueryClient();

  const {
    data: packingList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["packingList", ctpatId],
    queryFn: () => getPackingListById(ctpatId),
    enabled: !!ctpatId,
    retry: 1,
  });

  const deleteItemMutation = useMutation({
    mutationFn: deleteItemAPI,
    onSuccess: async () => {
      toast.success("Ítem eliminado correctamente");
      await queryClient.invalidateQueries({
        queryKey: ["packingList", ctpatId],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteItem = (itemId: number) => {
    deleteItemMutation.mutate(itemId);
  };

  const handleEditItem = (itemData: PackingListItemTable) => {
    setEditingItem(itemData);
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando packing list de congelados...</p>
        </div>
      </div>
    );
  }

  if (isError || !packingList) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-800 font-semibold mb-2">
            Error al cargar el packing list de congelados
          </p>
          <p className="text-red-600 text-sm">CTPAT ID: {ctpatId}</p>
        </div>
      </div>
    );
  }

  const items = packingList.items ?? [];

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
    <div className="space-y-6">
      <PackingListHeader packingList={headerData} />

      <div className="flex justify-start">
        <button
          onClick={() => setOpenAddModal(true)}
          className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 transition-all font-semibold shadow-md hover:shadow-lg"
        >
          + Agregar ítem
        </button>
      </div>

      <PackingListItemsTable
        items={items}
        onDelete={handleDeleteItem}
        onEdit={(_, itemData) => handleEditItem(itemData)}
        ctpatId={ctpatId}
      />

      <AddItemModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        frozenPackingListId={packingList.id}
        ctpatId={ctpatId}
      />

      {editingItem && (
        <EditItemForm
          open={true}
          onClose={() => setEditingItem(null)}
          packingListId={packingList.id}
          itemId={editingItem.id}
          ctpatId={ctpatId}
          itemData={editingItem}
        />
      )}
    </div>
  );
}