import { useState } from "react";

export function useDashboardActions() {
  const [isGuestModalOpen, setGuestModalOpen] = useState(false);
  const [isExpenseModalOpen, setExpenseModalOpen] = useState(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  return {
    // guest
    isGuestModalOpen,
    openGuestModal: () => setGuestModalOpen(true),
    closeGuestModal: () => setGuestModalOpen(false),

    // expense
    isExpenseModalOpen,
    openExpenseModal: () => setExpenseModalOpen(true),
    closeExpenseModal: () => setExpenseModalOpen(false),

    // payment
    isPaymentModalOpen,
    openPaymentModal: () => setPaymentModalOpen(true),
    closePaymentModal: () => setPaymentModalOpen(false),
  };
}
