import { useEffect, useState } from "react";

export const useResource = (resourceURL) => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(resourceURL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setResource(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, [resourceURL]);

  return resource;
};
