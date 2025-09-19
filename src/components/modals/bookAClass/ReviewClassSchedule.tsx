import { Teacher } from "@/types";
import { CalendarDays, Clock, Edit3, X } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useModalStore } from "@/store/useModal";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { format } from "date-fns";

interface Learner {
  _id: string;
  name: string;
}

function ReviewClassSchedule({
  tutor,
  setCurrentStep,
  selectedDates,
  selectedSlots,
  selectedSubject,
  setSelectedSubject,
  selectedLearners,
  setSelectedLearners,
  learners,
  onNext,
  isValid,
}: {
  tutor: Teacher;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  selectedDates: Date[] | undefined;
  selectedSlots: Record<string, string>;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  selectedLearners: string[];
  setSelectedLearners: Dispatch<SetStateAction<string[]>>;
  learners?: Learner[];
  onNext: () => void;
  isValid: boolean;
}) {
  const { openModal } = useModalStore();

  const handleLearnerToggle = (learnerId: string) => {
    setSelectedLearners((prev) =>
      prev.includes(learnerId)
        ? prev.filter((id) => id !== learnerId)
        : [...prev, learnerId]
    );
  };

  //   const getSelectedLearnersInfo = () => {
  //     if (!learners) return [];
  //     return learners.filter((learner) => selectedLearners.includes(learner._id));
  //   };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-primary">
          Book a Class - Step 2 of 2
        </DialogTitle>
        <DialogDescription>
          Please review and complete your class details
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-5 mt-4">
        {/* Date & Time Summary */}
        <div className="w-full bg-[#f8f6f4] rounded-2xl shadow-[0px_4px_4px_#00000040,0px_0px_9px_#0000001a] px-[30px] py-6 flex flex-col gap-5">
          <div className="flex flex-col items-start gap-2">
            <div className="inline-flex items-center justify-between w-full">
              <p className="text-sm font-medium font-aero-trial text-primary">
                Date & Time
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {selectedDates &&
              Object.entries(selectedSlots).map(([dateKey, timeString]) => {
                const date = selectedDates.find(
                  (d) => format(d, "yyyy-MM-dd") === dateKey
                );

                if (!date) return null;

                return (
                  <div
                    key={dateKey}
                    className="flex w-full items-start justify-between"
                  >
                    <div className="inline-flex gap-3 items-start">
                      <CalendarDays className="w-4 h-4 mt-1" />
                      <div className="flex flex-col gap-1">
                        <span className="text-[#2c241b] font-medium">
                          {format(date, "EEE, MMM d, yyyy")}
                        </span>
                        <span className="text-[#2c241b99] text-xs">
                          {timeString}
                          {/* You might want to calculate end time */}
                        </span>
                      </div>
                    </div>
                    <div className="inline-flex gap-3 items-center">
                      <Clock className="w-4 h-4" />
                      <p className="text-[#2c241b] text-sm">
                        1hr {/* This should be dynamic based on duration */}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Subject Selection */}
        <div className="inline-flex items-start flex-col gap-2">
          <Label className="text-sm font-medium font-aero-trial text-primary">
            Subject *
          </Label>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full max-w-[500px] px-6 py-[18px] rounded-xl border border-[#d0d5dd] flex items-center justify-between">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {tutor.subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Learners Selection */}
        <div className="flex flex-col justify-center self-stretch w-full">
          <div className="inline-flex gap-3 items-end flex-col">
            <div className="rounded-lg border border-[#0a4d33c33] w-full">
              <div className="flex flex-col gap-5 items-start px-3 py-4">
                <p className="font-montserrat text-[#757575]">
                  Select Learners to take the class (Optional)
                </p>
                <div className="flex flex-wrap gap-[12px_20px]">
                  {learners && learners.length > 0 ? (
                    learners.map((learner, idx) => {
                      const isSelected = selectedLearners.includes(learner._id);
                      return (
                        <div className="inline-flex items-start" key={idx}>
                          <Badge
                            variant={isSelected ? "default" : "outline"}
                            className={`cursor-pointer transition-colors px-3 py-1 text-sm rounded-full ${
                              isSelected
                                ? "bg-[#DFDDFF] text-primary hover:text-white border-[#031D95]"
                                : "border-[#031D95] text-primary hover:bg-[#eef0ff]"
                            }`}
                            onClick={() => handleLearnerToggle(learner._id)}
                          >
                            {learner.name}
                            {isSelected && <X className="ml-2 size-3" />}
                          </Badge>
                        </div>
                      );
                    })
                  ) : (
                    <p className="font-montserrat text-[#757575]">
                      No Learners Available
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Button
              onClick={() => openModal("addLearner", {})}
              variant="link"
              className="text-sm font-medium text-[#031D95] hover:underline"
            >
              + Add another Learner
            </Button>
          </div>
        </div>

        {/* Summary Section */}
        {/* {(selectedSubject || selectedLearners.length > 0) && (
          <div className="rounded-lg border border-[#0a4d33c33] w-full">
            <div className="flex flex-col gap-3 items-start px-3 py-4">
              <p className="font-medium text-[#2c241b]">Booking Summary</p>
              <div className="space-y-2 text-sm">
                {selectedSubject && (
                  <div>
                    <span className="font-medium">Subject: </span>
                    <span className="text-primary">{selectedSubject}</span>
                  </div>
                )}
                {selectedLearners.length > 0 && (
                  <div>
                    <span className="font-medium">Learners: </span>
                    <span className="text-primary">
                      {getSelectedLearnersInfo()
                        .map((l) => l.name)
                        .join(", ")}
                    </span>
                  </div>
                )}
                <div>
                  <span className="font-medium">Total Sessions: </span>
                  <span className="text-primary">
                    {Object.keys(selectedSlots).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )} */}

        <div className="rounded-lg border border-[#0a4d33c33] w-full">
          <div className="flex flex-col gap-3 items-start px-3 py-4">
            <div className="flex items-start justify-between w-full hover:cursor-pointer hover:bg-white">
              <p>Review your selected date & time</p>
              <Button
                variant={"ghost"}
                onClick={() => setCurrentStep(1)}
                className="gap-2 p-0 bg-white inline-flex hover:cursor-pointer hover:bg-white"
              >
                <Edit3 className="w-4 h-4" />
                <span className="text-xs">Edit</span>
              </Button>
            </div>
            <div className="flex item-start justify-between">
              <div className="inline-flex flex-col items-start gap-3">
                <div className="inline-flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  <p className="font-montserrat text-[#757575]">
                    Selected days
                  </p>
                </div>
                <div>
                  {selectedDates &&
                    Object.entries(selectedSlots).map(([dateKey], index) => {
                      const date = selectedDates.find(
                        (d) => format(d, "yyyy-MM-dd") === dateKey
                      );

                      if (!date) return null;

                      return (
                        <p key={index}> {format(date, "EEE, MMM d, yyyy")}</p>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter className="flex items-center justify-between w-full">
        <Button
          type="button"
          variant="outline"
          onClick={() => setCurrentStep(1)}
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="bg-secondary rounded-full"
          disabled={!isValid}
        >
          Review Booking
        </Button>
      </DialogFooter>
    </>
  );
}

export default ReviewClassSchedule;
