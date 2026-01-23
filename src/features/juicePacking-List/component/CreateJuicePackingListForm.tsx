import type {UseFormRegister,FieldErrors} from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {getCustomersForSelectAPI} from "@/features/customer/api/CustomerAPI"

import { ErrorMessage } from "@/shared/components/ErrorMessage";
import type { CreateJuicePackingListFormData} from "@/features/juicePacking-List/schema/juicePackingListType";

type PackingListFormProps = {
    register: UseFormRegister<CreateJuicePackingListFormData>
    errors: FieldErrors<CreateJuicePackingListFormData>;
}

export default function CreateJuicePackingListForm({register, errors}: PackingListFormProps) {
    const { data: customers, isLoading } = useQuery({
        queryKey: ["customers-select"],
        queryFn: getCustomersForSelectAPI,
    });

    if (isLoading) {
     return <p>Cargando clientes...</p>;
    }    
  return (
    <div className="form-container space-y-6">
        <div className="form-group">
        <label htmlFor="box_type" className="form-label">
            Tipo de caja<span className="required">*</span>
        </label>
        <select
            id="box_type"
            className={`form-input ${
            errors?.box_type ? "form-input-error" : "form-input-normal"
            }`}
            {...register("box_type", { required: "El tipo de caja es obligatorio" })}
        >
            <option value="">Seleccione un tipo</option>
            <option value="PRINTED">PRINTED (Cajas impresas)</option>
            <option value="KRAFT">KRAFT (Cajas Genéricas)</option>
        </select>
        {errors?.box_type && (
            <ErrorMessage>{errors.box_type.message}</ErrorMessage>
        )}
        </div>

        <div className="form-group">
            <label htmlFor="order" className="form-label">Numero de Orden ET<span className="required">*</span></label>
            <input
            id="order"
            type="text"
            placeholder="orden123"
            className={`form-input ${
                errors?.order ? "form-input-error" : "form-input-normal"
            }`}
            {...register("order", { required: "El número de orden es obligatorio" })}
            />
            {errors?.order && (
            <ErrorMessage>{errors.order.message}</ErrorMessage>
            )}
        </div>

        <div className="form-group">
            <label htmlFor="customer" className="form-label">
                Cliente <span className="required">*</span>
            </label>

            <select
                id="customer"
                className={`form-input ${
                errors?.customer ? "form-input-error" : "form-input-normal"
                }`}
                {...register("customer", {
                required: "El cliente es obligatorio",
                })}
            >
                <option value="">Seleccione un cliente</option>

                {customers?.map((customer) => (
                <option key={customer.id} value={customer.name}>
                    {customer.name}
                </option>
                ))}
            </select>

            {errors?.customer && (
                <ErrorMessage>{errors.customer.message}</ErrorMessage>
            )}
        </div>

        <div className="form-group">
                <label htmlFor="thermograph_no" className="form-label">Numero de termógrafro <span className="required">*</span> </label>
                <input
                    id="thermograph_no"
                    type="text"
                    placeholder="1234"
                    className={`form-input ${
                        errors?.thermograph_no ? "form-input-error" : "form-input-normal"
                    }`}
                    {...register("thermograph_no", {
                        required: "El numero de termografo es obligatorio",
                    })}
                />
                {errors?.thermograph_no && (
                <ErrorMessage>{errors.thermograph_no.message}</ErrorMessage>
                )}
        </div>
    </div>
  );
}
