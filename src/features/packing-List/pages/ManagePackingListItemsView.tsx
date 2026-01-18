import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

import PackingListHeader from "@/features/packing-List/components/PackingListHeader";
import PackingListItemsTable from "@/features/packing-List/pages/PackingListItemsTable";
import AddItemModal from "@/features/packing-List/components/AddItemToPackingListModal";
import EditItemForm from "@/features/packing-List/components/EditItemForm";
import { getPackingListById, deleteItemAPI } from "@/features/packing-List/api/PackingListAPI";
import type { PackingListItemTable } from "@/features/packing-List/schemas/packingList";

export default function ManagePackingListItemsView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const ctpatId = Number(id);

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

  const handleGoBack = () => {
    navigate("/ctpats");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando packing list...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !packingList) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-800 font-semibold mb-4">
              Error al cargar el packing list
            </p>
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-300"
            >
              <ArrowLeft size={20} />
              Regresar a CTpats
            </button>
          </div>
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
    <div className="min-h-screen bg-[var(--color-bg-primary)] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gestionar Items del Packing List
            </h1>
            <p className="text-gray-600">CTPAT ID: {ctpatId}</p>
          </div>

          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--color-primary-dark)] font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-[var(--color-bg-secondary)] transition-all duration-200 border border-[var(--color-border-light)]"
          >
            <ArrowLeft size={20} />
            Regresar a CTpats
          </button>
        </div>

        {/* Contenido */}
        <div className="space-y-6">
          {/* Información del Packing List */}
          <PackingListHeader packingList={headerData} />

          {/* Botón para agregar */}
          <div className="flex justify-start">
            <button
              onClick={() => setOpenAddModal(true)}
              className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 transition-all font-semibold shadow-md hover:shadow-lg"
            >
              + Agregar ítem
            </button>
          </div>

          {/* Tabla de items */}
          <PackingListItemsTable
            items={items}
            onDelete={handleDeleteItem}
            onEdit={(_, itemData) => handleEditItem(itemData)}
            ctpatId={ctpatId}
          />

          {/* Mensaje informativo */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              💡 <strong>Nota:</strong> Los cambios se guardan automáticamente.
              Puedes agregar, editar o eliminar items según sea necesario.
            </p>
          </div>
        </div>

        {/* Modal para agregar item */}
        <AddItemModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          packingListId={packingList.id}
          ctpatId={ctpatId}
        />

        {/* Modal para editar item */}
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
    </div>
  );
}