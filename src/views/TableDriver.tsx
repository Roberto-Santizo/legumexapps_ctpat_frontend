import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import PaginationComponent from "../components/utilities-components/PaginationComponent";
import { useState } from "react";
import { getDriverAPI } from "../api/DriversAPI";

export default function TableDriver() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["driver", currentPage, pageSize],
    queryFn: () => getDriverAPI(currentPage),
  });

  if (isLoading) return <p>Cargando roles...</p>;
  if (isError) return <p>Error al cargar los datos.</p>;

  const drivers = data?.response || [];
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
              <h2 className="table-title">Lista de pilotos</h2>
            </div>
            <Link to="/driver/create" className="btn-primary whitespace-nowrap">
              Crear piloto
            </Link>
          </div>
          <div className="overflow-x-auto">
            {drivers.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre del piloto</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.map((driver) => (
                    <tr key={driver.id}>
                      <td>{driver.id}</td>
                      <td >{driver.name}</td>
                      <td>
                        <div className="table-actions justify-center">
                          <Link
                            to={`/driver/${driver.id}/edit`}
                            className="btn-icon btn-icon-primary"
                            title="Editar"
                          >
                            <Pencil size={16} />
                          </Link>
                          <button
                            className="btn-icon"
                            style={{
                              borderColor: "#dc2626",
                              color: "#dc2626",
                            }}
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-10 text-gray-500">
                No hay pilotos registrados.
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
