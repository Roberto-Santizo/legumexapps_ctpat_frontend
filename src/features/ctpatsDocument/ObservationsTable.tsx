interface Observation {
  id: number;
  observation: string;
  data: string;
}

interface ObservationsTableProps {
  observations?: Observation[] | null;
}

export default function ObservationsTable({
  observations,
}: ObservationsTableProps) {
  const observationsList = Array.isArray(observations) ? observations : [];

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
          {observationsList.length > 0 ? (
            observationsList.map((obs, index) => (
              <tr key={obs.id ?? index}>
                <td className="border border-black p-2 w-3/5 font-semibold">
                  {index + 1}. {obs.observation}
                </td>
                <td className="border border-black p-2 w-2/5">
                  <span className="text-blue-600">
                    {obs.data}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border border-black p-2 text-center" colSpan={2}>
                Sin observaciones
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
