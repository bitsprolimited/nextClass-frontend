"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CalendarIcon, ChevronLeft, PlusCircle, Upload, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState, useRef } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

export default function StepTwo({ onNext }: { onNext: () => void }) {
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const grades = [
    "KG/Nursery",
    "Grade 1-3",
    "Grade 4-6",
    "Grade 7-9",
    "Grade 10-12",
  ];

  const handleGradeClick = (grade: string) => {
    if (selectedGrades.includes(grade)) return;
    setSelectedGrades([...selectedGrades, grade]);
  };

  const handleRemoveGrade = (grade: string) => {
    setSelectedGrades(selectedGrades.filter((g) => g !== grade));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form className="space-y-6 max-w-[418px] mx-auto">
      {/* Heading */}
      <div className="space-y-1">
        <button
          type="button"
          className="text-sm text-slate-800 hover:underline mb-2 flex"
        >
          <ChevronLeft size={20} className="text-secondary" /> Back to Biodata
        </button>
        <h2 className="text-2xl font-semibold">
          <span className="text-primary">Career</span>{" "}
          <span className="text-secondary">Experience</span>
        </h2>
      </div>

      {/* Subject Input */}
      <Textarea
        className="bg-white h-30"
        placeholder="Type a subject you teach..."
      />

      {/* Grade Tags */}
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="mb-2 text-slate-500">Tap to select the grade you teach</p>
        <div className="flex flex-wrap gap-2 text-primary">
          {/* Selected grades */}
          {selectedGrades.map((grade) => (
            <div
              key={grade}
              className="flex items-center px-4 py-1 rounded-full text-sm bg-[#F3F6FF] border border-[#001E62] text-[#001E62] font-semibold cursor-pointer"
            >
              <span className="mr-2">{grade}</span>
              <button
                type="button"
                onClick={() => handleRemoveGrade(grade)}
                className="ml-1 text-[#001E62] hover:text-red-500"
                aria-label={`Remove ${grade}`}
              >
                <X size={16} />
              </button>
            </div>
          ))}
          {/* Unselected grades */}
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

      {/* Experience Dropdown */}
      <Select>
        <SelectTrigger className="h-12 border border-gray-300 px-4 text-gray-700 bg-white flex items-center">
          <SelectValue placeholder="Select your Years of Experience" />
        </SelectTrigger>
        <SelectContent>
          {["1 year", "2 years", "3 years", "4+ years"].map((year) => (
            <SelectItem key={year} value={year} className="text-primary">
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Qualifications Details Section */}
      <div className="bg-white p-4 rounded-xl shadow space-y-5">
        <h2 className="text-lg font-semibold text-gray-600 mb-0">
          Qualifications details
        </h2>
        <Label className="text-sm text-gray-500 mb-2 block">
          Provide details of certificates and qualifications here
        </Label>

        {/* Qualification Type */}
        <Select>
          <SelectTrigger className="h-12 border border-gray-300 px-4 text-gray-700 bg-white flex items-center">
            <SelectValue placeholder="Select the type of qualification" />
          </SelectTrigger>
          <SelectContent>
            {["Diploma", "Certificate", "Degree"].map((type) => (
              <SelectItem key={type} value={type} className="text-primary">
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Course Name */}
        <Input
          placeholder="Input Course Name"
          className="h-12 border border-gray-300  px-4 text-gray-700 bg-white"
        />

        {/* Issuing Institution */}
        <Input
          placeholder="Input Issuing Institution"
          className="h-12 border border-gray-300  px-4 text-gray-700 bg-white"
        />

        {/* Expiry Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-12 w-full flex items-center border border-gray-300  px-4 text-gray-700 bg-white justify-between",
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
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={expiryDate}
              onSelect={setExpiryDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* File formats allowed (move this out of the upload box) */}
        <div className="flex justify-center gap-2 mb-2">
          <span className="text-xs text-gray-500">File formats allowed:</span>
          <span className="bg-[#E6F9E6] text-green-700 px-2 py-0.5 rounded text-xs font-medium">
            JPG
          </span>
          <span className="bg-[#E6F0FF] text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
            PNG
          </span>
          <span className="bg-[#F3F6FF] text-[#0395B7] px-2 py-0.5 rounded text-xs font-medium">
            WebP
          </span>
        </div>
        {/* Upload Box */}
        <div className="border border-dashed border-gray-300 p-4 rounded-xl text-center bg-[#F9F7F5]">
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
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <div className="mt-2 text-sm text-gray-700">
              Selected: {selectedFile.name}
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-2">
          <Button className="bg-[#001E62] text-white rounded-full h-12 text-base font-semibold px-10">
            Save
          </Button>
        </div>
      </div>
      <button
        type="button"
        className="w-full text-sm text-[#001E62] flex items-center justify-end gap-2"
      >
        <PlusCircle size={16} /> Add Another Qualification
      </button>

      {/* Continue Button */}
      <Button
        type="button"
        onClick={onNext}
        className="w-full bg-secondary h-auto p-4 text-white mt-6 rounded-full"
      >
        Continue To Identity Verification
      </Button>
    </form>
  );
}
