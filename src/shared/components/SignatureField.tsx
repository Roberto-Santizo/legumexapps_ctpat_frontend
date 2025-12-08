import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";
import type {Control,RegisterOptions,FieldErrors,FieldValues} from "react-hook-form";
import {Controller} from "react-hook-form";
import type { Path } from "react-hook-form";
import type { FieldError } from "react-hook-form";


interface SignatureFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  rules?: RegisterOptions<T>;
  errors?: FieldErrors<T>;
  height?: number;
  penColor?: string;
  className?: string;
}

export default function SignatureField<T extends FieldValues>({
  name,
  control,
  label = "Firma",
  rules,
  errors,
  height = 160,
  penColor = "black",
  className = ""
}: SignatureFieldProps<T>) {
  
  const sigRef = useRef<SignatureCanvas>(null!);


  return (
    <div className="space-y-2 text-center">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div className="p-2">
            <SignatureCanvas
              ref={sigRef}
              penColor={penColor}
              canvasProps={{
                className: `w-full border ${className}`,
                style: { height: `${height}px` }
              }}
              onEnd={() => {
                if (sigRef.current) {
                  field.onChange(sigRef.current.toDataURL());
                }
              }}
            />

            <button
              type="button"
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded uppercase font-bold"
              onClick={() => {
                sigRef.current?.clear();
                field.onChange("");
              }}
            >
              Limpiar Firma
            </button>
          </div>
        )}
      />

      <label className="block font-medium text-xl">{label}</label>

        {errors?.[name] && (
          <p className="text-red-500 text-sm font-bold">
            {(errors[name] as FieldError)?.message ?? "Asegúrese de firmar"}
          </p>
        )}
    </div>
  );
}
