
import { ErrorMessage } from "../utilities-components/ErrorMessage";
import type {UseFormRegister,FieldErrors} from "react-hook-form";
import type { ObservationCreateData } from "@/schemas/types";

type PackingListFormProps = {
    register: UseFormRegister<ObservationCreateData>
    errors: FieldErrors<ObservationCreateData>;
}

export default function CreateObservationForm({register, errors}: PackingListFormProps) {
  return (
    <div className="form-container space-y-6">
        <div className="form-group">
                <label htmlFor="name" className="form-label">
                Nombre<span className="required">*</span>
                </label>
                <input
                    id="name"
                    type="text"
                    placeholder="Describe the non-complying observaon: Describa las observaciones de no cumplimiento:"
                    className={`form-input ${
                        errors?.name ? "form-input-error" : "form-input-normal"
                    }`}
                    {...register("name", { required: "La observación es obligatoria" })}
                />
                {errors?.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
        </div>
    </div>
  );
}
