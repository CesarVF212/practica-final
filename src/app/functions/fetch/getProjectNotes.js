export default function getProjectNotes(projectId) {
  const url = `/api/deliverynote/project/${projectId}`;
  const token = localStorage.getItem("jwt");

  if (!token) {
    console.error("ERROR: No se encuentra el token.");
    return Promise.resolve([]); // Devuelve un array vacío si no hay token
  }

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("ERROR al obtener los albaranes");
      }
      return response.json();
    })
    .catch(() => {
      // En caso de error, devuelve un array vacío
      return [];
    });
}
