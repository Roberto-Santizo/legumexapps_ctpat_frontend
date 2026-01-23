import { useQuery } from "@tanstack/react-query";
import { getCtpatByIdAPI } from "@/features/ctpats/api/CtpatsAPI";
import { Spinner } from "@/shared/components/Spinner";

// Componentes de revisión
import PackingListReviewStep from "@/features/packing-List/pages/PackingListReviewStep";
import JuicePackingListReviewStep from "@/features/juice-Items/component/JuicePackingListReviewStep";

// Tipos
import type { ProductTypeId } from "@/features/process/control flow/productTypes";

type Props = {
  ctpatId: number;
  onContinue: () => void;
};

/**
 * Componente dinámico que renderiza el paso de revisión de packing list
 * correcto según el tipo de producto del CTPAT (frozen o juice)
 */
export default function DynamicPackingListReview({ ctpatId, onContinue }: Props) {
  // Obtener datos del CTPAT para saber qué tipo de producto es
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ctpat", ctpatId],
    queryFn: () => getCtpatByIdAPI(ctpatId),
    enabled: !!ctpatId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-800 font-semibold">Error al cargar información del CTPAT</p>
        </div>
      </div>
    );
  }

  const ctpat = data.response;
  const productTypeId: ProductTypeId = ctpat.type || 1;

  // Renderizar el componente correcto según el tipo de producto
  if (productTypeId === 2) {
    // JUICE: Renderizar componente de jugos
    return (
      <JuicePackingListReviewStep
        ctpatId={ctpatId}
        onContinue={onContinue}
      />
    );
  }

  // FROZEN (por defecto): Renderizar componente de congelados
  return (
    <PackingListReviewStep
      ctpatId={ctpatId}
      onContinue={onContinue}
    />
  );
}
