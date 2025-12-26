import { Link } from "react-router-dom";
import { Pencil,Eye,FileCheck,X  } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";

import PaginationComponent from "@/shared/components/PaginationComponent.js";
import { getCtpatsAPI } from "@/features/ctpats/api/CtpatsAPI.js";
import {CTPAT_STATUS_MAP,CTPAT_STATUS_COLORS} from "@/features/ctpats/constants/statusCodes";
import CtpatFilterForm from "@/features/ctpats/components/CtpatFilterForm.js";

export default function CtpatTableView() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [openFilter, setOpenFilter] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ctpats", currentPage, pageSize],
    queryFn: () => getCtpatsAPI(currentPage),
  });

  const handlePageChange = (page: number) => setCurrentPage(page);

  if (isLoading) return <p>Cargando ctpat...</p>;
  if (isError) return <p>Error al cargar los ctpat.</p>;

  const ctpats = data?.response || [];
  const totalPages = data?.lastPage || 1;

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="max-w-6xl w-full">
        <div className="table-container">
          <div className="table-header flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="table-title">Lista de Ctpats</h2>
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <Link
                to="/ctpats/create"
                className="btn-primary whitespace-nowrap"
              >
                Crear Ctpat
              </Link>
              <button
                type="button"
                onClick={() => setOpenFilter(true)}
                className=" flex items-center gap-2 px-4 py-4 rounded-xl transition-all duration-200 btn-primary whitespace-nowrap"
              >
                <Filter size={18} />
                <span className="hidden sm:inline">Filtrar</span>
              </button>
            </div>
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
                    <th>Estado</th>
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
                      <td>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full border ${CTPAT_STATUS_COLORS[ctpat.status]}`}
                        >
                          {CTPAT_STATUS_MAP[ctpat.status]}
                        </span>
                      </td>
                          <td className="table-cell-center">
                            <div className="table-actions justify-center">

                              {ctpat.status !== 8 && (
                                <button
                                  className="btn-icon btn-icon-primary"
                                  title="Editar"
                                  onClick={() => navigate(`/steps/${ctpat.id}`)}
                                >
                                  <Pencil size={16} />
                                </button>
                              )}
                              {ctpat.status === 8 && (
                                <Link
                                  className="btn-icon"
                                  style={{ borderColor: "#dc2626", color: "#dc2626" }}
                                  title="Documento Ctpat"
                                  to={`/ctpats/document/${ctpat.id}`}
                                >
                                  <Eye size={16} />
                                </Link>
                              )}
                              {ctpat.status === 8 && (
                                <Link
                                  className="btn-icon"
                                  style={{ borderColor: "#dc2626", color: "#dc2626" }}
                                  title="Packing List"
                                  to={`/packingList/document/${ctpat.id}`}
                                >
                                  <FileCheck size={16} />
                                </Link>
                               )}
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

      {openFilter && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenFilter(false)}
          />

          <div className="relative ml-auto w-full max-w-md h-full bg-white shadow-2xl animate-slide-in">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="font-bold text-lg">Filtros</h3>
              <button onClick={() => setOpenFilter(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100%-64px)]">
              <CtpatFilterForm />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
