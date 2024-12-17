"use client";

// Librerias
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

// Elementos React.
import NotesGrid from "@/app/components/grids/NotesGrid";

// Funciones importadas.
import dateFormater from "@/app/functions/dateFormater";
import getProjectNotes from "@/app/functions/fetch/getClientProjects";

// CSS
import "@/app/globals.css";

export default function ProjectDetails() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Obtener los parámetros de consulta

  const variable = searchParams.get("variable"); // La variable pasada como query
  const project = variable ? JSON.parse(variable) : null; // Parsear el cliente si existe

  const [notes, setNotes] = useState([]);

  function editProjectPage(project) {
    const query = new URLSearchParams({
      variable: JSON.stringify(project),
    }).toString();
    const url = `/main/projects/edit/${project._id}?${query}`;
    router.push(url);
  }

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
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <div className="flex flex-row items-start gap-8">
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold text-gray-800">
              Nombre: <b>{project.name}</b>
            </h4>
            <Image
              src={"/edit.png"}
              alt="Editar"
              width={30}
              height={30}
              className="cursor-pointer hover:scale-105 transition-transform"
              onClick={() => editProjectPage(project)}
            />
          </div>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Dirección:</span>{" "}
            {project.address.street} {project.address.number},{" "}
            {project.address.city}, {project.address.province}{" "}
            {project.address.postal}.
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Creado:</span>{" "}
            {dateFormater(project.createdAt)}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Modificado:</span>{" "}
            {dateFormater(project.updatedAt)}
          </p>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              ALBARANES:
            </h3>
            <NotesGrid notes={notes} />
          </div>
        </div>
      </div>
    </div>
  );
}
