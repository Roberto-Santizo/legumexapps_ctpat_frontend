import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import PaginationComponent from "@/shared/components/PaginationComponent";
import { useState } from "react";
import {getCustomersAPI} from "@/features/customer/api/CustomerAPI"
import { Pencil } from "lucide-react";

export default function CustomerTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["customers", currentPage, pageSize],
    queryFn: () => getCustomersAPI(currentPage),
  });

  if (isLoading) return <p>Cargando clientes...</p>;
  if (isError) return <p>Error al cargar los clientes.</p>;

  const customers = data?.response || [];
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
              <h2 className="table-title">Lista de clientes</h2>
            </div>
            <Link to="/customers/create" className="btn-primary whitespace-nowrap">
              Crear Nuevo Cliente
            </Link>
          </div>
          <div className="overflow-x-auto">
            {customers.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Id del cliente</th>
                    <th>Código del cliente</th>
                    <th>Nombre del cliente</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td >{customer.id}</td>
                      <td>{customer.code}</td>
                      <td>{customer.name}</td>
                      <td className="table-cell-center">
                        <div className="table-actions justify-center">
                          <Link
                            to={`/customers/${customer.id}/edit`}
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
                No hay clientes registrados.
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
