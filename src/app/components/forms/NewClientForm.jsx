"use client";

import { useRouter } from "next/navigation";

import "@/app/globals.css";
import "@/app/components/Styles_Forms.css";
import Link from "next/link";

// FUNCIONES
import addClient from "@/app/functions/fetch/addClient";
import containsNumbers from "@/app/functions/containsNumbers";

export default function NewClientFor() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById("name-box").value;
    const addressStreet = document.getElementById("address-street-box").value;
    const addressNumber = document.getElementById("address-number-box").value;
    const addressCity = document.getElementById("address-city-box").value;
    const addressRegion = document.getElementById("address-region-box").value;
    const addressPostalcode = document.getElementById("address-code-box").value;
    const cif = document.getElementById("cif-box").value;
    const logoFile = document.getElementById("logo-box").files[0];

    if (
      !name ||
      !addressStreet ||
      !addressNumber ||
      !addressCity ||
      !addressRegion ||
      !addressPostalcode ||
      !cif
    ) {
      alert("ERROR: Te faltan campos obligatorios.");
      return;
    }

    if (containsNumbers(addressStreet)) {
      alert("ERROR: Se han introducido valores numéricos en la dirección.");
      return;
    }

    // Llamamos a la función `addClient` con todos los datos, incluyendo el logo.
    addClient(
      name,
      addressStreet,
      addressNumber,
      addressCity,
      addressRegion,
      addressPostalcode,
      cif,
      logoFile
    )
      .then(() => {
        alert(`Se ha guardado el cliente ${name}`);
        router.push("/main/clients");
      })
      .catch((error) => {
        console.error("ERROR al guardar el cliente:", error);
        alert("ERROR: No se pudo guardar el cliente. Revisa la consola.");
      });
  };

  return (
    <div className="flex flex-auto justify-center">
      <h2>NUEVO CLIENTE</h2>
      <form className="flex flex-auto justify-center" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name-box">Cliente / Empresa:</label>
          <input type="text" id="name-box" name="name" required />
        </div>
        <div className="address-box">
          <span>
            <label htmlFor="address-street-box">
              Dirección de facturación:
            </label>
            <input
              type="text"
              id="address-street-box"
              name="address"
              required
            />
          </span>
          <span>
            <label htmlFor="address-number-box">Número:</label>
            <input
              type="number"
              id="address-number-box"
              name="address-number"
              min="0"
              required
            />
          </span>
        </div>
        <div className="address-extra-box">
          <span>
            <label htmlFor="address-city-box">Ciudad:</label>
            <input
              type="text"
              id="address-city-box"
              name="address-city"
              required
            />
          </span>
          <span>
            <label htmlFor="address-code-box">Código postal:</label>
            <input
              type="number"
              id="address-code-box"
              name="address-code"
              min="0"
              max="99999"
              required
            />
          </span>
          <span>
            <label htmlFor="address-region-box">Région:</label>
            <input
              type="text"
              id="address-region-box"
              name="address-region"
              required
            />
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
            required
          />
        </div>
        <div>
          <label htmlFor="logo-box">Logo:</label>
          <input type="file" id="logo-box" name="logo" accept="image/*" />
        </div>
        <div className="flex flex-row justify-between">
          <Link href={"/main/clients"}>
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
