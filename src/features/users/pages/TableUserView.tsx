
import { Link } from "react-router-dom";
import PaginationComponent from "../../../shared/components/PaginationComponent";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsersAPI } from "@/features/users/api/UserAPI.js";

export default function UserTableView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", currentPage, pageSize],
    queryFn: () => getUsersAPI(currentPage),
  });

  const handlePageChange = (page: number) => setCurrentPage(page);
  if (isLoading) return <p>Cargando usuarios...</p>;
  if (isError) return <p>Error al cargar los datos.</p>;
  const users = data?.response || [];
  const totalPages = data?.lastPage || 1;

  if(data) return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="max-w-6xl w-full">
        <div className="table-container">
          <div className="table-header flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="table-title">Lista de Usuarios</h2>
            <Link to="/user/create" className="btn-primary whitespace-nowrap">
              Crear usuario
            </Link>
          </div>
          <div className="overflow-x-auto">
            {users.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th className="table-cell-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.role}</td>
                      <td className="table-cell-center">
                        <div className="table-actions justify-center">
                          <Link
                            to={`/user/change-password/${user.id}`}
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
                No hay usuarios registrados.
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


