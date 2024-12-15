export default function getNotes() {
  const url = "https://bildy-rpmaya.koyeb.app/api/deliverynote";
  const token = localStorage.getItem("jwt");

  if (!token)
    throw new Error("ERROR (MAIN.getnotes()): no se encuentra el Token.");

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("ERROR (MAIN): error al obtener los notes:");
    }
    return response.json();
  });
}
