interface Observation {
  id: number;
  observation: string;
  data: string;
}

interface ObservationsTableProps {
  observations: Observation[];
}

export default function ObservationsTable({
  observations,
}: ObservationsTableProps) {
  return (
    <div className="space-y-4 text-[11px]">
      {/* Header fijo */}
      <div className="text-center font-bold bg-gray-200 py-1 mb-2">
        <p className="uppercase">
          Non Complying Observation: / Observaciones de No Cumplimiento
        </p>
      </div>

      <table className="w-full border border-black border-collapse">
        <tbody>
          {observations.map((obs, index) => (
            <tr key={obs.id}>
              <td className="border border-black p-2 w-3/5 font-semibold">
                {index + 1}. {obs.observation}
              </td>
              <td className="border border-black p-2 w-2/5">
                <span className="text-blue-600">
                  {obs.data}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
