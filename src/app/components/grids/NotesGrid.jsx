"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <div className="general-container">
      <div className="grid-container">
        <div className="grid-item">
          <Link href={"/main/notes/newnote"}>
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
        {validnotes.map((note, index) => (
          <div
            key={index}
            className="grid-item"
            id="grid-item-notes"
            onClick={() => openNotesDetails(note)}
          >
            <div className="image-container">
              <Image
                src="/paperImage.png"
                alt="Paper"
                width={100}
                height={100}
                className="item-image"
              />
            </div>
            <h5 className="item-title">{note.material}</h5>
            <p className="item-description">{note.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
