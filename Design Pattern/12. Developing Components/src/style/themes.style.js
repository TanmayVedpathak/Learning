import { blue, yellow, red, green, balanced } from "./colors.style";

export const primaryTheme = {
  primaryColor: blue[100],
  primaryHoverColor: blue[400],
  primaryActiveColor: blue[100],
  primaryDisabledColor: balanced[400],
  textColorPrimary: balanced[100],
  textColor: balanced[600],
  textColorContrast: balanced[100],
  textColorDisabled: balanced[400],
  formBackground: balanced[100],
  formTextBackground: balanced[600],
  status: {
    warningColor: yellow[100],
    warningHoverColor: yellow[200],
    warningActiveColor: yellow[300],
    errorColor: red[100],
    errorColorHover: red[200],
    errorColorActive: red[300],
    successColor: green[100],
    successHoverColor: green[200],
    successActiveColor: green[300],
  },
};

export const darkTheme = {
  primaryColor: balanced[100],
  primaryHoverColor: balanced[200],
  primaryActiveColor: balanced[300],
  textColorOnPrimary: blue[100],
  textColor: blue[100],
  textColorInverted: balanced[100],
  disabled: balanced[400],
  textOnDisabled: balanced[300],
  formBackground: blue[100],
  formTextBackground: balanced[100],
  status: {
    warningColor: yellow[100],
    warningColorHover: yellow[200],
    warningColorActive: yellow[300],
    errorColor: red[100],
    errorColorHover: red[200],
    errorColorActive: red[300],
    successColor: green[100],
    successColorHover: green[200],
    successColorActive: green[300],
  },
};
