import { Pencil } from "lucide-react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import PaginationComponent from "@/shared/components/PaginationComponent";
import { useState } from "react";
import { getJuiceAPI } from "@/features/juiceProduct/api/JuiceApi";


export default function JuiceTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["juices", currentPage, pageSize],
    queryFn: () => getJuiceAPI(currentPage),
  });

  if (isLoading) return <p>Cargando datos de jugo...</p>;
  if (isError) return <p>Error al cargar los datos.</p>;

  const juices = data?.response || [];
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
              <h2 className="table-title">Lista de jugos</h2>
            </div>
            <Link to="/juices/create" className="btn-primary whitespace-nowrap">
              Crear Nuevo Jugo
            </Link>
          </div>
          <div className="overflow-x-auto">
            {juices.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Id del jugo</th>
                    <th>Nombre del jugo</th>
                    <th>Código del jugo</th>
                    <th>Presentación</th>
                    <th>Libras por presentación</th>
                    <th>Acciones</th>

                  </tr>
                </thead>
                <tbody>
                  {juices.map((juice) => (
                    <tr key={juice.id}>
                      <td >{juice.id}</td>
                      <td>{juice.name}</td>
                      <td>{juice.code}</td>
                      <td>{juice.presentation}</td>
                      <td>{juice.lbs_presentation}</td>
                      <td className="table-cell-center">
                        <div className="table-actions justify-center">
                          <Link
                            to={`/juices/${juice.id}/edit`}
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
                No hay jugos registrados.
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
