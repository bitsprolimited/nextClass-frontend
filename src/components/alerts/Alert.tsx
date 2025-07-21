import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export interface AlertProps {
  title: string | React.JSX.Element;
  message: string | React.JSX.Element;
  variant?: "info" | "success" | "warning" | "error";
  button?:
    | {
        text: string;
        href?: string;
        className?: string;
      }
    | React.ReactNode;
  Icon: React.ElementType;
  onButtonClick?: () => void;
  onClose?: () => void;
}

const variantStyles = {
  info: {
    bg: "bg-[#3941D51a]",
    text: "text-[#3941D5]",
  },
  success: {
    bg: "bg-[#39D56D1a]",
    text: "text-[#21AC5E]",
  },
  warning: {
    bg: "bg-[#D58C391a]",
    text: "text-[#D58C39]",
  },
  error: {
    bg: "bg-[#D539391a]",
    text: "text-[#D53939]",
  },
};

export default function AlertComponent({
  title,
  message,
  variant = "info",
  Icon,
  button,
  onButtonClick,
  onClose,
}: AlertProps) {
  const { bg, text } = variantStyles[variant];

  const renderButton = () => {
    if (!button) return null;

    if (React.isValidElement(button)) return button;

    const {
      text: btnText,
      href,
      className,
    } = button as {
      text: string;
      href?: string;
      className?: string;
    };

    return (
      <Button
        className={cn(
          "text-sm font-semibold px-4 py-3 h-auto rounded-full",
          className
        )}
        onClick={onButtonClick}
        asChild={!!href}
      >
        {href ? <a href={href}>{btnText}</a> : <>{btnText}</>}
      </Button>
    );
  };

  return (
    <Alert
      className={cn(
        "rounded-lg flex items-center justify-between gap-4 px-6 py-5",
        bg
      )}
    >
      <div className="flex flex-col items-start w-full max-w-[867px] gap-3">
        <div className="text-sm sm:text-base flex items-center gap-3">
          <Icon className={cn("w-8 h-8", text)} />
          <AlertTitle
            className={cn("font-aeroTrial sm:text-lg font-medium m-0", text)}
          >
            {title}
          </AlertTitle>
        </div>
        <AlertDescription className="text-[#2C241B]">
          {message}
        </AlertDescription>
      </div>

      {renderButton()}

      <Button
        variant="ghost"
        onClick={onClose}
        className="text-red-600 shrink-0 p-3 size-1 text-xl font-bold rounded-full border border-red-600 hover:bg-transparent hover:text-red-600"
      >
        <X />
        <span className="sr-only">Close</span>
      </Button>
    </Alert>
  );
}
