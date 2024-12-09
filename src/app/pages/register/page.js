"use client";

import Image from "next/image";
import Link from "next/link";
import "../../components/LoginRegisterBox.css";

import LogoBig from "../../components/LogoBig";

export default function Register() {
  return (
    <div>
      <div id="title">
        <h1>CAESAR'S ADMINISTRATION</h1>
      </div>
      <div id="general-box">
        <span>
          <LogoBig></LogoBig>
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
                <Link href="../pages/login">
                  <button id="back-button" type="button">
                    Back
                  </button>
                </Link>
                <button id="login-button" type="submit">
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
