
export default function PackingListTable() {
 return (
    <table className="w-full border border-black text-[11px]">
      <thead>
        <tr>
          <th
            colSpan={4}
            className="border border-black text-center font-bold bg-gray-200 py-1"
          >
            PACKING LIST
          </th>
        </tr>
      </thead>

      <tbody>
        {/* Row 1 */}
        <tr>
          <td className="border border-black font-bold p-1">
            CARRIER:
          </td>
          <td className="border border-black p-1">{}</td>

          <td className="border border-black font-bold p-1">PRODUCT/ PRODUCTO:</td>
          <td className="border border-black p-1">{}</td>
        </tr>

        {/* Row 2 */}
        <tr>
          <td className="border border-black font-bold p-1">
            CONTAINER CONDITION:
          </td>
          <td className="border border-black p-1 whitespace-pre-line">
            {}
          </td>

          <td className="border border-black font-bold p-1">
            BOX TYPE:
          </td>
          <td className="border border-black p-1">{}</td>
        </tr>

        {/* Row 3 */}
        <tr>
          <td className="border border-black font-bold p-1">
            CONTAINER TYPE:
          </td>
          <td className="border border-black p-1">{}</td>

          <td className="border border-black font-bold p-1">
            LBS PER BOX:
          </td>
          <td className="border border-black p-1">{}</td>
        </tr>

        {/* Row 4 */}
        <tr>
          <td className="border border-black font-bold p-1">CONTAINER No:</td>
          <td className="border border-black p-1">{}</td>

          <td className="border border-black font-bold p-1">
            BOXES:
          </td>
          <td className="border border-black p-1">{}</td>
        </tr>

        {/* Row 5 */}
        <tr>
          <td className="border border-black font-bold p-1">ORDEN No.:</td>
          <td className="border border-black p-1">{}</td>

          <td className="border border-black font-bold p-1">
            BEGINNING DATE:
          </td>
          <td className="border border-black p-1">{}</td>
        </tr>

        {/* Row 6 */}
        <tr>
          <td className="border border-black font-bold p-1">
            SEAL:
          </td>
          <td className="border border-black p-1">{}</td>

          <td className="border border-black font-bold p-1">EXIT DATE:</td>
          <td className="border border-black p-1">{}</td>
        </tr>

        {/* Row 7 */}
        <tr>
          <td className="border border-black font-bold p-1">CLIENT:</td>
          <td className="border border-black p-1">{}</td>

          <td className="border border-black font-bold p-1">
            TEMP. EXIT:
          </td>
          <td className="border border-black p-1">{}</td>
        </tr>

        <tr>
          <td className="border border-black font-bold p-1">THERMOGRAPH No:</td>
          <td className="border border-black p-1">{}</td>

          <td className="border border-black font-bold p-1">
            DESTINATION:
          </td>
          <td className="border border-black p-1">{}</td>
        </tr>

      </tbody>
    </table>
  );
}
