import { useDeferredValue, useState } from "react";

const HeavyComponent = ({ keyword }) => {
  const init = performance.now();
  while (init > performance.now() - 100) {
    //Slowing down the component on purpose.
  }
  return (
    <>
      <h2>I am a slow component</h2>
      {keyword}
    </>
  );
};
const UseDeferredValueComponent = () => {
  const [keyword, setKeyword] = useState("");

  const deferredKeyword = useDeferredValue(keyword);
  return (
    <>
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <HeavyComponent keyword={deferredKeyword} />
    </>
  );
};

export default UseDeferredValueComponent;
