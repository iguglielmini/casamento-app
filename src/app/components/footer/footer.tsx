"use client";

import Link from "next/link";
import { User } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full flex flex-wrap items-center justify-between bg-gray-100 p-8">
      <h1 className="text-3xl">Ítalo & Daniely</h1>
      <Link href="/login" aria-label="Login Admin">
        <User className="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer" />
      </Link>
    </footer>
  );
}
