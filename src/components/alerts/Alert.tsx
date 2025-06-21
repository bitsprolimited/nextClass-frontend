import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";

// ✅ Export the interface so it can be reused elsewhere
export interface AlertProps {
  title: string;
  message: string;
  variant?: "info" | "success" | "warning" | "error";
  buttonText?: string;
  onButtonClick?: () => void;
  onClose?: () => void;
}

const variantStyles = {
  info: "bg-[#E0F2FE] text-blue-800",
  success: "bg-[#E6F4EA] text-green-800",
  warning: "bg-[#FFF5E9] text-orange-800",
  error: "bg-[#FDEAEA] text-red-800",
};

export default function Alert({
  title,
  message,
  variant = "info",
  buttonText,
  onButtonClick,
  onClose,
}: AlertProps) {
  return (
    <div
      className={`w-full rounded-xl shadow p-4 sm:p-6 flex flex-col flex-wrap sm:flex-row justify-between items-center mb-6 ${variantStyles[variant]}`}
    >
      <div className="text-sm sm:text-base">
        <p className="font-semibold">{title}</p>
        <p className="mt-2">{message}</p>
      </div>
      <div className="flex items-center gap-2 mt-4 sm:mt-0">
        {buttonText && (
          <Button
            className="bg-[#FFA300] text-white font-semibold rounded-full px-4 py-2"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        )}
        {onClose && (
          <button onClick={onClose} className="text-red-600 text-xl font-bold">
            <X />
          </button>
        )}
      </div>
    </div>
  );
}
