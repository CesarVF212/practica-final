"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import "../../globals.css";
import "../../components/Styles_Forms.css";

import LogoBig from "../../components/LogoBig";

// Hacemos que RegisterPostRequest retorne una promesa
function RegisterPostRequest(email, password) {
  const url = "https://bildy-rpmaya.koyeb.app/api/user/register";

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
        throw new Error("Ha ocurrido un error al registrarse");
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      const token = result.token;
      localStorage.setItem("jwt_register", token);
      return true; // Retorna true si el registro es exitoso
    })
    .catch((error) => {
      console.error(error);
      return false; // Retorna false si hay un error
    });
}

export default function Register() {
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
          <div className="form-box w-[40vw] h-[60vh]">
            <h2>REGISTER</h2>
            <form
              action="login-form"
              className="w-[80%]"
              onSubmit={(e) => {
                e.preventDefault();
                const email = document.getElementById("email-box").value;
                const password = document.getElementById("password-box").value;

                RegisterPostRequest(email, password).then((success) => {
                  if (success) {
                    router.push("/pages/register/verification"); // Redirige al usuario después de un registro exitoso
                  } else {
                    alert("Ha ocurrido un error al registrarse");
                  }
                });
              }}
            >
              <br />
              <div>
                <label htmlFor="name-box">Nombre:</label>
                <input type="text" id="name-box" name="name" />
              </div>
              <div>
                <label htmlFor="lastname-box">Apellidos:</label>
                <input type="text" id="lastname-box" name="lastname" />
              </div>
              <div>
                <label htmlFor="email-box">Correo:</label>
                <input type="email" id="email-box" name="email" />
              </div>
              <div>
                <label htmlFor="password-box">Contraseña:</label>
                <input type="password" id="password-box" name="password" />
              </div>
              <div className="flex flex-row justify-between">
                <Link href="../pages/login">
                  <button className="bg-red-500 text-white font-bold py-2 px-4 rounded">
                    Back
                  </button>
                </Link>
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </span>
      </div>
    </div>
  );
}
