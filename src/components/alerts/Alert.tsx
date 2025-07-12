import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export interface AlertProps {
  title: string | React.JSX.Element;
  message: string | React.JSX.Element;
  variant?: "info" | "success" | "warning" | "error";
  button?: {
    text: string;
    href?: string;
    className?: string;
  };
  Icon: React.ElementType;
  onButtonClick?: () => void;
  onClose?: () => void;
}

const variantBgColors = {
  info: "bg-[#3941D51a]",
  success: "bg-[#39D56D1a]",
  warning: "bg-[#D58C391a]",
  error: "bg-[#D539391a]",
};

const variantTextColors = {
  info: "text-[#3941D5]",
  success: "text-[#21AC5E]",
  warning: "text-[#D58C39]",
  error: "text-[#D53939]",
};


export default function AlertComponent({
  title,
  Icon,
  message,
  variant = "info",
  button,
  onButtonClick,
  onClose,
}: AlertProps) {
  return (
    <Alert
      className={cn(
        "bg-[#d58c391a] rounded-lg flex items-center justify-between gap-4 px-6 py-5",
        variantBgColors[variant]
      )}
    >
      <div className="flex flex-col items-start w-full max-w-[867px] gap-3">
        <div className="text-sm sm:text-base flex items-center gap-3">
          <Icon className={`w-8 h-8 ${variantTextColors[variant]}`} />
          <AlertTitle
            className={`font-aeroTrial sm:text-lg font-medium m-0 ${variantTextColors[variant]}`}
          >
            {title}
          </AlertTitle>
        </div>
        <AlertDescription className="text-[#2C241B]">
          {message}
        </AlertDescription>
      </div>
      {button && (
        <Button
          className={cn(
            "text-sm font-semibold px-4 py-3 h-auto rounded-full",
            button.className
          )}
          onClick={onButtonClick}
        >
          {button.text}
        </Button>
      )}
      <Button
        variant="ghost"
        onClick={onClose}
        className="text-red-600 shrink-0 p-3 size-1 text-xl font-bold rounded-full border border-red-600 hover:bg-transparent hover:text-red-600"
      >
        <X />
        <span className="sr-only">close</span>
      </Button>
    </Alert>
  );
}
