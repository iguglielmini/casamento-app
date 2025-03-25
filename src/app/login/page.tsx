"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } else {
      setError("Usuário ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--marsala)">
      <form onSubmit={handleLogin} className="bg-white p-8 shadow rounded">
        <h1 className="text-6xl font-bold mb-4">Login</h1>
        <input
          type="text"
          placeholder="Username"
          required
          className="border p-2 w-full mb-2 rounded"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-(--marsala) text-white px-4 py-2 rounded"
        >
          Entrar
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
    </div>
  );
}
