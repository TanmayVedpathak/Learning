import { useEffect, useRef } from "react";

const RefComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const mutableRefValue = useRef(20);

  useEffect(() => {
    mutableRefValue.current = 20;
    console.log("Mutable Ref Value:", mutableRefValue.current);
  }, []);

  return (
    <>
      <input ref={inputRef} />
    </>
  );
};

export default RefComponent;
