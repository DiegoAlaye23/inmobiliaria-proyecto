import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VerificarCuenta = () => {
  const { token } = useParams();
  const [estado, setEstado] = useState("verificando");

  useEffect(() => {
    const verificarCuenta = async () => {
      try {
        const response = await axios.get(
          `https://inmobiliaria-proyecto.onrender.com/api/usuarios/verificar/${token}`
        );
        if (response.status === 200) {
          setEstado("verificada");
        } else {
          setEstado("fallo");
        }
      } catch (error) {
        console.error(error);
        setEstado("fallo");
      }
    };

    verificarCuenta();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {estado === "verificando" && (
        <p className="text-lg text-gray-700">Verificando tu cuenta...</p>
      )}
      {estado === "verificada" && (
        <div className="bg-green-100 text-green-800 p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold">¡Cuenta verificada!</h2>
          <p>Ya podés iniciar sesión.</p>
        </div>
      )}
      {estado === "fallo" && (
        <div className="bg-red-100 text-red-800 p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold">Error al verificar</h2>
          <p>El enlace puede estar vencido o ya fue usado.</p>
        </div>
      )}
    </div>
  );
};

export default VerificarCuenta;
