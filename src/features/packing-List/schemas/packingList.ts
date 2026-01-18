
import { z } from "zod";
export type PackingListHeaderView = {
  id: number;
  carrier: string;
  client: string;
  order: string;
  no_container: string;
  container_type: string;
  seal: string;
  boxes: number;
  beginning_date: string;
};
// ============================================================================
// ESQUEMA BASE COMPARTIDO
// ============================================================================
const baseItemSchema = {
  product_id: z.number(),
  no_pallet: z.number().min(1, "El número de palet debe ser mayor a 0"),
  lote: z.union([z.string(), z.number()]).transform(String), // Acepta ambos, convierte a string
  boxes: z.number().min(1, "Debe haber al menos 1 caja"),
  temp: z.number(),
  net_weight: z.number().positive("El peso neto debe ser positivo"),
  gross_weight: z.number().positive("El peso bruto debe ser positivo"),
  production_date: z.string().min(1, "La fecha de producción es obligatoria"),
  expiration_date: z.string().min(1, "La fecha de vencimiento es obligatoria"),
  client_id: z.number(),
  po: z.string().optional().or(z.literal("")),
  grn: z.string().optional().or(z.literal("")),
};

// ============================================================================
// ESQUEMA PARA CREAR ITEM
// ============================================================================
export const addItemToPackingListSchema = z.object(baseItemSchema);

export type AddItemToPackingListFormData = z.infer<
  typeof addItemToPackingListSchema
>;

// ============================================================================
// ESQUEMA PARA EDITAR ITEM
// ============================================================================
export const editPackingListItemSchema = z.object({
  ...baseItemSchema,
  // En edición, GRN puede ser opcional si el backend lo permite
  grn: z.string().optional().or(z.literal("")),
});

export type EditPackingListItemFormData = z.infer<
  typeof editPackingListItemSchema
>;

// ============================================================================
// TIPO PARA LA TABLA (lo que retorna el backend en GET)
// ============================================================================
export interface PackingListItemTable {
  id: number;
  product: string; // Nombre del producto
  product_id: number;
  no_tarima: number;
  lote: string | number; // El backend puede retornar ambos
  code: string;
  boxes: number;
  temp: number;
  net_weight: number;
  gross_weight: number;
  presentation: string;
  expiration_date: string;
  production_date?: string; 
  client: string; 
  client_id: number;
  grn: string;
  po?: string;
}

// ============================================================================
// HELPER: Convertir datos de tabla a formulario de edición
// ============================================================================
export function tableItemToEditForm(
  item: PackingListItemTable
): EditPackingListItemFormData {
  return {
    product_id: item.product_id,
    no_pallet: item.no_tarima,
    lote: String(item.lote), // Asegurar que sea string
    boxes: item.boxes,
    temp: item.temp,
    net_weight: item.net_weight,
    gross_weight: item.gross_weight,
    production_date: item.production_date || item.expiration_date, 
    expiration_date: item.expiration_date,
    client_id: item.client_id,
    po: item.po || "",
    grn: item.grn || "",
  };
}