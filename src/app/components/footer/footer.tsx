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
    <footer className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between">
      <Link href={"/"} aria-label="Casamento - Italo e Daniely">
        <img
          alt="flores-retas"
          src="/logo.png"
          className="w-10 m-auto object-cover pb-2"
        />
      </Link>
      <Link href={isLogged ? "/dashboard" : "/login"} aria-label="Area Admin">
        <User className="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer" />
      </Link>
    </footer>
  );
}
