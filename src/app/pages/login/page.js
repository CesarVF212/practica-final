"use client";

import Image from "next/image";
import Link from "next/link";

import "../../globals.css";
import "../../components/LoginRegisterBox.css";

import LogoBig from "../../components/LogoBig";

export default function Login() {
  return (
    <div>
      <div className="flex">
        <h1>CAESAR'S ADMINISTRATION</h1>
      </div>
      <div className="flex flex-row">
        <span>
          <LogoBig></LogoBig>
        </span>
        <span>
          <div className="form-box w-[30vw] h-[42vh]">
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
              <div className="flex flex-row justify-between">
                <Link href="../pages/register">
                  <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                    Register
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
