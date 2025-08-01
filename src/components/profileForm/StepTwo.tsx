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
import {
  ArrowLeft,
  CalendarIcon,
  ChevronLeft,
  PlusCircle,
  Upload,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

export default function StepTwo({ onNext }: { onNext: () => void }) {
  const [expiryDate, setExpiryDate] = useState<Date>();

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
        className="bg-white"
        placeholder="Type a subject you teach..."
      />

      {/* Grade Tags */}
      <div className="bg-white p-4 rounded-xl shadow">
        <p className="mb-2 text-slate-500">Tap to select the grade you teach</p>
        <div className="flex flex-wrap gap-2 ">
          {[
            "KG/Nursery",
            "Grade 1-3",
            "Grade 4-6",
            "Grade 7-9",
            "Grade 10-12",
          ].map((grade) => (
            <div
              key={grade}
              className="px-4 py-1 rounded-full text-sm border border-[#001E62] text-[#001E62] cursor-pointer hover:bg-[#001E62] hover:text-white transition"
            >
              {grade}
            </div>
          ))}
        </div>
      </div>

      {/* Experience Dropdown */}
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select your Years of Experience" />
        </SelectTrigger>
        <SelectContent>
          {["1 year", "2 years", "3 years", "4+ years"].map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Qualifications Details Section */}
      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <h2 className="text-gray-600">Qualification Details</h2>
        <Label className="text-sm font-medium text-gray-600">
          Provide details of certificates and qualifications here
        </Label>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select the type of qualification" />
          </SelectTrigger>
          <SelectContent>
            {["Diploma", "Certificate", "Degree"].map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input placeholder="Input Course Name" />
        <Input placeholder="Input Issuing Institution" />

        {/* Expiry Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !expiryDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {expiryDate
                ? format(expiryDate, "PPP")
                : "Select Expiry date (optional)"}
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

        {/* Upload Box */}
        <div className="border border-dashed border-gray-300 p-4 rounded-xl text-center">
          <Upload className="mx-auto text-[#001E62]" />
          <Label className="block text-sm text-gray-500 mt-2 mb-1">
            Select files here
          </Label>
          <Input type="file" className="cursor-pointer border-none" />
        </div>

        {/* Save Button */}
        <Button className="w-full bg-[#001E62] text-white rounded-full">
          Save
        </Button>

        {/* Add Another Qualification */}
      </div>
      <button
        type="button"
        className="w-full text-sm text-[#001E62] flex items-center justify-center gap-2"
      >
        <PlusCircle size={16} /> Add Another Qualification
      </button>

      {/* Continue Button */}
      <Button
        type="button"
        onClick={onNext}
        className="w-full bg-[#fbbd35] text-white mt-6 rounded-full"
      >
        Continue To Identity Verification
      </Button>
    </form>
  );
}
