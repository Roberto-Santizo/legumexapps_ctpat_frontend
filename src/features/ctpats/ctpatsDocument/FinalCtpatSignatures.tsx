
interface Props {
  signatureC?: string;
  signatureE?: string;
}

export default function FinalCtpatSignatures({ signatureC, signatureE }: Props) {
  const baseUrl = import.meta.env.VITE_IMAGES_BACKEND_URL;
  const signatures = [
    { label: "Quality Control and Food Safety", img: signatureC },
    { label: "Shipping Supervisor Signature", img: signatureE },
  ];

  return (
    <div className="p-4 text-[11px] w-full mt-6">
      <p className="font-bold text-center mb-4">FINAL SIGNATURES</p>

      <div className="grid grid-cols-2 gap-6">
        {signatures.map((sig, index) => (
          <div key={index} className="text-center">
            <div className="w-full h-24 flex items-center justify-center  border-gray-400 bg-gray-50">
              {sig.img ? (
                <img
                  src={`${baseUrl}/${sig.img}`}
                  alt={sig.label}
                  className="max-h-24 object-contain"
                />
              ) : (
                <span className="text-gray-500 text-xs">No signature</span>
              )}
            </div>

            <p className="font-bold mt-2">{sig.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
