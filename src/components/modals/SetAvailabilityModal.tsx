import React from "react";
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
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useAvailabilityStore } from "@/store/useAvailabilityStore";
import { toast } from "sonner"; // Optional: for success notifications
import SelectDaysForm from "../availability/SelectDays";
import SelectTimesForm from "../availability/SelectTimes";
import PaymentDetailsForm from "../availability/SetPaymentDetails";
import ReviewForm from "../availability/Review";
import { ChevronLeft } from "lucide-react";

export interface SetAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  { number: 1, title: "Select Days" },
  { number: 2, title: "Set Times" },
  { number: 3, title: "Payment" },
  { number: 4, title: "Review" },
];

function SetAvailabilityModal({ isOpen, onClose }: SetAvailabilityModalProps) {
  const { currentStep, setCurrentStep, resetForm } = useAvailabilityStore();

  const handleClose = () => {
    onClose();
    // Reset form when modal is closed
    setTimeout(() => {
      resetForm();
    }, 300); // Small delay to allow modal animation to complete
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  const handleComplete = () => {
    toast?.success?.("Availability set successfully!"); // Optional toast notification
    handleClose();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <SelectDaysForm onNext={handleNext} />;
      case 2:
        return (
          <SelectTimesForm onNext={handleNext} onPrevious={handlePrevious} />
        );
      case 3:
        return (
          <PaymentDetailsForm onNext={handleNext} onPrevious={handlePrevious} />
        );
      case 4:
        return (
          <ReviewForm
            onPrevious={handlePrevious}
            onEdit={handleEdit}
            onComplete={handleComplete}
          />
        );
      default:
        return <SelectDaysForm onNext={handleNext} />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button className="px-9 h-auto py-2 hover:bg-secondary bg-primary">
          Set Availability
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl gap-10 max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle className="font-semibold text-primary text-[32px]">
            Set Your Availability
          </DialogTitle>
          <DialogDescription className="text-lg text-[#757575] font-montserrat">
            Configure your teaching schedule and payment details
          </DialogDescription>
        </DialogHeader>

        <div className="w-full p-[30px] space-y-8 border rounded">
          <div className="mx-auto max-w-xl space-y-8 text-center">
            <Stepper value={currentStep} onValueChange={setCurrentStep}>
              {steps.map((step) => (
                <StepperItem
                  key={step.number}
                  step={step.number}
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
              ))}
            </Stepper>
          </div>

          {currentStep > 1 && (
            <Button
              variant="link"
              className="text-sm font-semibold"
              onClick={handlePrevious}
            >
              <ChevronLeft className="size-4 text-secondary" /> Back
            </Button>
          )}

          {/* Current Step Content */}
          <div className="min-h-[400px]">{renderCurrentStep()}</div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center">
          <div className="flex gap-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  {
                    "bg-primary": currentStep >= step.number,
                    "bg-gray-300": currentStep < step.number,
                  }
                )}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SetAvailabilityModal;
