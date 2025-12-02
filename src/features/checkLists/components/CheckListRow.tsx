type Props = {
  condition: {
    id: number;
    name: string;
    type: string;
  };
  value: boolean;
  onChange: (value: boolean) => void;
};

export default function CheckListRow({ condition, value, onChange }: Props) {
  return (
    <tr>
      <td className="text-center">{condition.id}</td>
      <td>{condition.name}</td>
      <td>{condition.type}</td>

      <td className="text-center">
        <div className="flex items-center justify-center gap-4">

          {/* TRUE */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={`status-${condition.id}`}
              checked={value === true}
              onChange={() => onChange(true)}
              className="radio-primary"
            />
            <span className="text-green-600 font-medium">Sí</span>
          </label>

          {/* FALSE */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={`status-${condition.id}`}
              checked={value === false}
              onChange={() => onChange(false)}
              className="radio-danger"
            />
            <span className="text-red-600 font-medium">No</span>
          </label>

        </div>
      </td>
    </tr>
  );
}
