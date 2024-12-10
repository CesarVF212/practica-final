"use client";

import React, { useState, useEffect } from "react";
import GridElements from "@/app/components/GridElements";

import "../globals.css";

function getClients() {
  const url = "https://bildy-rpmaya.koyeb.app/api/client";
  const token = localStorage.getItem("jwt");

  if (!token)
    throw new Error("ERROR (MAIN.getClients()): no se encuentra el Token.");

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

export default function Main() {
  // Usamos un effect para poder abstaernos de revisar cada vez que se añada un nuevo cliente.s
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients().then((data) => {
      setClients(data); // Actualiza el estado con los datos obtenidos
    });
  }, []);

  return (
    <div>
      <GridElements elements={clients} />
    </div>
  );
}
