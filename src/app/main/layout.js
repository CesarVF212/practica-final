"use client";

import Image from "next/image";

export default function MainLayout({ children }) {
  return (
    <div className="flex">
      <div className="h-screen w-40 bg-gray-800 text-white p-4 fixed top-0 left-0">
        <div className="mb-8">
          <Image
            id="logoImage"
            src="/logo.png"
            alt="Logo"
            width={120}
            height={120}
            className="mx-auto"
          />
        </div>
        <h4 className="text-lg font-bold mb-4 cursor-pointer hover:text-gray-400">
          Resumen
        </h4>
        <h4 className="text-lg font-bold mb-4 cursor-pointer hover:text-gray-400">
          Clientes
        </h4>
        <h4 className="text-lg font-bold mb-4 cursor-pointer hover:text-gray-400">
          Proyectos
        </h4>
        <h4 className="text-lg font-bold mb-4 cursor-pointer hover:text-gray-400">
          Albaranes
        </h4>
        <h4 className="text-lg font-bold mb-4 cursor-pointer hover:text-gray-400">
          Proveedores
        </h4>
        <h4 className="text-lg font-bold mb-4 cursor-pointer hover:text-gray-400">
          Ajustes
        </h4>
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
