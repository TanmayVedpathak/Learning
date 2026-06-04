import type React from "react";
import { useState } from "react";

function ReturnComponent1(): React.JSX.Element | string | null {
  const [num] = useState(() => Math.round(Math.random() * 10));

  if (num < 4) return null;

  if (num < 8) return "Mid";

  return (
    <div>
      <h3>High</h3>
    </div>
  );
}

function ReturnComponent2(): React.ReactNode {
  const [num] = useState(() => Math.round(Math.random() * 10));

  if (num < 4) return null;

  if (num < 8) return "Mid";

  return (
    <div>
      <h3>High</h3>
    </div>
  );
}

export { ReturnComponent1, ReturnComponent2 };
