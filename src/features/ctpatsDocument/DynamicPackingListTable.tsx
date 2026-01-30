import PackingListTable from "./PackingListTable";
import JuicePackingListTable from "./JuicePackingListTable";
import type { ProductTypeId } from "@/features/process/control flow/productTypes";
import type { ResponsePackingList } from "@/features/packing-List/schemas/types";

// Tipo para un item individual de totales del packing list de Frozen
export interface FrozenPackingListTotal {
  product: string;
  total_boxes: number;
  gross_weight: number;
  net_weight: number;
}

// Tipo para los totales del packing list de Juice
export interface JuicePackingListTotals {
  total_boxes: number;
  net_weight: number;
  gross_weight: number;
  bottles: number;
}

// Tipo para los datos del packing list de Juice
interface JuicePackingListData {
  id: number;
  carrier: string;
  container_condition: string;
  container_type: string;
  no_marchamo: string;
  no_container: string;
  order: string;
  client: string;
  no_thermograph: string;
  products: string;
  box_type: string;
  lbs_per_box: string;
  total_boxes: number;
  beginning_date: string;
  exit_date: string | null;
  exit_temp: number | string | null;
}

interface DynamicPackingListTableProps {
  productType: ProductTypeId;
  packingListData?: ResponsePackingList | JuicePackingListData | null;
  totals?: FrozenPackingListTotal[] | JuicePackingListTotals | null;
}

/**
 * Componente dinámico que renderiza la tabla de packing list correcta
 * según el tipo de producto del CTPAT
 */
export default function DynamicPackingListTable({
  productType,
  packingListData,
  totals,
}: DynamicPackingListTableProps) {
  if (!packingListData) {
    return <p>No hay datos de packing list disponibles.</p>;
  }

  // Si es tipo JUICE (2), renderizar tabla de jugos
  if (productType === 2) {
    return (
      <JuicePackingListTable
        data={packingListData as ResponsePackingList}
        totals={totals as JuicePackingListTotals | undefined}
      />
    );
  }

  // Por defecto (FROZEN = 1), renderizar tabla de congelados
  return (
    <PackingListTable
      data={packingListData as ResponsePackingList}
      totals={totals as FrozenPackingListTotal[] | undefined}
    />
  );
}
