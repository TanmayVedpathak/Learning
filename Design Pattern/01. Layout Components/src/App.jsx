import { SplitScreen } from "./components/split-screen";

import { LargeAuthorListItem } from "./components/authors/LargeListItems";
import { SmallAuthorListItem } from "./components/authors/SmallListItems";
import { LargeBookListItem } from "./components/books/LargeListItems";
import { SmallBookListItem } from "./components/books/SmallListItems";
import { NumberedList } from "./components/lists/Numbered";
import { RegularList } from "./components/lists/Regular";
import { authors } from "./data/authors";
import { books } from "./data/books";

import { Modal } from "./components/Modal";

const LeftSideComp = ({ title }) => {
  return <h2 style={{ backgroundColor: "crimson" }}>{title}</h2>;
};

const RightSideComp = ({ title }) => {
  return <h2 style={{ backgroundColor: "burlywood" }}>{title}</h2>;
};

function App() {
  return (
    <>
      <Modal>
        <LargeBookListItem book={books[0]} />
      </Modal>

      <SplitScreen leftWidth={1} rightWidth={3}>
        <LeftSideComp title={"Right"} />
        <RightSideComp title={"Left"} />
      </SplitScreen>

      <RegularList items={authors} sourceName={"author"} ItemComponent={SmallAuthorListItem} />
      <RegularList items={authors} sourceName={"author"} ItemComponent={LargeAuthorListItem} />

      <RegularList items={authors} sourceName={"author"} ItemComponent={SmallAuthorListItem} />
      <NumberedList items={authors} sourceName={"author"} ItemComponent={LargeAuthorListItem} />

      <RegularList items={books} sourceName={"book"} ItemComponent={SmallBookListItem} />

      <NumberedList items={books} sourceName={"book"} ItemComponent={LargeBookListItem} />
    </>
  );
}

export default App;
