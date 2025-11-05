"use client";

import FormWrapper from "./FormWrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditExperienceModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const step1 = (
    <div className="space-y-4">
      <label className="block text-sm text-gray-600">Years of experience</label>
      <Input />

      <label className="block text-sm text-gray-600">Grades taught</label>
      <Input />
    </div>
  );

  const step2 = (
    <div className="space-y-4">
      <label className="block text-sm text-gray-600">
        Curriculum / subjects
      </label>
      <Textarea />
    </div>
  );

  return (
    <FormWrapper
      title="Edit Tutor's Career & Experience"
      steps={[step1, step2]}
      onClose={onClose}
    />
  );
}
