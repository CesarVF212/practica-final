export default function downloadNote(note) {
  const url = `https://bildy-rpmaya.koyeb.app/api/deliverynote/pdf/${note._id}`;
  const token = localStorage.getItem("jwt");

  if (!token)
    throw new Error("ERROR (MAIN.getnotes()): no se encuentra el Token.");

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("ERROR (MAIN): error al obtener los notes:");
      }
      return response.blob(); // Cambia a blob para manejar el archivo PDF
    })
    .then((blob) => {
      const link = document.createElement("a"); // Crea un enlace de descarga
      const url = URL.createObjectURL(blob); // Crea una URL para el blob
      link.href = url;
      link.download = `${note._id}.pdf`; // Nombre del archivo a descargar
      link.click(); // Simula el clic para iniciar la descarga
      URL.revokeObjectURL(url); // Revoca la URL para liberar recursos
    })
    .catch((error) => {
      console.error(error);
    });
}
