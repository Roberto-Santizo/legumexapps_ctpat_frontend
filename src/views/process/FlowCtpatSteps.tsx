import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCtpatByIdAPI } from "@/api/CtpatsAPI";
import { Spinner } from "@/components/utilities-components/Spinner";

// Importa los pasos
import CreateUploadImages from "@/views/uploadImagesCtp/CreateUploadImages";

export default function FlowCtpatSteps() {
  const { id } = useParams();
  const ctpatId = Number(id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ctpat", ctpatId],
    queryFn: () => getCtpatByIdAPI(ctpatId),
    enabled: !isNaN(ctpatId),
  });

  if (isLoading) return <Spinner />;
  if (isError || !data) return <p>Error al cargar CTPAT</p>;

  const ctpat = data.response;

  // --- CONTROL DE FLUJO ---
  switch (ctpat.status) {
    case 1:
      return <CreateUploadImages />;

    case 2:
      return <p>Paso 2 — Próximamente</p>;

    case 3:
      return <p>Paso 3 — Próximamente</p>;

    default:
      return <p>Estado desconocido</p>;
  }
}
