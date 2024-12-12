"use client";

import React, { useState, useEffect } from "react";
import "@/app/components/Styles_Forms.css";
import Link from "next/link";
import Image from "next/image";

import "@/app/globals.css";
import "@/app/components/Styles_Grids.css";

import selectProfileIcon from "@/app/functions/selectProfileIcon";

function openClientDetails(client) {
  const id = client._id;
  const urlName = client.name;
}

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
    <div className="general-container">
      <div className="grid-container">
        <div className="add-button">
          <Link href="./clients/newclient">
            <div id="addButton" className="add-content">
              <Image
                id="plusImage"
                src="/plus.png"
                alt=""
                width={65}
                height={65}
              />
              <span className="add-text">Añadir un cliente</span>
            </div>
          </Link>
        </div>
        {clients.map((client, index) => (
          <div
            key={index}
            className="grid-item"
            onClick={openClientDetails(client)}
          >
            <h5 className="client-name">
              Cliente: <b>{client.name}</b>
            </h5>
            <p>
              Dirección: {client.address.street}, {client.address.number}
            </p>
            <p>Ciudad: {client.address.city}</p>
            <p>CIF: {client.cif}</p>
            <br />
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
