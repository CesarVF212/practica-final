"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProjectsGrid from "@/app/components/grids/ProjectsGrid";
import Image from "next/image";

// Funciones importadas.
import dateFormater from "@/app/functions/dateFormater";
import selectProfileIcon from "@/app/functions/selectProfileIcon";
import getClientProjects from "@/app/functions/fetch/getClientProjects";

// Componentes React.

// CSS
import "@/app/globals.css";

export default function ClientDetails() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Obtener los parámetros de consulta

  const variable = searchParams.get("variable"); // La variable pasada como query
  const client = variable ? JSON.parse(variable) : null; // Parsear el cliente si existe

  const [projects, setProjects] = useState([]);

  function editClientPage(client) {
    const query = new URLSearchParams({
      variable: JSON.stringify(client),
    }).toString();
    const url = `/main/clients/edit/${client._id}?${query}`;
    router.push(url);
  }

  useEffect(() => {
    getClientProjects(client._id).then((data) => {
      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        console.error("Los datos obtenidos no son un array:", data);
      }
    });
  }, []);

  if (!client) {
    return (
      <div>
        <h1>Error</h1>
        <p>No se pudo cargar la información del cliente.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row" id="general-box">
        <div id="photo-box"></div>
        <Image
          id="logo"
          src={selectProfileIcon(client.logo)}
          alt="Document"
          width={200}
          height={200}
          className="mr-10"
        />
        <div id="info-box" className="flex flex-col">
          <span className="flex flex-row justify-between">
            <h4>
              Nombre: <b>{client.name}</b>
            </h4>
            <Image
              id="edit"
              src={"/edit.png"}
              alt="Editar"
              width={50}
              height={50}
              onClick={() => editClientPage(client)}
            />
          </span>
          <br></br>
          <h5>
            Dirección: {client.address.street} {client.address.number}.
          </h5>
          <h5>
            {client.address.city} {client.address.postal}
            {". "}
            {client.address.province}
          </h5>
          <br></br>
          <h4>CIF: {client.cif}</h4>
          <br></br>
          <h5>Creado: {dateFormater(client.createdAt)}.</h5>
          <h5>Modificado: {dateFormater(client.updatedAt)}.</h5>
          <div>
            <h3>PROYECTOS:</h3>
            <ProjectsGrid projects={projects} />
          </div>
        </div>
      </div>
    </div>
  );
}
