
interface ChecklistItem {
  id: number;
  condition: string;
  status: boolean;
  type: string;
}

interface ChecklistTablesProps {
  items: ChecklistItem[];
}

/** Traducción / Títulos por tipo */
const TYPE_LABELS: Record<string, string> = {
  TRUCK_INSPECTION: "TRUCK INSPECTION / INSPECCIÓN DEL TRAILER",
  EXTERIOR_TRUCK_INSPECTION: "EXTERIOR TRUCK INSPECTION / INSPECCIÓN EXTERIOR",
  INTERIOR_TRUCK_INSPECTION: "INTERIOR TRUCK INSPECTION / INSPECCIÓN INTERIOR",
  PEST_INSPECTION: "PEST INSPECTION / INSPECCIÓN DE PLAGAS",
  CHEMICALS_INSPECTION: "CHEMICAL INSPECTION / INSPECCIÓN DE QUÍMICOS",
  PRODUCT_INSPECTION: "PRODUCT INSPECTION / INSPECCIÓN DE PRODUCTO",
};

export default function ChecklistTables({ items }: ChecklistTablesProps) {
  /** Agrupar por type */
  const grouped = items.reduce<Record<string, ChecklistItem[]>>((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-8 text-[11px]">
      <div className="text-center font-bold bg-gray-200 py-1 mb-2 ">
        <p>C-TPAT EXPORT TRAILER/ CONTAINER INSPECTION FORM</p>
        <p>C-TPAT TRAILER DE EXPORTACION/ FORMULARIO DE INSPECCIÓN DE CONTENEDORES</p>
        <p>TRUCK INSPECTION/ INSPECCION DEL TRAILER</p>
      </div>
      {Object.entries(grouped).map(([type, conditions]) => (
        <div key={type} className="break-inside-avoid">
          
          <h2 className="text-center font-bold bg-gray-200 py-1 mb-2 ">
            {TYPE_LABELS[type] || type}
          </h2>

          <table className="w-full border border-black border-collapse">
            <tbody>
              {conditions.map((item) => (
                <tr key={item.id}>
                  <td className="border border-black p-1 w-4/5">
                    {item.condition}
                  </td>

                  <td className="border border-black text-center w-1/10 font-bold">
                    {item.status ? "Y" : ""}
                  </td>

                  <td className="border border-black text-center w-1/10 font-bold">
                    {!item.status ? "N" : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
