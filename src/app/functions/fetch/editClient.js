// FUNCIONES
import uploadLogo from "../uploadLogo";

export default async function editClient(
  id,
  name,
  addressStreet,
  addressNumber,
  addressCity,
  addressRegion,
  addressPostalcode,
  cif,
  logo
) {
  const token = localStorage.getItem("jwt");
  const apiClientUrl = `https://bildy-rpmaya.koyeb.app/api/client/${id}`;

  if (!token) {
    console.error("ERROR: No se puede autorizar el acceso a la API.");
    return;
  }

  try {
    // Subimos el logo a Cloudinary y obtenemos la URL
    const logoUrl = await uploadLogo(logo);

    // Construimos el cuerpo de la solicitud
    const clientData = {
      name,
      cif,
      address: {
        street: addressStreet,
        number: addressNumber,
        postal: addressPostalcode,
        city: addressCity,
        province: addressRegion,
      },
      logo: logoUrl, // URL del logo subido
      updatedAt: new Date().toISOString(),
      activeProjects: 0,
      pendingDeliveryNotes: 0,
    };

    // Enviamos los datos del cliente a la API
    const response = await fetch(apiClientUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(clientData),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Detalle del error:", error);
      throw new Error("Error al editar el cliente.");
    }

    return await response.json();
  } catch (error) {
    console.error("ERROR al editar el cliente:", error);
    throw error;
  }
}
