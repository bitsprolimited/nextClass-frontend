import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useSubmitCareerExperience,
  useUploadCertificate,
} from "@/hooks/useProfileFormSubmission";
import { CareerExperienceFormData, careerExperienceSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { QualificationData, useFormStore } from "@/store/useProfileSetupForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  PlusCircle,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import MultipleSelector, { Option } from "../ui/multiselect";
import { subjects } from "@/lib/constants";

interface StepTwoProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepTwo({ onNext, onBack }: StepTwoProps) {
  const {
    careerExperience,
    updateCareerExperience,
    addQualification,
    removeQualification,
  } = useFormStore();

  const submitCareerExperience = useSubmitCareerExperience();
  const uploadCertificate = useUploadCertificate();

  const [showForm, setShowForm] = useState<boolean>(
    careerExperience.qualifications?.length === 0 ? true : false
  );
  const [currentQualification, setCurrentQualification] = useState<
    Partial<QualificationData>
  >({});
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const grades = [
    "KG/Nursery",
    "Grade 1-3",
    "Grade 4-6",
    "Grade 7-9",
    "Grade 10-12",
  ];

  const form = useForm<CareerExperienceFormData>({
    resolver: zodResolver(careerExperienceSchema),
    defaultValues: {
      subjects: careerExperience.subjects || [],
      grades: careerExperience.grades || [],
      experience: careerExperience.yearsOfExperience || "",
      qualifications: careerExperience.qualifications || [],
    },
  });

  const selectedGrades = form.watch("grades") || [];

  const handleGradeClick = (grade: string) => {
    const currentGrades = form.getValues("grades") || [];
    if (currentGrades.includes(grade)) return;

    const newGrades = [...currentGrades, grade];
    form.setValue("grades", newGrades);
  };

  const handleRemoveGrade = (grade: string) => {
    const currentGrades = form.getValues("grades") || [];
    const newGrades = currentGrades.filter((g) => g !== grade);
    form.setValue("grades", newGrades);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveQualification = (index: number) => {
    removeQualification(index);
    form.setValue(
      "qualifications",
      form.getValues("qualifications").filter((_, i) => i !== index)
    );
  };

  const handleSaveQualification = async () => {
    if (
      !currentQualification.type ||
      !currentQualification.courseName ||
      !currentQualification.issuingInstitution
    ) {
      return;
    }

    let certificateUrl = "";
    if (selectedFile) {
      try {
        const result = await uploadCertificate.mutateAsync(selectedFile);
        certificateUrl = result.fileUrl;
      } catch (error) {
        console.error("Failed to upload certificate:", error);
        return;
      }
    }

    const qualification: QualificationData = {
      ...(currentQualification as QualificationData),
      expiryDate: expiryDate ? format(expiryDate, "yyyy-MM-dd") : undefined,
      certificateUrl,
    };

    addQualification(qualification);

    // Reset form
    form.setValue("qualifications", [
      ...form.getValues("qualifications"),
      qualification,
    ]);

    setCurrentQualification({});
    setExpiryDate(undefined);
    setSelectedFile(null);
    setShowForm(false);
  };

  const onSubmit = async (data: CareerExperienceFormData) => {
    updateCareerExperience(data);
    console.log(data);

    try {
      await submitCareerExperience.mutateAsync(data);
      onNext();
    } catch (error) {
      console.error("Failed to submit career experience:", error);
    }
  };

  return (
    <div className="space-y-6 max-w-[418px] mx-auto">
      <div className="space-y-1">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-slate-800 hover:underline mb-2 flex items-center"
        >
          <ChevronLeft size={20} className="text-secondary" /> Back to Biodata
        </button>
        <h2 className="text-2xl font-semibold">
          <span className="text-primary">Career</span>{" "}
          <span className="text-secondary">Experience</span>
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="subjects"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="*:not-first:mt-2">
                    <MultipleSelector
                      commandProps={{ label: "Select subjects" }}
                      value={subjects.filter(
                        (s) => (field.value || []).includes(s.value) // map stored strings to Option[]
                      )}
                      className="bg-white"
                      defaultOptions={subjects}
                      placeholder="Select subjects"
                      hideClearAllButton
                      hidePlaceholderWhenSelected
                      emptyIndicator={
                        <p className="text-center text-sm">No results found</p>
                      }
                      
                      onChange={(selected: Option[]) => {
                        field.onChange(selected.map((opt) => opt.value)); // store only string values
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="mb-2 text-slate-500">
              Tap to select the grade you teach
            </p>
            <div className="flex flex-wrap gap-2 text-primary">
              {selectedGrades.map((grade) => (
                <div
                  key={grade}
                  className="flex items-center px-4 py-1 rounded-full text-sm bg-[#F3F6FF] border border-[#001E62] text-[#001E62] font-semibold"
                >
                  <span className="mr-2">{grade}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveGrade(grade)}
                    className="ml-1 text-[#001E62] hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              {grades
                .filter((grade) => !selectedGrades.includes(grade))
                .map((grade) => (
                  <div
                    key={grade}
                    className="px-4 py-1 rounded-full text-sm border border-[#001E62] text-[#001E62] cursor-pointer hover:bg-[#001E62] hover:text-white transition"
                    onClick={() => handleGradeClick(grade)}
                  >
                    {grade}
                  </div>
                ))}
            </div>
          </div>

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 border border-gray-300 px-4 text-gray-700 bg-white">
                      <SelectValue placeholder="Select your Years of Experience" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["1 year", "2 years", "3 years", "4+ years"].map(
                      (year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Qualifications Section */}
          <div className="bg-white p-4 rounded-xl shadow space-y-5">
            <h2 className="text-lg font-semibold text-gray-600">
              Qualifications details
            </h2>
            <Label className="text-sm text-gray-500 block">
              Provide details of certificates and qualifications here
            </Label>

            {careerExperience.qualifications &&
              careerExperience.qualifications.length > 0 && (
                <div className="space-y-2">
                  {careerExperience.qualifications.map((qual, index) => (
                    <div
                      key={index}
                      className="bg-[#4255AF0f] p-3 rounded-lg flex justify-between items-center"
                    >
                      <div className="flex flex-col justify-between gap-3 h-full">
                        <p className="font-medium text-primary">
                          {qual.courseName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {qual.type} - {qual.issuingInstitution}
                        </p>
                      </div>
                      <div className="flex flex-col justify-between gap-3 h-full">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="hover:bg-transparent"
                          onClick={() => handleRemoveQualification(index)}
                        >
                          <Trash2 className="text-red-500" size={16} />
                        </Button>
                        <p className="text-xs">
                          {qual.expiryDate
                            ? new Date(qual.expiryDate).toLocaleDateString(
                                "en-GB"
                              )
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            {showForm || careerExperience?.qualifications?.length === 0 ? (
              <div className="space-y-5">
                <Select
                  onValueChange={(value) =>
                    setCurrentQualification((prev) => ({
                      ...prev,
                      type: value,
                    }))
                  }
                >
                  <SelectTrigger className="h-12 border border-gray-300 px-4 text-gray-700 bg-white">
                    <SelectValue placeholder="Select the type of qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Diploma", "Certificate", "Degree", "Masters", "PhD"].map(
                      (type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Input Course Name"
                  className="h-12 border border-gray-300 px-4 text-gray-700 bg-white"
                  value={currentQualification.courseName || ""}
                  onChange={(e) =>
                    setCurrentQualification((prev) => ({
                      ...prev,
                      courseName: e.target.value,
                    }))
                  }
                />

                <Input
                  placeholder="Input Issuing Institution"
                  className="h-12 border border-gray-300 px-4 text-gray-700 bg-white"
                  value={currentQualification.issuingInstitution || ""}
                  onChange={(e) =>
                    setCurrentQualification((prev) => ({
                      ...prev,
                      issuingInstitution: e.target.value,
                    }))
                  }
                />

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-12 w-full flex items-center border border-gray-300 px-4 text-gray-700 bg-white justify-between",
                        !expiryDate && "text-muted-foreground"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-[#FF9900]" />
                        {expiryDate ? (
                          format(expiryDate, "PPP")
                        ) : (
                          <span className="text-gray-400">
                            Select Expiry date (optional)
                          </span>
                        )}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Calendar
                      mode="single"
                      selected={expiryDate ? new Date(expiryDate) : undefined}
                      onSelect={setExpiryDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <div className="flex justify-center gap-2 mb-2">
                  <span className="text-xs text-gray-500">
                    File formats allowed:
                  </span>
                  <span className="bg-[#E6F9E6] text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                    JPG
                  </span>
                  <span className="bg-[#E6F0FF] text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                    PNG
                  </span>
                  <span className="bg-[#F3F6FF] text-[#0395B7] px-2 py-0.5 rounded text-xs font-medium">
                    PDF
                  </span>
                </div>

                <div className="border border-dashed border-gray-300 p-4 rounded-xl text-center bg-[#4255AF0f]">
                  <Upload
                    className="mx-auto text-[#7C3AED] mb-2 cursor-pointer"
                    size={32}
                    onClick={handleUploadClick}
                  />
                  <Label
                    className="block text-base text-gray-600 mb-1 font-medium cursor-pointer"
                    onClick={handleUploadClick}
                  >
                    Select files here
                  </Label>
                  <span className="block text-xs text-gray-400 mb-2">
                    (Max file size: 8mb)
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                  />
                  {selectedFile && (
                    <div className="mt-2 text-sm text-gray-700">
                      Selected: {selectedFile.name}
                    </div>
                  )}
                </div>

                <div className="flex justify-end mt-2">
                  <Button
                    type="button"
                    onClick={handleSaveQualification}
                    disabled={uploadCertificate.isPending}
                    className="bg-[#001E62] text-white rounded-full h-12 text-base font-semibold px-10"
                  >
                    {uploadCertificate.isPending ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            className="w-full text-sm text-[#001E62] flex items-center justify-end gap-2"
            onClick={() => setShowForm(true)}
          >
            <PlusCircle size={16} /> Add Another Qualification
          </button>

          <Button
            type="submit"
            disabled={submitCareerExperience.isPending}
            className="w-full bg-secondary h-auto p-4 text-white mt-6 rounded-full"
          >
            {submitCareerExperience.isPending
              ? "Saving..."
              : "Continue To Identity Verification"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
