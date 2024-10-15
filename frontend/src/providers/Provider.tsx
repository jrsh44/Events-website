import { createGlobalStyle, css, ThemeProvider } from "styled-components";
import { theme } from "../consts/theme";
import normalize from "styled-normalize";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { IntlProvider } from "./intl";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";

export const Provider = () => (
  <ReduxProvider store={store}>
    <IntlProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </IntlProvider>
  </ReduxProvider>
);

const GlobalStyle = createGlobalStyle`
    ${normalize}

    *, *::before, *::after {
    box-sizing: border-box;

    ${({ theme }) => css`
      transition-duration: ${theme.transition.duration};
      transition-timing-function: ${theme.transition.timingFunction};
      transition-property: ${theme.transition.property};
    `}
    }
    
    body {
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.textWhite};
        font-family: "Open sans", sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
        overflow: hidden;

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-overflow-scrolling: touch;
        
    }

    *::-webkit-scrollbar {
        width: 8px; 

        &-track {
          background: ${({ theme }) => theme.colors.gray10};
        }

        &-thumb {
          background: ${({ theme }) => theme.colors.gray50};
          border-radius: 4px;

          &:hover {
            background: ${({ theme }) => theme.colors.gray70};
          }
        }
    }
`;
