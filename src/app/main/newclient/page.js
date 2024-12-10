"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import "../../globals.css";
import "../../components/Styles_Forms.css";

function addClient(name, address, cif) {
  const url = "https://bildy-rpmaya.koyeb.app/api/client";
  const token = localStorage.getItem("jwt");

  // Verificamos si hay un Token.
  if (!token) {
    console.error(
      "ERROR (NEWCLIENT.addClient()): No se puede autorizar el acceso a la API"
    );
  }

  const data = {
    name: name,
    address: { street: address },
    cif: cif,
  };

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        "ERROR (NEWCLIENT.addClient()): ha habido un error al introducir un nuevo cliente"
      );
    }
    return response.json();
  });
}

export default function Newclient() {
  const router = useRouter();

  const handleSubmit = (e) => {
    // Evitamos que se recargue la página.
    e.preventDefault();
    const name = document.getElementById("name-box").value;
    const address = document.getElementById("address-box").value;
    const cif = document.getElementById("cif-box").value;

    // Verificamos que el nombre y la dirección no estén vacias.
    if (!name || !address) {
      alert("ERROR: No se han introducido todos los datos necesarios");
      return;
    }

    // Llamamos a la función de añadir un cliente a la API.
    addClient(name, address, cif)
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
          <label htmlFor="address-box">Dirección de facturación:</label>
          <input type="text" id="address-box" name="address" />
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
