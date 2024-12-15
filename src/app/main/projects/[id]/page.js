"use client";

// Librerias
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

// Elementos React.
import NotesGrid from "@/app/components/grids/NotesGrid";

// Funciones importadas.
import dateFormater from "@/app/functions/dateFormater";
import getProjectNotes from "@/app/functions/fetch/getClientProjects";

// CSS
import "@/app/globals.css";

export default function ProjectDetails() {
  const searchParams = useSearchParams(); // Obtener los parámetros de consulta

  const variable = searchParams.get("variable"); // La variable pasada como query
  const project = variable ? JSON.parse(variable) : null; // Parsear el cliente si existe

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getProjectNotes(project._id).then((data) => {
      if (Array.isArray(data)) {
        setNotes(data);
      } else {
        console.error("Los datos obtenidos no son un array:", data);
      }
    });
  }, []);

  if (!project) {
    return (
      <div>
        <h1>Error</h1>
        <p>No se pudo cargar la información del proyecto.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row" id="general-box">
        <div id="info-box" className="flex flex-col">
          <h4>
            Nombre: <b>{project.name}</b>
          </h4>
          <br></br>
          <h5>
            Dirección: {project.address.street} {project.address.number}.
          </h5>
          <h5>
            {project.address.city} {project.address.postal}
            {". "}
            {project.address.province}
          </h5>
          <br></br>
          <h5>Creado: {dateFormater(project.createdAt)}.</h5>
          <h5>Modificado: {dateFormater(project.updatedAt)}.</h5>
          <div>
            <h3>ALBARANES:</h3>
            <NotesGrid notes={notes}></NotesGrid>
          </div>
        </div>
      </div>
    </div>
  );
}
