// views/process/ProcessContainer.tsx
import { ProcessProvider, useProcess } from "./ProcessContext";
import CreateCtpat from "@/views/CreateCtpats"
import UploadImages from "@/views/uploadImagesCtp/CreateUploadImages"

function ProcessFlow() {
  const { state } = useProcess();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      {state === "STEP_ONE" && <CreateCtpat />}
      {state === "STEP_TWO" && <UploadImages />}
    </div>
  );
}

export default function ProcessContainer() {
  return (
    <ProcessProvider>
      <ProcessFlow />
    </ProcessProvider>
  );
}
