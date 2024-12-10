"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import "../../globals.css";
import "../../components/Styles_Forms.css";

function addClient(name, direction, cif) {
  const url = "https://bildy-rpmaya.koyeb.app/api/client";
  const token = localStorage.getItem("jwt");

  if (!token) {
    console.error(
      "ERROR (NEWCLIENT.addClient()): No se puede autorizar el acceso a la API"
    );
    return Promise.reject(
      new Error("No se encontró un token válido en localStorage.")
    );
  }

  const data = {
    name: name,
    direction: direction,
    cif: cif,
  };

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ha ocurrido un error al guardar el cliente.");
      }
      return response.json();
    })
    .catch((error) => {
      console.error(
        "ERROR (NEWCLIENT.addClient()): Error al guardar el cliente",
        error
      );
      throw error;
    });
}

export default function Newclient() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("name-box").value;
    const direction = document.getElementById("adress-box").value;
    const cif = document.getElementById("cif-box").value;

    if (!name || !direction) {
      alert("ERROR: No se han introducido todos los datos necesarios");
      return;
    }

    addClient(name, direction, cif)
      .then(() => {
        alert(`Se ha guardado el cliente ${name}`);
        // Redirigir a la página principal después de guardar
        router.push("../main");
      })
      .catch((error) => {
        alert("ERROR: No se pudo guardar el cliente. Revisa la consola.");
      });
  };

  return (
    <div className="form-box w-[35vw] h-[50vh]">
      <h2>NUEVO CLIENTE</h2>
      <form className="w-[80%]" onSubmit={handleSubmit}>
        <br />
        <div>
          <label htmlFor="name-box">Cliente / Empresa:</label>
          <input type="text" id="name-box" name="name" />
        </div>
        <div>
          <label htmlFor="adress-box">Dirección de facturación:</label>
          <input type="text" id="adress-box" name="address" />
        </div>
        <div>
          <label htmlFor="cif-box">CIF:</label>
          <input
            type="number"
            min="10000000"
            max="99999999"
            id="cif-box"
            name="cif"
          />
        </div>
        <div className="flex flex-row justify-between">
          <Link href="../main">
            <button
              type="button"
              className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            >
              Discard
            </button>
          </Link>
          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
