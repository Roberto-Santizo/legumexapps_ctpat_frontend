
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import { ErrorMessage } from "@/shared/components/ErrorMessage";
import { getCustomersForSelectAPI } from "@/features/customer/api/CustomerAPI";
import { getJuiceForSelectAPI } from "@/features/juiceProduct/api/JuiceApi";
import type { EditJuicePackingListItemFormData } from "@/features/juice-Items/schema/juiceItemType";
import {toUpper} from "@/shared/helpers/textTransformUppercase"


type Props = {
  register: UseFormRegister<EditJuicePackingListItemFormData>;
  errors: FieldErrors<EditJuicePackingListItemFormData>;
};

export default function EditJuiceItemForm({ register, errors }: Props) {
  const { data: juices } = useQuery({
    queryKey: ["juice-select"],
    queryFn: getJuiceForSelectAPI,
  });

  const { data: customers } = useQuery({
    queryKey: ["customers-select"],
    queryFn: getCustomersForSelectAPI,
  });

  return (
    <div className="space-y-6">

      {/* JUGO */}
      <div className="form-group">
        <label className="form-label">Jugo *</label>
        <select
          className={`form-input ${
            errors.juice_id ? "form-input-error" : "form-input-normal"
          }`}
          {...register("juice_id", { valueAsNumber: true })}
        >
          <option value="">Seleccione un jugo</option>
          {juices?.map((juice) => (
            <option key={juice.id} value={juice.id}>
              {juice.name}
            </option>
          ))}
        </select>
        {errors.juice_id && (
          <ErrorMessage>{errors.juice_id.message}</ErrorMessage>
        )}
      </div>

      {/* CAJAS */}
      <div className="form-group">
        <label className="form-label">Cajas *</label>
        <input
          type="number"
          className={`form-input ${
            errors.boxes ? "form-input-error" : "form-input-normal"
          }`}
          {...register("boxes", { valueAsNumber: true })}
        />
        {errors.boxes && <ErrorMessage>{errors.boxes.message}</ErrorMessage>}
      </div>

      {/* TEMPERATURA */}
      <div className="form-group">
        <label className="form-label">Temperatura *</label>
        <input
          type="number"
          className={`form-input ${
            errors.temp ? "form-input-error" : "form-input-normal"
          }`}
          {...register("temp", { valueAsNumber: true })}
        />
        {errors.temp && <ErrorMessage>{errors.temp.message}</ErrorMessage>}
      </div>

      {/* PESO BRUTO */}
      <div className="form-group">
        <label className="form-label">Peso bruto *</label>
        <input
          type="number"
          step="0.01"
          className={`form-input ${
            errors.gross_weight ? "form-input-error" : "form-input-normal"
          }`}
          {...register("gross_weight", { valueAsNumber: true })}
        />
        {errors.gross_weight && (
          <ErrorMessage>{errors.gross_weight.message}</ErrorMessage>
        )}
      </div>

      {/* PESO NETO */}
      <div className="form-group">
        <label className="form-label">Peso neto *</label>
        <input
          type="number"
          step="0.01"
          className={`form-input ${
            errors.net_weight ? "form-input-error" : "form-input-normal"
          }`}
          {...register("net_weight", { valueAsNumber: true })}
        />
        {errors.net_weight && (
          <ErrorMessage>{errors.net_weight.message}</ErrorMessage>
        )}
      </div>

      {/* CLIENTE */}
      <div className="form-group">
        <label className="form-label">Cliente *</label>
        <select
          className={`form-input ${
            errors.client_id ? "form-input-error" : "form-input-normal"
          }`}
          {...register("client_id", { valueAsNumber: true })}
        >
          <option value="">Seleccione un cliente</option>
          {customers?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.client_id && (
          <ErrorMessage>{errors.client_id.message}</ErrorMessage>
        )}
      </div>

      {/* BOTELLAS */}
      <div className="form-group">
        <label className="form-label">Botellas *</label>
        <input
          type="number"
          className={`form-input ${
            errors.bottles ? "form-input-error" : "form-input-normal"
          }`}
          {...register("bottles", { valueAsNumber: true })}
        />
        {errors.bottles && (
          <ErrorMessage>{errors.bottles.message}</ErrorMessage>
        )}
      </div>
      <div className="form-group">
            <label className="form-label">GRN *</label>
              <input
                type="text"
                className={`form-input ${
                errors.grn ? "form-input-error" : "form-input-normal"
                }`}
                {...register("grn", {
                  setValueAs: toUpper, 
                  required: "El dato de grn es obligatorio",
                })}
                />
                {errors.grn && (
                  <ErrorMessage>{errors.grn.message}</ErrorMessage>
                )}
      </div>
    </div>
  );
}
