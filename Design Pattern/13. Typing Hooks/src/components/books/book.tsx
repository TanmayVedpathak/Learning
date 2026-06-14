import type { BookProps } from "../../types";
import "./book.css";

const Book = ({ title, author }: BookProps) => {
  return (
    <article className="book">
      {title && <p className="book-title">{title}</p>}
      {author && <p className="book-author">{author}</p>}
    </article>
  );
};

export default Book;
