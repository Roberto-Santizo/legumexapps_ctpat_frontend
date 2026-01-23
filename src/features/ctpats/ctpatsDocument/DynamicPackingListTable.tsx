import PackingListTable from "./PackingListTable";
import JuicePackingListTable from "./JuicePackingListTable";
import type { ProductTypeId } from "@/features/process/control flow/productTypes";

// Tipos para packing list de congelados
interface FrozenPackingListData {
  id: number;
  carrier: string;
  products: string;
  order: string;
  container_condition: string;
  box_type: string;
  no_container: string;
  container_type: string;
  lbs_per_box: string;
  seal: string;
  client: string;
  boxes: number;
  beginning_date: string;
  no_thermograph: string;
  exit_temp: string;
  exit_date: string;
}

// Tipos para packing list de jugos
// Nota: Los packing lists de jugos tienen los mismos campos que los de congelados.
// Algunos campos se llenan durante la creación, otros se agregan en pasos posteriores (como exit_temp y exit_date al cerrar el CTPAT)
interface JuicePackingListData {
  id: number;
  carrier: string;
  products: string;
  order: string;
  container_condition: string;
  box_type: string;
  no_container: string;
  container_type: string;
  lbs_per_box: string;
  seal: string;
  client: string;
  boxes: number;
  beginning_date: string;
  no_thermograph: string;
  exit_temp: string;
  exit_date: string;
}

// Unión de tipos para ambos packing lists
type PackingListData = FrozenPackingListData | JuicePackingListData;

interface DynamicPackingListTableProps {
  productType: ProductTypeId;
  packingListData: PackingListData;
}

/**
 * Componente dinámico que renderiza la tabla de packing list correcta
 * según el tipo de producto del CTPAT
 */
export default function DynamicPackingListTable({
  productType,
  packingListData,
}: DynamicPackingListTableProps) {
  // Si es tipo JUICE (2), renderizar tabla de jugos
  if (productType === 2) {
    return <JuicePackingListTable data={packingListData as JuicePackingListData} />;
  }

  // Por defecto (FROZEN = 1), renderizar tabla de congelados
  return <PackingListTable data={packingListData as FrozenPackingListData} />;
}
