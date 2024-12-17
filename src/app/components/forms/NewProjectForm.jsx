"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

// FUNCIONES
import containsNumbers from "@/app/functions/containsNumbers";
import addProject from "@/app/functions/fetch/addProject";
import getClients from "@/app/functions/fetch/getClients";

// CSS.
import "@/app/globals.css";
import "@/app/components/Styles_Forms.css";

export default function NewProjectForm() {
  const router = useRouter();

  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Cargar clientes al montar el componente
    async function fetchClients() {
      try {
        const fetchedClients = await getClients();
        setClients(fetchedClients);
      } catch (error) {
        console.error("Error al cargar clientes:", error);
      }
    }
    fetchClients();
  }, []);

  const handleSubmit = (e) => {
    // Evitamos que se recargue la página
    e.preventDefault();

    const name = document.getElementById("name-box").value;
    const addressStreet = document.getElementById("address-street-box").value;
    const addressNumber = document.getElementById("address-number-box").value;
    const addressCity = document.getElementById("address-city-box").value;
    const addressRegion = document.getElementById("address-region-box").value;
    const addressPostalcode = document.getElementById("address-code-box").value;
    const notes = document.getElementById("notes-box").value;
    const client_id = document.getElementById("client-box").value;

    // Verificamos que todos los campos estén llenos
    if (
      !name ||
      !addressStreet ||
      !addressNumber ||
      !addressCity ||
      !addressRegion ||
      !addressPostalcode ||
      !client_id
    ) {
      alert("ERROR: No se han introducido todos los datos necesarios.");
      return;
    }

    // Validamos que la dirección no contenga números
    if (containsNumbers(addressStreet)) {
      alert("ERROR: Se han introducido valores numéricos en la dirección.");
      return;
    }

    // Llamamos a la función para añadir el proyecto
    addProject(
      name,
      notes,
      addressStreet,
      addressNumber,
      addressCity,
      addressRegion,
      addressPostalcode,
      client_id
    )
      .then(() => {
        alert(`Se ha guardado el proyecto ${name}`);
        // Redirigir a la página principal después de guardar
        router.push("../projects");
      })
      .catch((error) => {
        alert("ERROR: No se pudo guardar el proyecto. Revisa la consola.");
        console.error("Error al guardar el proyecto:", error);
        if (error.response) {
          // Si el error tiene respuesta (por ejemplo, un error HTTP)
          console.error("Detalles del error:", error.response);
        } else if (error.request) {
          // Si la solicitud fue realizada pero no hubo respuesta
          console.error(
            "La solicitud fue realizada pero no se recibió respuesta:",
            error.request
          );
        } else {
          // Otros tipos de errores
          console.error("Error desconocido:", error.message);
        }
      });
  };

  return (
    <div className="flex flex-auto justify-center">
      <h2>NUEVO PROYECTO</h2>
      <form className="flex flex-auto justify-center" onSubmit={handleSubmit}>
        <br />
        <div>
          <label htmlFor="name-box">Nombre del Proyecto:</label>
          <input type="text" id="name-box" name="name" />
        </div>
        <div className="address-box">
          <span>
            <label htmlFor="address-street-box">Dirección física:</label>
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
            <label htmlFor="address-region-box">Región:</label>
            <input type="text" id="address-region-box" name="address-region" />
          </span>
        </div>
        <div>
          <label htmlFor="notes-box">Notas del proyecto:</label>
          <input type="text" id="notes-box" name="notes" />
        </div>
        <div>
          <label htmlFor="client-box">Cliente: </label>
          <select id="client-box" name="client">
            <option value="">Seleccione un cliente</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name} - {client.cif}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row justify-between">
          <Link href={"../projects"}>
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
