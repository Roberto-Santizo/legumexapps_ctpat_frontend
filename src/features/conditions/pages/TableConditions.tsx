import { Link } from "react-router-dom";
import { Pencil} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import PaginationComponent from "../../../shared/components/PaginationComponent";
import { useState } from "react";
import {getPaginatedConditionAPI} from "@/features/conditions/api/ConditionsAPI"

export default function TableCondition() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["conditions", currentPage, pageSize],
    queryFn: () => getPaginatedConditionAPI(currentPage),
  });

  if (isLoading) return <p>Cargando las condiciones...</p>;
  if (isError) return <p>Error al cargar los datos.</p>;

  const conditions = data?.response || [];
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
              <h2 className="table-title">Lista de condiciones</h2>
            </div>
            <Link
              to="/conditions/create"
              className="btn-primary whitespace-nowrap"
            >
              Crear Condición
            </Link>
          </div>
          <div className="overflow-x-auto">
            {conditions.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th className="table-cell-center">ID</th>
                    <th className="table-cell-center">Nombre</th>
                    <th className="table-cell-center">Tipo</th>
                    <th className="table-cell-center">Estatus</th>
                    <th className="table-cell-center">Acciones</th>

                  </tr>
                </thead>
                <tbody>
                  {conditions.map((condition) => (
                    <tr key={condition.id}>
                      <td >{condition.id}</td>
                      <td >{condition.name}</td>
                      <td>{condition.type}</td>
                      <td className="text-center">
                        <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            condition.status
                                ? "bg-green-100 text-green-700 border border-green-300"
                                : "bg-red-100 text-red-700 border border-red-300"
                            }`}
                        >
                            <span
                            className={`w-2 h-2 rounded-full mr-2 ${
                                condition.status ? "bg-green-500" : "bg-red-500"
                            }`}
                            ></span>
                            {condition.status ? "Activo" : "Inactivo"}
                        </span>
                        </td>
                      <td className="table-cell-center">
                        <div className="table-actions justify-center">
                          <Link
                            to={`/conditions/${condition.id}/edit`}
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
                No hay condiciones registrados.
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
