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
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <div className="flex flex-row items-start gap-8">
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-200">
          <Image
            src={selectProfileIcon(client.logo)}
            alt="Logo Cliente"
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold text-gray-800">
              Nombre: <b>{client.name}</b>
            </h4>
            <Image
              src={"/edit.png"}
              alt="Editar"
              width={30}
              height={30}
              className="cursor-pointer hover:scale-105 transition-transform"
              onClick={() => editClientPage(client)}
            />
          </div>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Dirección:</span>{" "}
            {client.address.street} {client.address.number},{" "}
            {client.address.city}, {client.address.province}{" "}
            {client.address.postal}.
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">CIF:</span> {client.cif}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Creado:</span>{" "}
            {dateFormater(client.createdAt)}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Modificado:</span>{" "}
            {dateFormater(client.updatedAt)}
          </p>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              PROYECTOS:
            </h3>
            <ProjectsGrid projects={projects} />
          </div>
        </div>
      </div>
    </div>
  );
}
