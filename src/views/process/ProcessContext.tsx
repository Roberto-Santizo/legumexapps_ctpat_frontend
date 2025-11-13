// views/process/ProcessContext.tsx
import React, { createContext, useContext, useReducer, useState } from "react";
import { processStateMachine, ProcessState, ProcessAction } from "./ProcessStateMachine";

interface ProcessContextType {
  state: ProcessState;
  dispatch: React.Dispatch<ProcessAction>;
  ctpatId: number | null;
  setCtpatId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ProcessContext = createContext<ProcessContextType | undefined>(undefined);

export const ProcessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(processStateMachine, "STEP_ONE");
  const [ctpatId, setCtpatId] = useState<number | null>(null);

  return (
    <ProcessContext.Provider value={{ state, dispatch, ctpatId, setCtpatId }}>
      {children}
    </ProcessContext.Provider>
  );
};

export const useProcess = () => {
  const context = useContext(ProcessContext);
  if (!context) throw new Error("useProcess debe usarse dentro de un ProcessProvider");
  return context;
};
