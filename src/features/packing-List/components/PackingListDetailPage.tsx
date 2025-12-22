import { useState } from "react";
import PackingListHeader from "@/features/packing-List/components/PackingListHeader";
import PackingListItemsTable from "@/features/packing-List/components/PackingListItemsTable";
import AddItemModal from "@/features/packing-List/components/AddItemToPackingListModal";
import type { PackingListHeader as PackingListType } from "@/features/packing-List/schemas/packingList";

type Props = {
  packingList: PackingListType;
};

export default function PackingListDetailPage({ packingList }: Props) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* ENCABEZADO */}
      <PackingListHeader packingList={packingList} />

      {/* BOTÓN */}
      <div className="flex justify-end">
        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg"
        >
          + Agregar ítem
        </button>
      </div>

      {/* TABLA */}
      <PackingListItemsTable items={packingList.items} />

      {/* MODAL */}
      <AddItemModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        packingListId={packingList.id}
      />

    </div>
  );
}
