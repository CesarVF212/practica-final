"use client";

import "@/app/globals.css";
import "@/app/components/Styles_Grids.css";

import { useRouter } from "next/navigation";

// Función para verificar el código
function checkValidation(code) {
  const token = localStorage.getItem("jwt_register");
  const url = "https://bildy-rpmaya.koyeb.app/api/user/validation";

  const data = { code };

  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Código de verificación incorrecto o expirado.");
      }
      return response.json();
    })
    .then((result) => {
      localStorage.setItem("jwt", result.token);
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}

export default function Verification() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = document.getElementById("verification-box").value;

    checkValidation(code).then((success) => {
      if (success) {
        router.push("../../main/clients");
      } else {
        alert("Código de verificación inválido. Inténtelo nuevamente.");
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f4f4] px-4">
      {/* Título principal */}
      <h1 className="font-bold mb-8 mt-8 text-center text-4xl max-md:text-3xl max-sm:text-2xl">
        CAESAR'S VERIFICATION
      </h1>

      {/* Layout principal */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8">
        {/* Imagen del Logo */}
        <div className="w-full flex justify-center md:w-1/3">
          <div className="w-20 h-20 md:w-28 md:h-28">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Formulario de verificación */}
        <div className="form-box w-full max-w-[400px] p-4 md:p-6 shadow-lg rounded-lg">
          <h3 className="text-center mb-4 text-lg md:text-xl font-semibold">
            Se le ha enviado un código de verificación
          </h3>
          <p className="text-center mb-6 text-gray-600 text-sm md:text-base">
            Introduzca el código de 6 dígitos para continuar:
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Input del código */}
            <div>
              <label
                htmlFor="verification-box"
                className="block mb-2 text-gray-700 text-sm md:text-base"
              >
                Código de verificación:
              </label>
              <input
                type="number"
                min="100000"
                max="999999"
                id="verification-box"
                name="verification"
                required
                className="w-full p-2 border rounded text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Botón de enviar */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition text-sm md:text-base"
            >
              Verificar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
