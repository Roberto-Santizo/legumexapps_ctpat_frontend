import Modal from "./Modal";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createDriverAPI } from "../../api/DriversAPI";
import DriverForm from "../forms/DriverForm";
import type { DriverFormData } from "../../schemas/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export default function DriverModalCreate({ isOpen, onClose, onCreated }: Props) {

  const methods = useForm<DriverFormData>({
    defaultValues: {
      name: "",
      identification: "",
      license: "",
      carrier_id: 0,
      identification_image: "",
      license_image: "",
    }
  });

  const { mutate } = useMutation({
    mutationFn: createDriverAPI,
    onSuccess: (res) => {
      toast.success(res.message);
      onCreated();
      onClose();
    }
  });

  const handleForm = (data: DriverFormData) => {

    if (!data.identification_image && !data.license_image) {
      toast.error("Debes agregar al menos una fotografía.");
      return;
    }

    mutate({ ...data, carrier_id: Number(data.carrier_id) });
  };

  return (
    <Modal title="Crear Piloto" isOpen={isOpen} onClose={onClose}>
      <FormProvider {...methods}>
        <div className="space-y-6">

          {/* Tu formulario interno SIN <form> */}
          <DriverForm />

          <button
            className="btn-primary w-full"
            onClick={methods.handleSubmit(handleForm)}
          >
            Guardar Piloto
          </button>

        </div>
      </FormProvider>
    </Modal>
  );
}
