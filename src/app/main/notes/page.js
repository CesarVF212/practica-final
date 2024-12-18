"use client";

import React, { useState, useEffect } from "react";
import "@/app/components/Styles_Forms.css";

import "@/app/globals.css";
import "@/app/components/Styles_Grids.css";

// Importacion de funciones.
import getNotes from "@/app/functions/fetch/getNotes";

// Elementos React.
import NotesGrid from "@/app/components/grids/NotesGrid";

export default function Notes() {
  // Usamos un effect para poder abstaernos de revisar cada vez que se añada un nuevo note.
  const [notes, setnotes] = useState([]);

  useEffect(() => {
    getNotes().then((data) => {
      setnotes(data); // Actualiza el estado con los datos obtenidos
    });
  }, []);

  return <NotesGrid notes={notes} />;
}
