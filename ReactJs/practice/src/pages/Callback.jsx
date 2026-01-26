import React, { useCallback, useState } from "react";

const Title = React.memo(() => {
  console.log("render title");
  return (
    <>
      <h2>useCallback hook</h2>
    </>
  );
});

const Count = React.memo(({ text, count }) => {
  console.log(`render count ${text}`);
  return (
    <>
      <p>
        {text} - {count}
      </p>
    </>
  );
});

const Button = React.memo(({ handleClick, children }) => {
  console.log(`render button ${children}`);
  return (
    <>
      <button onClick={handleClick}>{children}</button>
    </>
  );
});

const Callback = () => {
  const [age, setAge] = useState(25);
  const [salary, setSalary] = useState(50000);

  const incrementAge = useCallback(() => {
    setAge((prev) => prev + 1);
  }, []);

  const incrementSalary = useCallback(() => {
    setSalary((prev) => prev + 10000);
  }, []);

  return (
    <div className="container">
      <Title />
      <Count text={"Age"} count={age} />
      <Button handleClick={incrementAge}>Increase Age</Button>
      <Count text={"Salary"} count={salary} />
      <Button handleClick={incrementSalary}>Increase Salary</Button>
    </div>
  );
};

export default Callback;
