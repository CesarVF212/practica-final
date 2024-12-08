"use client";

import "./LoginRegisterBox.css";
import Logo from "../imgs/logo.png";
import React from "react";

export default function RegisterBox() {
  const LoginPostRequest = async (email, password) => {
    var token;

    try {
      const response = await fetch(
        "https://bildy-rpmaya.koyeb.app/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const result = await response.json();
      console.log(result); // Aquí se imprime la respuesta de la API
      token = result.token;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const loadRegisterForm = () => {
    console.log("Navegar al formulario de registro");
  };

  return (
    <div>
      <span>
        <img src={Logo} alt="Logo" />
      </span>
      <span>
        <div className="form-box" id="register-form-box">
          <h2>REGISTER</h2>
          <form
            action="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              const email = document.getElementById("email-box").value;
              const password = document.getElementById("password-box").value;
              LoginPostRequest(email, password); // Llama a la función de solicitud POST
            }}
          >
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
            <div className="buttons-align">
              <button id="login-button" type="submit">
                Submit
              </button>
              <button
                id="register-button"
                type="button"
                onClick={loadRegisterForm}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </span>
    </div>
  );
}
