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
  info: { bg: "bg-[#3941D51a]", text: "text-[#3941D5]" },
  success: { bg: "bg-[#39D56D1a]", text: "text-[#21AC5E]" },
  warning: { bg: "bg-[#D58C391a]", text: "text-[#D58C39]" },
  error: { bg: "bg-[#D539391a]", text: "text-[#D53939]" },
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
    if (React.isValidElement(button)) {
      // wrap to make it full-width on mobile, auto on desktop
      return <div className=" md:w-auto shrink-0">{button}</div>;
    }

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
      <div className="w-full md:w-auto shrink-0">
        <Button
          className={cn(
            "w-full md:w-auto text-sm font-semibold px-4 py-3 h-auto rounded-full",
            className
          )}
          onClick={onButtonClick}
          asChild={!!href}
        >
          {href ? <a href={href}>{btnText}</a> : <>{btnText}</>}
        </Button>
      </div>
    );
  };

  return (
    <Alert className={cn("relative rounded-lg px-4 py-4 md:px-6 md:py-5", bg)}>
      {/* Container switches layout per breakpoint */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 w-full">
        {/* Left content: icon + (title+close) + message */}
        <div className="flex-1 min-w-0 max-w-none md:max-w-full">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <Icon
                className={cn("w-6 h-6 md:w-8 md:h-8 shrink-0", text)}
              />
              <AlertTitle
                className={cn(
                  "m-0 font-aero-trial text-base md:text-lg font-medium wrap-break-word",
                  text
                )}
              >
                {title}
              </AlertTitle>
            </div>

            <Button
              variant="ghost"
              onClick={onClose}
              className="text-red-600 p-1 md:p-2 rounded-full hover:bg-transparent hover:text-red-600 shrink-0 items-end"
              aria-label="Close alert"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>

          {/* Message sits below title+close */}
        </div>

        {/* Right block: CTA (full width on mobile, right-aligned on desktop) */}
      </div>
      <div className="flex justify-between items-center mt-2 md:mt-4 gap-4 md:gap-6">
        <AlertDescription className="mt-2 text-[#2C241B]">
          {message}
        </AlertDescription>
        <div className="flex justify-end">{renderButton()}</div>
      </div>
    </Alert>
  );
}
