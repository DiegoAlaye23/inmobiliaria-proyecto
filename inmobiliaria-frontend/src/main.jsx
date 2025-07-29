// Importa React y el hook useState para manejar estado dentro de un componente funcional
import React, { useState } from "react";
// Importa el método para renderizar React en el DOM
import ReactDOM from "react-dom/client";
// Importa el componente principal de la aplicación
import App from "./App";
// Importa componentes de MUI para aplicar temas y estilos globales
import { ThemeProvider, CssBaseline } from "@mui/material";
// Importa una función personalizada que devuelve un tema según el modo (claro u oscuro)
import { getTheme } from "./theme";

// Componente raíz de la aplicación
function Root() {

  // Intenta recuperar el modo almacenado anteriormente en localStorage
  const storedMode = localStorage.getItem("modo");
  // Detecta si el usuario tiene preferencia por el modo oscuro desde el sistema operativo
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  // Establece el modo inicial: el que se guardó antes, o el del sistema, o por defecto 'light'
  const initialMode = storedMode || (prefersDark ? "dark" : "light");

  // Hook para manejar el estado del modo de tema (oscuro o claro)
  const [modo, setModo] = useState(initialMode);

  // Función que actualiza el modo y lo guarda en localStorage cuando cambia
  const handleChangeMode = (nuevoModo) => {
    setModo(nuevoModo);
    localStorage.setItem("modo", nuevoModo); // Persistencia entre sesiones
  };

  return (
    // ThemeProvider aplica el tema global usando MUI (Material UI)
    <ThemeProvider theme={getTheme(modo)}>
    {/*CssBaseline aplica estilos base para normalizar visualmente la app */}
      <CssBaseline />
      {/* Pasa el estado del modo y la función para cambiarlo al componente App */}
      <App setModo={handleChangeMode} modo={modo} />
    </ThemeProvider>
  );
}
// Renderiza el componente Root dentro del div con id="root" del HTML
ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
