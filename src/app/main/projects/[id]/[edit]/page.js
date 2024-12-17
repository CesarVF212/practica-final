"use client";

// ELEMENTOS REACT.
import EditProjectForm from "@/app/components/forms/EditProjectForm";

// LIBRERIAS.
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams(); // Obtener los parámetros de consulta

  const variable = searchParams.get("variable"); // La variable pasada como query
  const project = variable ? JSON.parse(variable) : null; // Parsear el cliente si existe

  return <EditProjectForm project={project} />;
}
