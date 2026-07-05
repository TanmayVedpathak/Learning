import { useState } from "react";
import { NavLink } from "react-router-dom";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { convertSecToMilleSec } from "../utils";
import { deletePost, fetchPosts, updatePost } from "../api/api";
import type { Post } from "../types";

const FetchRQ = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const queryClient = useQueryClient();

  const { data, isError, isFetching, error } = useQuery({
    queryKey: ["posts", pageNumber], // useState
    queryFn: () => fetchPosts(pageNumber), // useEffect
    // gcTime: convertSecToMilleSec(1),
    staleTime: convertSecToMilleSec(5),
    // refetchInterval: convertSecToMilleSec(5),
    // refetchIntervalInBackground: true,
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number | string) => deletePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["posts", pageNumber], (currentEle: Post[]) => {
        return currentEle?.filter((post) => post.id != id);
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (id: number | string) => updatePost(id),
    onSuccess: (apiData, postId) => {
      console.log(apiData);
      queryClient.setQueryData(["posts", pageNumber], (postsData: Post[]) => {
        return postsData?.map((curPost: Post) => {
          return curPost.id === postId ? { ...curPost, title: apiData.title } : curPost;
        });
      });
    },
  });

  if (isFetching) return <p>Loading...</p>;

  if (isError) return <p>Something went wrong! {error.message}</p>;

  return (
    <div className="section-accordion">
      <ul>
        {data?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>
              <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
              <button onClick={() => updateMutation.mutate(id)}>Update</button>
            </li>
          );
        })}
      </ul>

      <div className="pagination-section container">
        <button disabled={pageNumber === 0} onClick={() => setPageNumber((prev) => prev - 3)}>
          Prev
        </button>
        <p>{pageNumber / 3 + 1}</p>
        <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
      </div>
    </div>
  );
};

export default FetchRQ;
