"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboard } from "@/contexts/dashboardContext";
import { Menu, X } from "lucide-react";

export default function DashboardHeader() {
  const pathname = usePathname();
  const { logout } = useDashboard();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded hover:bg-white/10 transition ${
      pathname === path ? "bg-white/20 font-semibold" : ""
    }`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-(--marsala) text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-cursive">Ítalo & Daniely</h1>

        {/* desktop */}
        <nav className="hidden md:flex gap-4 items-center">
          <Link href="/dashboard" className={linkClass("/dashboard")}>Home</Link>
          <Link href="/dashboard/guest" className={linkClass("/dashboard/guest")}>Convidados</Link>
          <Link href="/dashboard/users" className={linkClass("/dashboard/users")}>Usuários</Link>
          <button
            onClick={logout}
            className="bg-(--paragraph) hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Sair
          </button>
        </nav>

        {/* toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* mobile menu com transição */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden bg-(--marsala) px-4 ${
          isMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0"
        }`}
      >
        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className={linkClass("/dashboard")}>Home</Link>
        <Link href="/dashboard/guest" onClick={() => setIsMenuOpen(false)} className={linkClass("/dashboard/guest")}>Convidados</Link>
        <Link href="/dashboard/users" onClick={() => setIsMenuOpen(false)} className={linkClass("/dashboard/users")}>Usuários</Link>
        <button
          onClick={() => {
            logout();
            setIsMenuOpen(false);
          }}
          className="bg-(--paragraph) hover:bg-red-700 text-white px-4 py-2 rounded w-full text-left mt-2"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
