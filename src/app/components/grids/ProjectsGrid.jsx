export default function ProjectGrid({ projects }) {
  // Aseguramos que `projects` siempre sea un array

  console.log(projects);
  const validProjects = Array.isArray(projects) ? projects : [];

  return (
    <div>
      {validProjects.map((project, index) => (
        <div
          key={index}
          className="grid-item"
          id="grid-item-projects"
          // onClick={() => openProjectDetails(project)}
        >
          <Image
            id="documentImage"
            src="/document.png"
            alt="Document"
            width={200}
            height={200}
          />
          <h3>{project.name}</h3>
          <h6>{project.clientId}</h6>
        </div>
      ))}
    </div>
  );
}
