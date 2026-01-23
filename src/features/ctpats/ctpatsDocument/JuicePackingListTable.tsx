interface JuicePackingListProps {
  data: {
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
  };
}

export default function JuicePackingListTable({ data }: JuicePackingListProps) {
  return (
    <table className="w-full border border-black text-[11px]">
      <thead>
        <tr>
          <th
            colSpan={4}
            className="border border-black text-center font-bold bg-gray-200 py-1"
          >
            PACKING LIST DE JUGOS
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td className="border border-black font-bold p-1">CARRIER:</td>
          <td className="border border-black p-1">{data.carrier}</td>

          <td className="border border-black font-bold p-1">PRODUCT</td>
          <td className="border border-black p-1">{data.products}</td>
        </tr>

        <tr>
          <td className="border border-black font-bold p-1">CONTAINER CONDITION:</td>
          <td className="border border-black p-1 whitespace-pre-line">{data.container_condition}</td>

          <td className="border border-black font-bold p-1">BOX TYPE:</td>
          <td className="border border-black p-1">{data.box_type}</td>
        </tr>

        <tr>
          <td className="border border-black font-bold p-1">CONTAINER TYPE:</td>
          <td className="border border-black p-1 whitespace-pre-line">{data.container_type}</td>

          <td className="border border-black font-bold p-1">LBS PER BOX:</td>
          <td className="border border-black p-1">{data.lbs_per_box}</td>
        </tr>

        <tr>
          <td className="border border-black font-bold p-1">CONTAINER NO.</td>
          <td className="border border-black p-1 whitespace-pre-line">{data.no_container}</td>

          <td className="border border-black font-bold p-1">BOXES:</td>
          <td className="border border-black p-1">{data.boxes}</td>
        </tr>

        <tr>
          <td className="border border-black font-bold p-1">ORDER NO</td>
          <td className="border border-black p-1 whitespace-pre-line">{data.order}</td>

          <td className="border border-black font-bold p-1">BEGINNING DATE</td>
          <td className="border border-black p-1">{data.beginning_date}</td>
        </tr>

        <tr>
          <td className="border border-black font-bold p-1">SEAL:</td>
          <td className="border border-black p-1">{data.seal}</td>

          <td className="border border-black font-bold p-1">EXIT DATE:</td>
          <td className="border border-black p-1">{data.exit_date}</td>
        </tr>

        <tr>
          <td className="border border-black font-bold p-1">CLIENT</td>
          <td className="border border-black p-1">{data.client}</td>

          <td className="border border-black font-bold p-1">EXIT TEMPERATURE:</td>
          <td className="border border-black p-1">{data.exit_temp}</td>
        </tr>

        <tr>
          <td className="border border-black font-bold p-1">THERMOGRAPH:</td>
          <td className="border border-black p-1">{data.no_thermograph}</td>

          <td className="border border-black font-bold p-1">DESTINATION</td>
          <td className="border border-black p-1">{}</td>
        </tr>
      </tbody>
    </table>
  );
}
