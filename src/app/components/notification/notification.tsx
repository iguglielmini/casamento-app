"use client";

import React from "react";
import { CheckCircle, AlertTriangle, AlertOctagon } from "lucide-react";

interface NotificationProps {
  type: "success" | "error" | "warning";
  message: string;
}

const iconMap = {
  success: (
    <CheckCircle
      data-testid="icon-success"
      className="text-green-600 w-6 h-6"
    />
  ),
  error: (
    <AlertOctagon data-testid="icon-error" className="text-red-600 w-6 h-6" />
  ),
  warning: (
    <AlertTriangle
      data-testid="icon-warning"
      className="text-yellow-600 w-6 h-6"
    />
  ),
};

const bgColorMap = {
  success: "bg-green-100 border-green-600",
  error: "bg-red-100 border-red-600",
  warning: "bg-yellow-100 border-yellow-600",
};

const Notification: React.FC<NotificationProps> = ({ type, message }) => {
  return (
    <div
      className={`flex items-center gap-4 p-4 border-l-4 rounded-md shadow-sm ${bgColorMap[type]} animate-fade-in`}
    >
      {iconMap[type]}
      <span className="text-gray-800 text-sm">{message}</span>
    </div>
  );
};

export default Notification;
