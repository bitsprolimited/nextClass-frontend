"use client";

import FormWrapper from "./FormWrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Tutor } from "@/lib/constants";

export default function EditProfileModal({
  tutor,
  onClose,
}: {
  tutor?: Tutor | null;
  onClose: () => void;
}) {
  const step1 = (
    <div className="space-y-4">
      <label className="block text-sm text-gray-600">Full name</label>
      <Input defaultValue={tutor?.name} />

      <label className="block text-sm text-gray-600">Email</label>
      <Input defaultValue={tutor?.email} />

      <label className="block text-sm text-gray-600">Phone</label>
      <Input defaultValue={tutor?.phone} />
    </div>
  );

  const step2 = (
    <div className="space-y-4">
      <label className="block text-sm text-gray-600">Address</label>
      <Input defaultValue={tutor?.address} />

      <label className="block text-sm text-gray-600">City / State</label>
      <Input defaultValue={tutor?.cityState} />

      <label className="block text-sm text-gray-600">Country</label>
      <Input defaultValue={tutor?.country?.code} />
    </div>
  );

  const step3 = (
    <div className="space-y-4">
      <label className="block text-sm text-gray-600">About</label>
      <Textarea defaultValue={tutor?.bio || ""} />
    </div>
  );

  return (
    <FormWrapper
      title="Edit Tutor's Profile"
      steps={[step1, step2, step3]}
      onClose={onClose}
    />
  );
}
