import { useId, useState } from "react";

const Form = () => {
  const [email, setEmail] = useState("");
  const id = useId();
  return (
    <div>
      <label htmlFor={`${id}-email`}>Email</label>
      <input id={`${id}-email`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor={`${id}-name`}>Name</label>
      <input id={`${id}-name`} />
    </div>
  );
};

const UseIdComponent = () => {
  return (
    <>
      <Form />
      <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
      <Form />
    </>
  );
};

export default UseIdComponent;
