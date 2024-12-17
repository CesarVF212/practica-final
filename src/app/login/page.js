"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import "../globals.css";
import "@/app/components/Styles_Grids.css";

import LogoBig from "../components/LogoBig";

function loginPostRequest(email, password) {
  const url = "https://bildy-rpmaya.koyeb.app/api/user/login";

  const data = { email, password };

  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Se recibió una respuesta negativa del servidor.");
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

export default function Login() {
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
        <div className="form-box w-full max-w-[400px] md:w-1/2">
          <h2 className="text-center mb-4">LOGIN</h2>
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              const email = document.getElementById("email-box").value;
              const password = document.getElementById("password-box").value;

              loginPostRequest(email, password).then((success) => {
                if (success) {
                  router.push("/main/clients");
                } else {
                  alert("El correo o la contraseña no son correctos");
                }
              });
            }}
          >
            {/* Input de correo */}
            <div className="mb-4">
              <label htmlFor="email-box" className="block">
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
            <div className="mb-4">
              <label htmlFor="password-box" className="block">
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

            {/* Botones */}
            <div className="flex flex-row justify-between mt-4 gap-4">
              <Link href="../register">
                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Register
                </button>
              </Link>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
