"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import "@/app/components/Styles_Grids.css";

export default function ProjectsGrid({ projects }) {
  const router = useRouter();
  const validProjects = Array.isArray(projects) ? projects : [];

  const openProjectDetails = (project) => {
    const query = new URLSearchParams({
      variable: JSON.stringify(project),
    }).toString();
    const url = `/main/projects/${project._id}?${query}`;
    router.push(url);
  };

  return (
    <div className="general-container">
      <div className="grid-container">
        <div className="grid-item">
          <Link href={"/main/projects/newproject"}>
            <div className="image-container">
              <Image
                src={"/plus.png"}
                alt=""
                width={150}
                height={150}
                className="plus-image"
              />
            </div>
          </Link>
        </div>
        {validProjects.map((project, index) => (
          <div
            key={index}
            className="grid-item"
            id="grid-item-projects"
            onClick={() => openProjectDetails(project)}
          >
            <div className="image-container">
              <Image
                src="/document.png"
                alt="Document"
                width={100}
                height={100}
                className="item-image"
              />
            </div>
            <h5 className="item-title">{project.name}</h5>
            <p className="item-description">{project.clientId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
