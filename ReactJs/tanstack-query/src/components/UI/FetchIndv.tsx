import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchInvPost } from "../../api/api";
import { convertSecToMilleSec } from "../../utils";

export const FetchIndv = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isError, isPending, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchInvPost(id!),
    enabled: !!id,
    staleTime: convertSecToMilleSec(5),
  });

  if (isPending) return <p>Loading...</p>;

  if (isError) return <p> Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div className="section-accordion">
      <h1>Post ID Number - {id}</h1>
      <div>
        <p>ID: {data.id}</p>
        <p>Title: {data.title}</p>
        <p>Body: {data.body}</p>
      </div>

      <NavLink to="/rq">Go Back</NavLink>
    </div>
  );
};
