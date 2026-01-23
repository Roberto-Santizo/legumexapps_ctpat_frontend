import type { z } from "zod";
import type { juicePackingListResponse } from "@/features/juicePacking-List/schema/juicePackingListType";

type JuicePackingListHeaderView = z.infer<typeof juicePackingListResponse>;

type Props = {
  packingList: JuicePackingListHeaderView;
};

export default function JuicePackingListHeader({ packingList }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
}