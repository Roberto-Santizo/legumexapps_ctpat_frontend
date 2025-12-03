interface LetterPageProps {
  pageNumber: number;
  totalPages: number;
  docDate: string;   // ← se recibe
  children: React.ReactNode;
}

export default function LetterPage({
  pageNumber,
  totalPages,
  docDate,
  children,
}: LetterPageProps) {
  return (
    <div className="relative w-[816px] h-[1056px] bg-white mx-auto border border-gray-400 p-8 overflow-hidden mt-6">

      {/* HEADER */}
      <div className="grid grid-cols-3 items-center mb-6">
        <div>
          <img src="/src/assets/images/logo.png" className="w-32" />
        </div>
        <div className="text-center">
          <h1 className="font-bold">FORMAT</h1>
          <p>C-TPAT</p>
        </div>
        <div className="text-right text-xs">
          <p>CODE: FOR-CI-18</p>
          <p>VERSION : 02</p>
          <p>PAGE {pageNumber} of {totalPages}</p>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="absolute top-[120px] bottom-[80px] left-8 right-8 overflow-hidden text-xs">
        {children}
      </div>

      {/* FOOTER */}
      <div className="absolute bottom-6 left-8 right-8 text-center text-[10px] text-gray-700">
        <p>FOR-CI-18</p>
        <p>Aprobado GCC</p>
        <p>Agroindustria Legumex, Chimaltenango, Guatemala</p>
        <p>{docDate}</p> {/* ← FECHA DINÁMICA */}
      </div>
    </div>
  );
}
