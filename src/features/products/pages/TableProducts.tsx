import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import PaginationComponent from "../../../shared/components/PaginationComponent";
import { useState } from "react";
import {getProductAPI} from "@/features/products/api/ProductsAPI"


export default function TableProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", currentPage, pageSize],
    queryFn: () => getProductAPI(currentPage),
  });

  if (isLoading) return <p>Cargando los productos...</p>;
  if (isError) return <p>Error al cargar los datos.</p>;

  const products = data?.response || [];
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
              <h2 className="table-title">Lista de productos</h2>
            </div>
            <Link
              to="/products/create"
              className="btn-primary whitespace-nowrap"
            >
              Crear Producto
            </Link>
          </div>
          <div className="overflow-x-auto">
            {products.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th className="table-cell-center">ID</th>
                    <th className="table-cell-center">Nombre</th>
                    <th className="table-cell-center">Código</th>
                    <th>Acciones</th>

                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td >{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.code}</td>
                      <td className="table-cell-center">
                        <div className="table-actions justify-center">
                          <Link
                            to={`/products/${product.id}/edit`}
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
                No hay productos registrados.
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
