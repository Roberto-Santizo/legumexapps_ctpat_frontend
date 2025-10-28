import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import PaginationComponent from "@/components/utilities-components/PaginationComponent.js";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCtpatsAPI } from "@/api/CtpatsAPI.js";

export default function UserTableView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ctpats", currentPage, pageSize],
    queryFn: () => getCtpatsAPI(currentPage),
  });

  const handlePageChange = (page: number) => setCurrentPage(page);

  if (isLoading) return <p>Cargando ctpat...</p>;
  if (isError) return <p>Error al cargar los ctpat.</p>;

  // 👇 Ajuste aquí: la API devuelve "response", no "data"
  const ctpats = data?.response || [];
  const totalPages = data?.lastPage || 1;

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="max-w-6xl w-full">
        <div className="table-container">
          <div className="table-header flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h2 className="table-title">Lista de Usuarios</h2>
            <Link to="/ctpats/create" className="btn-primary whitespace-nowrap">
              Crear usuario
            </Link>
          </div>

          <div className="overflow-x-auto">
            {ctpats.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Destino</th>
                    <th>Usuario</th>
                    <th>Sitio de salida</th>
                    <th>Contenedor</th>
                    <th>Fecha de creación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ctpats.map((ctpat) => (
                    <tr key={ctpat.id}>
                      <td>{ctpat.id}</td>
                      <td>{ctpat.destination}</td>
                      <td>{ctpat.user}</td>
                      <td>{ctpat.departure_site}</td>
                      <td>{ctpat.container}</td>
                      <td>
                        {new Date(ctpat.createdAt).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </td>
                      <td className="table-cell-center">
                        <div className="table-actions justify-center">
                          <button
                            className="btn-icon btn-icon-primary"
                            title="Editar"
                          >
                            <Pencil size={16} />
                          </button>
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
                No hay Ctpat registrados.
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
