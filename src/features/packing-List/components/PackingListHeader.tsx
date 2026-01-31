import type {PackingListHeaderView} from "@/features/packing-List/schemas/packingList"
import type { PackingListTotal } from "@/features/packing-List/schemas/PackingListTotals";

type Props = {
  packingList: PackingListHeaderView;
  totals?: PackingListTotal[];
};


export default function PackingListHeader({ packingList, totals = [] }: Props) {
  // Calcular totales sumados
  const totalBoxes = totals.reduce((sum, t) => sum + t.total_boxes, 0);
  const totalGrossWeight = totals.reduce((sum, t) => sum + t.gross_weight, 0);
  const totalNetWeight = totals.reduce((sum, t) => sum + t.net_weight, 0);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <p><b>Id packing List:</b> {packingList.id}</p>
        <p><b>Cliente:</b> {packingList.client}</p>
        <p><b>Carrier:</b> {packingList.carrier}</p>
        <p><b>Numero de orden:</b> {packingList.order}</p>
        <p><b>Contenedor:</b> {packingList.no_container}</p>
        <p><b>Tipo de contenedor:</b> {packingList.container_type}</p>
        <p><b>Sellos:</b> {packingList.seal}</p>
        <p><b>Fecha inicio:</b> {new Date(packingList.beginning_date).toLocaleDateString()}</p>
      </div>

      {/* Totales con fondo anaranjado */}
      <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 mt-4">
        <h3 className="text-orange-800 font-bold mb-3 text-lg">Totales</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-orange-600 text-sm font-medium">Total Cajas</p>
            <p className="text-orange-800 text-2xl font-bold">{totalBoxes.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-orange-600 text-sm font-medium">Peso Bruto</p>
            <p className="text-orange-800 text-2xl font-bold">{totalGrossWeight.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-orange-600 text-sm font-medium">Peso Neto</p>
            <p className="text-orange-800 text-2xl font-bold">{totalNetWeight.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
