import { fetchTours } from "./types";
import { useQuery } from "@tanstack/react-query";

function FetchDataComponent() {
  const {
    isPending,
    isError,
    error,
    data: tours,
  } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchTours,
  });

  if (isPending) return <h3>Loading...</h3>;

  if (isError) return <h3>Error : {error.message} </h3>;

  return (
    <div>
      <h3 className="mb-1">Tours </h3>
      {tours.map((tour) => {
        return (
          <p className="mb-1" key={tour.id}>
            {tour.name}
          </p>
        );
      })}
    </div>
  );
}

export default FetchDataComponent;
