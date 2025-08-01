"use client";

import { useRef, useState } from "react";
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
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Upload, ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function StepThree({ onNext }: { onNext: () => void }) {
  const [issueDate, setIssueDate] = useState<Date>();
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      {/* Progress and Heading */}
      {/* Add your progress bar here if needed */}

      {/* Back and Heading */}
      <div className="space-y-2">
        <button
          type="button"
          className="text-[#001E62] hover:text-[#fbbd35] flex items-center gap-2 text-sm"
        >
          <ChevronLeft size={20} className="text-[#fbbd35]" />
          Back to Career Experience
        </button>
        <h2 className="text-2xl font-semibold">
          <span className="text-[#001E62]">Identity</span>{" "}
          <span className="text-[#fbbd35]">Verification</span>
        </h2>
      </div>

      {/* Means of ID */}
      <Select>
        <SelectTrigger className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white flex items-center">
          <SelectValue placeholder="Select Means of Valid ID" />
        </SelectTrigger>
        <SelectContent>
          {["National ID", "Passport", "Driver's License", "Voter's Card"].map(
            (id) => (
              <SelectItem key={id} value={id}>
                {id}
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>

      {/* Issuing Authority */}
      <Select>
        <SelectTrigger className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white flex items-center">
          <SelectValue placeholder="Select Issuing Authority" />
        </SelectTrigger>
        <SelectContent>
          {["NIMC", "FRSC", "NIS", "INEC"].map((auth) => (
            <SelectItem key={auth} value={auth}>
              {auth}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Issuance Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "h-12 w-full flex items-center border border-gray-300 rounded-lg px-4 text-gray-700 bg-white justify-between focus:ring-0 focus:outline-none",
              !issueDate && "text-muted-foreground"
            )}
            style={{ boxShadow: "none" }}
          >
            <span className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-secondary" />
              {issueDate ? (
                format(issueDate, "PPP")
              ) : (
                <span className="text-gray-400 font-normal">
                  Issuance Date <span className="italic">(If available)</span>
                </span>
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={issueDate}
            onSelect={setIssueDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Expiry Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "h-12 w-full flex items-center border border-gray-300 rounded-lg px-4 text-gray-700 bg-white justify-between focus:ring-0 focus:outline-none",
              !expiryDate && "text-muted-foreground"
            )}
            // Remove hover styles
            style={{ boxShadow: "none" }}
          >
            <span className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-[#fbbd35]" />
              {expiryDate ? (
                format(expiryDate, "PPP")
              ) : (
                <span className="text-gray-400 font-normal">
                  Expiry Date <span className="italic">(If available)</span>
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

      {/* Upload Section */}
      <Label className="text-sm text-gray-700 mb-2 block">
        Upload a copy of your valid ID
      </Label>
      {/* File formats allowed */}
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

      {/* Continue Button */}
      <div className="flex justify-center mt-6">
        <Button
          type="button"
          onClick={onNext}
          className="bg-secondary h-12 px-10 text-white rounded-full font-semibold"
        >
          Continue To Career Experience
        </Button>
      </div>
    </form>
  );
}
