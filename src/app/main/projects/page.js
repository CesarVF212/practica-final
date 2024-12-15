"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ProjectGrid from "@/app/components/grids/ProjectsGrid";

import "@/app/globals.css";
import "@/app/components/Styles_Grids.css";

import getProjects from "@/app/functions/fetch/getProjects";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then((data) => {
      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        console.error("Los datos obtenidos no son un array:", data);
      }
    });
  }, []);

  return (
    <div className="general-container">
      <div className="grid-container">
        <div className="add-button">
          <Link href="/projects/newproject">
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
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
