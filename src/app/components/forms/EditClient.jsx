// LIBRERIAS
import { useRouter } from "next/navigation";

// FUNCIONES.
import getClients from "@/app/functions/fetch/getClients";

export default function EditClient(client) {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById("name-box").value;
    const addressStreet = document.getElementById("address-street-box").value;
    const addressNumber = document.getElementById("address-number-box").value;
    const addressCity = document.getElementById("address-city-box").value;
    const addressRegion = document.getElementById("address-region-box").value;
    const addressPostalcode = document.getElementById("address-code-box").value;
    const cif = document.getElementById("cif-box").value;
    const logoFile = document.getElementById("logo-box").files[0];

    if (
      !name ||
      !addressStreet ||
      !addressNumber ||
      !addressCity ||
      !addressRegion ||
      !addressPostalcode ||
      !cif ||
      !logoFile
    ) {
      alert("ERROR: Todos los campos son obligatorios, incluyendo el logo.");
      return;
    }

    if (containsNumbers(addressStreet)) {
      alert("ERROR: Se han introducido valores numéricos en la dirección.");
      return;
    }

    editClient(
      id,
      name,
      addressStreet,
      addressNumber,
      addressCity,
      addressRegion,
      addressPostalcode,
      cif,
      logoFile
    )
      .then(() => {
        alert(`Se ha editado el cliente ${name}`);
        router.push("../main");
      })
      .catch((error) => {
        console.error("ERROR al editar el cliente:", error);
        alert("ERROR: No se pudo editar el cliente. Revisa la consola.");
      });
  };

  return (
    <div className="form-box w-[35vw] h-[50vh]">
      {console.log(client)}
      <h2>EDITAR CLIENTE</h2>
      <form className="w-[80%]" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name-box">Cliente / Empresa:</label>
          <input
            type="text"
            id="name-box"
            name="name"
            defaultValue={client.name}
            required
          />
        </div>
        <div className="address-box">
          <span>
            <label htmlFor="address-street-box">
              Dirección de facturación:
            </label>
            <input
              type="text"
              id="address-street-box"
              name="address"
              defaultValue={client.address.street}
              required
            />
          </span>
          <span>
            <label htmlFor="address-number-box">Número:</label>
            <input
              type="number"
              id="address-number-box"
              name="address-number"
              min="0"
              defaultValue={client.address.number}
              required
            />
          </span>
        </div>
        <div className="address-extra-box">
          <span>
            <label htmlFor="address-city-box">Ciudad:</label>
            <input
              type="text"
              id="address-city-box"
              name="address-city"
              defaultValue={client.address.city}
              required
            />
          </span>
          <span>
            <label htmlFor="address-code-box">Código postal:</label>
            <input
              type="number"
              id="address-code-box"
              name="address-code"
              min="0"
              max="99999"
              defaultValue={client.address.code}
              required
            />
          </span>
          <span>
            <label htmlFor="address-region-box">Région:</label>
            <input
              type="text"
              id="address-region-box"
              name="address-region"
              defaultValue={client.address.province}
              required
            />
          </span>
        </div>
        <div>
          <label htmlFor="cif-box">CIF:</label>
          <input
            type="number"
            min="10000000"
            max="99999999"
            id="cif-box"
            name="cif"
            defaultValue={client.cif}
            required
          />
        </div>
        <div>
          <label htmlFor="logo-box">Logo:</label>
          <input
            type="file"
            id="logo-box"
            name="logo"
            accept="image/*"
            required
          />
        </div>
        <div className="flex flex-row justify-between">
          <Link href={"../main"}>
            <button
              type="button"
              className="bg-red-500 text-white font-bold py-2 px-4 rounded"
            >
              Discard
            </button>
          </Link>
          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
