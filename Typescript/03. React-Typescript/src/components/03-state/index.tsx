import { useState } from "react";

type Link = {
  id: number;
  url: string;
  text: string;
};

const navLinks: Link[] = [
  {
    id: 1,
    url: "https://reactjs.org",
    text: "react docs",
  },
  {
    id: 2,
    url: "https://reactrouter.com",
    text: "react router docs",
  },
  {
    id: 3,
    url: "https://reacttraining.com",
    text: "react training",
  },
];

function StateComponent() {
  const [text, setText] = useState("shakeAndBake");
  const [number, setNumber] = useState(1);
  const [list, setList] = useState<string[]>([]);
  const [links, setLinks] = useState<Link[]>(navLinks);

  return (
    <div>
      {text} {number} {list.join(", ")} {links.map((link) => link.text).join(", ")}
      <button
        className="btn btn-center"
        onClick={() => {
          setText("hello");
          setNumber(1);
          // setList([1, 3]);
          setList(["hello", "world"]);
          // setLinks([...links, { id: 4, url: "hello", someValue: "hello" }]);
          setLinks([...links, { id: 4, url: "hello", text: "hello" }]);
        }}
      >
        click me
      </button>
    </div>
  );
}

export default StateComponent;
