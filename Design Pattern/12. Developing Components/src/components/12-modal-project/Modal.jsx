import { styled } from "styled-components";

import { Cover } from "../10-cover-pattern/HeroPage";
import { Center } from "../8-center-pattern/Profile";
import { Inline } from "../6-inline-pattern/Menu2";
import { Layers } from "../1-layers-pattern/SubscribeForm";
import { Pad } from "../7-pad-pattern/PlanList";

import registerImg from "../../images/register.svg";
import closeImg from "../../images/close.svg";

const ContentArea = styled(Layers).attrs(() => ({
  as: Pad,
  padding: "l",
  gutter: "s",
}))`
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
`;

const StyledImage = styled(Center).attrs(() => ({
  as: "img",
}))`
  max-width: ${(props) => props.maxWidth};
`;

const Text = styled(Center).attrs(() => ({
  as: "span",
}))`
  font-size: ${(props) => props.fontSize};
`;

const Button = styled(Center).attrs(() => ({
  as: "button",
}))`
  border-radius: 5px;
  cursor: pointer;
  background-color: #03045e;
  color: white;
  border: 3px solid transparent;
  font-size: 18px;
`;

const Modal = () => {
  return (
    <>
      <Cover as={Center} maxWidth="50rem">
        <ContentArea>
          <Inline justify="end">
            <img src={closeImg} />
          </Inline>
          <StyledImage maxWidth="30rem" src={registerImg} alt="" />
          <Layers gutter="l">
            <Layers gutter="s">
              <Text fontSize="2rem">Register</Text>
              <Text fontSize="1.2rem">Register and Unlock All The Features</Text>
            </Layers>
            <Button>
              <Pad padding={["m", "xl"]}>Register</Pad>
            </Button>
          </Layers>
        </ContentArea>
      </Cover>
    </>
  );
};

export default Modal;
