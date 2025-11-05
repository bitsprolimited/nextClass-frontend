"use client";

import FormWrapper from "./FormWrapper";
import { Input } from "@/components/ui/input";

export default function EditIDModal({ onClose }: { onClose: () => void }) {
  const step1 = (
    <div className="space-y-4">
      <label className="block text-sm text-gray-600">ID Type</label>
      <Input placeholder="e.g. Driver's License" />

      <label className="block text-sm text-gray-600">ID Number</label>
      <Input />
    </div>
  );

  const step2 = (
    <div className="space-y-4">
      <label className="block text-sm text-gray-600">Upload ID (front)</label>
      <input type="file" className="block w-full text-sm" />
      <label className="block text-sm text-gray-600">Upload ID (back)</label>
      <input type="file" className="block w-full text-sm" />
    </div>
  );

  return (
    <FormWrapper
      title="Edit Tutor's ID"
      steps={[step1, step2]}
      onClose={onClose}
    />
  );
}
