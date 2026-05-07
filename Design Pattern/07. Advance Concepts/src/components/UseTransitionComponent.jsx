import { useState, useTransition } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  color: #494949;
  background-color: #f1f1f1;
  border: 1px solid #cccccc;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ddd;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ReviewsContainer = styled.div`
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    font-size: 1.2em;
    color: #333;
  }
`;

const WriterContainer = styled.div`
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 20px 0;
`;

const CoverContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 3em;
`;

const Emoji = styled.span`
  font-size: 50px;
`;

const Button = ({ onClick, ...props }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <StyledButton
      onClick={() => {
        startTransition(() => {
          onClick();
        });
      }}
      {...props}
    />
  );
};

const Cover = () => {
  return (
    <CoverContainer>
      <Emoji role="img" aria-label="Book Cover Emoji">
        📚
      </Emoji>
    </CoverContainer>
  );
};

const Reviews = () => {
  return (
    <ReviewsContainer>
      <ul>
        {Array(300)
          .fill("")
          .map((_, i) => (
            <Review key={i} index={i} />
          ))}
      </ul>
    </ReviewsContainer>
  );
};

const Review = ({ index }) => {
  const init = performance.now();
  while (init > performance.now() - 3) {
    // Fake slow down.
  }
  return <li>Review #{index}</li>;
};

const Writer = () => {
  return <WriterContainer>Codelicks Academy</WriterContainer>;
};

const UseTransitionComponent = () => {
  const [section, setSection] = useState("Cover");

  const sectionHandler = (sec) => {
    setSection(sec);
  };
  return (
    <>
      <Button onClick={() => sectionHandler("Cover")}>Cover</Button>
      <Button onClick={() => sectionHandler("Reviews")}>Book Reviews</Button>
      <Button onClick={() => sectionHandler("Writer")}>Book's Writer</Button>

      {section === "Cover" ? <Cover /> : section === "Reviews" ? <Reviews /> : <Writer />}
    </>
  );
};

export default UseTransitionComponent;
