import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getRoleAPI } from "@/features/roles/api/RolAPI";
import PaginationComponent from "../../../shared/components/PaginationComponent";
import { useState } from "react";


export default function UserTableView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["roles", currentPage, pageSize],
    queryFn: () => getRoleAPI(currentPage),
  });

  if (isLoading) return <p>Cargando roles...</p>;
  if (isError) return <p>Error al cargar los datos.</p>;

  const roles = data?.response || [];
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
              <h2 className="table-title">Lista de Roles</h2>
            </div>
            <Link to="/rol/create" className="btn-primary whitespace-nowrap">
              Crear Rol
            </Link>
          </div>
          <div className="overflow-x-auto">
            {roles.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre del Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((rol) => (
                    <tr key={rol.id}>
                      <td >{rol.id}</td>
                      <td>{rol.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center py-10 text-gray-500">
                No hay roles registrados.
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
