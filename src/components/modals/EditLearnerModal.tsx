"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GRADES, MONTHS, SUBJECTS, YEARS } from "@/lib/constants";
import { LearnerFormData, learnerFormSchema } from "@/lib/schema";
import { calculateAge, createDateOfBirth } from "@/lib/utils";
import { AddLearnerDTO, editLearner } from "@/services/learner.service";
import { useModalStore } from "@/store/useModal";
import { Child } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export interface EditLearnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  learner: Child;
}

export default function EditLearnerModal({
  isOpen,
  onClose,
  learner,
}: EditLearnerModalProps) {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    learner.interests || []
  );
  const [selectedGrade, setSelectedGrade] = useState<string>(
    learner.grade || ""
  );
  const queryClient = useQueryClient();
  const { openModal } = useModalStore();

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LearnerFormData>({
    resolver: zodResolver(learnerFormSchema),
    defaultValues: {
      name: learner.name,
      email: learner.email,
      birthMonth: learner.dateOfBirth
        ? new Date(learner.dateOfBirth).toLocaleString("default", {
            month: "long",
          })
        : "",
      birthYear: learner.dateOfBirth
        ? new Date(learner.dateOfBirth).getFullYear().toString()
        : "",
      gender: learner.gender,
      grade: learner.grade || "",
      interests: learner.interests || [],
    },
    mode: "all",
  });

  // Watch birth month and year to calculate age and date of birth
  const watchedBirthMonth = watch("birthMonth");
  const watchedBirthYear = watch("birthYear");

  const editLearnerMutation = useMutation({
    mutationFn: editLearner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setSelectedSubjects([]);
      setSelectedGrade("");
      openModal("success", {
        title: "Learner Edited",
        highlight: "Successfully",
        message: "You have successfully edited a learner.",
        buttonText: "Proceed",
      });
      toast.success("Learner edited successfully!");
    },
    onError: (error) => {
      console.error("Error editing learner:", error);
      toast.error("Failed to edit learner. Please try again.");
    },
  });

  const onSubmit = (data: LearnerFormData) => {
    const age = calculateAge(data.birthMonth, data.birthYear);
    const dateOfBirth = createDateOfBirth(data.birthMonth, data.birthYear);

    const requestData: Omit<AddLearnerDTO, "gender"> & { id: string } = {
      id: learner._id,
      name: data.name,
      age: age,
      grade: selectedGrade || undefined,
      email: data.email || undefined,
      dateOfBirth: dateOfBirth || undefined,
      interests: selectedSubjects.length > 0 ? selectedSubjects : undefined,
    };

    editLearnerMutation.mutate(requestData);
  };

  const handleGradeSelect = (grade: string) => {
    setSelectedGrade(grade);
    setValue("grade", grade);
  };

  const removeGrade = () => {
    setSelectedGrade("");
    setValue("grade", "");
  };

  const handleSubjectSelect = (subject: string) => {
    const updatedSubjects = selectedSubjects.includes(subject)
      ? selectedSubjects.filter((s) => s !== subject)
      : [...selectedSubjects, subject];

    setSelectedSubjects(updatedSubjects);
    setValue("interests", updatedSubjects);
  };

  const removeSubject = (subjectToRemove: string) => {
    const updatedSubjects = selectedSubjects.filter(
      (s) => s !== subjectToRemove
    );
    setSelectedSubjects(updatedSubjects);
    setValue("interests", updatedSubjects);
  };

  const handleClose = () => {
    reset();
    setSelectedSubjects([]);
    setSelectedGrade("");
    onClose();
  };

  // Calculate current age for display
  const currentAge = calculateAge(watchedBirthMonth, watchedBirthYear);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] items-center justify-center overflow-y-auto">
        <DialogHeader className="max-w-[478px]">
          <DialogTitle className="text-3xl font-semibold text-primary">
            Edit Learner&apos;s Details
          </DialogTitle>
          <p className="text-[#757575] text-lg">
            Edit the details of your child/ward who is to partake of these
            lessons
          </p>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 max-w-[482px] border rounded-lg p-8"
        >
          {/* Name Field */}
          <div className="space-y-2">
            <Label className="sr-only" htmlFor="name">
              Learner&apos;s Name *
            </Label>
            <Input
              id="name"
              disabled={editLearnerMutation.isPending}
              placeholder="Enter Learner's Name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label className="sr-only" htmlFor="email">
              Learner&apos;s Email (optional)
            </Label>
            <Input
              disabled={editLearnerMutation.isPending}
              id="email"
              type="email"
              placeholder="Enter Learner's Email (optional)"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Birth Month and Year */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthMonth" className="sr-only">
                Birth Month *
              </Label>
              <Controller
                name="birthMonth"
                disabled={editLearnerMutation.isPending}
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Birth month" />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTHS.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.birthMonth && (
                <p className="text-sm text-red-500">
                  {errors.birthMonth.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthYear" className="sr-only">
                Birth Year *
              </Label>
              <Controller
                name="birthYear"
                disabled={editLearnerMutation.isPending}
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Birth year" />
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.birthYear && (
                <p className="text-sm text-red-500">
                  {errors.birthYear.message}
                </p>
              )}
            </div>
          </div>

          {/* Display calculated age with validation */}
          {currentAge > 0 && (
            <div
              className={`text-sm ${
                currentAge < 3 || currentAge > 18
                  ? "text-red-500"
                  : "text-gray-600"
              }`}
            >
              {(currentAge < 3 || currentAge > 18) && (
                <span className="block">
                  Age must be between 3 and 18 years
                </span>
              )}
            </div>
          )}

          {/* Gender Selection */}
          <div className="flex gap-3 items-center">
            <Label htmlFor="gender" className="text-[#757575]">
              Gender:
            </Label>
            <Controller
              name="gender"
              disabled
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex gap-3"
                  disabled
                >
                  <div className="flex items-center gap-1">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center gap-1">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center gap-1">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Prefer not to say</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>
          {errors.gender && (
            <p className="text-sm text-red-500">{errors.gender.message}</p>
          )}

          {/* Grade Selection */}
          <div className="flex flex-col gap-2 border p-4 rounded-lg">
            <Label className="sr-only">
              Select Grade of learner (optional)
            </Label>

            {/* Display selected Grade as input-like field */}
            <div className="min-h-[44px] w-full flex flex-wrap gap-1 items-center">
              {selectedGrade ? (
                <Badge
                  variant="secondary"
                  className={`border border-[#031D95] px-3 py-1 text-sm rounded-full text-primary bg-[#DFDDFF] hover:bg-[#DFDDFF] ${
                    editLearnerMutation.isPending &&
                    "pointer-events-none opacity-50"
                  }`}
                >
                  {selectedGrade}
                  <button
                    type="button"
                    onClick={() => {
                      if (editLearnerMutation.isPending) {
                        removeGrade();
                      }
                    }}
                    className="ml-2 text-xs hover:text-red-300"
                  >
                    ×
                  </button>
                </Badge>
              ) : (
                <span className="text-[#757575] text-sm">
                  Select Grade of Learner (optional)
                </span>
              )}
            </div>

            {/* Available Grades to select */}
            <div className="flex flex-wrap gap-x-5 gap-y-3 mt-5">
              {GRADES.map((grade) => (
                <Badge
                  key={grade}
                  variant={selectedGrade === grade ? "default" : "outline"}
                  className={`cursor-pointer transition-colors px-3 py-1 text-sm rounded-full ${
                    selectedGrade === grade
                      ? "bg-[#DFDDFF] text-primary border-[#031D95]"
                      : "border-[#031D95] text-[#031D95] hover:bg-[#DFDDFF]"
                  } ${
                    editLearnerMutation.isPending &&
                    "pointer-events-none opacity-50"
                  }`}
                  onClick={() => {
                    if (editLearnerMutation.isPending) {
                      handleGradeSelect(grade);
                    }
                  }}
                >
                  {grade}
                </Badge>
              ))}
            </div>
          </div>

          {/* Subjects Selection */}
          <div className="flex flex-col gap-2 border p-4 rounded-lg">
            <Label className="sr-only">
              Select subjects to learn (optional)
            </Label>

            {/* Display selected subjects as input-like field */}
            <div className="min-h-[44px] w-full flex flex-wrap gap-1 items-center">
              {selectedSubjects.length > 0 ? (
                selectedSubjects.map((subject) => (
                  <Badge
                    key={subject}
                    variant="secondary"
                    className={`border border-[#031D95] px-3 py-1 text-sm rounded-full text-primary bg-[#DFDDFF] hover:bg-[#DFDDFF] ${
                      editLearnerMutation.isPending &&
                      "pointer-events-none opacity-50"
                    }`}
                  >
                    {subject}
                    <button
                      type="button"
                      onClick={() => {
                        if (editLearnerMutation.isPending) {
                          removeSubject(subject);
                        }
                      }}
                      className="ml-2 text-xs hover:text-red-300"
                    >
                      x
                    </button>
                  </Badge>
                ))
              ) : (
                <span className="text-[#757575] text-sm">
                  Click subjects below to select subjects to learn (optional)
                </span>
              )}
            </div>

            {/* Available subjects to select */}
            <div className="flex flex-wrap gap-x-5 gap-y-3 mt-5">
              {SUBJECTS.map((subject) => (
                <Badge
                  key={subject}
                  variant={
                    selectedSubjects.includes(subject) ? "default" : "outline"
                  }
                  className={`cursor-pointer transition-colors px-3 py-1 text-sm rounded-full ${
                    selectedSubjects.includes(subject)
                      ? "bg-[#DFDDFF] text-primary border-[#031D95]"
                      : "border-[#031D95] text-[#031D95] hover:bg-[#DFDDFF]"
                  } ${
                    editLearnerMutation.isPending &&
                    "pointer-events-none opacity-50"
                  }`}
                  onClick={() => {
                    if (editLearnerMutation.isPending) {
                      handleSubjectSelect(subject);
                    }
                  }}
                >
                  {subject}
                </Badge>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-[#FFA300] hover:bg-[#FFA300]/90 text-white py-4 mt-6 rounded-full h-auto"
            disabled={
              editLearnerMutation.isPending ||
              (currentAge > 0 && (currentAge < 3 || currentAge > 18))
            }
          >
            {editLearnerMutation.isPending ? (
              <Loader2 className="size-4 mr-2 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
