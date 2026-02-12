import { Link } from "react-router";
import { Pencil } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCarriersAPI } from "@/features/carriers/api/CarriersAPI";
import PaginationComponent from "@/shared/components/PaginationComponent";
import { useState } from "react";

export default function TableCarriers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["carriers", currentPage, pageSize],
    queryFn: () => getCarriersAPI(currentPage),
  });

  if (isLoading) return <p>Cargando transportistas...</p>;
  if (isError) return <p>Error al cargar los datos.</p>;

  const carriers = data?.response || [];
  const totalPages = data?.lastPage || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="max-w-6xl w-full">
        <div className="table-container">
          <div className="table-header flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="table-title">Lista de Transportistas</h2>
            </div>
            <Link to="/carriers/create" className="btn-primary whitespace-nowrap">
              Crear Transportista
            </Link>
          </div>
          <div className="overflow-x-auto">
            {carriers.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre del Transportista</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {carriers.map((carrier) => (
                    <tr key={carrier.id}>
                      <td className="table-cell-center">{carrier.id}</td>
                      <td>{carrier.name}</td>
                      <td className="table-cell-center">
                        <div className="table-actions justify-center">
                          <Link
                              to={`/carriers/${carrier.id}/edit`}
                            className="btn-icon btn-icon-primary"
                            title="Editar"
                          >
                            <Pencil size={16} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-10 text-gray-500">
                No hay transportistas registrados.
              </p>
            )}
          </div>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
