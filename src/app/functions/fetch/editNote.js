export default function addNote(
  noteId,
  clientId,
  projectId,
  format,
  material,
  hours,
  description,
  workdate
) {
  const url = `https://bildy-rpmaya.koyeb.app/api/deliverynote/${noteId}`;
  const token = localStorage.getItem("jwt");

  // Verificamos si hay un Token.
  if (!token) {
    console.error(
      "ERROR (NEWnote.addnote()): No se puede autorizar el acceso a la API"
    );
  }

  let data = {
    clientId: clientId,
    projectId: projectId,
    format: format,
    material: material,
    hours: parseInt(hours, 10),
    description: description,
    workdate: workdate,
    updatedAt: new Date().toISOString(),
  };

  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(
        "ERROR (NEWnote.addnote()): ha habido un error al introducir un nuevo note."
      );
    }
    return response.json();
  });
}
