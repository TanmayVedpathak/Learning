import { useReducer } from "react";
import { counterReducer, initialState } from "./reducer";

function ReducerComponent() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <h3>Count: {state.count}</h3>
      <h3>Status: {state.status}</h3>

      <div className="btn-container">
        <button onClick={() => dispatch({ type: "increment" })} className="btn">
          Increment
        </button>
        <button onClick={() => dispatch({ type: "decrement" })} className="btn">
          Decrement
        </button>
        <button onClick={() => dispatch({ type: "reset" })} className="btn">
          Reset
        </button>
      </div>
      <div className="btn-container">
        <button onClick={() => dispatch({ type: "setStatus", payload: "active" })} className="btn">
          Set Status to Active
        </button>
        <button className="btn" onClick={() => dispatch({ type: "setStatus", payload: "inactive" })}>
          Set Status to Inactive
        </button>
      </div>
    </div>
  );
}

export default ReducerComponent;
