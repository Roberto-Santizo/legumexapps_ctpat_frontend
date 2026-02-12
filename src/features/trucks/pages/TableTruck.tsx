
import { Link } from "react-router";
import { Pencil, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import PaginationComponent from "../../../shared/components/PaginationComponent";
import { useState } from "react";
import { getTrucksAPI } from "../api/TruckAPI";

export default function TableTruck() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["truck", currentPage, pageSize],
    queryFn: () => getTrucksAPI(currentPage),
  });

  if (isLoading) return <p>Cargando camiones...</p>;
  if (isError) return <p>Error al cargar los camiones.</p>;

  const trucks = data?.response || [];
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
              <h2 className="table-title">Lista de camiones</h2>
            </div>
            <Link to="/trucks/create" className="btn-primary whitespace-nowrap">
              Crear camión
            </Link>
          </div>
          <div className="overflow-x-auto">
            {trucks.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>PLACA</th>
                     <th>TRASPORTISTA</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {trucks.map((truck) => (
                    <tr key={truck.id}>
                      <td>{truck.id}</td>
                      <td >{truck.plate}</td>
                      <td >{truck.carrier}</td>
                      <td>
                        <div className="table-actions justify-center">
                          <Link
                            to={`/trucks/${truck.id}/edit`}
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
                No hay camiones registrados.
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
