export default function addClient(
  name,
  addressStreet,
  addressNumber,
  addressCity,
  addressRegion,
  addressPostalcode,
  cif
) {
  const url = "https://bildy-rpmaya.koyeb.app/api/client";
  const token = localStorage.getItem("jwt");

  const date = new Date();
  const timeCreated = date.getTime();

  // Verificamos si hay un Token.
  if (!token) {
    console.error(
      "ERROR (NEWCLIENT.addClient()): No se puede autorizar el acceso a la API"
    );
  }

  const data = {
    name: name,
    address: {
      street: addressStreet,
      number: addressNumber,
      postal: addressPostalcode,
      city: addressCity,
      province: addressRegion,
    },
    cif: cif,
    createdAt: timeCreated,
    updatedAt: timeCreated,
  };

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        "ERROR (NEWCLIENT.addClient()): ha habido un error al introducir un nuevo cliente."
      );
    }
    return response.json();
  });
}
