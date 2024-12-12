"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import "@/app/globals.css";

export default function Home() {
  return useRouter().push("./login");
}
