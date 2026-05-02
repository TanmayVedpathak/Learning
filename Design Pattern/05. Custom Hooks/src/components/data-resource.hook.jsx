import { useEffect, useState } from "react";

export const useDataResource = (getData) => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getData();

        setResource(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, [getData]);

  return resource;
};
