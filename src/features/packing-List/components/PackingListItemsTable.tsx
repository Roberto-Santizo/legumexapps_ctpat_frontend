import type {PackingListItemTable} from "@/features/packing-List/schemas/packingList"

type Props = {
  items: PackingListItemTable[];
};

export default function PackingListItemsTable({ items }: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Producto</th>
            <th>No Tarima</th>
            <th>Lote</th>
            <th>Cajas</th>
            <th>Temp</th>
            <th>Vencimiento</th>
            <th>GRN</th>
            <th>PO</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3">{item.product}</td>
              <td>{item.no_tarima}</td>
              <td>{item.lote}</td>
              <td>{item.boxes}</td>
              <td>{item.temp}°C</td>
              <td>{item.expiration_date}</td>
              <td>{item.grn || "-"}</td>
              <td>{item.po || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
