"use client";

import Loader from "@/components/Loader";
import StepFour from "@/components/profileForm/StepFour";
import StepOne from "@/components/profileForm/StepOne";
import CustomStepper from "@/components/profileForm/Stepper";
import StepThree from "@/components/profileForm/StepThree";
import StepTwo from "@/components/profileForm/StepTwo";
import { useUserProgress } from "@/hooks/useProfileFormSubmission";
import { useAuth } from "@/providers/AuthProvider";
import { useFormStore } from "@/store/useProfileSetupForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
function FormContent() {
  const {
    currentStep,
    setCurrentStep,
    setProgress,
    updateBioData,
    updateCareerExperience,
    updateIdentityDocument,
    updateIntroductionVideo,
    syncStepWithProgress,
  } = useFormStore();

  const {
    data: progress,
    isLoading: progressLoading,
    error: progressError,
    refetch: refetchProgress,
  } = useUserProgress();

  const { isLoading, session, refetch } = useAuth();

  const stepTitles = ["Bio Data", "Career", "Documents", "Confirmation"];
  const router = useRouter();

  // Sync step with progress when progress data changes
  useEffect(() => {
    if (progress) {
      setProgress(progress);
      updateBioData(progress.bioData);
      updateCareerExperience(progress.careerExperience);
      updateIdentityDocument(progress.identityDocument);
      updateIntroductionVideo(progress.introductionVideo);
      syncStepWithProgress();
    }
  }, [
    progress,
    setProgress,
    syncStepWithProgress,
    updateBioData,
    updateCareerExperience,
    updateIdentityDocument,
    updateIntroductionVideo,
  ]);

  const handleNext = async () => {
    // Refetch progress after moving to next step
    await refetchProgress();
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleStepChange = (step: number) => {
    // Only allow navigation to completed steps or the next incomplete step
    if (!progress) return;

    const allowedSteps = [];
    if (progress.bioDataComplete || step === 0) allowedSteps.push(0);
    if (progress.careerExperienceComplete || step === 1) allowedSteps.push(1);
    if (progress.identityDocumentComplete || step === 2) allowedSteps.push(2);
    if (progress.introductionVideoComplete || step === 3) allowedSteps.push(3);

    // Allow next incomplete step
    if (!progress.bioDataComplete && step === 0) allowedSteps.push(0);
    else if (
      progress.bioDataComplete &&
      !progress.careerExperienceComplete &&
      step === 1
    )
      allowedSteps.push(1);
    else if (
      progress.careerExperienceComplete &&
      !progress.identityDocumentComplete &&
      step === 2
    )
      allowedSteps.push(2);
    else if (
      progress.identityDocumentComplete &&
      !progress.introductionVideoComplete &&
      step === 3
    )
      allowedSteps.push(3);

    if (allowedSteps.includes(step)) {
      setCurrentStep(step);
    }
  };

  const handleFinalSubmit = async () => {
    refetch();
    await refetchProgress();
  };

  useEffect(() => {
    if (session?.user.isProfileComplete) {
      router.push("/dashboard/tutor");
    }
  }, [session?.user.isProfileComplete, router]);

  // Show loading state while fetching progress
  if (progressLoading || isLoading) {
    return <Loader />;
  }

  // Show error state if progress fetch failed
  if (progressError) {
    return (
      <div className="min-h-screen w-full py-12 px-10 max-w-6xl bg-[#f6f4f9] flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">
              Unable to Load Progress
            </h2>
            <p className="text-red-600 mb-4">
              We couldn&apos;t fetch your current progress. Please check your
              connection and try again.
            </p>
            <button
              onClick={() => refetchProgress()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f4f9] max-w-6xl w-full mx-auto my-10">
      <div className="max-w-[418px] flex flex-col items-center w-full mx-auto space-y-10 px-2 py-10">
        {/* Stepper */}
        <CustomStepper
          currentStep={currentStep}
          totalSteps={stepTitles.length}
          onStepChange={handleStepChange}
          completedSteps={{
            0: progress?.bioDataComplete || false,
            1: progress?.careerExperienceComplete || false,
            2: progress?.identityDocumentComplete || false,
            3: progress?.introductionVideoComplete || false,
          }}
        />

        {/* Form Steps */}
        <div className="mt-6 w-full">
          {currentStep === 0 && <StepOne onNext={handleNext} />}
          {currentStep === 1 && (
            <StepTwo onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 2 && (
            <StepThree onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 3 && (
            <StepFour onBack={handleBack} onSubmit={handleFinalSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function FormWrapper() {
  return <FormContent />;
}
