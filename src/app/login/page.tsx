"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      <form onSubmit={handleLogin} className="bg-white p-8 m-8 md:m-0 shadow rounded">
        <h1 className="text-6xl font-bold mb-4">Login</h1>
        <input
          type="text"
          placeholder="Username"
          required
          className="border p-4 w-full mb-2 rounded-full"
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            className="border p-4 w-full rounded-full pr-12"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          type="submit"
          className="bg-(--marsala) text-white px-4 py-4 w-full rounded-full"
        >
          Entrar
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
    </div>
  );
}
