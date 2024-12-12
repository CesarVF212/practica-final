"use client";

import { useRouter } from "next/navigation";

import "@/app/globals.css";
import "@/app/components/Styles_Forms.css";
import Link from "next/link";

import { stringify } from "flatted"; // Tenia un problema por referencia ciclica. Investigue y esta es la solución.

import DiscardAcceptButtons from "@/app/components/DiscardAcceptButtons";

function addNote(clientId, projectId, material, hours, description, workdate) {
  const url = "https://bildy-rpmaya.koyeb.app/api/deliverynote";
  const token = localStorage.getItem("jwt");

  // Verificamos si hay un Token.
  if (!token) {
    console.error(
      "ERROR (NEWnote.addnote()): No se puede autorizar el acceso a la API"
    );
  }

  let data = {
    clientId: clientId,
    projectId: projectId,
    format: "material",
    material: material,
    hours: parseInt(hours, 10),
    description: description,
    workdate: "1/2/2024",
  };

  data = {
    clientId: "671ea30c01da0c4157964045", // Un ID de cliente de ejemplo
    projectId: "671ea31e01da0c4157964049", // Un ID de proyecto de ejemplo
    format: "material",
    material: material,
    hours: parseInt(hours, 10),
    description: description,
    workdate: workdate,
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
        "ERROR (NEWnote.addnote()): ha habido un error al introducir un nuevo note."
      );
    }
    return response.json();
  });
}

export default function Newnote() {
  const router = useRouter();

  const handleSubmit = (e) => {
    // Evitamos que se recargue la página.
    e.preventDefault();

    const clientId = document.getElementById("client-box").value;
    const projectId = document.getElementById("project-box").value;
    const material = document.getElementById("material-box").value;
    const hours = document.getElementById("number-box").value;
    const description = document.getElementById("description-box").value;
    const workdate = document.getElementById("date-box").value;

    // Tenemos que obtener el id de un cliente. Debemos de poder seleccionarlo de la lista.

    // Verificamos que el nombre y la dirección no estén vacias.
    if (!clientId || !projectId || !material || !hours || !workdate) {
      alert("ERROR: No se han introducido todos los datos necesarios.");
      return;
    }

    // Llamamos a la función de añadir un notee a la API.
    addNote(clientId, projectId, material, hours, description, workdate)
      .then(() => {
        alert(`Se ha guardado el albaran para ${material}`);
        // Redirigir a la página principal después de guardar
        router.push("../notes");
      })
      .catch((error) => {
        alert("ERROR: No se pudo guardar el proyecto. Revisa la consola.");
      });
  };

  return (
    <div className="form-box w-[35vw] h-[44vh]">
      <h2>NUEVO PROYECTO</h2>
      <form className="w-[80%]" onSubmit={handleSubmit}>
        <br />
        <div className="work-box">
          <span>
            <label htmlFor="material-box">Material:</label>
            <input type="text" id="material-box" name="material" />
          </span>
          <span>
            <label htmlFor="number-box">Número/Horas:</label>
            <input type="number" id="number-box" name="number" min="0" />
          </span>
        </div>
        <div>
          <label htmlFor="description-box">Descripción del trabajo:</label>
          <input type="text" id="description-box" name="description" />
        </div>
        <div>
          <label htmlFor="date-box">Fecha:</label>
          <input type="date" id="date-box" name="date" />
        </div>
        <div className="link-box">
          <span>
            <label htmlFor="client-box">Cliente:</label>
            <input type="client" id="client-box" name="client" />
          </span>
          <span>
            <label htmlFor="project-box">Projecto:</label>
            <input type="project" id="project-box" name="date" />
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <Link href={"../notes"}>
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
