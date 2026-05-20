import { styled } from "styled-components";

import Card from "./Card";
import { spaceSchema } from "../common/spaces";

export const Grid = styled.div`
  display: grid;
  gap: ${(props) => spaceSchema[props.gutter] ?? spaceSchema.l};

  grid-template-columns: repeat(auto-fit, minmax(min(${(props) => props.minItemWidth}, 100%), 1fr));
`;

const Cards = () => {
  return (
    <Grid gutter="x" minItemWidth="24rem">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </Grid>
  );
};

export default Cards;
