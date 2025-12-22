

import { ErrorMessage } from "@/shared/components/ErrorMessage";
import type {UseFormRegister,FieldErrors} from "react-hook-form";
import type { AddItemToPackingListFormData } from "@/features/packing-List/schemas/addItemToPackingList";
import {getProductAPI} from "@/features/products/api/ProductsAPI";
import { useState,useEffect } from "react";


type ProductSelect = {
  id: number;
  name: string;
};

type PackingListFormProps = {
    register: UseFormRegister<AddItemToPackingListFormData>
    errors: FieldErrors<AddItemToPackingListFormData>;
}

export default function AddPackingListToPackingListForm({register, errors}: PackingListFormProps) {
    const [products, setProducts] = useState<ProductSelect[]>([]);
    const [loadingProducts, setLoadingProducts] = useState<boolean>(true);

        useEffect(() => {
        const fetchProducts = async () => {
            try {
            const result = await getProductAPI();

            if (!result) return;

            setProducts(result.response);
            } catch (error) {
            console.error("Error cargando productos:", error);
            } finally {
            setLoadingProducts(false);
            }
        };

        fetchProducts();
        }, []);

  return (
    <div className="form-container space-y-1">
        <div className="form-group">
            <label htmlFor="product_id" className="form-label">
                 Producto <span className="required">*</span>
            </label>
                <select
                id="product_id"
                disabled={loadingProducts}
                className={`form-input ${
                    errors.product_id ? "form-input-error" : "form-input-normal"
                }`}
                {...register("product_id", {
                    valueAsNumber: true,
                })}
                >
                <option value="">Selecciona un producto</option>

                {products.map((product) => (
                    <option key={product.id} value={product.id}>
                    {product.name}
                    </option>
                ))}
                </select>


            {errors.product_id && (
            <ErrorMessage>{errors.product_id.message}</ErrorMessage>
            )}
        </div>
        <div className="form-group">
            <label htmlFor="lote" className="form-label">
                Lote <span className="required">*</span>
                </label>
                <input
                    id="lote"
                    type="number"
                    placeholder="1"
                    className={`form-input ${
                        errors?.lote ? "form-input-error" : "form-input-normal"
                    }`}
                    {...register("lote", { required: "El tipo de lote es obligatorio" })}
                />
                {errors?.lote && (
                <ErrorMessage>{errors.lote.message}</ErrorMessage>
                )}
        </div>

        <div className="form-group">
            <label htmlFor="boxes" className="form-label">Boxes<span className="required">*</span></label>
            <input
            id="boxes"
            type="number"
            placeholder="150"
            className={`form-input ${
                errors?.boxes ? "form-input-error" : "form-input-normal"
            }`}
            {...register("boxes", { required: "El numero de cajas es obligatorio" })}
            />
            {errors?.boxes && (
            <ErrorMessage>{errors.boxes.message}</ErrorMessage>
            )}
      </div>

      <div className="form-group">
            <label htmlFor="temp" className="form-label">Temperatura <span className="required">*</span></label>
            <input
                id="temp"
                type="number"
                placeholder="-18.5"
                className={`form-input ${
                    errors?.temp ? "form-input-error" : "form-input-normal"
                }`}
                {...register("temp", {
                    required: "La temperatura es obligatoria",
                })}
            />
            {errors?.temp && (
            <ErrorMessage>{errors.temp.message}</ErrorMessage>
            )}
     </div>
    
     <div className="form-group">
            <label htmlFor="production_date" className="form-label">Dia de producción <span className="required">*</span> </label>
            <input
                id="production_date"
                type="date"
                placeholder="1234"
                className={`form-input ${
                    errors?.production_date ? "form-input-error" : "form-input-normal"
                }`}
                {...register("production_date", {
                    required: "La fecha de producción es obligatoria",
                })}
            />
            {errors?.production_date && (
            <ErrorMessage>{errors.production_date.message}</ErrorMessage>
            )}
     </div>

     <div className="form-group">
            <label htmlFor="expiration_date" className="form-label">Fecha de vencimiento <span className="required">*</span> </label>
            <input
                id="expiration_date"
                type="date"
                placeholder="24.5"
                className={`form-input ${
                    errors?.expiration_date ? "form-input-error" : "form-input-normal"
                }`}
                {...register("expiration_date", {
                    required: "La fecha de vencimiento es obligatoria",
                })}
            />
            {errors?.expiration_date && (
            <ErrorMessage>{errors.expiration_date.message}</ErrorMessage>
            )}
     </div>
     <div className="form-group">
            <label htmlFor="po" className="form-label">PO </label>
            <input
                id="po"
                type="text"
                placeholder="878478"
                className={`form-input ${
                    errors?.po ? "form-input-error" : "form-input-normal"
                }`}
                {...register("po")}
            />
     </div>
    <div className="form-group">
            <label htmlFor="grn" className="form-label">GRN <span className="required">*</span> </label>
            <input
                id="grn"
                type="text"
                placeholder="7162"
                className={`form-input ${
                    errors?.grn ? "form-input-error" : "form-input-normal"
                }`}
                {...register("grn", {
                    required: "El GRN es obligatorio",
                })}
            />
            {errors?.grn && (
            <ErrorMessage>{errors.grn.message}</ErrorMessage>
            )}
     </div>
    </div>
  );
}
