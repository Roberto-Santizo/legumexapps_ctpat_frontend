export const CTPAT_STATUS = {
  1: "Carga de imágenes inicial",
  2: "Creación de Packing List",
  3: "Checklist",
  4: "Asignación de CTPAT",
  5: "Carga de imágenes final",
  6: "CTPAT cerrado",
} as const;

export type CtpatStatus = keyof typeof CTPAT_STATUS;

export const CTPAT_STATUS_MAP: Record<number, string> = CTPAT_STATUS;

export const CTPAT_STATUS_COLORS: Record<number, string> = {
  1: "bg-blue-100 text-blue-700 border-blue-300",
  2: "bg-yellow-100 text-yellow-700 border-yellow-300",
  3: "bg-purple-100 text-purple-700 border-purple-300",
  4: "bg-indigo-100 text-indigo-700 border-indigo-300",
  5: "bg-orange-100 text-orange-700 border-orange-300",
  6: "bg-green-100 text-green-700 border-green-300",
};
