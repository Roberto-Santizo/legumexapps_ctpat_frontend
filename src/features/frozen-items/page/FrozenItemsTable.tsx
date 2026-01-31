import type { PackingListItemTable } from "@/features/packing-List/schemas/packingList";
import type { PackingListTotal } from "@/features/packing-List/schemas/PackingListTotals";
import { Trash2, Pencil } from "lucide-react";

type Props = {
  items: PackingListItemTable[];
  onDelete: (itemId: number) => void;
  onEdit: (itemId: number, itemData: PackingListItemTable) => void;
  ctpatId?: number;
  totals?: PackingListTotal[];
};

export default function PackingListItemsTable({
  items,
  onDelete,
  onEdit,
  totals = []
}: Props) {
  // Calcular totales sumados
  const totalBoxes = totals.reduce((sum, t) => sum + t.total_boxes, 0);
  const totalGrossWeight = totals.reduce((sum, t) => sum + t.gross_weight, 0);
  const totalNetWeight = totals.reduce((sum, t) => sum + t.net_weight, 0);
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-orange-50 border-b border-orange-200">
            <tr>
              <th className="px-2 py-3 text-left font-semibold text-orange-700">
                Producto
              </th>
              <th className="px-2 py-3 text-center font-semibold text-orange-700">
                Tarima
              </th>
              <th className="px-2 py-3 text-center font-semibold text-orange-700">
                Lote
              </th>
              <th className="px-2 py-3 text-center font-semibold text-orange-700">
                Código
              </th>
              <th className="px-2 py-3 text-center font-semibold text-orange-700">
                Cajas
              </th>
              <th className="px-2 py-3 text-center font-semibold text-orange-700">
                Peso bruto
              </th>
              <th className="px-2 py-3 text-center font-semibold text-orange-700">
                Peso neto
              </th>
              <th className="px-2 py-3 text-center font-semibold text-orange-700">
                Presentación
              </th>
              <th className="px-2 py-3 text-center font-semibold text-orange-700">
                Temp
              </th>
              <th className="px-2 py-3 text-center font-semibold text-orange-700">
                Vencimiento
              </th>
              <th className="px-2 py-3 text-center font-semibold text-orange-700">
                Cliente
              </th>
              <th className="px-2 py-3 text-center font-semibold text-orange-700">
                GRN
              </th>
              <th className="px-2 py-3 text-center font-semibold text-orange-700">
                PO
              </th>
              <th className="px-2 py-3 text-center font-semibold text-orange-700">
                Acciones
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-100">
            {items.map((item, index) => (
              <tr
                key={item.id}
                className={`
                  transition-colors
                  ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  hover:bg-orange-50
                `}
              >
                <td className="px-2 py-3 font-medium text-gray-900">
                  {item.product}
                </td>
                <td className="px-2 py-3 text-center">
                  {item.no_tarima}
                </td>
                <td className="px-2 py-3 text-center">
                  {item.lote}
                </td>
                <td className="px-2 py-3 text-center text-sm">
                  {item.code}
                </td>
                <td className="px-2 py-3 text-center font-semibold">
                  {item.boxes}
                </td>
                <td className="px-2 py-3 text-center font-semibold">
                  {item.gross_weight}
                </td>
                <td className="px-2 py-3 text-center font-semibold">
                  {item.net_weight}
                </td>
                <td className="px-2 py-3 text-center text-sm">
                  {item.presentation}
                </td>
                <td className="px-2 py-3 text-center">
                  {item.temp}°C
                </td>
                <td className="px-2 py-3 text-center text-sm">
                  {item.expiration_date}
                </td>
                <td className="px-2 py-3 text-center text-sm">
                  {item.client}
                </td>
                <td className="px-2 py-3 text-center">
                  {item.grn ? (
                    <span className="text-green-600 font-medium">
                      {item.grn}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-2 py-3 text-center">
                  {item.po || <span className="text-gray-400">—</span>}
                </td>
                <td className="px-2 py-3 text-center">
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
                      className="btn-icon btn-icon-primary"
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
          {items.length > 0 && (
            <tfoot className="bg-orange-100 border-t-2 border-orange-300">
              <tr>
                <td colSpan={4} className="px-2 py-3 text-right font-bold text-orange-800">
                  TOTALES:
                </td>
                <td className="px-2 py-3 text-center font-bold text-orange-800">
                  {totalBoxes.toFixed(2)}
                </td>
                <td className="px-2 py-3 text-center font-bold text-orange-800">
                  {totalGrossWeight.toFixed(2)}
                </td>
                <td className="px-2 py-3 text-center font-bold text-orange-800">
                  {totalNetWeight.toFixed(2)}
                </td>
                <td colSpan={7}></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      {items.length === 0 && (
        <div className="py-10 text-center text-gray-500">
          No hay items agregados a la packing list.
        </div>
      )}
    </div>
  );
}