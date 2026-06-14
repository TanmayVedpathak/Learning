import { useState } from "react";

import Book from "./books/book";
import { Books } from "./books/books";

import type { BookType } from "../types";

const BooksComponent = () => {
  const [books, setBooks] = useState<BookType[]>([]);

  return (
    <>
      <Books setBooks={setBooks}>
        {books.map((book) => {
          return <Book title={book.title} author={book.author} />;
        })}
      </Books>
    </>
  );
};

export default BooksComponent;
