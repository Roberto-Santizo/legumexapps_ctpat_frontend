import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import EditPackingListItemForm from "@/features/packing-List/components/EditPackingListItemForm";
import { getItemByIdAPI, getPackingListById } from "@/features/packing-List/api/PackingListAPI";

export default function EditPackingListItemView() {
  const navigate = useNavigate();
  const params = useParams();
  
  const itemId = Number(params.id);
  const ctpatIdNumber = Number(params.ctpatId);
  
  // Obtener los datos del item a editar
  const {
    data: itemData,
    isLoading: isLoadingItem,
    isError: isErrorItem,
  } = useQuery({
    queryKey: ["packingListItem", itemId],
    queryFn: () => getItemByIdAPI(itemId),
    enabled: !!itemId,
  });

  // Obtener el packing list para obtener el packingListId
  const {
    data: packingList,
    isLoading: isLoadingPackingList,
    isError: isErrorPackingList,
  } = useQuery({
    queryKey: ["packingList", ctpatIdNumber],
    queryFn: () => getPackingListById(ctpatIdNumber),
    enabled: !!ctpatIdNumber,
  });

  const handleClose = () => {
    navigate(-1); 
  };

  if (isLoadingItem || isLoadingPackingList) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-primary)] border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Cargando datos del ítem...</p>
        </div>
      </div>
    );
  }

  if (isErrorItem || isErrorPackingList || !itemData || !packingList) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-800 font-semibold mb-4">
              Error al cargar los datos del ítem
            </p>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-300"
            >
              Regresar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] bg-clip-text text-transparent mb-3">
            Editar Ítem del Packing List
          </h1>
        </div>

        <div className="mb-6">
          <button
            onClick={handleClose}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--color-primary-dark)] font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-[var(--color-bg-secondary)] transition-all duration-200 border border-[var(--color-border-light)]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Regresar
          </button>
        </div>

        <EditPackingListItemForm
          open={true}
          onClose={handleClose}
          packingListId={packingList.id}
          itemId={itemId}
          ctpatId={ctpatIdNumber}
          initialData={itemData}
        />
      </div>
    </div>
  );
}