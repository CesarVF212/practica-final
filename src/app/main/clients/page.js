"use client";

import React, { useState, useEffect } from "react";
import "@/app/components/Styles_Forms.css";
import "@/app/globals.css";
import "@/app/components/Styles_Grids.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import selectProfileIcon from "@/app/functions/selectProfileIcon";

// Importacion de funciones.
import getClients from "@/app/functions/fetch/getClients";

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
