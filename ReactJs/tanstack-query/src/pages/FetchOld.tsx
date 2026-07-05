import axios from "axios";
import { useEffect, useState } from "react";

import type { Post } from "../types";

const FetchOld = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<true | false>(true);
  const [isError, setIsError] = useState<true | false>(false);

  useEffect(() => {
    const getPostsData = async () => {
      try {
        const res = await axios.get("https://jsonplaceholder.typicode.com/posts?_start=0&_limit=3");
        if (res.status === 200) {
          setPosts(res.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    getPostsData();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="section-accordion">
      <ul>
        {posts?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <p>{id}</p>
              <p>{title}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FetchOld;
