import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

import JuicePackingListHeader from "@/features/juicePacking-List/page/JuicePackingListHeader";
import AddJuiceItemToPackingListModal from "@/features/juice-Items/component/AddJuiceItemToPackingListModal";
import EditJuiceItemModal from "@/features/juice-Items/component/EditJuiceItemModal";
import { getJuicePackingListAPI } from "@/features/juicePacking-List/api/JuicePacking-ListAPI";
import { getJuicePackingListTotalsAPI } from "@/features/juicePacking-List/api/JuicePackingListTotals";
import { deletJuiceItemAPI, getJuiceItemsAPI } from "@/features/juice-Items/api/JuiceItemAPI";
import { JuiceItemTable } from "@/features/juice-Items/page/JuiceItemTable";
import type { JuiceItemTableType } from "@/features/juice-Items/schema/juiceItemType";

// Tipo para los datos del packing list que recibe este componente
type JuicePackingListData = {
  id: number;
  box_type: string;
  order: string;
  client: string;
  no_thermograph: string;
};

type Props = {
  ctpatId: number;
  packingListData?: JuicePackingListData | null;
  onContinue?: () => void;
};

export default function JuicePackingListDetailPage({
  ctpatId,
  packingListData,
  onContinue,
}: Props) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<JuiceItemTableType | null>(null);
  const queryClient = useQueryClient();

  // Query para obtener datos del packing list (header)
  const {
    data: fetchedPackingList,
    isLoading: isLoadingPackingList,
    isError: isErrorPackingList,
    error: errorPackingList,
  } = useQuery({
    queryKey: ["juicePackingList", ctpatId],
    queryFn: () => getJuicePackingListAPI(ctpatId),
    enabled: !packingListData && !!ctpatId,
    retry: 1,
  });

  // Query separada para obtener los items de juice
  const {
    data: juiceItems = [],
    isLoading: isLoadingItems,
  } = useQuery({
    queryKey: ["juiceItems", ctpatId],
    queryFn: () => getJuiceItemsAPI(ctpatId),
    enabled: !!ctpatId,
  });

  // Query para obtener los totales de juice
  const { data: totals } = useQuery({
    queryKey: ["juicePackingListTotals", ctpatId],
    queryFn: () => getJuicePackingListTotalsAPI(ctpatId),
    enabled: !!ctpatId,
  });

  // Usar packingListData si se proporcionó, sino usar los datos de la query
  const juicePackingList = packingListData || fetchedPackingList;

  const deleteItemMutation = useMutation({
    mutationFn: deletJuiceItemAPI,
    onSuccess: async () => {
      toast.success("Ítem de jugo eliminado correctamente");
      // Invalidar la query de items
      await queryClient.invalidateQueries({
        queryKey: ["juiceItems", ctpatId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["juicePackingList", ctpatId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["juicePackingListByCtpat", ctpatId],
      });
      // Invalidar queries del documento PDF (sin ctpatId para invalidar por prefijo)
      await queryClient.invalidateQueries({
        queryKey: ["ctpat"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["packing-list-juice-totals"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["packing-list-juice"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["juicePackingListTotals", ctpatId],
      });
    },
    onError: (error: Error) => {
      toast.error(`Error al eliminar: ${error.message}`);
    },
  });

  const isLoading = isLoadingPackingList || isLoadingItems;
  const isError = isErrorPackingList;
  const error = errorPackingList;

  const handleDeleteItem = (itemId: number) => {
    if (window.confirm("¿Estás seguro de eliminar este ítem de jugo?")) {
      deleteItemMutation.mutate(itemId);
    }
  };

  const handleEditItem = (itemData: JuiceItemTableType) => { 
    setEditingItem(itemData);
  };

  // Solo mostrar loading si NO tenemos packingListData y estamos cargando
  if (!packingListData && isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Cargando packing list de jugos...</p>
        </div>
      </div>
    );
  }

  // Solo mostrar error si NO tenemos packingListData y hubo error
  if (!packingListData && (isError || !juicePackingList)) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-red-800 font-semibold mb-2 flex items-center gap-2">
            Error al cargar el packing list de jugos
          </h3>
          {error && <p className="text-red-600 text-sm">{error.message}</p>}
        </div>
      </div>
    );
  }

  // Si después de todo no tenemos datos, mostrar error
  if (!juicePackingList) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-red-800 font-semibold mb-2">No hay datos del packing list</h3>
        </div>
      </div>
    );
  }

  const hasItems = juiceItems.length > 0;

  // Mapear los datos para el header
  const headerData = {
    id: juicePackingList.id,
    box_type: juicePackingList.box_type,
    order: juicePackingList.order,
    customer: juicePackingList.client,
    thermograph_no: juicePackingList.no_thermograph,
  };

  return (
    <div className="space-y-6">
      <JuicePackingListHeader packingList={headerData} totals={totals} />

      <div className="flex justify-between items-center">
        <button
          onClick={() => setOpenAddModal(true)}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          Agregar ítem
        </button>

        {onContinue && (
          <button
            type="button"
            onClick={onContinue}
            disabled={!hasItems}
            className={`px-6 py-3 rounded-lg text-white font-medium transition-all shadow-md ${
              hasItems
                ? "bg-green-600 hover:bg-green-700 hover:shadow-lg"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {hasItems ? "Continuar a Checklist ✓" : "Agregar items primero"}
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg p-4 border-l-4 border-amber-500">
        <p className="text-sm text-gray-600">
          Total de items: <span className="font-bold text-amber-700">{juiceItems.length}</span>
        </p>
      </div>

      <JuiceItemTable
        items={juiceItems}
        onDelete={handleDeleteItem}
        onEdit={(_itemId: number, itemData: JuiceItemTableType) => handleEditItem(itemData)}
        totals={totals}
      />

      <AddJuiceItemToPackingListModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        ctpatId={ctpatId}
      />

      {editingItem && (
        <EditJuiceItemModal
          open={true}
          onClose={() => setEditingItem(null)}
          ctpatId={ctpatId}
          itemId={editingItem.id}
          itemData={editingItem}
        />
      )}
    </div>
  );
}