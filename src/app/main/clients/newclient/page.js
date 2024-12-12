"use client";

import { useRouter } from "next/navigation";

import "@/app/globals.css";
import "@/app/components/Styles_Forms.css";
import Link from "next/link";

import DiscardAcceptButtons from "@/app/components/DiscardAcceptButtons";

function containsNumbers(string) {
  return /\d/.test(string);
}

function addClient(
  name,
  addressStreet,
  addressNumber,
  addressCity,
  addressRegion,
  addressPostalcode,
  cif
) {
  const url = "https://bildy-rpmaya.koyeb.app/api/client";
  const token = localStorage.getItem("jwt");

  const date = new Date();
  const timeCreated = date.getTime();

  // Verificamos si hay un Token.
  if (!token) {
    console.error(
      "ERROR (NEWCLIENT.addClient()): No se puede autorizar el acceso a la API"
    );
  }

  const data = {
    name: name,
    address: {
      street: addressStreet,
      number: addressNumber,
      postal: addressPostalcode,
      city: addressCity,
      province: addressRegion,
    },
    cif: cif,
    createdAt: timeCreated,
    modifiedAt: timeCreated,
  };

  print(data);

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
        "ERROR (NEWCLIENT.addClient()): ha habido un error al introducir un nuevo cliente."
      );
    }
    return response.json();
  });
}

export default function Newclient() {
  const router = useRouter();
  const accept_link = "../main";

  const handleSubmit = (e) => {
    // Evitamos que se recargue la página.
    e.preventDefault();
    const name = document.getElementById("name-box").value;
    const addressStreet = document.getElementById("address-street-box").value;
    const addressNumber = document.getElementById("address-number-box").value;
    const addressCity = document.getElementById("address-city-box").value;
    const addressRegion = document.getElementById("address-region-box").value;
    const addressPostalcode = document.getElementById("address-code-box").value;
    const cif = document.getElementById("cif-box").value;

    // Verificamos que el nombre y la dirección no estén vacias.
    if (
      !name ||
      !addressStreet ||
      !addressNumber ||
      !addressCity ||
      !addressRegion ||
      !addressPostalcode
    ) {
      alert("ERROR: No se han introducido todos los datos necesarios.");
      return;
    }

    if (containsNumbers(addressStreet)) {
      alert("ERROR: Se han introducido valores númericos en la dirección.");
      return;
    }

    // Llamamos a la función de añadir un cliente a la API.
    addClient(
      name,
      addressStreet,
      addressNumber,
      addressCity,
      addressRegion,
      addressPostalcode,
      cif
    )
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
    <div className="form-box w-[35vw] h-[44vh]">
      <h2>NUEVO CLIENTE</h2>
      <form className="w-[80%]" onSubmit={handleSubmit}>
        <br />
        <div>
          <label htmlFor="name-box">Cliente / Empresa:</label>
          <input type="text" id="name-box" name="name" />
        </div>
        <div className="address-box">
          <span>
            <label htmlFor="address-street-box">
              Dirección de facturación:
            </label>
            <input type="text" id="address-street-box" name="address" />
          </span>
          <span>
            <label htmlFor="address-number-box">Número:</label>
            <input
              type="number"
              id="address-number-box"
              name="address-number"
              min="0"
            />
          </span>
        </div>
        <div className="address-extra-box">
          <span>
            <label htmlFor="address-city-box">Ciudad:</label>
            <input type="text" id="address-city-box" name="address-city" />
          </span>
          <span>
            <label htmlFor="address-code-box">Código postal:</label>
            <input
              type="number"
              id="address-code-box"
              name="address-code"
              min="0"
              max="99999"
            />
          </span>
          <span>
            <label htmlFor="address-region-box">Région:</label>
            <input type="text" id="address-region-box" name="address-region" />
          </span>
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
          <Link href={"../main"}>
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
