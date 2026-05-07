import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import delay from "../util/delay";
import { MainContainer, MainHeading } from "./styled-elements";

const Main = () => {
  const { data } = useLoaderData();
  const [resolved, setResolved] = useState(null);

  useEffect(() => {
    data.then(setResolved);
  }, [data]);

  return <MainHeading>Main - {resolved ?? "Loading..."}</MainHeading>;
};

async function loader() {
  return {
    data: delay("Fetched Data", 1000),
  };
}

export const mainRoute = { element: <Main />, loader };
