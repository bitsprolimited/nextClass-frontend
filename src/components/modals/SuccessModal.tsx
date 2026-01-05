"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import React from "react";

export interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  highlight: string;
  message: string;
  buttonText: string;
  onProceed?: () => void;
}

export default function SuccessDialog({
  isOpen,
  onClose,
  title,
  highlight,
  message,
  buttonText,
  // onProceed,
}: SuccessDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[650px] rounded-[20px] p-8">
        <DialogHeader className="items-center text-center">
          <DialogTitle className="text-3xl font-serif">
            <span className="text-[#2c241b]">{title} </span>
            <span className="text-[#ffa300]">{highlight}</span>
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground mt-2">
            {message}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 mt-6">
          <div className="relative w-[120px] h-[120px] flex items-center justify-center">
            <CheckIcon className="w-full h-full text-green-500 stroke-[1.5]" />
            <div className="absolute bottom-0 w-20 h-1 bg-[#59bf354f] rounded-full" />
          </div>

          <Button
            className="w-[300px] h-[50px] bg-[#ffa300] rounded-full hover:bg-[#e89400]"
            onClick={onClose}
          >
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
