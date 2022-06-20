import { ACTIONS } from "./App.js";

export default function OperationButton({ dispatch, digit }) {
    return (
        <button onClick={() => dispatch({ type: ACTIONS.OPERATION, payload: { digit: digit } })}>{digit}</button>
    )
}