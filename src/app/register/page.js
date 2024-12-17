"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import "@/app/globals.css";
import "@/app/components/Styles_Grids.css";

import LogoBig from "../components/LogoBig";

// Función para manejar la solicitud POST
function RegisterPostRequest(email, password) {
  const url = "https://bildy-rpmaya.koyeb.app/api/user/register";

  const data = { email, password };

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ha ocurrido un error al registrarse");
      }
      return response.json();
    })
    .then((result) => {
      localStorage.setItem("jwt_register", result.token);
      return true; // Registro exitoso
    })
    .catch((error) => {
      console.error(error);
      return false; // Error en el registro
    });
}

export default function Register() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Título */}
      <h1 className="font-bold mb-8 mt-8 text-center max-md:text-4xl">
        CAESAR'S ADMINISTRATION
      </h1>

      {/* Layout principal */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-8">
        {/* Logo */}
        <div className="w-full flex justify-center md:w-1/3">
          <LogoBig />
        </div>

        {/* Formulario */}
        <div className="form-box w-full max-w-[400px] md:w-1/2 p-4">
          <h2 className="text-center mb-4 text-xl font-semibold">REGISTER</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const email = document.getElementById("email-box").value;
              const password = document.getElementById("password-box").value;

              RegisterPostRequest(email, password).then((success) => {
                if (success) {
                  router.push("./verification");
                } else {
                  alert("Ha ocurrido un error al registrarse");
                }
              });
            }}
          >
            <div className="flex flex-col gap-4">
              {/* Input de nombre */}
              <div>
                <label htmlFor="name-box" className="block mb-1">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="name-box"
                  name="name"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Input de apellidos */}
              <div>
                <label htmlFor="lastname-box" className="block mb-1">
                  Apellidos:
                </label>
                <input
                  type="text"
                  id="lastname-box"
                  name="lastname"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Input de correo */}
              <div>
                <label htmlFor="email-box" className="block mb-1">
                  Correo:
                </label>
                <input
                  type="email"
                  id="email-box"
                  name="email"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Input de contraseña */}
              <div>
                <label htmlFor="password-box" className="block mb-1">
                  Contraseña:
                </label>
                <input
                  type="password"
                  id="password-box"
                  name="password"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-row justify-between mt-6 gap-4">
              <Link href="../login">
                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-4 rounded w-full"
                >
                  Back
                </button>
              </Link>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded w-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
