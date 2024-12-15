"use client";

import React, { useState, useEffect } from "react";
import "@/app/components/Styles_Forms.css";
import Link from "next/link";
import Image from "next/image";

import "@/app/globals.css";
import "@/app/components/Styles_Grids.css";

// Importacion de funciones.
import getNotes from "@/app/functions/fetch/getNotes";

export default function Notes() {
  // Usamos un effect para poder abstaernos de revisar cada vez que se añada un nuevo note.
  const [notes, setnotes] = useState([]);

  useEffect(() => {
    getNotes().then((data) => {
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
              <span className="add-text">Añadir un alabrán</span>
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
