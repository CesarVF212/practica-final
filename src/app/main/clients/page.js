"use client";

import React, { useState, useEffect } from "react";
import "@/app/components/Styles_Forms.css";
import "@/app/globals.css";
import "@/app/components/Styles_Grids.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import selectProfileIcon from "@/app/functions/selectProfileIcon";

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
  const [clients, setClients] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getClients().then((data) => {
      setClients(data);
    });
  }, []);

  const openClientDetails = (client) => {
    const query = new URLSearchParams({
      variable: JSON.stringify(client),
    }).toString();
    const url = `/main/clients/${client._id}?${query}`;
    console.log("URL generada:", url); // Revisa el formato aquí
    router.push(url);
  };

  return (
    <div className="general-container">
      <div className="grid-container">
        {clients.map((client) => (
          <div
            key={client._id}
            className="grid-item"
            onClick={() => openClientDetails(client)}
          >
            <h5 className="client-name">
              Cliente: <b>{client.name}</b>
            </h5>
            <p>
              Dirección: {client.address.street}, {client.address.number}
            </p>
            <p>Ciudad: {client.address.city}</p>
            <p>CIF: {client.cif}</p>
            <div className="image-container">
              <Image
                src={selectProfileIcon(client.logo)}
                alt=""
                width={100}
                height={100}
                className="profile-image"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
