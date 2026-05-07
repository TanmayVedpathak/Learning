import { useDispatchContext } from "./CardContext";

const Buttons = () => {
  const dispatch = useDispatchContext();
  return (
    <div className="buttons">
      <button className="button" onClick={() => dispatch({ type: "DECREMENT" })}>
        ➖
      </button>
      <button className="button" onClick={() => dispatch({ type: "INCREMENT" })}>
        ➕
      </button>
    </div>
  );
};

export default Buttons;
