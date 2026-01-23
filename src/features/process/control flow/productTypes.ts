/**
 * ============================================================================
 * ARCHIVO 1/9: TIPOS BASE DEL SISTEMA DINÁMICO
 * ============================================================================
 * 
 * Ubicación: src/shared/types/productTypes.ts
 * 
 * Este archivo define:
 * - Los IDs numéricos de productos (1 = FROZEN, 2 = JUICE)
 * - Los tipos string correspondientes
 * - El mapeo entre IDs y strings
 * - La estructura de configuración de productos
 * 
 * ⚠️ IMPORTANTE: Este es un archivo CORE, necesario para que todo funcione
 * ============================================================================
 */

// ============================================================================
// TIPOS BÁSICOS
// ============================================================================

/** IDs numéricos que vienen del backend (del formulario de CTPAT) */
export type ProductTypeId = 1 | 2;

/** Nombres string para uso interno */
export type ProductType = "FROZEN" | "JUICE";

// ============================================================================
// MAPEOS ENTRE IDs Y STRINGS
// ============================================================================

/** Convierte ID → String (1 → "FROZEN", 2 → "JUICE") */
export const PRODUCT_TYPE_MAP: Record<ProductTypeId, ProductType> = {
  1: "FROZEN",
  2: "JUICE",
} as const;

/** Convierte String → ID ("FROZEN" → 1, "JUICE" → 2) */
export const PRODUCT_TYPE_ID_MAP: Record<ProductType, ProductTypeId> = {
  FROZEN: 1,
  JUICE: 2,
} as const;

// ============================================================================
// IMPORTS DE TIPOS ESPECÍFICOS (de tus archivos existentes)
// ============================================================================

import type {PackingListItemTable } from "@/features/packing-List/schemas/packingList";
import type { PackingListFormData } from "@/features/packing-List/schemas/types";


import type { 
  AddItemToPackingListFormData 
} from "@/features/frozen-items/schema/frozenItemType";

import type { 
  EditPackingListItemFormData 
} from "@/features/frozen-items/schema/frozenItemType";

import type { 
  CreateJuicePackingListFormData 
} from "@/features/juicePacking-List/schema/juicePackingListType";

// ============================================================================
// TIPOS PARA PROPS DE COMPONENTES
// ============================================================================

/** Props base para componentes de revisión de packing list */
export interface BasePackingListReviewProps {
  ctpatId: number;
  onContinue: () => void;
}

/** Props base para modales de agregar item */
export interface BaseAddItemModalProps {
  open: boolean;
  onClose: () => void;
  packingListId: number;
  ctpatId: number;
}

/** Props base para formularios de edición de item */
export interface BaseEditItemFormProps<TItem> {
  open: boolean;
  onClose: () => void;
  packingListId: number;
  itemId: number;
  ctpatId: number;
  itemData: TItem;
}

// ============================================================================
// TIPO PRINCIPAL: CONFIGURACIÓN DE PRODUCTO
// ============================================================================

/**
 * Define toda la configuración necesaria para un tipo de producto
 * Incluye componentes, APIs, y metadatos
 */
export interface ProductConfig {
  /** Tipo string del producto */
  type: ProductType;
  
  /** ID numérico del producto */
  typeId: ProductTypeId;
  
  /** Label para mostrar en UI */
  packingListLabel: string;
  
  // ------------------------------------------------------------------------
  // COMPONENTES
  // ------------------------------------------------------------------------
  
  /** Componente para crear packing list (Paso 1) */
  createPackingListComponent: React.ComponentType<{ ctpatId?: number }>;
  
  /** Componente para revisar/agregar items (Paso 2) */
  packingListReviewComponent: React.ComponentType<BasePackingListReviewProps>;
  
  /** Modal para agregar item */
  addItemModalComponent: React.ComponentType<BaseAddItemModalProps>;
  
  /** Formulario para editar item */
  editItemFormComponent: React.ComponentType<
    BaseEditItemFormProps<PackingListItemTable>
  >;
  
  // ------------------------------------------------------------------------
  // APIs
  // ------------------------------------------------------------------------
  
  api: {
    /** Crear packing list */
    createPackingList: (
      ctpatId: number,
      formData: PackingListFormData | CreateJuicePackingListFormData
    ) => Promise<{ message: string }>;
    
    /** Obtener packing list por CTPAT ID */
    getPackingList: (
      ctpatId: number
    ) => Promise<PackingListFormData>;
    
    /** Agregar item al packing list */
    addItem: (
      packingListId: number,
      formData: AddItemToPackingListFormData
    ) => Promise<{ message: string }>;
    
    /** Actualizar item existente */
    updateItem: (params: {
      packingListId: number;
      itemId: number;
      formData: EditPackingListItemFormData;
    }) => Promise<{ message: string }>;
    
    /** Eliminar item */
    deleteItem: (
      itemId: number
    ) => Promise<{ message: string }>;
  };
}

// ============================================================================
// FUNCIONES HELPER
// ============================================================================

/**
 * Convierte un ID numérico a su tipo string correspondiente
 * @param typeId - ID numérico del producto (1 o 2)
 * @returns Tipo string del producto ("FROZEN" o "JUICE")
 * 
 * @example
 * getProductTypeFromId(1) // "FROZEN"
 * getProductTypeFromId(2) // "JUICE"
 */
export function getProductTypeFromId(typeId: number): ProductType {
  const productType = PRODUCT_TYPE_MAP[typeId as ProductTypeId];
  
  if (!productType) {
    return "FROZEN";
  }
  
  return productType;
}

/**
 * Convierte un tipo string a su ID numérico correspondiente
 * @param productType - Tipo string del producto
 * @returns ID numérico del producto
 * 
 * @example
 * getProductTypeId("FROZEN") // 1
 * getProductTypeId("JUICE")  // 2
 */
export function getProductTypeId(productType: ProductType): ProductTypeId {
  return PRODUCT_TYPE_ID_MAP[productType];
}