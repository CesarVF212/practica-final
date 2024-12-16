"use client";

// LIBRERIAS.
import React, { useState, useEffect } from "react";

// CSS.
import "@/app/globals.css";

// FUNCIONES.
import getClients from "@/app/functions/fetch/getClients";

// ELEMENTOS REACT.
import ClientsGrid from "@/app/components/grids/ClientsGrid";

export default function Main() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients().then((data) => {
      setClients(data);
    });
  }, []);

  return <ClientsGrid clients={clients}></ClientsGrid>;
}
