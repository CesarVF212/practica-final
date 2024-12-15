import Image from "next/image";

export default function NotesGrid({ notes }) {
  // Aseguramos que `notes` siempre sea un array

  console.log(notes);
  const validnotes = Array.isArray(notes) ? notes : [];

  return (
    <div>
      {validnotes.map((note, index) => (
        <div
          key={index}
          className="grid-item"
          id="grid-item-notes"
          // onClick={() => openProjectDetails(project)}
        >
          <Image
            id="documentImage"
            src="/document.png"
            alt="Document"
            width={200}
            height={200}
          />
          <h3>{note.name}</h3>
          <h6>{note.clientId}</h6>
        </div>
      ))}
    </div>
  );
}
