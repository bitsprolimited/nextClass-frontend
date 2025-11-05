"use client";

import FormWrapper from "./FormWrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditQualificationsModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const step1 = (
    <div className="space-y-4">
      <label className="block text-sm text-gray-600">Qualification Title</label>
      <Input />

      <label className="block text-sm text-gray-600">Institution</label>
      <Input />

      <label className="block text-sm text-gray-600">Notes</label>
      <Textarea />
    </div>
  );

  const step2 = (
    <div className="space-y-4">
      <label className="block text-sm text-gray-600">Upload file</label>
      <input type="file" className="block w-full text-sm" />
    </div>
  );

  return (
    <FormWrapper
      title="Edit Tutor's Qualifications"
      steps={[step1, step2]}
      onClose={onClose}
    />
  );
}
