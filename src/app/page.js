"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import "./globals.css";

export default function Home() {
  return useRouter().push("./pages/login");
}
