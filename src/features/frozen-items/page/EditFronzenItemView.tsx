import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Spinner } from "@/shared/components/Spinner";
import { toast } from "react-toastify";

import PackingListHeader from "@/features/packing-List/components/PackingListHeader";
import PackingListItemsTable from "@/features/frozen-items/page/FrozenItemsTable";
import AddItemModal from "@/features/frozen-items/component/AddFrozenItemToPackingListModal";
import EditPackingListItemForm from "@/features/frozen-items/component/EditFrozenItemForm";
import { deleteItemAPI, getfrozenItemsAPI } from "@/features/frozen-items/api/frozenItemAPI";
import { getFrozenPackingList } from "@/features/packing-List/api/PackingListAPI";
import { getPackingListTotalsAPI } from "@/features/packing-List/api/PackingListTotals";

import type { PackingListItemTable } from "@/features/packing-List/schemas/packingList";

export default function EditFronzenItemView() {
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
    queryFn: () => getFrozenPackingList(ctpatId),
    enabled: !!ctpatId,
  });

  const { data: frozenItems = [], isLoading: isLoadingItems } = useQuery({
    queryKey: ["frozen-items", ctpatId],
    queryFn: () => getfrozenItemsAPI(ctpatId),
    enabled: !!ctpatId,
  });

  const { data: totals, isLoading: isLoadingTotals } = useQuery({
    queryKey: ["packing-list-totals", ctpatId],
    queryFn: () => getPackingListTotalsAPI(ctpatId),
    enabled: !!ctpatId,
  });

  const deleteItemMutation = useMutation({
    mutationFn: deleteItemAPI,
    onSuccess: async () => {
      toast.success("Ítem eliminado correctamente");
      await queryClient.invalidateQueries({
        queryKey: ["frozen-items", ctpatId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["packing-list-totals", ctpatId],
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
        queryKey: ["packing-list-frozen", ctpatId],
        refetchType: "all",
      });
      await queryClient.invalidateQueries({
        queryKey: ["packingList", ctpatId],
        refetchType: "all",
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

  if (isLoading || isLoadingItems || isLoadingTotals) return <Spinner />;

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
              Regresar a CTpats
            </button>
          </div>
        </div>
      </div>
    );
  }

  const items = frozenItems ?? [];

  const headerData = {
    id: packingList.id,
    carrier: packingList.carrier,
    order: packingList.order,
    client: packingList.client,
    no_container: packingList.no_container,
    container_type: packingList.container_type,
    seal: packingList.seal,
    boxes: totals?.reduce((sum, item) => sum + item.total_boxes, 0) ?? 0,
    beginning_date: packingList.beginning_date,
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Editar Items del Packing List
            </h1>
            <p className="text-gray-600">CTPAT: {ctpatId}</p>
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

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              💡 <strong>Nota:</strong> Los cambios se guardan automáticamente.
              Puedes editar, agregar o eliminar items según sea necesario.
            </p>
          </div>
        </div>

        {/* Modal agregar */}
        <AddItemModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          ctpatId={ctpatId}
        />

        {/* Modal editar */}
        {editingItem && (
          <EditPackingListItemForm
            open={true}
            onClose={() => setEditingItem(null)}
            itemId={editingItem.id}
            ctpatId={ctpatId}
            itemData={editingItem}
          />
        )}
      </div>
    </div>
  );
}