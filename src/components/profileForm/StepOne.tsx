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

export default function StepOne({ onNext }: { onNext: () => void }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<BioDataFormValues>();

  return (
    <form className="space-y-4 max-w-2xl mx-auto">
      <Input placeholder="Full Name" {...register("fullName")} />
      <Input placeholder="Email Address" {...register("email")} />
      <div className="flex gap-2">
        <div className="flex-[0.4] relative">
          <Input placeholder="+234" disabled />
          <div className="absolute top-[11px] right-3 text-gray-500 pointer-events-none">
            ▼
          </div>
        </div>
        <Input placeholder="0xxxxxxxxx" {...register("phone")} />
      </div>

      <Select {...register("country")}>
        <SelectTrigger>
          <SelectValue placeholder="Select Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Nigeria">Nigeria</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Select {...register("state")}>
          <SelectTrigger>
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Lagos">Lagos</SelectItem>
          </SelectContent>
        </Select>

        <Select {...register("city")}>
          <SelectTrigger>
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ikeja">Ikeja</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Input placeholder="Address" {...register("address")} />
      <Textarea
        placeholder="Tell us a little about yourself"
        {...register("about")}
      />

      <Button
        type="button"
        className="w-full bg-[#fbbd35] text-white mt-6 rounded-full"
        onClick={onNext}
      >
        Continue To Career Experience
      </Button>
    </form>
  );
}
