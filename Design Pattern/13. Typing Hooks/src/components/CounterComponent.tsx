import { useState } from "react";

const CounterComponent = () => {
  const [items, setItems] = useState<number>(0);
  const [inputItems, setInputItems] = useState<string | number>(0);

  const updateCartItems = (nextItems: number) => {
    setItems(nextItems);
    setInputItems(nextItems);
  };

  return (
    <section className="counter-wrapper flex flex-col items-center w-2/3 gap-8 p-8 bg-white border-4 shadow-lg border-primary-500">
      <h1 className="counter-title">Shopping Cart Items</h1>
      <p className="counter-value text-6xl">{items}</p>
      <div className="counter-buttons flex gap-2">
        <button className="decrement-button" onClick={() => updateCartItems(items - 1)}>
          Decrease
        </button>
        <button className="reset-button" onClick={() => updateCartItems(0)}>
          Reset
        </button>
        <button className="increment-button" onClick={() => updateCartItems(items + 1)}>
          Increase
        </button>
      </div>
      <div className="counter-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateCartItems(Number(inputItems));
          }}
        >
          <input type="number" value={inputItems} onChange={(e) => setInputItems(e.target.valueAsNumber)} className="counter-input" />
          <button type="submit" className="update-button">
            Update Cart
          </button>
        </form>
      </div>
    </section>
  );
};

export default CounterComponent;
