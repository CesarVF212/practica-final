"use client";

import EditNoteForm from "@/app/components/forms/EditNoteForm";

// LIBRERIAS.
import { useSearchParams } from "next/navigation";

export default function EditNotePage() {
  const searchParams = useSearchParams(); // Obtener los parámetros de consulta

  const variable = searchParams.get("variable"); // La variable pasada como query
  const note = variable ? JSON.parse(variable) : null; // Parsear el cliente si existe

  return <EditNoteForm note={note} />;
}
