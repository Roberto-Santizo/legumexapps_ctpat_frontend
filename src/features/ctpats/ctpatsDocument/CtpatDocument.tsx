import { useEffect, useState } from "react";
import LetterPage from "./LetterPage";
export default function CtpatDocument() {
  const [docDate, setDocDate] = useState("");

  // 📌 Fecha dinámica (solo se ejecuta AL CREAR el documento)
  useEffect(() => {
    const now = new Date();

    const formatted = now.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });

    setDocDate(formatted);
  }, []);

  // 📌 Tus páginas dinámicas
  const pages = [
    <div>
      <h2 className="text-center font-bold bg-gray-200 py-1 mb-4">
        GENERAL INFORMATION
      </h2>
      {/* tabla */}
    </div>,

    <div>
      <h2 className="text-center font-bold bg-gray-200 py-1 mb-4">
        CONTAINER PICTURES
      </h2>
    </div>,
  ];

  return (
    <div className="space-y-10">
      {pages.map((content, i) => (
        <LetterPage
          key={i}
          pageNumber={i + 1}
          totalPages={pages.length}
          docDate={docDate}  
        >
          {content}
        </LetterPage>
      ))}
    </div>
  );
}
