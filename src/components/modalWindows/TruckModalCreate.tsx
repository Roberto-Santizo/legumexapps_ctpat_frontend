import Modal from "./Modal";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createTruckAPI } from "../../api/TruckAPI";
import CreateTruckForm from "../forms/CreateTruckForm";
import type { TruckCreateData } from "../../schemas/types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export default function TruckModalCreate({ isOpen, onClose, onCreated }: Props) {

  const methods = useForm<TruckCreateData>({
    defaultValues: {
      plate: "",
      carrier_id: 0,
      plate_image: "",
    }
  });

  const { mutate } = useMutation({
    mutationFn: createTruckAPI,
    onSuccess: (res) => {
      toast.success(res.message);
      onCreated();
      onClose();
    }
  });

  const handleForm = (data: TruckCreateData) => {
    mutate({ ...data, carrier_id: Number(data.carrier_id) });
  };

  return (
    <Modal title="Crear Nuevo Camión" isOpen={isOpen} onClose={onClose}>
      <FormProvider {...methods}>
        <div className="space-y-6">

          {/* El formulario interno ya no tiene <form> */}
          <CreateTruckForm />

          <button
            className="btn-primary w-full"
            onClick={methods.handleSubmit(handleForm)}
          >
            Guardar Camión
          </button>

        </div>
      </FormProvider>
    </Modal>
  );
}
