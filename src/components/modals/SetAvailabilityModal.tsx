import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Button } from "../ui/button";

export interface SetAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [1, 2, 3, 4];

function SetAvailabilityModal({ isOpen, onClose }: SetAvailabilityModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button className="px-9 h-auto py-2 hover:bg-secondary bg-primary">
          Set Availabilty
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-semibold text-primary text-[32px]">
            Set Your Availability
          </DialogTitle>
          <DialogDescription className="text-lg text-[#757575] font-montserrat">
            Set your Availability
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          <div className="mx-auto w-full max-w-xl space-y-8 text-center">
            <Stepper
              className="w-full flex justify-between"
              value={currentStep}
              onValueChange={setCurrentStep}
            >
              {steps.map((step) => (
                <StepperItem key={step} step={step} className="not-">
                  <StepperTrigger>
                    <StepperIndicator className="data-[state=active]:border-primary size-4 data-[state=active]:border-2 data-[state=active]:bg-transparent [&_span]:sr-only [&_svg]:size-3" />
                  </StepperTrigger>
                  {step < steps.length && <StepperSeparator />}
                </StepperItem>
              ))}
            </Stepper>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SetAvailabilityModal;
