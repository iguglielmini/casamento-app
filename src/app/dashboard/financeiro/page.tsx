"use client";

import { useState, useEffect } from "react";
import WeddingExpenseList, {
  WeddingExpense,
} from "../../components/weddingExpenseList/weddingExpenseList";
import WeddingExpenseFormModal from "../../components/weddingExpenseFormModal/weddingExpenseFormModal";
import Notification from "../../components/notification/notification";
import { PlusCircle } from "lucide-react";

export default function FinanceiroPage() {
  const [expenses, setExpenses] = useState<WeddingExpense[]>([]);
  const [editingExpense, setEditingExpense] = useState<WeddingExpense | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const fetchExpenses = async () => {
    const res = await fetch("/api/wedding-expense/list");
    const data = await res.json();

    const mergedExpenses = Array.isArray(data) ? data : Object.values(data).flat();
    setExpenses(mergedExpenses);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSave = async (expense: Partial<WeddingExpense>) => {
    const isEditing = !!expense.id;

    const url = isEditing
      ? "/api/wedding-expense/update"
      : "/api/wedding-expense/add";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense),
      });

      const data = await res.json();

      setNotification({
        type: res.ok ? "success" : "error",
        message: res.ok
          ? isEditing
            ? "Despesa atualizada com sucesso!"
            : "Despesa adicionada!"
          : data.error || "Erro ao salvar despesa",
      });

      if (res.ok) {
        fetchExpenses();
        setIsModalOpen(false);
        setEditingExpense(null);
      }
    } catch (error) {
      console.error("Erro ao salvar despesa:", error);
      setNotification({
        type: "error",
        message: "Erro inesperado ao salvar despesa.",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir esta despesa?")) return;

    await fetch(`/api/wedding-expense/delete?id=${id}`, { method: "DELETE" });
    fetchExpenses();
  };

  return (
    <div className="max-w-6xl mx-auto mt-20 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Controle de Gastos</h1>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => {
            setEditingExpense(null);
            setIsModalOpen(true);
          }}
        >
          <PlusCircle className="w-5 h-5" />
          Nova Despesa
        </button>
      </div>

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
        />
      )}

      <WeddingExpenseList
        expenses={expenses}
        onEdit={(expense) => {
          setEditingExpense(expense);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <WeddingExpenseFormModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSave}
          expense={editingExpense}
          typeSuggestions={expenses} // 🔥 Passa todas as despesas como sugestões
        />
      )}
    </div>
  );
}
