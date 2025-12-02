
export default function CtpatDocument() {
  return (
    <div className="w-[816px] mx-auto bg-white p-8 text-sm border border-gray-300">
      {/* Header */}
      <div className="grid grid-cols-3 items-center mb-6">
        <div>
          <img src="/logo.png" alt="Company Logo" className="w-32" />
        </div>
        <div className="text-center">
          <h1 className="font-bold">FORMATO</h1>
          <p>C-TPAT</p>
        </div>
        <div className="text-right text-xs">
          <p>CODIGO: FOR-CI-18</p>
          <p>VERSION: 02</p>
          <p>Pagina 1 DE 9</p>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-center font-bold bg-gray-200 py-1 mb-4">
        GENERAL INFORMATION
      </h2>

      {/* Table */}
      <div className="border border-black text-xs">
        {/* Row */}
        <div className="grid grid-cols-4 border-b border-black">
          <div className="border-r border-black p-2 font-bold">
            DESTINATION OR CUSTOMER / CLIENTE O DESTINO:
          </div>
          <div className="border-r border-black p-2">H.E.B.</div>
          <div className="border-r border-black p-2 font-bold">CARRIER / NAVIERA:</div>
          <div className="p-2">CMA CGM</div>
        </div>

        {/* Row */}
        <div className="grid grid-cols-4 border-b border-black">
          <div className="border-r border-black p-2 font-bold">DEPARTURE SITE: / LUGAR DE SALIDA</div>
          <div className="border-r border-black p-2 col-span-1">
            AGROINDUSTRIAS LEGUMEX S.A. EL TEJAR, CHIMALTENANGO
          </div>
          <div className="border-r border-black p-2 font-bold">CONTAINER No. / No. DE CONTENEDOR</div>
          <div className="p-2">TRIU 808916-8</div>
        </div>

        {/* Row */}
        <div className="grid grid-cols-4 border-b border-black">
          <div className="border-r border-black p-2 font-bold">DEPARTURE DATE / FECHA DE SALIDA</div>
          <div className="border-r border-black p-2">9/16/2025</div>
          <div className="border-r border-black p-2 font-bold">SEAL No. / NUMERO DE SELLO</div>
          <div className="p-2">C7792048</div>
        </div>

        {/* Row */}
        <div className="grid grid-cols-4 border-b border-black">
          <div className="border-r border-black p-2 font-bold">DEPARTURE TIME:</div>
          <div className="border-r border-black p-2">11:50:19 PM</div>
          <div className="border-r border-black p-2 font-bold">CONTAINER DIGIT CONTROL</div>
          <div className="p-2">8</div>
        </div>

        {/* Row */}
        <div className="grid grid-cols-4 border-b border-black">
          <div className="border-r border-black p-2 font-bold">RYAN No. / No. SENSOR:</div>
          <div className="border-r border-black p-2">7202500</div>
          <div className="border-r border-black p-2 font-bold">CONTAINER ENTRY COUNTRY / PROCEDENCIA</div>
          <div className="p-2">—</div>
        </div>

        {/* Row */}
        <div className="grid grid-cols-4 border-b border-black">
          <div className="border-r border-black p-2 font-bold">DRIVER NAME / NOMBRE DEL PILOTO:</div>
          <div className="border-r border-black p-2">ADDER ALFONSO RUIZ LORENZANA</div>
          <div className="border-r border-black p-2 font-bold">BL No. / No. DE BL</div>
          <div className="p-2">—</div>
        </div>

        {/* Row */}
        <div className="grid grid-cols-4">
          <div className="border-r border-black p-2 font-bold">DRIVER ID / DPI DEL PILOTO:</div>
          <div className="border-r border-black p-2">2493 34275 0101</div>
          <div className="border-r border-black p-2 font-bold">LICENCE PLATE No / PLACA</div>
          <div className="p-2">C 577BSD</div>
        </div>
      </div>
    </div>
  );
}
