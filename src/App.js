import { useReducer } from "react";
import DigitButton from "./Digitbutton";
import "./styles.css";

export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  OPERATION: "operation",
  DEL_DIGIT: "delete_digit",
  CLEAR: "clear"
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit == 0 && state.currentOperand == 0) return state;
      if (state.currentOperand == undefined) {
        state.currentOperand = "";
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CLEAR:
      return {}
  }

}

function App() {

  const [{ currentOperand, prevOperand, operation }, dispatch] = useReducer(reducer, {})
  return (
    <div className="calc-grid">
      <div className="output">
        <div className="prev-operand">{prevOperand}{operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button>DEL</button>
      <DigitButton dispatch={dispatch} digit={"÷"} />
      <DigitButton dispatch={dispatch} digit={1} />
      <DigitButton dispatch={dispatch} digit={2} />
      <DigitButton dispatch={dispatch} digit={3} />
      <DigitButton dispatch={dispatch} digit={"*"} />
      <DigitButton dispatch={dispatch} digit={4} />
      <DigitButton dispatch={dispatch} digit={5} />
      <DigitButton dispatch={dispatch} digit={6} />
      <DigitButton dispatch={dispatch} digit={"+"} />
      <DigitButton dispatch={dispatch} digit={7} />
      <DigitButton dispatch={dispatch} digit={8} />
      <DigitButton dispatch={dispatch} digit={9} />
      <DigitButton dispatch={dispatch} digit={"-"} />
      <DigitButton dispatch={dispatch} digit={"."} />
      <DigitButton dispatch={dispatch} digit={0} />

      <button className="span-two">=</button>
    </div >
  );
}

export default App; 