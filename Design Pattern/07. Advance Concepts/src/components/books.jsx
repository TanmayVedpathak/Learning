import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import delay from "../util/delay";
import { MainHeading } from "./styled-elements";

const Books = () => {
  const { bookCount, authors } = useLoaderData();

  return (
    <div>
      <MainHeading>Books</MainHeading>

      <p>
        <strong>Available Books: {bookCount}</strong>
      </p>

      <p>
        <strong>Authors: {authors}</strong>
      </p>
    </div>
  );
};

async function loader() {
  return {
    bookCount: delay(10, 1000),
    authors: delay("Codelicks", 2000),
  };
}

export const booksRoute = { element: <Books />, loader };
