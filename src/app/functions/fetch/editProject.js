export default function editProject(
  id,
  name,
  addressStreet,
  addressNumber,
  addressCity,
  addressRegion,
  addressPostalcode,
  client_id,
  email
) {
  const url = `https://bildy-rpmaya.koyeb.app/api/project/${id}`;
  const token = localStorage.getItem("jwt");

  if (!token) {
    return Promise.reject(
      new Error(
        "Token no encontrado. No se puede autorizar el acceso a la API."
      )
    );
  }

  const data = {
    name: name,
    projectCode: `${id}:${client_id}`,
    address: {
      street: addressStreet,
      number: addressNumber,
      postal: addressPostalcode,
      city: addressCity,
      province: addressRegion,
    },
    email: email,
    code: `${id}:${client_id}`,
    clientId: client_id,
    updatedAt: new Date().toISOString(),
  };

  return fetch(url, {
    method: "PUT",
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
