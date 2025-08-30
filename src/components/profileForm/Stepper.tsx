"use client";

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { cn } from "@/lib/utils";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  onStepChange?: (step: number) => void;
  completedSteps?: { [key: number]: boolean };
}

const steps = [
  { number: 1, title: "Bio Data" },
  { number: 2, title: "Career Experience" },
  { number: 3, title: "Identity Document" },
  { number: 4, title: "Introduction Video" },
];

export default function CustomStepper({
  currentStep,
  onStepChange,
}: StepperProps) {
  return (
    <div className="w-full">
      <Stepper
        value={currentStep + 1}
        onValueChange={(val) => onStepChange?.(val - 1)}
        className="flex items-center justify-between"
      >
        {steps.map((step, index) => {
          return (
            <StepperItem
              key={index}
              step={index + 1}
              className="relative not-last:flex-1 items-end"
            >
              <StepperTrigger className="flex-col gap-3 rounded">
                <StepperTitle
                  className={cn(
                    "opacity-0 transition-all duration-200 text-secondary",
                    {
                      "opacity-100": currentStep === step.number,
                    }
                  )}
                >{`${currentStep}/${steps.length}`}</StepperTitle>
                <StepperIndicator className="data-[state=active]:border-primary size-5 data-[state=active]:border-2 data-[state=active]:bg-transparent [&_span]:sr-only [&_svg]:size-3" />
              </StepperTrigger>
              {step.number < steps.length && (
                <StepperSeparator className="mb-2" />
              )}
            </StepperItem>
          );
        })}
      </Stepper>
    </div>
  );
}
