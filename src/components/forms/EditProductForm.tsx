import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { updateProductAPI } from "@/api/ProductsAPI";
import type { ProductUpdateData} from "@/schemas/types";

type EditProductFormProps = {
  data: ProductUpdateData;
  productId: number;
};

export default function EditProductForm({ data, productId }: EditProductFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductUpdateData>();

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        code: data.code,
      });
    }
  }, [data, reset]);

  const { mutate } = useMutation({
    mutationFn: updateProductAPI,
    onError: (error) => {
      toast.error(error.message || "Error al actualizar el producto");
    },
    onSuccess: (message: string) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["editProduct", productId] });
      toast.success(message || "Producto actualizado correctamente");
      navigate("/products");
    },
  });

  const handleForm = (formData: ProductUpdateData) => {
    const payload = { formData, productId };
    mutate(payload);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] bg-clip-text text-transparent mb-3">
            Editar Producto
          </h1>
        </div>

        <div className="mb-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--color-primary-dark)] font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-[var(--color-bg-secondary)] transition-all duration-200 border border-[var(--color-border-light)]"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Regresar
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-[var(--color-border-light)] overflow-hidden">
          <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] h-2"></div>

          <form
            className="p-8 space-y-6"
            onSubmit={handleSubmit(handleForm)}
            noValidate
          >
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nombre del producto <span className="required">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Fresa"
                className={`form-input ${
                  errors.name ? "form-input-error" : "form-input-normal"
                }`}
                {...register("name", {
                  required: "El nombre del producto es obligatorio",
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="code" className="form-label">
                Código del producto <span className="required">*</span>
              </label>
              <input
                id="code"
                type="text"
                placeholder="F-1"
                className={`form-input ${
                  errors.code ? "form-input-error" : "form-input-normal"
                }`}
                {...register("code", {
                  required: "El código del producto es obligatorio",
                })}
              />
              {errors.code && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.code.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] hover:from-[var(--color-primary-darker)] hover:to-[var(--color-primary-dark)] text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-[var(--shadow-amber)] transform hover:-translate-y-0.5 transition-all duration-200 uppercase tracking-wide"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
