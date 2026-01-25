
interface CtpatGeneralInformationTableProps {
  data: {
    destination: string;
    departure_site: string;
    container: string;
    departure_date:string;
    departure_hour: string;


    packingList: {
      seal: string;
      no_thermograph: string;
    };

    driver: { 
      name: string;
      identification: string;
    };

    truck: {
      plate: string;
    };
  };
}

export default function CtpatGeneralInformationTable({
  data,
}: CtpatGeneralInformationTableProps) {
  return (
    <div className="text-xs">
      <h2 className="text-center font-bold bg-gray-200 py-1 mb-4">
        GENERAL INFORMATION
      </h2>

      <table className="w-full border border-black text-[10px] border-collapse">
        <tbody>
          <tr>
            <td className="border p-1 font-bold w-1/4">
              DESTINATION OR CUSTOMER / Cliente o Destino
            </td>
            <td className="border p-1 w-1/4">
              {data.destination || ""}
            </td>

            <td className="border p-1 font-bold w-1/4">
              CARRIER / Naviera
            </td>
            <td className="border p-1 w-1/4">
              CMA CGM
            </td>
          </tr>

          <tr>
            <td className="border p-1 font-bold">
              DEPARTURE SITE / Lugar de salida
            </td>
            <td className="border p-1">
              {data.departure_site || ""}
            </td>

            <td className="border p-1 font-bold">
              CONTAINER No. / No. de contenedor
            </td>
            <td className="border p-1">
              {data.container || ""}
            </td>
          </tr>

          <tr>
            <td className="border p-1 font-bold">
              DEPARTURE DATE / Fecha de salida
            </td>
            <td className="border p-1">
              {data.departure_date || ""}
            </td>

            <td className="border p-1 font-bold">
              SEAL NUMBER / Número de sello
            </td>
            <td className="border p-1">
              {data.packingList.seal || ""}
            </td>
          </tr>

          <tr>
            <td className="border p-1 font-bold">
              DEPARTURE TIME / Hora de salida
            </td>
            <td className="border p-1">{data.departure_hour || ""} </td>

            <td className="border p-1 font-bold">
              CONTAINER DIGIT CONTROL / Chequeo dígito de control:
              <a 
              href="www.sds.es/despiece/Espa/index.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline ml-1"
                >
                www.sds.es/despiece/Espa/index.htm
              </a>
            </td>
            <td className="border p-1"></td>
          </tr>
          <tr>
            <td className="border p-1 font-bold">
              RYAN No. / No. Sensor
            </td>
            <td className="border p-1">{data.packingList.no_thermograph} </td>

            <td className="border p-1 font-bold">
              CONTAINER ENTRY COUNTRY / Procedencia del contenedor:
              <a
                href="https://www.weport.global/rastreo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline ml-1"
              >
                www.weport.global/rastreo
              </a>
            </td>
            <td className="border p-1"></td>
          </tr>

          <tr>
            <td className="border p-1 font-bold">
              DRIVER NAME / Nombre del piloto
            </td>
            <td className="border p-1">
              {data.driver.name || ""}
            </td>

            <td className="border p-1 font-bold">
              BL No. / No. de BL
            </td>
            <td className="border p-1"></td>
          </tr>

          <tr>
            <td className="border p-1 font-bold">
              DRIVER ID / DPI del piloto
            </td>
            <td className="border p-1">
              {data.driver.identification || ""}
            </td>

            <td className="border p-1 font-bold">
              LICENCE PLATE No. / Placa
            </td>
            <td className="border p-1">
              {data.truck.plate || ""}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
