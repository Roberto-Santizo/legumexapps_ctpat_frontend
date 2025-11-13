// views/process/ProcessStateMachine.ts

export type ProcessState = "STEP_ONE" | "STEP_TWO" | "REVIEW";

export type ProcessAction =
  | { type: "NEXT" }
  | { type: "BACK" }
  | { type: "RESET" };

export function processStateMachine(
  state: ProcessState,
  action: ProcessAction
): ProcessState {
  switch (state) {
    case "STEP_ONE":
      if (action.type === "NEXT") return "STEP_TWO";
      return state;
    case "STEP_TWO":
      if (action.type === "NEXT") return "REVIEW";
      if (action.type === "BACK") return "STEP_ONE";
      return state;
    case "REVIEW":
      if (action.type === "BACK") return "STEP_TWO";
      if (action.type === "RESET") return "STEP_ONE";
      return state;
    default:
      return state;
  }
}
