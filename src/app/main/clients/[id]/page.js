"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ProjectGrid from "@/app/components/grids/ProjectsGrid";

function getClientProjects(client) {
  const url = `https://bildy-rpmaya.koyeb.app/api/project/${client._id}`;
  const token = localStorage.getItem("jwt");

  if (!token) {
    console.error("ERROR: No se encuentra el token.");
    return Promise.resolve([]); // Devuelve un array vacío si no hay token
  }

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("ERROR (MAIN): error al obtener los clientes:");
    }
    return response.json();
  });
}

export default function ClientDetails() {
  const searchParams = useSearchParams(); // Obtener los parámetros de consulta

  const variable = searchParams.get("variable"); // La variable pasada como query
  const client = variable ? JSON.parse(variable) : null; // Parsear el cliente si existe

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

        <div id="info-box" className="flex flex-col">
          <h3>
            Nombre: <b>{client.name}</b>
          </h3>
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
          <h5>
            Creado: {client.createdAt.toString()}. Modificado:{" "}
            {client.modifiedAt}
          </h5>
          <div>
            <h3>PROYECTOS:</h3>
            <ProjectGrid projects={getClientProjects(client)} />
          </div>
        </div>
      </div>
    </div>
  );
}
