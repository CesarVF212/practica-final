"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import "../globals.css";
import "../components/Styles_Forms.css";

import LogoBig from "../components/LogoBig";

function loginPostRequest(email, password) {
  const url = "https://bildy-rpmaya.koyeb.app/api/user/login";

  const data = {
    email: email,
    password: password,
  };

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "ERROR (LOGIN.loginPostRequest): se recibió una respuesta negativa del servidor."
        );
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);

      // Guardamos el token en el LocalStorage para poder hacer las consulas con el.
      const token = result.token;
      localStorage.setItem("jwt", token);
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}

export default function Login() {
  // Declaramos un Router para poder movernos entre las páginas.
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-center">
        <h1>CAESAR'S ADMINISTRATION</h1>
      </div>
      <div className="flex flex-row">
        <span>
          <LogoBig />
        </span>
        <span>
          <div className="form-box w-[30vw] h-[42vh] ">
            <h2>LOGIN</h2>
            <form
              className="w-[80%]"
              action="login-form"
              onSubmit={(e) => {
                e.preventDefault();

                // Obtenemos los datos desde el documento HTML.
                const email = document.getElementById("email-box").value;
                const password = document.getElementById("password-box").value;

                // En el caso de que se haya hecho un login correcto, pasamos a la página principal.
                loginPostRequest(email, password).then((success) => {
                  if (success) {
                    router.push("/main");
                  } else {
                    alert("El correo o la contraseña no son correctos");
                  }
                });
              }}
            >
              <br />
              <div>
                <label htmlFor="email-box">Correo:</label>
                <input type="email" id="email-box" name="email" />
              </div>
              <div>
                <label htmlFor="password-box">Contraseña:</label>
                <input type="password" id="password-box" name="password" />
              </div>
              <div className="flex flex-row justify-between">
                <Link href="../register">
                  <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                    Register
                  </button>
                </Link>
                <button
                  type="submit"
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </span>
      </div>
    </div>
  );
}
