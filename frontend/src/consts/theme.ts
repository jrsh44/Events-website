export const theme = {
  colors: {
    gray05: "#f5f5f5",
    gray10: "#ebebeb",
    gray30: "#d1d1d1",
    gray50: "#b0b0b0",
    gray70: "#7f7f7f",

    textBlack: "#2e2e2e",
    textWhite: "#e2e2e2",

    error: "#ff4d4f",
    errorDark: "#d9363e",
    errorLight: "#ff787b",

    success: "#52c41a",
    successDark: "#3f8600",
    successLight: "#95de64",

    warning: "#faad14",
    warningDark: "#d48806",
    warningLight: "#ffd666",

    background: "#121212",
    surface: "#1e1e1e",
  },

  breakpoints: {
    xl: 1399,
    lg: 1199,
    md: 991,
    sm: 767,
    xs: 575,
  },

  transition: {
    duration: "0.3s",
    timingFunction: "ease-in-out",
    property: "border-color, opacity, box-shadow, transform, padding, stroke, fill",
  },
};

export type TTheme = typeof theme;
