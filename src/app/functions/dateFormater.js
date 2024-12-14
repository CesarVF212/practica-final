export default function dateFormater(dateString) {
  const date = new Date(dateString);

  if (date == "Invalid Date") return "Nunca";
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleString("es-ES", options);
}
