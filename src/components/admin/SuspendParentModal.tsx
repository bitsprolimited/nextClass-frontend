"use client";

import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface SuspendAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const SUSPENSION_REASONS = [
  "Inactivity/Absence",
  "Policy Violation",
  "Poor Performance/Feedback",
  "Administrative Review",
  "Other (Specify in notes)",
];

export function SuspendParentModal({
  isOpen,
  onClose,
  onConfirm,
}: SuspendAccountModalProps) {
  const [selectedReason, setSelectedReason] = useState<string>("");

  const handleConfirm = () => {
    if (selectedReason) {
      onConfirm(selectedReason);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-8 rounded-xl bg-white shadow-2xl">
        {/* Header and Close Button */}
        <DialogHeader className="flex flex-row justify-between items-start">
          {/* Title is usually separate from the header in shadcn but styling it here to match the design */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>

        {/* Content */}
        <div className="text-center space-y-6 mt-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Suspend Tutor Account?
          </h2>
          <p className="text-lg text-gray-700">
            Why are you suspending this tutor&apos;s account?
          </p>

          {/* Select Reason Dropdown */}
          <Select onValueChange={setSelectedReason}>
            <SelectTrigger className="w-full h-12 text-gray-500 border-gray-300">
              <SelectValue placeholder="Select Reason" />
            </SelectTrigger>
            <SelectContent>
              {SUSPENSION_REASONS.map((reason) => (
                <SelectItem key={reason} value={reason}>
                  {reason}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Action Button */}
          <Button
            onClick={handleConfirm}
            disabled={!selectedReason}
            className="w-full h-12 bg-secondary  text-white font-semibold text-lg"
          >
            Suspend Parent
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
