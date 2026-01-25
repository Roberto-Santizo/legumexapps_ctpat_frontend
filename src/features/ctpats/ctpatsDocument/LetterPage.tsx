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
    <div className="relative w-[816px] bg-white mx-auto border border-gray-400 p-8 mt-6">
      {/* HEADER */}
      <div className="pb-4">
        <div className="grid grid-cols-3 items-center mb-4">
          <div>
            <img src= {import.meta.env.VITE_IMAGE_LOGO} alt="LegumexLogo" className="w-32" />
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
      </div>

      {/* CONTENIDO NORMAL — FLUJO NATURAL */}
      <div className="text-xs py-6">
        {children}
      </div>

      {/* FOOTER */}
      <div className="pt-4 mt-6 text-center text-[10px] text-gray-700">
        <p>FOR-CI-18</p>
        <p>Approved GCC</p>
        <p>Agroindustria Legumex, Chimaltenango, Guatemala</p>
        <p>{docDate}</p>
      </div>

    </div>
  );
}
