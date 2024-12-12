"use client";

import React, { useState, useEffect } from "react";
import "@/app/components/Styles_Forms.css";
import Link from "next/link";
import Image from "next/image";

import "@/app/globals.css";
import "@/app/components/Styles_Grids.css";

function getnotes() {
  const url = "https://bildy-rpmaya.koyeb.app/api/deliverynote";
  const token = localStorage.getItem("jwt");

  if (!token)
    throw new Error("ERROR (MAIN.getnotes()): no se encuentra el Token.");

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("ERROR (MAIN): error al obtener los notes:");
    }
    return response.json();
  });
}

export default function Notes() {
  // Usamos un effect para poder abstaernos de revisar cada vez que se añada un nuevo notee.s
  const [notes, setnotes] = useState([]);

  useEffect(() => {
    getnotes().then((data) => {
      setnotes(data); // Actualiza el estado con los datos obtenidos
    });
  }, []);

  return (
    <div className="general-container">
      <div className="grid-container">
        <div className="add-button">
          <Link href="notes/newnote">
            <div id="addButton" className="add-content">
              <Image
                id="plusImage"
                src="/plus.png"
                alt=""
                width={200}
                height={200}
              />
              <span className="add-text">Añadir una nota</span>
            </div>
          </Link>
        </div>
        {notes.map((note, index) => (
          <div
            key={index}
            className="grid-item"
            id="grid-item-notes"
            // onClick={openNoteDetails(note)}
          >
            <Image
              id="paperImage"
              src="/paperImage.png"
              alt=""
              width={200}
              height={200}
            />
            <h3>{note.material}</h3>
            <h6>{note.description}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}
