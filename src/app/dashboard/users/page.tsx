"use client";

import { useEffect, useState } from "react";
import UserFormModal from "../../components/userFormModal/userFormModal";
import Notification from "../../components/notification/notification";
import { PlusCircle } from "lucide-react";

type UserFormData =
  | { username: string; password: string }
  | { id: number; username: string };

interface User {
  id: number;
  username: string;
  createdAt: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "warning";
    message: string;
  } | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/user/list");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  const handleSubmit = async (data: UserFormData) => {
    setModalLoading(true);

    try {
      const url = editingUser ? "/api/user/update" : "/api/user/add";
      const method = editingUser ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setNotification({
          type: "error",
          message: editingUser
            ? "Erro ao atualizar o usuário."
            : "Erro ao adicionar o usuário.",
        });
      } else {
        fetchUsers();
        setNotification({
          type: "success",
          message: editingUser
            ? "Usuário atualizado com sucesso!"
            : "Usuário adicionado com sucesso!",
        });
        setIsModalOpen(false);
        setEditingUser(null);
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: "Erro inesperado ao salvar usuário.",
      });
    } finally {
      setModalLoading(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const deleteUser = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      await fetch(`/api/user/delete?id=${id}`, {
        method: "DELETE",
      });
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-20 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Lista de Usuários</h1>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditingUser(null);
          }}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          <PlusCircle className="w-5 h-5" />
          Adicionar Usuário
        </button>
      </div>
      {notification && (
        <div className="mb-4">
          <Notification
            type={notification.type}
            message={notification.message}
          />
        </div>
      )}

      {loading ? (
        <p>Carregando usuários...</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Criado em</th>
              <th className="p-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="p-2 border">{user.id}</td>
                  <td className="p-2 border">{user.username}</td>
                  <td className="p-2 border">
                    {new Date(user.createdAt).toLocaleString("pt-BR")}
                  </td>
                  <td className="p-2 border text-center space-x-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => {
                        setEditingUser(user);
                        setIsModalOpen(true);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => deleteUser(user.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <UserFormModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingUser(null);
          }}
          onSubmit={handleSubmit}
          loading={modalLoading}
          userToEdit={editingUser || undefined}
        />
      )}
    </div>
  );
}
