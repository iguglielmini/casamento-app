"use client";

import { useState, useEffect } from "react";

interface UserFormData {
  id?: number;
  username: string;
  password: string;
}

interface UserFormModalProps {
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  loading?: boolean;
  userToEdit?: {
    id: number;
    username: string;
  };
}

export default function UserFormModal({
  userToEdit,
  onSubmit,
  onClose,
  loading = false,
}: UserFormModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (userToEdit) {
      setUsername(userToEdit.username);
    }
  }, [userToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) return;

    const data: UserFormData = {
      username,
      password,
    };

    if (userToEdit) {
      data.id = userToEdit.id;
    }

    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4">
            {userToEdit ? "Editar Usuário" : "Novo Usuário"}
          </h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            disabled={loading}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-3 mb-3 w-full rounded"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              required
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 mb-3 w-full rounded pr-10"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-3.5 right-4 text-gray-600 cursor-pointer"
              title={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-(--marsala) text-white px-4 py-2 w-full rounded mt-4"
          >
            {loading
              ? userToEdit
                ? "Atualizando..."
                : "Adicionando..."
              : userToEdit
              ? "Salvar Alterações"
              : "Criar Usuário"}
          </button>
        </form>
      </div>
    </div>
  );
}
