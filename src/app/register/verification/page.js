"use client";

import "@/app/globals.css";
import { useRouter } from "next/navigation";

function checkValidation(code) {
  const token = localStorage.getItem("jwt_register");
  const url = "https://bildy-rpmaya.koyeb.app/api/user/validation";

  const data = {
    code: code,
  };

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
        throw new Error("Ha ocurrido un error con el código de verificación");
      }
      return response.json();
    })
    .then((result) => {
      const newToken = result.token;
      localStorage.setItem("jwt", newToken);
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
        alert("Ha ocurrido un error al registrarse");
      }
    });
  };

  return (
    <div>
      <h3>Se le ha enviado un código de verificación al correo.</h3>
      <br />
      <h3>Introduzcalo para continuar:</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="number"
              min="100000"
              max="999999"
              id="verification-box"
              name="verification"
            />
          </div>
          <div>
            <button type="submit">Verificar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
