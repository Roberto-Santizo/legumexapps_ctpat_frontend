export const CTPAT_STATUS = {
  1: "Imagenes carga de contenedor",
  2: "Creación de Packing List",
  3: "Inspeción Checklist",
  4: "Asignación de piloto y camión",
  5: "Carga de imágenes final",
  6: "Firmar y Cerrar CTPAT ",
  7: "CTPAT Cerrado"
} as const;

export type CtpatStatus = keyof typeof CTPAT_STATUS;

export const CTPAT_STATUS_MAP: Record<number, string> = CTPAT_STATUS;

export const CTPAT_STATUS_COLORS: Record<number, string> = {
1: "bg-sky-100 text-sky-700 border-sky-300",        
2: "bg-amber-100 text-amber-700 border-amber-300", 
3: "bg-violet-100 text-violet-700 border-violet-300", 
4: "bg-indigo-100 text-indigo-700 border-indigo-300", 
5: "bg-orange-100 text-orange-700 border-orange-300",
6: "bg-slate-100 text-slate-700 border-slate-300", 
7: "bg-emerald-100 text-emerald-700 border-emerald-300", 
};
