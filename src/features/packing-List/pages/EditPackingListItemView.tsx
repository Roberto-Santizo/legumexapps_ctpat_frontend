
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import PackingListHeader from "@/features/packing-List/components/PackingListHeader";
import PackingListItemsTable from "@/features/packing-List/pages/PackingListItemsTable";
import AddItemModal from "@/features/packing-List/components/AddItemToPackingListModal";
import { getPackingListById, deleteItemAPI } from "@/features/packing-List/api/PackingListAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Spinner } from "@/shared/components/Spinner";

/**
 * Vista independiente para editar items del packing list
 * Esta vista NO está atada al flujo de estados del CTPAT
 * Permite editar items y regresar a la tabla principal
 */
export default function EditPackingListItemsView() {
  const navigate = useNavigate();
  const { id } = useParams(); // Este es el ctpatId
  const ctpatId = Number(id);

  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: packingList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["packingList", ctpatId],
    queryFn: () => getPackingListById(ctpatId),
    enabled: !!ctpatId,
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

  const handleGoBack = () => {
    navigate("/ctpats");
  };

  if (isLoading) return <Spinner />;
  
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
        {/* Header con título y botón regresar */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Editar Items del Packing List
            </h1>
            <p className="text-gray-600">
              CTPAT #{ctpatId} - Modifica los items y los cambios se guardarán automáticamente
            </p>
          </div>

          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--color-primary-dark)] font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-[var(--color-bg-secondary)] transition-all duration-200 border border-[var(--color-border-light)]"
          >
            <ArrowLeft size={20} />
            Regresar a CTpats
          </button>
        </div>

        {/* Contenido principal */}
        <div className="space-y-6">
          {/* Header del packing list */}
          <PackingListHeader packingList={headerData} />

          {/* Botón agregar item */}
          <div className="flex justify-start">
            <button
              onClick={() => setOpenModal(true)}
              className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 transition-all font-semibold shadow-md hover:shadow-lg"
            >
              + Agregar ítem
            </button>
          </div>

          {/* Tabla de items */}
          <PackingListItemsTable
            items={items}
            onDelete={handleDeleteItem}
            ctpatId={ctpatId}
          />

          {/* Nota informativa */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              💡 <strong>Nota:</strong> Los cambios se guardan automáticamente. 
              Puedes editar, agregar o eliminar items según sea necesario.
            </p>
          </div>
        </div>

        {/* Modal para agregar items */}
        <AddItemModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          packingListId={packingList.id}
          ctpatId={ctpatId}
        />
      </div>
    </div>
  );
}