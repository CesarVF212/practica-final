"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

export default function ProjectsGrid({ projects }) {
  const validProjects = Array.isArray(projects) ? projects : [];
  const router = useRouter();

  const openProjectDetails = (project) => {
    Router;
    const query = new URLSearchParams({
      variable: JSON.stringify(project),
    }).toString();
    const url = `/main/projects/${project._id}?${query}`;
    router.push(url);
  };

  return (
    <div>
      {validProjects.map((project, index) => (
        <div key={index} className="grid-item" id="grid-item-projects">
          <Image
            id="documentImage"
            src="/document.png"
            alt="Document"
            width={200}
            height={200}
            onClick={openProjectDetails(project)}
          />
          <h3>{project.name}</h3>
          <h6>{project.clientId}</h6>
        </div>
      ))}
    </div>
  );
}
