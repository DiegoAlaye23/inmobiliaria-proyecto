// src/main.jsx
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme";

function Root() {

  const storedMode = localStorage.getItem("modo");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialMode = storedMode || (prefersDark ? "dark" : "light");

  const [modo, setModo] = useState(initialMode);

  // Guarda el modo cada vez que cambia
  const handleChangeMode = (nuevoModo) => {
    setModo(nuevoModo);
    localStorage.setItem("modo", nuevoModo);
  };

  return (
    <ThemeProvider theme={getTheme(modo)}>
      <CssBaseline />
      <App setModo={handleChangeMode} modo={modo} />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
