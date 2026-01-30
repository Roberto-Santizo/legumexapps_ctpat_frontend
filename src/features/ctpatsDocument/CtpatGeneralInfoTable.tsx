
interface CtpatGeneralInfoProps {
  data: {
    destination: string;
    carrier: string;
    departureSite: string;
    containerNumber: string;
    departureDate: string;
    sealNumber: string;
    departureTime: string;
    digitControl: string;
    ryanNumber: string;
    entryCountry: string;
    driverName: string;
    blNumber: string;
    driverId: string;
    licencePlate: string;
  };
}

export default function CtpatGeneralInfoTable({ data }: CtpatGeneralInfoProps) {
  return (
    <table className="w-full border border-black text-[11px]">
      <thead>
        <tr>
          <th
            colSpan={4}
            className="border border-black text-center font-bold bg-gray-200 py-1"
          >
            GENERAL INFORMATION
          </th>
        </tr>
      </thead>

      <tbody>
        {/* Row 1 */}
        <tr>
          <td className="border border-black font-bold p-1">
            DESTINATION OR CUSTOMER / CLIENTE O CUSTOMER:
          </td>
          <td className="border border-black p-1">{data.destination}</td>

          <td className="border border-black font-bold p-1">CARRIER / NAVIERA:</td>
          <td className="border border-black p-1">{data.carrier}</td>
        </tr>

        {/* Row 2 */}
        <tr>
          <td className="border border-black font-bold p-1">
            DEPARTURE SITE / LUGAR DE SALIDA:
          </td>
          <td className="border border-black p-1 whitespace-pre-line">
            {data.departureSite}
          </td>

          <td className="border border-black font-bold p-1">
            CONTAINER No. / No. DE CONTENEDOR:
          </td>
          <td className="border border-black p-1">{data.containerNumber}</td>
        </tr>

        {/* Row 3 */}
        <tr>
          <td className="border border-black font-bold p-1">
            DEPARTURE DATE / FECHA DE SALIDA:
          </td>
          <td className="border border-black p-1">{data.departureDate}</td>

          <td className="border border-black font-bold p-1">
            SEAL No. / NUMERO DE SELLO:
          </td>
          <td className="border border-black p-1">{data.sealNumber}</td>
        </tr>

        {/* Row 4 */}
        <tr>
          <td className="border border-black font-bold p-1">DEPARTURE TIME:</td>
          <td className="border border-black p-1">{data.departureTime}</td>

          <td className="border border-black font-bold p-1">
            CONTAINER DIGIT CONTROL / CHEQUEO DIGITO DE CONTROL:
          </td>
          <td className="border border-black p-1">{data.digitControl}</td>
        </tr>

        {/* Row 5 */}
        <tr>
          <td className="border border-black font-bold p-1">RYAN No. / No. SENSOR:</td>
          <td className="border border-black p-1">{data.ryanNumber}</td>

          <td className="border border-black font-bold p-1">
            CONTAINER ENTRY COUNTRY:
          </td>
          <td className="border border-black p-1">{data.entryCountry}</td>
        </tr>

        {/* Row 6 */}
        <tr>
          <td className="border border-black font-bold p-1">
            DRIVER NAME / NOMBRE DEL PILOTO:
          </td>
          <td className="border border-black p-1">{data.driverName}</td>

          <td className="border border-black font-bold p-1">BL No. / No. DE BL:</td>
          <td className="border border-black p-1">{data.blNumber}</td>
        </tr>

        {/* Row 7 */}
        <tr>
          <td className="border border-black font-bold p-1">DRIVER ID / DPI:</td>
          <td className="border border-black p-1">{data.driverId}</td>

          <td className="border border-black font-bold p-1">
            LICENCE PLATE No. / PLACA:
          </td>
          <td className="border border-black p-1">{data.licencePlate}</td>
        </tr>
      </tbody>
    </table>
  );
}
