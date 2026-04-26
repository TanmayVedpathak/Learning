import React, { useEffect, useState } from "react";

const ResourceLoader = ({ resourceURL, resourceName, children }) => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(resourceURL);
      const data = await response.json();

      setResource(data);
    })();
  }, [resourceURL]);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { [resourceName]: resource });
        }

        return child;
      })}
    </>
  );
};

export default ResourceLoader;
