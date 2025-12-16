
interface DriverTableProps {
  driver: {
    id: number;
    name: string;
    identification: string;
    license: string;
    identification_image: string;
    license_image: string;
  };
  ctpat: {
    departure_site: string;
    createdAt: string;
    container: string;
    packingList: {
      carrier: string;
      seal: string;
    };
  };
}

export default function DriverTable({ driver, ctpat }: DriverTableProps) {
    const IMAGES_URL = import.meta.env.VITE_IMAGES_BACKEND_URL;
  return (
    <>
      <div className="mb-4 bg-gray-200 py-1 text-center font-bold">
        C-TPAT TRAILER DE EXPORTACION / FORMULARIO DE INSPECCION DE CONTENEDORES
      </div>

      <div className="border border-black text-[11px] w-full">
        
        <div className="grid grid-cols-3 border-b border-black">
          <div className="border-r border-black p-1">
            <p className="font-bold">LOCATION / LUGAR:</p>
            <p className="text-blue-600 underline">
              {ctpat.departure_site}
            </p>
          </div>

          <div className="border-r border-black p-1">
            <p className="font-bold">DATE / FECHA:</p>
            <p className="text-blue-600 underline">
              {ctpat.createdAt}
            </p>
          </div>

          <div className="p-1">
            <p className="font-bold">TIME / HORA:</p>
            <p className="text-blue-600 underline">
              --
            </p>
          </div>
        </div>

        <div className="border-b border-black bg-gray-100 p-1">
          <p className="font-bold text-center">
            DRIVER IDENTIFICATION / IDENTIFICACIÓN DEL CONDUCTOR
          </p>
        </div>

        <div className="grid grid-cols-4 border-b border-black">
          <div className="col-span-2 border-r border-black p-1">
            <p className="font-bold">LICENSE:</p>
            <p className="text-blue-600 underline">
              {driver.license}
            </p>
          </div>

          <div className="border-r border-black p-1 text-center font-bold">
            DRIVER PHOTO ID:
            <br />
            <span className="font-normal text-[10px]">
              FOTO DE IDENTIFICACIÓN DEL CONDUCTOR
            </span>
          </div>

            <div className="p-1 flex items-center justify-center">
            {driver.license_image ? (
                <img
                src={`${IMAGES_URL}/${driver.license_image}`}
                alt="Driver ID"
                className="w-32 h-20 object-contain border"
                />
                
            ) : (
                <div className="w-32 h-20 border border-gray-400 bg-gray-100 flex items-center justify-center text-[9px]">
                NO IMAGE
                </div>
            )}
            </div>

        </div>

        <div className="grid grid-cols-4 border-b border-black">
          <div className="col-span-2 border-r border-black p-1">
            <p className="font-bold">NUMBER OF CARRIER REGISTRATION:</p>
            <p className="text-blue-600 underline">
              {driver.identification}
            </p>
          </div>

          <div className="col-span-2 p-1">
            <p className="font-bold">LICENSE NUMBER:</p>
            <p className="text-blue-600 underline">
              {driver.license}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 border-b border-black">
          <div className="col-span-2 border-r border-black p-1">
            <p className="font-bold">CARRIER NAME:</p>
            <p className="text-blue-600 underline">
              {ctpat.packingList.carrier}
            </p>
          </div>

          <div className="col-span-2 p-1">
            <p className="font-bold">CONTAINER NUMBER:</p>
            <p className="text-blue-600 underline">
              {ctpat.container}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4">
          <div className="col-span-2 border-r border-black p-1">
            <p className="font-bold">TRAILER SEAL:</p>
            <p className="text-blue-600 underline">
              {ctpat.packingList.seal}
            </p>
          </div>

          <div className="col-span-2 p-1 flex items-center justify-center text-xl font-bold">
            YES
          </div>
        </div>

      </div>
    </>
  );
}

