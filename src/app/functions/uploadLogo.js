"use client";

export default async function uploadLogo(file) {
  try {
    // Crea un FormData para la subida
    const formData = new FormData();
    formData.append("file", file); // Añade el archivo al FormData
    formData.append("upload_preset", "ml_default"); // Tu upload preset configurado

    // Realiza la petición POST a Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dgwztmtwi/image/upload`, // URL de subida a Cloudinary
      {
        method: "POST",
        body: formData, // El cuerpo contiene el archivo
      }
    );

    if (response.ok) {
      const data = await response.json(); // Obtén la respuesta en formato JSON
      console.log("Logo subido con éxito:", data.secure_url); // Muestra la URL segura del logo
      const logoUrl = data.secure_url; // Guarda la URL segura para usarla más tarde

      // Aquí puedes hacer lo que necesites con la URL, por ejemplo, actualizar un estado
      return logoUrl; // Devuelve la URL segura
    } else {
      console.error("Error al subir el logo.");
      alert("No se pudo subir el logo.");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    alert("Hubo un problema con la subida del logo.");
  }
}
