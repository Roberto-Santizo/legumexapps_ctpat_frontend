import type { JuicePackingListTotal } from "@/features/juicePacking-List/schema/JuicePackingListTotals";

type JuicePackingListHeaderData = {
  id: number;
  box_type: string;
  order: string;
  customer: string;
  thermograph_no: string;
};

type Props = {
  packingList: JuicePackingListHeaderData;
  totals?: JuicePackingListTotal;
};

export default function JuicePackingListHeader({ packingList, totals }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="space-y-1">
          <p className="text-sm text-gray-500 font-medium">ID Packing List</p>
          <p className="text-base text-gray-900">{packingList.id}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500 font-medium">Cliente</p>
          <p className="text-base text-gray-900">{packingList.customer}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500 font-medium">Número de Orden ET</p>
          <p className="text-base text-gray-900">{packingList.order}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500 font-medium">Tipo de Caja</p>
          <p className="text-base text-gray-900">
            {packingList.box_type === "PRINTED"
              ? "PRINTED (Cajas impresas)"
              : "KRAFT (Cajas Genéricas)"}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500 font-medium">Número de Termógrafo</p>
          <p className="text-base text-gray-900">{packingList.thermograph_no}</p>
        </div>
      </div>

      {/* Totales con fondo verde */}
      {totals && (
        <div className="bg-green-100 border border-green-300 rounded-lg p-4 mt-4">
          <h3 className="text-green-800 font-bold mb-3 text-lg">Totales</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-green-600 text-sm font-medium">Total Cajas</p>
              <p className="text-green-800 text-2xl font-bold">{totals.total_boxes.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-green-600 text-sm font-medium">Botellas</p>
              <p className="text-green-800 text-2xl font-bold">{totals.bottles.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-green-600 text-sm font-medium">Peso Bruto</p>
              <p className="text-green-800 text-2xl font-bold">{totals.gross_weight.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-green-600 text-sm font-medium">Peso Neto</p>
              <p className="text-green-800 text-2xl font-bold">{totals.net_weight.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
