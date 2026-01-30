import { Link } from "react-router-dom";
import { Pencil, Eye, FileCheck, X, FilePenLine } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";

import PaginationComponent from "@/shared/components/PaginationComponent.js";
import { getCtpatsAPI } from "@/features/ctpats/api/CtpatsAPI.js";
import { CTPAT_STATUS_MAP, CTPAT_STATUS_COLORS } from "@/features/ctpats/constants/statusCodes";
import CtpatFilterForm from "@/features/ctpats/components/CtpatFilterForm.js";
import { getCtpatsWithFiltersAPI } from "@/features/ctpats/api/CtpatsAPI.js";
import { useAuth } from "@/hooks/useAuth";
import { canAccess } from "@/core/permissions/canAccess";
import { CTPAT_PERMISSIONS } from "@/core/permissions/ctpats.permissions";
import DynamicPackingListReview from "@/features/process/components/DynamicPackingListReview";

type AppliedFilters = {
  container?: string;
  product?: string;
  order?: string;
};

export default function CtpatTableView() {
  const navigate = useNavigate();
  const { user } = useAuth();


  const [currentPage, setCurrentPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({});
  const [editPackingListCtpatId, setEditPackingListCtpatId] = useState<number | null>(null);

const { data, isLoading, isError } = useQuery({
  queryKey: ["ctpats", currentPage, appliedFilters],
  queryFn: () => {
    if (appliedFilters) {
      return getCtpatsWithFiltersAPI({
        page: currentPage,
        ...appliedFilters,
      });
    }

    return getCtpatsAPI(currentPage);
  },
  placeholderData: (previousData) => previousData,
});


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleApplyFilters = (filters: AppliedFilters) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    setOpenFilter(false);
  };

  const handleClearFilters = () => {
    setAppliedFilters({});
    setCurrentPage(1);
  };

  if (isLoading) return <p>Cargando Ctpat...</p>;
  if (isError) return <p>Error al cargar Ctpat.</p>;

  const ctpats = data?.response ?? [];
  const totalPages = data?.lastPage ?? 1;

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      <div className="max-w-6xl w-full">
        <div className="table-container">
          <div className="table-header flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="table-title">Lista de Ctpats</h2>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {canAccess(CTPAT_PERMISSIONS.CREATE, user?.role) && (
                <Link to="/ctpats/create" className="btn-primary">
                  Crear Ctpat
                </Link>
              )}
              <button
                type="button"
                onClick={() => setOpenFilter(true)}
                className="btn-primary flex items-center gap-2"
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
                    <th>Contenedor (Número) </th>
                    <th>Creado</th>
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
                      <td>{ctpat.createdAt}</td>
                      <td>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full border ${CTPAT_STATUS_COLORS[ctpat.status]}`}
                        >
                          {CTPAT_STATUS_MAP[ctpat.status]}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions justify-center">
                          {ctpat.status !== 7 &&
                            canAccess(CTPAT_PERMISSIONS.EDIT_STEPS, user?.role) && (
                              <button
                                className="btn-icon btn-icon-primary"
                                onClick={() => navigate(`/steps/${ctpat.id}`)}
                              >
                                <Pencil size={16} />
                              </button>
                          )}
                          {ctpat.status === 7 && (
                            <>
                              <Link
                                className="btn-icon btn-icon-primary"
                                to={`/ctpats/document/${ctpat.id}`}
                                title="Ver ctp"
                              >
                                <Eye size={16} />
                              </Link>

                              <Link
                                className="btn-icon btn-icon-primary"
                                to={`/packingList/document/${ctpat.id}`}
                                title="Ver packing List"
                              >
                              <FileCheck size={16} />
                              </Link>
                              {canAccess(CTPAT_PERMISSIONS.CREATE, user?.role) && (
                                <button
                                  className="btn-icon btn-icon-primary"
                                  onClick={() => setEditPackingListCtpatId(ctpat.id)}
                                  title="Editar items del packing List"
                                >
                                  <FilePenLine size={16} />
                                </button>
                              )} 
                            </>
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

          <div className="relative ml-auto w-full max-w-md h-full bg-white shadow-2xl">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="font-bold text-lg">Filtros</h3>
              <button onClick={() => setOpenFilter(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto h-[calc(100%-64px)]">
              <CtpatFilterForm
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal fullscreen para editar packing list de CTPAT cerrado */}
      {editPackingListCtpatId && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                Editar Packing List - CTPAT #{editPackingListCtpatId}
              </h2>
              <button
                onClick={() => setEditPackingListCtpatId(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Cerrar"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <DynamicPackingListReview
              ctpatId={editPackingListCtpatId}
              onContinue={() => setEditPackingListCtpatId(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}