/**
 * ============================================================================
 * ARCHIVO 2/3: CONFIGURACIÓN DE PRODUCTOS (SOLO CREACIÓN DE PACKING LIST)
 * ============================================================================
 * 
 * Ubicación: src/shared/config/productConfig.tsx
 * 
 * Este archivo mapea cada tipo de producto (FROZEN/JUICE) a su componente
 * de creación de packing list correspondiente.
 * 
 * SOLO maneja el PASO 1 (crear packing list)
 * Los demás pasos quedan como están
 * ============================================================================
 */

import type { ProductTypeId, ProductType } from "@/features/process/control flow/productTypes";
import { PRODUCT_TYPE_MAP } from "@/features/process/control flow/productTypes";
import type { ComponentType } from "react";

// ============================================================================
// IMPORTS DE COMPONENTES
// ============================================================================

// FROZEN (Congelado): Componente para crear packing list
import CreatePackingList from "@/features/packing-List/pages/CreatePackingList";

// JUICE (Jugo): Componente para crear packing list
import CreateJuicePackingListView from "@/features/juicePacking-List/page/CreateJuicePackingListView";

// ============================================================================
// CONFIGURACIÓN SIMPLIFICADA
// ============================================================================

interface SimpleProductConfig {
  type: ProductType;
  typeId: ProductTypeId;
  createPackingListComponent: ComponentType;
}

const PRODUCT_CONFIGS: Record<ProductType, SimpleProductConfig> = {
  FROZEN: {
    type: "FROZEN",
    typeId: 1,
    createPackingListComponent: CreatePackingList,
  },
  JUICE: {
    type: "JUICE",
    typeId: 2,
    createPackingListComponent: CreateJuicePackingListView,
  },
};

// ============================================================================
// FUNCIÓN PARA OBTENER CONFIGURACIÓN
// ============================================================================

/**
 * Obtiene la configuración del producto según su ID numérico
 * 
 * @param typeId - ID del tipo de producto (1 = FROZEN, 2 = JUICE)
 * @returns Configuración con el componente de creación correspondiente
 * 
 * @example
 * const config = getProductConfigById(ctpat.type);
 * const Component = config.createPackingListComponent;
 * return <Component />;
 */
export function getProductConfigById(
  typeId: ProductTypeId | number
): SimpleProductConfig {
  // Convertir ID numérico a tipo string
  const productType = PRODUCT_TYPE_MAP[typeId as ProductTypeId];
  
  // Si el tipo es inválido, usar FROZEN por defecto
  if (!productType) {
    return PRODUCT_CONFIGS.FROZEN;
  }
  
  return PRODUCT_CONFIGS[productType];
}