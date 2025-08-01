"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bioDataSchema } from "@/lib/constants";
import { BioDataFormValues } from "@/services/biodata";
import StepOne from "@/components/profileForm/StepOne";
import StepTwo from "@/components/profileForm/StepTwo";
import CustomStepper from "@/components/profileForm/Stepper";
import StepThree from "@/components/profileForm/StepThree";
import StepFour from "@/components/profileForm/StepFour";

export default function FormWrapper() {
  const [step, setStep] = useState(0);

  const methods = useForm<BioDataFormValues>({
    resolver: zodResolver(bioDataSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      address: "",
      about: "",
      // StepTwo fields can be omitted for now
    },
  });

  const stepTitles = ["Bio Data", "Career", "Documents", "Confirmation"];

  const onNext = () => {
    // Skip validation for now
    setStep((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#f6f4f9] py-12 px-10 max-w-6xl w-full mx-auto my-10">
      <div className="max-w-[418px] w-full mx-auto space-y-10 px-8 py-10">
        {/* Stepper */}
        <CustomStepper
          currentStep={step}
          totalSteps={stepTitles.length}
          onStepChange={setStep}
        />

        {/* Form */}
        <FormProvider {...methods}>
          <div className="mt-6">
            {step === 0 && <StepOne onNext={onNext} />}
            {step === 1 && <StepTwo onNext={onNext} />}
            {step === 2 && <StepThree onNext={onNext} />}
            {step === 3 && (
              <StepFour
                onBack={() => setStep(2)}
                onSubmit={() => console.log("Submitting all")}
              />
            )}
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
