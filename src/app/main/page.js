"use client";

import React, { useState, useEffect } from "react";
import GridElements from "@/app/components/GridElements";
import Latbar from "@/app/components/Latbar";

import "../globals.css";

function getClients() {
  const url = "https://bildy-rpmaya.koyeb.app/api/client";
  const token = localStorage.getItem("jwt");

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Ha ocurrido un error con el código de verificación");
    }
    console.log(response);
    return response.json();
  });
}

export default function Main() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients()
      .then((data) => {
        setClients(data); // Actualiza el estado con los datos obtenidos
      })
      .catch((error) => {
        console.error("Error al obtener los clientes:", error);
      });
  }, []);

  return (
    <div>
      <Latbar />
      <GridElements elements={clients} />
    </div>
  );
}
