"use client";

// LIBRERIAS.
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

// FUNCIONES.
import selectProfileIcon from "@/app/functions/selectProfileIcon";

// CSS.
import "@/app/globals.css";
import "@/app/components/Styles_Grids.css";

export default function ClientsGrid({ clients }) {
  const router = useRouter();

  const openClientDetails = (client) => {
    const query = new URLSearchParams({
      variable: JSON.stringify(client),
    }).toString();
    const url = `/main/clients/${client._id}?${query}`;
    router.push(url);
  };
  return (
    <div className="general-container">
      <div className="grid-container">
        <div className="grid-item">
          <Link href={"/main/clients/newclient"}>
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
        {clients.map((client) => (
          <div
            key={client._id}
            className="grid-item"
            onClick={() => openClientDetails(client)}
          >
            <h5 className="client-name">
              Cliente: <b>{client.name}</b>
            </h5>
            <p>
              Dirección: {client.address.street}, {client.address.number}
            </p>
            <p>Ciudad: {client.address.city}</p>
            <p>CIF: {client.cif}</p>
            <div className="image-container">
              <Image
                src={selectProfileIcon(client.logo)}
                alt=""
                width={100}
                height={100}
                className="profile-image"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
