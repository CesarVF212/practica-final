"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import "@/app/components/Styles_Grids.css";

export default function NotesGrid({ notes }) {
  const router = useRouter();

  const openNotesDetails = (note) => {
    const query = new URLSearchParams({
      variable: JSON.stringify(note),
    }).toString();
    const url = `/main/notes/${note._id}?${query}`;
    router.push(url);
  };

  const validnotes = Array.isArray(notes) ? notes : [];

  return (
    <div>
      {validnotes.map((note, index) => (
        <div
          key={index}
          className="grid-item"
          id="grid-item-notes"
          onClick={() => openNotesDetails(note)}
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
  );
}
