import { Link } from "react-router";
import { Pencil } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import PaginationComponent from "../../../shared/components/PaginationComponent";
import { getContainerAPI } from "../api/ContainerAPI";
import { useState } from "react";

export default function TableContainer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["containers", currentPage, pageSize],
    queryFn: () => getContainerAPI(currentPage),
  });

  if (isLoading) return <p>Cargando los contenedores...</p>;
  if (isError) return <p>Error al cargar los datos.</p>;

  const containers = data?.response || [];
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
              <h2 className="table-title">Lista de contenedores</h2>
            </div>
            <Link
              to="/container/create"
              className="btn-primary whitespace-nowrap"
            >
              Crear Contenedor
            </Link>
          </div>
          <div className="overflow-x-auto">
            {containers.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th className="table-cell-center">ID</th>
                    <th className="table-cell-center">Contenedor</th>
                    <th className="table-cell-center">Sello</th>
                    <th className="table-cell-center">Sensor</th>
                    <th className="table-cell-center">Tipo de contenedor</th>
                    <th className="table-cell-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {containers.map((container) => (
                    <tr key={container.id}>
                      <td >{container.id}</td>
                      <td>{container.container}</td>
                      <td>{container.seal}</td>
                      <td>{container.sensor}</td>
                      <td>{container.type}</td>
                      <td className="table-cell-center">
                        <div className="table-actions justify-center">
                          <Link
                            to={`/container/${container.id}/edit`}
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
