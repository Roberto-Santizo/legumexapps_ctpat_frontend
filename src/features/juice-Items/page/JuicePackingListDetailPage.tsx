import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { toast } from "react-toastify";

import JuicePackingListHeader from "@/features/juicePacking-List/page/JuicePackingListHeader";
import AddJuiceItemToPackingListModal from "@/features/juice-Items/component/AddJuiceItemToPackingListModal";
import EditJuiceItemModal from "@/features/juice-Items/component/EditJuiceItemModal";
import { getJuicePackingListAPI } from "@/features/juicePacking-List/api/JuicePacking-ListAPI";
import { deletJuiceItemAPI } from "@/features/juice-Items/api/JuiceItemAPI";
import { JuiceItemTable } from "@/features/juice-Items/page/JuiceItemTable"; // Componente
import type { JuiceItemTableType } from "@/features/juice-Items/page/JuiceItemTable"; // Tipo
import type { JuicePackingListWithItems } from "@/features/juicePacking-List/schema/juicePackingListType";

type Props = {
  juicePackingListId?: number;
  packingListData?: JuicePackingListWithItems;
  onContinue?: () => void;
  ctpatId?: number;
};

export default function JuicePackingListDetailPage({
  juicePackingListId,
  packingListData,
  onContinue,
  ctpatId
}: Props) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<JuiceItemTableType | null>(null); 
  const queryClient = useQueryClient();

  // Solo hacer la query si NO se proporcionó packingListData
  const {
    data: fetchedPackingList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["juicePackingList", juicePackingListId],
    queryFn: () => getJuicePackingListAPI(juicePackingListId!),
    enabled: !packingListData && !!juicePackingListId,
    retry: 1,
  });

  // Usar packingListData si se proporcionó, sino usar los datos de la query
  const juicePackingList = packingListData || fetchedPackingList;
  const actualPackingListId = juicePackingList?.id || juicePackingListId;

  const deleteItemMutation = useMutation({
    mutationFn: deletJuiceItemAPI,
    onSuccess: async () => {
      toast.success("Ítem de jugo eliminado correctamente");
      await queryClient.invalidateQueries({
        queryKey: ["juicePackingList", actualPackingListId],
      });
      // También invalidar la query por CTPAT si se está usando packingListData
      if (packingListData) {
        await queryClient.invalidateQueries({
          queryKey: ["juicePackingListByCtpat"],
        });
      }
      // Invalidar la query del ctpat para actualizar el documento PDF
      if (ctpatId) {
        await queryClient.invalidateQueries({
          queryKey: ["ctpat", ctpatId],
        });
      }
    },
    onError: (error: Error) => {
      toast.error(`Error al eliminar: ${error.message}`);
    },
  });

  // Aplanar los items
  const flattenedItems = useMemo(() => {
    if (!juicePackingList?.items) return [];

    const items: JuiceItemTableType[] = [];

    juicePackingList.items.forEach((group: Record<string, JuiceItemTableType[]>) => {
      const clientName = Object.keys(group)[0];
      const clientItems = group[clientName];

      if (Array.isArray(clientItems)) {
        clientItems.forEach((item: JuiceItemTableType) => {
          items.push({
            ...item,
            client_name: clientName
          });
        });
      }
    });

    return items;
  }, [juicePackingList]);

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

  const hasItems = flattenedItems.length > 0;

  return (
    <div className="space-y-6">
      <JuicePackingListHeader packingList={juicePackingList} />

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
          Total de items: <span className="font-bold text-amber-700">{flattenedItems.length}</span>
        </p>
      </div>

      <JuiceItemTable
        items={flattenedItems}
        onDelete={handleDeleteItem}
        onEdit={(_itemId: number, itemData: JuiceItemTableType) => handleEditItem(itemData)}
      />

      <AddJuiceItemToPackingListModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        juicePackingListId={actualPackingListId!}
        ctpatId={ctpatId}
      />

      {editingItem && (
        <EditJuiceItemModal
          open={true}
          onClose={() => setEditingItem(null)}
          juicePackingListId={actualPackingListId!}
          itemId={editingItem.id}
          itemData={editingItem}
          ctpatId={ctpatId}
        />
      )}
    </div>
  );
}