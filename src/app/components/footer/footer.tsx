"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
  }, []);

  return (
    <footer className="w-full flex flex-wrap items-center justify-between bg-gray-100 p-8">
      <Link href={"/"} aria-label="Casamento - Italo e Daniely">
        <h1 className="text-3xl">Ítalo & Daniely</h1>
      </Link>
      <Link href={isLogged ? "/dashboard" : "/login"} aria-label="Area Admin">
        <User className="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer" />
      </Link>
    </footer>
  );
}
