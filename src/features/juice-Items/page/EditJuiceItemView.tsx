import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Spinner } from "@/shared/components/Spinner";
import { toast } from "react-toastify";

import JuicePackingListHeader from "@/features/juicePacking-List/page/JuicePackingListHeader";
import JuiceItemsTable from "@/features/juice-Items/page/JuiceItemTable";
import AddJuiceItemToPackingListModal from "@/features/juice-Items/component/AddJuiceItemToPackingListModal";
import EditJuiceItemModal from "@/features/juice-Items/component/EditJuiceItemModal";
import { getJuicePackingListAPI } from "@/features/juicePacking-List/api/JuicePacking-ListAPI";
import { deletJuiceItemAPI, getJuiceItemsAPI } from "@/features/juice-Items/api/JuiceItemAPI";
import type { JuiceItemTableType } from "@/features/juice-Items/schema/juiceItemType";

export default function EditJuiceItemView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const ctpatId = Number(id);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<JuiceItemTableType | null>(null);
  const queryClient = useQueryClient();

  const {
    data: juicePackingList,
    isLoading: isLoadingPackingList,
    isError,
  } = useQuery({
    queryKey: ["juicePackingList", ctpatId],
    queryFn: () => getJuicePackingListAPI(ctpatId),
    enabled: !!ctpatId,
  });

  // Query para cargar los items de juice
  const {
    data: juiceItems = [],
    isLoading: isLoadingItems,
  } = useQuery({
    queryKey: ["juiceItems", ctpatId],
    queryFn: () => getJuiceItemsAPI(ctpatId),
    enabled: !!ctpatId,
  });

  const isLoading = isLoadingPackingList || isLoadingItems;

  const deleteItemMutation = useMutation({
    mutationFn: deletJuiceItemAPI,
    onSuccess: async () => {
      toast.success("Ítem de jugo eliminado correctamente");
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
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteItem = (itemId: number) => {
    if (window.confirm("¿Estás seguro de eliminar este ítem de jugo?")) {
      deleteItemMutation.mutate(itemId);
    }
  };

  const handleEditItem = (itemData: JuiceItemTableType) => {
    setEditingItem(itemData);
  };

  const handleGoBack = () => {
    navigate("/ctpats");
  };

  if (isLoading) return <Spinner />;

  if (isError || !juicePackingList) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <h3 className="text-red-800 font-semibold mb-4 flex items-center justify-center gap-2">
              <span className="text-2xl">🧃</span>
              Error al cargar el packing list de jugos
            </h3>
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

  const headerData = {
    id: juicePackingList.id,
    box_type: juicePackingList.box_type,
    order: juicePackingList.order,
    customer: juicePackingList.client,
    thermograph_no: juicePackingList.no_thermograph,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <span className="text-4xl">🧃</span>
              Editar Items del Packing List de Jugos
            </h1>
            <p className="text-gray-600">Packing List ID: {ctpatId}</p>
          </div>

          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-amber-700 font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-amber-50 transition-all duration-200 border border-amber-200"
          >
            <ArrowLeft size={20} />
            Regresar a CTpats
          </button>
        </div>

        {/* Contenido */}
        <div className="space-y-6">
          <JuicePackingListHeader packingList={headerData} />

          <div className="flex justify-start">
            <button
              onClick={() => setOpenAddModal(true)}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              Agregar ítem de jugo
            </button>
          </div>

          <JuiceItemsTable
            items={juiceItems}
            onDelete={handleDeleteItem}
            onEdit={(_itemId: number, itemData: JuiceItemTableType) => handleEditItem(itemData)}
          />

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm text-amber-800">
              💡 <strong>Nota:</strong> Los cambios se guardan automáticamente.
              Puedes editar, agregar o eliminar items de jugo según sea necesario.
            </p>
          </div>
        </div>

        {/* Modal agregar */}
        <AddJuiceItemToPackingListModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          ctpatId={ctpatId}
        />

        {/* Modal editar */}
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
    </div>
  );
}