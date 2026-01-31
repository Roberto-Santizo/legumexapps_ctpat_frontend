import type { JuiceItemTableType } from "@/features/juice-Items/schema/juiceItemType";
import type { JuicePackingListTotal } from "@/features/juicePacking-List/schema/JuicePackingListTotals";
import { Trash2, Pencil } from "lucide-react";

// Exportar el tipo para que otros archivos lo puedan usar
export type { JuiceItemTableType };

type Props = {
  items: JuiceItemTableType[];
  onDelete: (itemId: number) => void;
  onEdit: (itemId: number, itemData: JuiceItemTableType) => void;
  totals?: JuicePackingListTotal;
};

export function JuiceItemTable({
  items,
  onDelete,
  onEdit,
  totals
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-amber-50 border-b border-amber-200">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-amber-700">Producto</th>
              <th className="px-4 py-3 text-center font-semibold text-amber-700">Código</th>
              <th className="px-4 py-3 text-center font-semibold text-amber-700">Cajas</th>
              <th className="px-4 py-3 text-center font-semibold text-amber-700">Botellas</th>
              <th className="px-4 py-3 text-center font-semibold text-amber-700">Peso Bruto</th>
              <th className="px-4 py-3 text-center font-semibold text-amber-700">Peso Neto</th>
              <th className="px-4 py-3 text-center font-semibold text-amber-700">Presentación</th>
              <th className="px-4 py-3 text-center font-semibold text-amber-700">Temp</th>
              <th className="px-4 py-3 text-center font-semibold text-amber-700">Cliente</th>
              <th className="px-4 py-3 text-center font-semibold text-amber-700">Fecha</th>
              <th className="px-4 py-3 text-center font-semibold text-amber-700">Acciones</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-100">
            {items.map((item, index) => (
              <tr
                key={item.id}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-amber-50`}
              >
                <td className="px-4 py-3 font-medium text-gray-900">{item.product}</td>
                <td className="px-4 py-3 text-center text-sm">{item.code}</td>
                <td className="px-4 py-3 text-center font-semibold">{item.total_boxes}</td>
                <td className="px-4 py-3 text-center font-medium">{item.bottles}</td>
                <td className="px-4 py-3 text-center">{(item.gross_weight ?? 0).toFixed(2)}</td>
                <td className="px-4 py-3 text-center">{(item.net_weight ?? 0).toFixed(2)}</td>
                <td className="px-4 py-3 text-center text-sm">{item.wrapper}</td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {item.temp}°C
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-sm">{item.client_name}</td>
                <td className="px-4 py-3 text-center text-sm">
                  {new Date(item.date).toLocaleDateString('es-GT')}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(item.id, item)}
                      className="btn-icon btn-icon-primary"
                      title="Editar"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="btn-icon btn-icon-danger"
                      title="Eliminar"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

          {/* Footer con totales */}
          {items.length > 0 && totals && (
            <tfoot className="bg-green-100 border-t-2 border-green-300">
              <tr>
                <td colSpan={2} className="px-4 py-3 text-right font-bold text-green-800">
                  TOTALES:
                </td>
                <td className="px-4 py-3 text-center font-bold text-green-800">
                  {totals.total_boxes.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-center font-bold text-green-800">
                  {totals.bottles.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-center font-bold text-green-800">
                  {totals.gross_weight.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-center font-bold text-green-800">
                  {totals.net_weight.toFixed(2)}
                </td>
                <td colSpan={5}></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {items.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500 text-lg">
            No hay items agregados a este packing list de jugos.
          </p>
        </div>
      )}
    </div>
  );
}

export default JuiceItemTable;