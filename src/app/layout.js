import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Caesar's Administration",
  description: "Servicio web de administración de albaranes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
