"use client";

import Image from "next/image";
import Link from "next/link";
import "../../components/LoginRegisterBox.css";

import LogoBig from "../../components/LogoBig";

export default function Login() {
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
          <div className="form-box" id="login-form-box">
            <h2>LOGIN</h2>
            <form
              action="login-form"
              onSubmit={(e) => {
                e.preventDefault();
                const email = document.getElementById("email-box").value;
                const password = document.getElementById("password-box").value;
                LoginPostRequest(email, password);
              }}
            >
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
                <Link href="../pages/register">
                  <button id="register-button" type="button">
                    Register
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </span>
      </div>
    </div>
  );
}
