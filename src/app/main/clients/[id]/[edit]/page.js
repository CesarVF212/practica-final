"use client";

import EditClientForm from "@/app/components/forms/EditClientForm";

// LIBRERIAS.
import { useSearchParams, useRouter } from "next/navigation";

export default function editClientPage() {
  const searchParams = useSearchParams(); // Obtener los parámetros de consulta

  const variable = searchParams.get("variable"); // La variable pasada como query
  const client = variable ? JSON.parse(variable) : null; // Parsear el cliente si existe

  return <EditClientForm client={client} />;
}
