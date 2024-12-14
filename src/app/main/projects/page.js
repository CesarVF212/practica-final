"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Componentes React.
import ProjectGrid from "@/app/components/grids/ProjectsGrid";

import "@/app/globals.css";
import "@/app/components/Styles_Grids.css";

function getprojects() {
  const url = "https://bildy-rpmaya.koyeb.app/api/project";
  const token = localStorage.getItem("jwt");

  if (!token)
    throw new Error("ERROR (MAIN.getprojects()): no se encuentra el Token.");

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("ERROR (MAIN): error al obtener los projectos.");
    }
    return response.json();
  });
}

export default function projects() {
  // Usamos un effect para poder abstaernos de revisar cada vez que se añada un nuevo projecto.
  const [projects, setprojects] = useState([]);

  useEffect(() => {
    getprojects().then((data) => {
      setprojects(data);
    });
  }, []);

  return (
    <div className="general-container">
      <div className="grid-container">
        <div className="add-button">
          <Link href="projects/newproject">
            <div id="addButton" className="add-content">
              <Image
                id="plusImage"
                src="/plus.png"
                alt=""
                width={200}
                height={200}
              />
              <span className="add-text">Añadir un projecto</span>
            </div>
          </Link>
        </div>
        <ProjectGrid projects={projects}></ProjectGrid>
      </div>
    </div>
  );
}
