import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Building2, Calendar, Coins, Edit3, Loader2 } from "lucide-react";
import { useAvailabilityStore } from "@/store/useAvailabilityStore";
import { useSubmitAvailability } from "@/services/availability.service";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface ReviewFormProps {
  onPrevious: () => void;
  onEdit: (step: number) => void;
  onComplete: () => void;
}

function ReviewForm({ onEdit, onComplete }: ReviewFormProps) {
  const { formData, getFormattedSubmissionData, resetForm } =
    useAvailabilityStore();
  const submitMutation = useSubmitAvailability();

  const handleSubmit = async () => {
    try {
      const submissionData = getFormattedSubmissionData();
      await submitMutation.mutateAsync(submissionData);
      onComplete();
      resetForm();
    } catch (error) {
      console.error("Failed to submit availability:", error);
    }
  };

  const availableDays = formData.availabilities.filter(
    (day) => day.isAvailable
  );

  return (
    <div className="flex flex-col gap-8 px-5 py-6 bg-[#f5f5f5] rounded-xl">
      <div className="flex flex-col items-start gap-1 flex-[0_0_auto]">
        <p className="font-semibold text-primary text-xl font-montserrat">
          Review Availability Settings
        </p>
        <div className="flex items-start gap-1.5">
          <Separator className="bg-secondary w-5 h-1 rounded-full" />
          <Separator className="bg-secondary w-[7px] h-1 rounded-full" />
          <Separator className="bg-secondary w-[11px] h-1 rounded-full" />
        </div>
      </div>

      {/* Payment Details Review */}
      <div className="py-4 p-6 border border-[#0A4D3C33] bg-white rounded-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <p className="text-primary font-semibold text-lg">Payment Details</p>
          <Button
            type="button"
            className="bg-secondary px-4 py-2 hover:bg-primary flex items-center rounded-full"
            onClick={() => onEdit(3)}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="flex items-center gap-2">
              <Coins className="text-secondary" />
              <span className="text-primary font-semibold">
                Rate per Session
              </span>
            </p>
            <p className="text-primary font-montserrat">
              <span className="text-2xl">
                ${formData.pricing.ratePerSession}/
              </span>
              <span className="text-xl font-light">session</span>
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="flex items-center gap-2">
              <Building2 className="text-secondary" />
              <span className="text-primary font-semibold">Bank Details</span>
            </p>
            <div className="flex flex-col items-end gap-1.5 font-montserrat">
              <p className="text-primary">
                <span className="text-2xl">
                  {formData.bankDetails.accountNumber}/
                </span>
                <span className="text-xl font-light">
                  {formData.bankDetails.bankName}
                </span>
              </p>
              <p className="text-xl font-montserrat text-[#242424]">
                {formData.bankDetails.accountName}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Review */}
      <div className="py-4 p-6 border border-[#0A4D3C33] bg-white rounded-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <p className="flex items-center gap-2">
            <Calendar className="text-secondary" />
            <span className="text-primary font-semibold">
              Selected Days and Times
            </span>
          </p>
          <Button
            type="button"
            className="bg-secondary px-4 py-2 hover:bg-primary flex items-center rounded-full"
            onClick={() => onEdit(2)}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>

        <div className="space-y-3">
          {availableDays.map((day) => (
            <div
              key={day.dayOfWeek}
              className="flex flex-col gap-2 py-3 border-b border-[#00000033] last:border-b-0"
            >
              <p className="text-sm font-medium text-primary">
                {days[day.dayOfWeek]}
              </p>
              <div className="flex flex-wrap gap-2 text-[#242424]">
                {day.slots.length > 0 ? (
                  day.slots.map((slot, index) => (
                    <span key={index} className="text-sm not-last:border-r not-last:pr-2">
                      {slot.startTime} - {slot.endTime}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">
                    Available (time to be set)
                  </span>
                )}
              </div>
            </div>
          ))}

          {availableDays.length === 0 && (
            <p className="text-gray-500 text-sm py-3">
              No days selected for availability
            </p>
          )}
        </div>
      </div>

      {/* Error Display */}
      {submitMutation.isError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 text-sm">
            {submitMutation.error?.message ||
              "Failed to submit availability. Please try again."}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 justify-between">
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={submitMutation.isPending}
          className="max-w-[300px] w-full h-[50px] bg-[#ffa300] rounded-full hover:bg-[#e89400] mx-auto"
        >
          {submitMutation.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Availability"
          )}
        </Button>
      </div>
    </div>
  );
}

export default ReviewForm;
