export default function getClients() {
  const url = "https://bildy-rpmaya.koyeb.app/api/client";
  const token = localStorage.getItem("jwt");

  if (!token)
    throw new Error("ERROR (MAIN.getClients()): no se encuentra el Token.");

  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("ERROR (MAIN): error al obtener los clientes:");
    }
    return response.json();
  });
}
