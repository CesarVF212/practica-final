"use client";

import Link from "next/link";
import Image from "next/image";

export default function GridElements({ elements }) {
  console.log(elements);
  return (
    <div className="grid grid-cols-2 gap-4" id="grid">
      {elements.map((element, index) => (
        <div
          key={index}
          className="p-4 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 cursor-pointer"
        >
          <h5 className="text-lg font-semibold">{element.name}</h5>
          <p>{element.address.street}</p>
          <p>{element.cif}</p>
        </div>
      ))}
      <Link href="../main/newclient">
        <div
          id="newClientButton"
          key="add-element"
          className="p-4 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 cursor-pointer"
        >
          <Image
            id="plusImage"
            src="/plus.png"
            alt="+"
            width={65}
            height={65}
            className="mx-auto"
          />
        </div>
      </Link>
    </div>
  );
}
