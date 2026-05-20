import { Pad } from "../7-pad-pattern/PlanList";

import { Center } from "../8-center-pattern/Profile";

export const Description = (props) => (
  <Pad padding="l">
    <Center centerText>{props.children}</Center>
  </Pad>
);
