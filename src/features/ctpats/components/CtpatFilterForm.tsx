

import React, { useState } from 'react';
import { Search, X, Filter, Calendar, MapPin, Package, Sparkles, ChevronDown } from 'lucide-react';

const CtpatFilterForm = () => {
  const [filters, setFilters] = useState({
    destino: '',
    contenedor: '',
    estado: '',
    fechaDesde: '',
  });

const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };


  const handleClear = () => {
    setFilters({
      destino: '',
      contenedor: '',
      estado: '',
      fechaDesde: '',
    });
  };

  const handleSubmit = () => {
    console.log('Filtros aplicados:', filters);
  };

  const estados = [
    '8) CTPAT Cerrado',
    '4) Inspección Checklist',
    '2) Creación de Packing List'
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-6 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-orange-500 p-3 rounded-xl shadow-lg">
                <Filter className="text-white" size={28} strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">
                  Filtros de Búsqueda
                </h1>
                <p className="text-blue-100 text-sm">
                  Encuentra tus CTpats de manera rápida y eficiente
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <div className="bg-blue-600 p-1.5 rounded-lg">
                    <MapPin size={14} className="text-white" />
                  </div>
                  DESTINO
                </label>
                <input
                  type="text"
                  name="destino"
                  value={filters.destino}
                  onChange={handleChange}
                  placeholder="Ej: Miami"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium text-gray-800 placeholder-gray-400"
                />
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <div className="bg-blue-600 p-1.5 rounded-lg">
                    <Package size={14} className="text-white" />
                  </div>
                  CONTENEDOR
                </label>
                <input
                  type="text"
                  name="contenedor"
                  value={filters.contenedor}
                  onChange={handleChange}
                  placeholder="Ej: TRIU 808916-8"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium text-gray-800 placeholder-gray-400"
                />
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <div className="bg-blue-600 p-1.5 rounded-lg">
                    <Filter size={14} className="text-white" />
                  </div>
                  ESTADO
                </label>
                <div className="relative">
                  <select
                    name="estado"
                    value={filters.estado}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium text-gray-800 appearance-none"
                  >
                    <option value="">Todos los estados</option>
                    {estados.map((estado, index) => (
                      <option key={index} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <div className="bg-blue-600 p-1.5 rounded-lg">
                    <Calendar size={14} className="text-white" />
                  </div>
                  FECHA 
                </label>
                <input
                  type="date"
                  name="fechaDesde"
                  value={filters.fechaDesde}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-medium text-gray-800"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-6 flex flex-wrap gap-4 border-t border-gray-200">
            <button
              onClick={handleSubmit}
              className="flex-1 min-w-[140px] flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              <Search size={20} strokeWidth={2.5} />
              Aplicar Filtros
            </button>
            <button
              onClick={handleClear}
              className="flex items-center justify-center gap-3 bg-white hover:bg-gray-100 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              <X size={22} strokeWidth={2.5} />
              Limpiar
            </button>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-5 shadow-md">
          <div className="flex items-start gap-3">
            <div className="bg-blue-600 p-2 rounded-lg mt-0.5">
              <Sparkles className="text-white" size={18} />
            </div>
            <div>
              <h3 className="text-blue-900 font-bold mb-1">Búsqueda Inteligente</h3>
              <p className="text-blue-700 text-sm">
                Puede combinar múltiples filtros para obtener resultados más específicos y precisos
              </p>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default CtpatFilterForm;