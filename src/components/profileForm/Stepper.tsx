"use client";

import {
  Stepper,
  StepperItem,
  StepperTrigger,
  StepperSeparator,
} from "@/components/ui/stepper";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  onStepChange?: (step: number) => void;
}

export default function CustomStepper({
  currentStep,
  totalSteps,
  onStepChange,
}: StepperProps) {
  return (
    <div className="w-full">
      {/* Step Count */}
      <div className="text-sm font-medium text-[#FFA500] mb-4">
        {currentStep + 1}/{totalSteps}
      </div>

      <Stepper
        value={currentStep + 1}
        onValueChange={(val) => onStepChange?.(val - 1)}
        className="flex items-center justify-between"
      >
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <StepperItem key={index} step={index + 1} className="flex-1">
              <StepperTrigger className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all",
                    {
                      "bg-white border-[#001E62]": isCompleted,
                      "bg-[#001E62] border-transparent ring-4 ring-[#DCE2F3]":
                        isActive,
                      "bg-[#DCE2F3] border-[#001E62]":
                        !isCompleted && !isActive,
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-[#001E62]" />
                  ) : isActive ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  ) : null}
                </div>
              </StepperTrigger>

              {/* Line Separator */}
              {index < totalSteps - 1 && (
                <StepperSeparator className="h-[2px] bg-slate-200 w-full " />
              )}
            </StepperItem>
          );
        })}
      </Stepper>
    </div>
  );
}
