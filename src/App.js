import { useReducer } from "react";
import DigitButton from "./Digitbutton.js";
import "./styles.css";
import OperationButton from "./Operationbutton.js";

export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  OPERATION: "operation",
  DEL_DIGIT: "delete_digit",
  CLEAR: "clear",
  EVALUATE: "evaluate"
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

    case ACTIONS.DEL_DIGIT:
      if (state.prevOperand == undefined) state.prevOperand = "";
      if (state.prevOperand != "") {
        return {
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, (state.currentOperand.length - 1))
      }

    case ACTIONS.OPERATION:
      if (state.currentOperand == (undefined || ""))
        return state;
      if (state.prevOperand == undefined) state.prevOperand = "";
      if (state.prevOperand != "") {
        return {
          ...state,
          currentOperand: "",
          prevOperand: state.currentOperand,
          operation: payload.digit
        }
      }
      return {
        ...state,
        prevOperand: state.currentOperand,
        operation: payload.digit,
        currentOperand: "",
      }

    case ACTIONS.EVALUATE:

      let prev = parseFloat(state.prevOperand);
      let current = parseFloat(state.currentOperand);
      let computation = ""

      switch (state.operation) {
        case "+":
          computation = prev + current;
          break;
        case "-":
          computation = prev - current;
          break;
        case "÷":
          computation = prev / current;
          break;
        case "*":
          computation = prev * current;
          break;
      }

      return {
        ...state,
        currentOperand: computation
      }
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
      <button onClick={() => dispatch({ type: ACTIONS.DEL_DIGIT })}>DEL</button>
      <OperationButton dispatch={dispatch} digit="÷" />
      <DigitButton dispatch={dispatch} digit="1" />
      <DigitButton dispatch={dispatch} digit="2" />
      <DigitButton dispatch={dispatch} digit="3" />
      <OperationButton dispatch={dispatch} digit="*" />
      <DigitButton dispatch={dispatch} digit="4" />
      <DigitButton dispatch={dispatch} digit="5" />
      <DigitButton dispatch={dispatch} digit="6" />
      <OperationButton dispatch={dispatch} digit="+" />
      <DigitButton dispatch={dispatch} digit="7" />
      <DigitButton dispatch={dispatch} digit="8" />
      <DigitButton dispatch={dispatch} digit="9" />
      <OperationButton dispatch={dispatch} digit="-" />
      <DigitButton dispatch={dispatch} digit="." />
      <DigitButton dispatch={dispatch} digit="0" />

      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div >
  );
}

export default App; 