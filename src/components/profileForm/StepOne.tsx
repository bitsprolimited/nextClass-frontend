// components/profileForm/StepOne.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BioDataFormValues } from "@/services/biodata";
import { ChevronDown } from "lucide-react";

export default function StepOne({ onNext }: { onNext: () => void }) {
  const {
    register,
    // formState: { errors },
  } = useFormContext<BioDataFormValues>();

  return (
    <form className="space-y-4 max-w-2xl mx-auto">
      {/* Heading */}
      <h2 className="text-2xl font-semibold">
        <span className="font-semibold text-foreground">Bio </span>
        <span className="text-secondary font-bold">Data</span>
      </h2>
      <Input
        placeholder="Full Name"
        {...register("fullName")}
        className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white"
      />
      <Input
        placeholder="Email Address"
        {...register("email")}
        className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white"
      />
      <div className="flex gap-2 w-full">
        {/* Country Code */}
        <div className="flex-[0.4] relative">
          <input
            type="text"
            value="+234"
            disabled
            className="h-12 w-full bg-white border border-gray-300 rounded-lg px-4 text-gray-700 text-sm outline-none"
          />
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2 text-orange-500 text-xs pointer-events-none">
            <ChevronDown size={20} className="text-secondary" />
          </div>
        </div>

        {/* Phone Number */}
        <input
          type="text"
          placeholder="0xxxxxxxxx00"
          {...register("phone")}
          className="h-12 flex-1 bg-white border border-gray-300 rounded-lg px-4 text-gray-700 text-sm outline-none"
        />
      </div>

      <Select {...register("country")}>
        <SelectTrigger className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white">
          <SelectValue placeholder="Select Country" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="Nigeria">Nigeria</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Select {...register("state")}>
          <SelectTrigger className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white">
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Lagos">Lagos</SelectItem>
          </SelectContent>
        </Select>

        <Select {...register("city")}>
          <SelectTrigger className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white">
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Ikeja">Ikeja</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Textarea
        placeholder="Tell us a little about yourself"
        {...register("about")}
        className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white resize-none"
      />

      <Button
        type="button"
        className="w-full bg-secondary h-12 text-white mt-6 rounded-full font-semibold"
        onClick={onNext}
      >
        Continue To Career Experience
      </Button>
    </form>
  );
}
