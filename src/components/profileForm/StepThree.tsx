"use client";

import { useState } from "react";
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
import { CalendarIcon, Upload, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function StepThree({ onNext }: { onNext: () => void }) {
  const [issueDate, setIssueDate] = useState<Date>();
  const [expiryDate, setExpiryDate] = useState<Date>();

  return (
    <form className="space-y-6 max-w-[418px] mx-auto">
      {/* Back and Heading */}
      <div className="space-y-2">
        <button
          type="button"
          className="text-[#001E62] hover:text-[#fbbd35] flex items-center gap-2 text-sm"
        >
          <ArrowLeft size={20} />
          Back to Career Experience
        </button>

        <h2 className="text-2xl font-semibold">
          <span className="text-[#001E62]">Identity</span>{" "}
          <span className="text-[#fbbd35]">Verification</span>
        </h2>
      </div>

      {/* Means of ID */}
      <Select>
        <SelectTrigger>
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
        <SelectTrigger>
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
              "w-full justify-start text-left font-normal",
              !issueDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {issueDate
              ? format(issueDate, "PPP")
              : "Issuance Date (If available)"}
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
              "w-full justify-start text-left font-normal",
              !expiryDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {expiryDate
              ? format(expiryDate, "PPP")
              : "Expiry Date (If available)"}
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

      {/* File Upload */}
      <div className="space-y-2">
        <Label className="text-sm text-gray-700">
          Upload a copy of your valid ID
        </Label>
        <div className="border border-dashed border-gray-300 p-4 rounded-xl text-center space-y-2 bg-white">
          <div className="text-xs text-gray-500">
            File formats allowed:
            <span className="ml-2 font-medium text-green-600">JPG</span>,
            <span className="ml-1 font-medium text-blue-600">PNG</span>,
            <span className="ml-1 font-medium text-indigo-600">WebP</span>
          </div>
          <Upload className="mx-auto text-[#001E62]" />
          <Label className="block text-sm text-gray-500">
            Select files here
          </Label>
          <p className="text-xs text-gray-400">(Max file size: 8mb)</p>
          <Input type="file" className="cursor-pointer border-none" />
        </div>
      </div>

      {/* Continue Button */}
      <Button
        type="button"
        onClick={onNext}
        className="w-full bg-[#fbbd35] text-white mt-6 rounded-full"
      >
        Continue To Career Experience
      </Button>
    </form>
  );
}
