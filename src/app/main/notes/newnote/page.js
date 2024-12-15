"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import "@/app/globals.css";
import "@/app/components/Styles_Forms.css";

import { stringify } from "flatted"; // Tenia un problema por referencia ciclica. Investigue y esta es la solución.

import DiscardAcceptButtons from "@/app/components/DiscardAcceptButtons";

// FUNCIONES.
import addNote from "@/app/functions/fetch/addNote";
import getClients from "@/app/functions/fetch/getClients";
import getProjects from "@/app/functions/fetch/getProjects";

export default function Newnote() {
  const router = useRouter();

  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedClients, fetchedProjects] = await Promise.all([
          getClients(),
          getProjects(),
        ]);
        setClients(fetchedClients);
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }

    fetchData();
  }, []);

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
          <div>
            <label htmlFor="project-box">Proyecto: </label>
            <select id="project-box" name="project">
              <option value="">Seleccione un proyecto:</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name} - {project.projectCode}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br></br>
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
