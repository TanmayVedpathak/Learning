import Card from "./components/Card";
import Composition from "./components/Composition";
import PartialComponent from "./components/PartialComponent";
import RecursiveComponent from "./components/RecursiveComponent";

const myNestedObject = {
  key1: "value1",
  key2: {
    innerKey1: "innerValue1",
    innerKey2: {
      innerInnerKey1: "innerInnerValue1",
      innerInnerKey2: "innerInnerValue2",
    },
  },
  key3: "value3",
};

function App() {
  return (
    <>
      <RecursiveComponent data={myNestedObject} />
      <Composition />
      <PartialComponent />

      <Card test="Value">
        <Card.Header>
          <h1 style={{ margin: "0" }}>Header</h1>
        </Card.Header>
        <Card.Body>
          He hid under the covers hoping that nobody would notice him there. It really didn't make much sense since it would be obvious to anyone who walked into the room there was someone hiding there, but he still held out hope. He heard footsteps coming down the hall and stop in front in front of
          the bedroom door. He heard the squeak of the door hinges and someone opened the bedroom door. He held his breath waiting for whoever was about to discover him, but they never did.
        </Card.Body>
        <Card.Footer>
          <button>Ok</button>
          <button>Cancel</button>
        </Card.Footer>
      </Card>
    </>
  );
}

export default App;
