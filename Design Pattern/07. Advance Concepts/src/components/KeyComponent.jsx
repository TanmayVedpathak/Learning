import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
      {count}
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </>
  );
};

const KeyComponent = () => {
  const [changeShirts, setChangeShirts] = useState(false);
  return (
    <div>
      {changeShirts ? (
        <>
          <span>Shirts counts: </span> <Counter key="shirts" />
        </>
      ) : (
        <>
          <span>Shoes counts: </span> <Counter key="shoes" />
        </>
      )}
      <br />
      <button onClick={() => setChangeShirts((s) => !s)}>Switch</button>
    </div>
  );
};

export default KeyComponent;
