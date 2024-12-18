"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

// Funciones importadas.
import dateFormater from "@/app/functions/dateFormater";
import downloadNote from "@/app/functions/fetch/downloadNote";

// CSS
import "@/app/globals.css";

export default function NotesDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Obtener los parámetros de consulta

  const variable = searchParams.get("variable"); // La variable pasada como query
  const note = variable ? JSON.parse(variable) : null; // Parsear la nota si existe

  function EditNotePage(note) {
    // Cambié a mayúscula para cumplir con la convención
    const query = new URLSearchParams({
      variable: JSON.stringify(note),
    }).toString();
    const url = `/main/notes/edit/${note._id}?${query}`;
    router.push(url);
  }

  if (!note) {
    return (
      <div>
        <h1>Error</h1>
        <p>No se pudo cargar la información de la nota.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <div className="flex flex-row items-start gap-8">
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold text-gray-800">
              {note.material || "Sin descripción disponible."}
            </h4>
            <div className="flex gap-4">
              <Image
                src={"/edit.png"}
                alt="Editar"
                width={30}
                height={30}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => EditNotePage(note)} // Cambié a la función con nombre correcto
              />
              <Image
                src={"/download.png"}
                alt="Descargar"
                width={30}
                height={30}
                className="cursor-pointer hover:scale-105 transition-transform"
                onClick={() => downloadNote(note)}
              />
            </div>
          </div>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Tipo:</span> {note.format}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Horas:</span> {note.hours}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Estado: </span>
            {note.pending ? "Pendiente" : "Completado"}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Descripcion: </span>
            {note.description}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Creado:</span>{" "}
            {dateFormater(note.createdAt)}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold">Modificado:</span>{" "}
            {dateFormater(note.updatedAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
