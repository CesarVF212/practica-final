import "../components/Styles_Forms.css";
import Link from "next/link";
import Image from "next/image";
import "./Styles_Grid.css";

function selectProfileIcon(logo) {
  if (!logo) return "/dft_profile_picture.jpg";
  else return logo;
}

export default function GridElements({ elements }) {
  return (
    <div className="general-container">
      <div className="grid-container">
        <div className="new-client-button">
          <Link href="../main/newclient">
            <div id="newClientButton" className="new-client-content">
              <Image
                id="plusImage"
                src="/plus.png"
                alt=""
                width={65}
                height={65}
              />
              <span className="new-client-text">Añadir un cliente</span>
            </div>
          </Link>
        </div>
        {elements.map((element, index) => (
          <div key={index} className="grid-item">
            <h5 className="client-name">
              Cliente: <b>{element.name}</b>
            </h5>
            <p>
              Dirección: {element.address.street}, {element.address.number}
            </p>
            <p>Ciudad: {element.address.city}</p>
            <p>CIF: {element.cif}</p>
            <br />
            <div className="image-container">
              <Image
                src={selectProfileIcon(element.logo)}
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
