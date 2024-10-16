import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { IntlProvider } from "./intl";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "./theme";
import { Toaster } from "@/components/ui/toaster";

export const Provider = () => (
  <ReduxProvider store={store}>
    <IntlProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster/> 
        <RouterProvider router={router} />
      </ThemeProvider>
    </IntlProvider>
  </ReduxProvider>
);
