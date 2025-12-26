import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 

import { getConditionAPI } from "@/features/conditions/api/ConditionsAPI";
import { createCheckListAPI } from "@/features/checkLists/api/CheckListAPI";
import { useUpdateCtpatStatus } from "@/features/ctpats/hooks/useUpdateCtpatStatus";
import CheckListRow from "../components/CheckListRow";

type Props = {
  ctpatId: number;
};

export default function CheckListPage({ ctpatId }: Props) {
  const navigate = useNavigate();
  const updateStatus = useUpdateCtpatStatus();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["conditions-checklist"],
    queryFn: () => getConditionAPI(),
  });

  const conditions = data?.response || [];

  const [values, setValues] = useState<Record<number, boolean>>({});

  const { mutate } = useMutation({
    mutationFn: () =>
      createCheckListAPI(
        ctpatId,
        conditions.map((c) => ({
          condition_id: c.id,
          status: values[c.id] ?? true,
        }))
      ),

    onSuccess: () => {
      toast.success("Checklist guardado correctamente");

      updateStatus.mutate(
        { id: ctpatId, status: 5 },
        {
          onSuccess: () => {
            toast.success("CTPAT actualizado al estado 4");
             navigate("/ctpats");
          },
        }
      );
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSave = () => mutate();

  if (isLoading) return <p>Cargando checklist...</p>;
  if (isError) return <p>Error al cargar condiciones.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Checklist CTPAT</h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Condición</th>
              <th>Tipo</th>
              <th className="text-center">Cumple</th>
            </tr>
          </thead>
          <tbody>
            {conditions.map((condition) => (
              <CheckListRow
                key={condition.id}
                condition={condition}
                value={values[condition.id] ?? true}
                onChange={(val) =>
                  setValues((prev) => ({
                    ...prev,
                    [condition.id]: val,
                  }))
                }
              />
            ))}
          </tbody>
        </table>
      </div>

      <button className="btn-primary mt-6 w-full" onClick={handleSave}>
        Guardar Checklist
      </button>
    </div>
  );
}
