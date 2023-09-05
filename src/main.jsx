import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ValueProvider } from "./context/value.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Popper } from "@mui/material";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ValueProvider>
          <ToastContainer />
          <App />
        </ValueProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
