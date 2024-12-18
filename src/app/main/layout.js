"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MainLayout({ children }) {
  const Router = useRouter();
  const token = localStorage.getItem("jwt");
  if (!token) Router.push("/login");

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="h-screen w-40 bg-gray-800 text-white p-4 fixed top-0 left-0 z-50">
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
        <nav>
          <Link href="/main/clients">
            <h4 className="text-lg font-bold mb-4 cursor-pointer hover:text-gray-400">
              Clientes
            </h4>
          </Link>
          <Link href="/main/projects">
            <h4 className="text-lg font-bold mb-4 cursor-pointer hover:text-gray-400">
              Proyectos
            </h4>
          </Link>
          <Link href="/main/notes">
            <h4 className="text-lg font-bold mb-4 cursor-pointer hover:text-gray-400">
              Albaranes
            </h4>
          </Link>
          <Link href="/login">
            <h4 className="text-lg font-bold mb-4 cursor-pointer hover:text-gray-400 bg-red-700 text-center rounded">
              Logout
            </h4>
          </Link>
        </nav>
      </div>
      <main className="flex-1 ml-40 p-8 bg-[var(--background)]">
        {children}
      </main>
    </div>
  );
}
