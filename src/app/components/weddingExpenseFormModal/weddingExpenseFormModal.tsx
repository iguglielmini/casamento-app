"use client";
import { useEffect, useState } from "react";
import { WeddingExpense } from "../weddingExpenseList/weddingExpenseList";

interface WeddingExpenseFormModalProps {
  onClose: () => void;
  onSubmit: (expense: Partial<WeddingExpense>) => Promise<void>;
  expense?: WeddingExpense | null;
  typeSuggestions?: WeddingExpense[];
}

export default function WeddingExpenseFormModal({
  onClose,
  onSubmit,
  expense,
  typeSuggestions = [],
}: WeddingExpenseFormModalProps) {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [totalValue, setTotalValue] = useState("R$ 0,00");
  const [paidValue, setPaidValue] = useState("R$ 0,00");

  const formatCurrency = (value: string | number) => {
    let number = 0;

    if (typeof value === "string") {
      const numeric = value.replace(/\D/g, "");
      number = parseFloat(numeric) / 100;
    } else {
      number = value;
    }

    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  };

  const parseCurrencyToNumber = (formatted: string) => {
    return parseFloat(formatted.replace(/[R$\s.]/g, "").replace(",", ".")) || 0;
  };

  useEffect(() => {
    if (expense) {
      setDate(expense.date.split("T")[0]);
      setDescription(expense.description);
      setType(expense.type);
      setTotalValue(formatCurrency(expense.totalValue));
      setPaidValue(formatCurrency(expense.paidValue));
    }
  }, [expense]);

  useEffect(() => {
    if (!expense && type.trim()) {
      const matchedExpenses = typeSuggestions.filter(
        (e) => e.type.toLowerCase() === type.toLowerCase()
      );

      if (matchedExpenses.length > 0) {
        const totalValueOfTipo = matchedExpenses[0].totalValue;
        const totalPago = matchedExpenses.reduce(
          (sum, e) => sum + e.paidValue,
          0
        );

        const saldoRestante = totalValueOfTipo - totalPago;

        if (saldoRestante > 0) {
          setTotalValue(formatCurrency(saldoRestante));
        }
      }
    }
  }, [type, typeSuggestions, expense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const finalDate = `${date}T00:00:00.000`;
  
    onSubmit({
      id: expense?.id,
      date: finalDate,
      description,
      type,
      totalValue: parseCurrencyToNumber(totalValue),
      paidValue: parseCurrencyToNumber(paidValue),
    });
  };
  

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4">
            {expense ? "Editar Despesa" : "Nova Despesa"}
          </h2>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border p-3 mb-3 w-full rounded"
          />

          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border p-3 mb-3 w-full rounded"
          />

          <input
            type="text"
            list="expense-types"
            placeholder="Tipo"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="border p-3 mb-3 w-full rounded"
          />
          <datalist id="expense-types">
            {Array.from(new Set(typeSuggestions.map((e) => e.type))).map(
              (t) => (
                <option key={t} value={t} />
              )
            )}
          </datalist>

          <input
            type="text"
            placeholder="Valor Total"
            value={totalValue}
            onChange={(e) => setTotalValue(formatCurrency(e.target.value))}
            required
            className="border p-3 mb-3 w-full rounded"
          />

          <input
            type="text"
            placeholder="Valor Pago"
            value={paidValue}
            onChange={(e) => setPaidValue(formatCurrency(e.target.value))}
            required
            className="border p-3 mb-3 w-full rounded"
          />

          <button
            type="submit"
            className="bg-(--marsala) text-white px-4 py-2 w-full rounded mt-4"
          >
            {expense ? "Atualizar Despesa" : "Cadastrar Despesa"}
          </button>
        </form>
      </div>
    </div>
  );
}
