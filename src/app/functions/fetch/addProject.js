export default function addProject(
  name,
  notes,
  addressStreet,
  addressNumber,
  addressCity,
  addressRegion,
  addressPostalcode,
  client_id
) {
  const url = "https://bildy-rpmaya.koyeb.app/api/project";
  const token = localStorage.getItem("jwt");

  if (!token) {
    return Promise.reject(
      new Error(
        "Token no encontrado. No se puede autorizar el acceso a la API."
      )
    );
  }

  const data = {
    name,
    projectCode: "Identificador de proyecto",
    email: "ejemplo@gmail.com",
    address: {
      street: addressStreet,
      number: addressNumber,
      postal: addressPostalcode,
      city: addressCity,
      province: addressRegion,
    },
    code: "Código interno del proyecto",
    clientId: client_id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          console.error("Error response body:", err);
          throw new Error(
            `ERROR (NEWPROJECT.addProject): ${
              err.message || "Error desconocido"
            }`
          );
        });
      }
      return response.json();
    })
    .catch((error) => {
      console.error(
        "ERROR (NEWPROJECT.addProject): Hubo un error al realizar la solicitud:",
        error
      );
      throw error;
    });
}
