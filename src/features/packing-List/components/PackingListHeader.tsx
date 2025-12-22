import type {PackingListHeader} from "@/features/packing-List/schemas/packingList"
type Props = {
  packingList: PackingListHeader;
};


export default function PackingListHeader({ packingList }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 grid grid-cols-2 gap-4">
      <p><b>Cliente:</b> {packingList.client}</p>
      <p><b>Carrier:</b> {packingList.carrier}</p>
      <p><b>Orden:</b> {packingList.order}</p>
      <p><b>Contenedor:</b> {packingList.no_container}</p>
      <p><b>Tipo:</b> {packingList.container_type}</p>
      <p><b>Sellos:</b> {packingList.seal}</p>
      <p><b>Total cajas:</b> {packingList.boxes}</p>
      <p><b>Fecha inicio:</b> {new Date(packingList.beginning_date).toLocaleDateString()}</p>
    </div>
  );
}
