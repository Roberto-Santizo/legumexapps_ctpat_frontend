export default function ContainerInspectionTable() {
  return (
    <>
        <div className=" mb-4 bg-gray-200 py-1 text-center font-bold">
            C-TPAT TRAILER DE EXPORTACION / FORMULARIO DE INSPECCION DE CONTENEDORES
        </div>

        <div className="border border-black text-[11px] w-full">
        {/* --- ROW 1: LOCATION / DATE / TIME --- */}
        <div className="grid grid-cols-3 border-b border-black">
            
            <div className="border-r border-black p-1">
            <p className="font-bold">LOCATION / LUGAR:</p>
            <p className="text-blue-600 underline">{/* lugar */}</p>
            </div>

            <div className="border-r border-black p-1">
            <p className="font-bold">DATE / FECHA:</p>
            <p className="text-blue-600 underline">{/* fecha */}</p>
            </div>

            <div className="p-1">
            <p className="font-bold">TIME / HORA:</p>
            <p className="text-blue-600 underline">{/* hora */}</p>
            </div>

        </div>

        {/* --- TÍTULO DE DRIVER IDENTIFICATION --- */}
        <div className="border-b border-black bg-gray-100 p-1">
            <p className="font-bold text-center">
            DRIVER IDENTIFICATION / IDENTIFICACIÓN DEL CONDUCTOR:
            </p>
        </div>

        {/* --- ROW 3 --- */}
        <div className="grid grid-cols-4 border-b border-black">
            
            <div className="col-span-2 border-r border-black p-1">
            <p className="font-bold">LICENSE:</p>
            <p className="text-blue-600 underline">{/* licencia */}</p>
            </div>

            <div className="border-r border-black p-1 text-center font-bold">
            DRIVER PHOTO ID:
            <br />
            <span className="font-normal text-[10px]">
                FOTO DE IDENTIFICACIÓN DEL CONDUCTOR
            </span>
            </div>

            <div className="p-1 flex items-center justify-center">
            <div className="w-32 h-20 border border-gray-400 bg-gray-100 flex items-center justify-center text-[9px]">
                IMG
            </div>
            </div>
        </div>

        {/* --- ROW 4 --- */}
        <div className="grid grid-cols-4 border-b border-black">

            <div className="col-span-2 border-r border-black p-1">
            <p className="font-bold">NUMBER OF CARRIER REGISTRATION:</p>
            <p className="text-blue-600 underline">{/* matricula */}</p>
            </div>

            <div className="col-span-2 p-1">
            <p className="font-bold">LICENSE NUMBER:</p>
            <p className="text-blue-600 underline">{/* número licencia */}</p>
            </div>

        </div>

        {/* --- ROW 5 --- */}
        <div className="grid grid-cols-4 border-b border-black">

            <div className="col-span-2 border-r border-black p-1">
            <p className="font-bold">CARRIER NAME:</p>
            <p className="text-blue-600 underline">{/* nombre compañía */}</p>
            </div>

            <div className="col-span-2 p-1">
            <p className="font-bold">CONTAINER NUMBER:</p>
            <p className="text-blue-600 underline">{/* número contenedor */}</p>
            </div>

        </div>

        {/* --- ROW 6 --- */}
        <div className="grid grid-cols-4">
            
            <div className="col-span-2 border-r border-black p-1">
            <p className="font-bold">TRAILER SEAL:</p>
            <p className="text-blue-600 underline">{/* sello */}</p>
            </div>

            <div className="col-span-2 p-1 flex items-center justify-center text-xl font-bold">
            {/* Resultado (SÍ / NO) */}
            --
            </div>

        </div>

        </div>
    </>
  );
}
