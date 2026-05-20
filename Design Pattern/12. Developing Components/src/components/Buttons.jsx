import styled from "styled-components";
import { typescale } from "../style";

export const Button = styled.button`
  font-size: ${typescale.paragraph};
  border-radius: 3px;
  padding: 9px 13px;
  cursor: pointer;
  transition: background-color 0.3s linear, color 0.3s linear;

  &:hover {
    background-color: ${(props) => props.theme.primaryHoverColor};
    color: ${(props) => props.theme.textColorPrimary};
  }

  &:focus {
    outline: 4px solid ${(props) => props.theme.primaryHoverColor};
    outline-offset: 3px;
  }

  &:active {
    background-color: ${(props) => props.theme.primaryActiveColor};
    border-color: ${(props) => props.theme.primaryActiveColor};
    color: ${(props) => props.theme.textColorPrimary};
  }

  &:disabled {
    cursor: not-allowed;
    background: none;
    color: ${(props) => props.theme.textColorDisabled};
    border: none;
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.textColorPrimary};
  border: 3px solid transparent;

  &:disabled {
    background-color: ${(props) => props.theme.primaryDisabledColor};
    color: ${(props) => props.theme.textColorPrimary};
    border-color: ${(props) => props.theme.primaryDisabledColor};
  }

  &.large {
    font-size: ${typescale.header4};
    padding: 16px 24px;
  }

  &.small {
    font-size: ${typescale.text};
    padding: 8px;
  }

  &.warning {
    background-color: ${(props) => props.theme.status.warningColor};
    color: ${(props) => props.theme.status.textColorContrast};

    &:hover,
    &:focus {
      background-color: ${(props) => props.theme.status.warningHoverColor};
    }

    &:active {
      background-color: ${(props) => props.theme.status.warningActiveColor};
    }
  }
`;

export const SecondaryButton = styled(Button)`
  background: none;
  border: 3px solid ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.primaryColor};
  margin-left: 5px;

  &:disabled {
    border: 3px solid ${(props) => props.theme.primaryDisabledColor};
  }

  &.large {
    font-size: ${typescale.header4};
    padding: 16px 24px;
  }

  &.small {
    font-size: ${typescale.text};
    padding: 8px;
  }

  &.warning {
    color: ${(props) => props.theme.status.textColorContrast};
    border: 3px solid ${(props) => props.theme.status.warningColor};

    &:hover,
    &:focus {
      background-color: ${(props) => props.theme.status.warningHoverColor};
      border: 3px solid ${(props) => props.theme.status.warningHoverColor};
    }

    &:active {
      background-color: ${(props) => props.theme.status.warningActiveColor};
    }
  }
`;
