import React from "react";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GOOGLE_CLIENT_ID } from "./Constans/Api";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import SnackBar from "./Components/SnackBar";
import AllRoutes from "./Routes";
import ReactDOM from "react-dom/client";

const queryClient = new QueryClient();
const theme = createTheme({
  palette: {
    secondary: {
      main: "#212F3C",
    },
    primary: {
      main: "#212F3C",
      light: "#dee6eb",
      dark: "#9fb6be",
    },
    light: {
      main: "#9fb6be",
      light: "#dee6eb",
      dark: "#9fb6be",
    },
    feature: {
      main: "#00231f",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <Provider store={store}>
              <SnackBar />
              <AllRoutes />
            </Provider>
          </GoogleOAuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
