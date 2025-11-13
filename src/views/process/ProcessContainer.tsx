// views/process/ProcessContainer.tsx
import { ProcessProvider, useProcess } from "./ProcessContext";
import FormStepOne from "./ui/FormStepOne";
import FormStepTwo from "./ui/FormStepTwo";
import ReviewStep from "./ui/ReviewStep";

function ProcessFlow() {
  const { state } = useProcess();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      {state === "STEP_ONE" && <FormStepOne />}
      {state === "STEP_TWO" && <FormStepTwo />}
      {state === "REVIEW" && <ReviewStep />}
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
