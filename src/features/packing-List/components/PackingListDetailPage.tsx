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
  onContinue: () => void;
};

export default function PackingListDetailPage({ ctpatId, onContinue }: Props) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PackingListItemTable | null>(null);
  const queryClient = useQueryClient();

  const {
    data: packingList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["packingList", ctpatId],
    queryFn: () => getPackingListById(ctpatId),
    enabled: !!ctpatId,
    retry: 1, // Solo reintentar una vez
  });

  const deleteItemMutation = useMutation({
    mutationFn: deleteItemAPI,
    onSuccess: async () => {
      toast.success("Ítem eliminado correctamente");
      await queryClient.invalidateQueries({
        queryKey: ["packingList", ctpatId],
      });
      // Invalidar la query del ctpat para actualizar el documento PDF
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

  const handleEditItem = (itemData: PackingListItemTable) => {
    setEditingItem(itemData);
  };

  // Mostrar estado de carga
  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando packing list...</p>
          <p className="text-sm text-gray-400 mt-2">CTPAT ID: {ctpatId}</p>
        </div>
      </div>
    );
  }

  // Mostrar error con detalles
  if (isError || !packingList) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-red-800 font-semibold mb-2">
            Error al cargar el packing list
          </h3>
          <p className="text-red-600 text-sm mb-4">
            CTPAT ID: {ctpatId}
          </p>
          {error && (
            <div className="bg-red-100 rounded p-3 mb-4">
              <p className="text-xs text-red-800 font-mono">
                Error: {error.message}
              </p>
            </div>
          )}
          <div className="space-y-2 text-sm text-red-700">
            <p>Posibles causas:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>El packing list no existe para este CTPAT</li>
              <li>Error de conexión con el servidor</li>
              <li>El CTPAT ID es inválido: {ctpatId}</li>
              <li>Error en la validación del esquema de datos</li>
            </ul>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Recargar página
          </button>
        </div>
      </div>
    );
  }

  const items = packingList.items ?? [];
  const hasItems = items.length > 0;

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
      <PackingListHeader packingList={headerData} />

      <div className="flex justify-between">
        <button
          onClick={() => setOpenAddModal(true)}
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg"
        >
          + Agregar ítem
        </button>

        <button
          type="button"
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
        items={items}
        onDelete={handleDeleteItem}
        onEdit={(_, itemData) => handleEditItem(itemData)}
        ctpatId={ctpatId}
      />

      {/* Modal agregar */}
      <AddItemModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        frozenPackingListId={packingList.id}
        ctpatId={ctpatId}
      />

      {/* Modal editar */}
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