"use client";
import { format } from "date-fns";

export interface WeddingExpense {
  id: number;
  date: string;
  description: string;
  type: string;
  totalValue: number;
  paidValue: number;
}

interface WeddingExpenseListProps {
  expenses: WeddingExpense[];
  onEdit: (expense: WeddingExpense) => void;
  onDelete: (id: number) => Promise<void>;
}

export default function WeddingExpenseList({
  expenses,
  onEdit,
  onDelete,
}: WeddingExpenseListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="p-2 border">Data</th>
            <th className="p-2 border">Descrição</th>
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Valor Total</th>
            <th className="p-2 border">Valor Pago</th>
            <th className="p-2 border">Saldo</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan={8} className="p-4 text-center text-gray-500">
                Nenhuma despesa cadastrada.
              </td>
            </tr>
          ) : (
            expenses.map((expense) => {
              const saldo = expense.totalValue - expense.paidValue;
              const status =
                saldo <= 0 ? "Pago até hoje" : "Saldo devedor";

              return (
                <tr key={expense.id}>
                  <td className="p-2 border">
                    {format(new Date(expense.date), "dd/MM/yyyy")}
                  </td>
                  <td className="p-2 border">{expense.description}</td>
                  <td className="p-2 border">{expense.type}</td>
                  <td className="p-2 border">
                    R$ {expense.totalValue.toFixed(2)}
                  </td>
                  <td className="p-2 border">
                    R$ {expense.paidValue.toFixed(2)}
                  </td>
                  <td className="p-2 border">
                    R$ {(expense.totalValue - expense.paidValue).toFixed(2)}
                  </td>
                  <td className="p-2 border">{status}</td>
                  <td className="p-2 border text-center space-x-2">
                    <button
                      className="bg-yellow-400 text-white px-2 py-1 rounded"
                      onClick={() => onEdit(expense)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => onDelete(expense.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
