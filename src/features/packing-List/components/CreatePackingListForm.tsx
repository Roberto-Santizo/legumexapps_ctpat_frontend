import { ErrorMessage } from "@/shared/components/ErrorMessage";
import type {UseFormRegister,FieldErrors} from "react-hook-form";
import type { PackignListFormData } from "@/features/packing-List/schemas/types";

type PackingListFormProps = {
    register: UseFormRegister<PackignListFormData>
    errors: FieldErrors<PackignListFormData>;
}

export default function PackingListForm({register, errors}: PackingListFormProps) {
  return (
    <div className="form-container space-y-6">
        <div className="form-group">
                <label htmlFor="box_type" className="form-label">
                Tipo de caja<span className="required">*</span>
                </label>
                <input
                    id="box_type"
                    type="text"
                    placeholder="Impreso"
                    className={`form-input ${
                        errors?.box_type ? "form-input-error" : "form-input-normal"
                    }`}
                    {...register("box_type", { required: "El tipo de caja es obligatorio" })}
                />
                {errors?.box_type && (
                <ErrorMessage>{errors.box_type.message}</ErrorMessage>
                )}
        </div>

        <div className="form-group">
            <label htmlFor="order" className="form-label">Orden<span className="required">*</span></label>
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
            <label htmlFor="customer" className="form-label">Cliente <span className="required">*</span></label>
            <input
                id="customer"
                type="text"
                placeholder="H.E.B."
                className={`form-input ${
                    errors?.customer ? "form-input-error" : "form-input-normal"
                }`}
                {...register("customer", {
                    required: "El cliente es obligatorio",
                })}
            />
            {errors?.customer && (
            <ErrorMessage>{errors.customer.message}</ErrorMessage>
            )}
     </div>
    
     <div className="form-group">
            <label htmlFor="thermograph_no" className="form-label">Termografo <span className="required">*</span> </label>
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

     <div className="form-group">
            <label htmlFor="exit_temp" className="form-label">Temperatura de salida <span className="required">*</span> </label>
            <input
                id="exit_temp"
                type="number"
                placeholder="24.5"
                className={`form-input ${
                    errors?.exit_temp ? "form-input-error" : "form-input-normal"
                }`}
                {...register("exit_temp", {
                    required: "El numero de termografo es obligatorio",
                })}
            />
            {errors?.exit_temp && (
            <ErrorMessage>{errors.exit_temp.message}</ErrorMessage>
            )}
     </div>
    </div>
  );
}
