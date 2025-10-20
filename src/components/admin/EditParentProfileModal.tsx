"use client";

import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

// Simplified data structure for initial form state
interface ProfileData {
  name: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: ProfileData; // Data to pre-populate the form
  onSave: (updatedData: ProfileData) => void;
}

const COUNTRIES = ["USA", "Nigeria", "Canada"];
const US_STATES = ["Texas", "California", "New York"];
const TEXAS_CITIES = ["Houston", "Dallas", "Austin"];

export function EditProfileModal({
  isOpen,
  onClose,
  currentProfile,
  onSave,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<ProfileData>(currentProfile);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Perform basic validation if needed
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-8 rounded-xl bg-white shadow-2xl">
        <DialogHeader className="flex flex-row justify-between items-start border-b pb-4">
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Edit Parent Profile
          </DialogTitle>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </DialogHeader>

        {/* Form Fields */}
        <div className="space-y-4 pt-4">
          {/* Name, Email */}
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="h-12"
          />
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="h-12"
          />

          {/* Phone Number */}
          <div className="flex">
            {/* The country code part is complex, using a simple input here for layout */}
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="h-12"
              placeholder="+234 1234567890"
            />
          </div>

          {/* Country Select */}
          <Select
            value={formData.country}
            onValueChange={(val) => handleSelectChange("country", val)}
          >
            <SelectTrigger className="w-full h-12">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* State & City Selects (Side-by-side) */}
          <div className="grid grid-cols-2 gap-4">
            <Select
              value={formData.state}
              onValueChange={(val) => handleSelectChange("state", val)}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                {US_STATES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={formData.city}
              onValueChange={(val) => handleSelectChange("city", val)}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                {TEXAS_CITIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <Input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="h-12"
            placeholder="1234, Street Name, Area."
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-32 h-12 text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="w-32 h-12 bg-secondary text-white font-semibold"
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
