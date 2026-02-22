"use client";

import { useState, ChangeEvent } from "react";
import FormWrapper from "./FormWrapper";
import { Input } from "@/components/ui/input";

type Props = {
  onClose: () => void;
};

export default function EditIDModal({ onClose }: Props) {
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);

  const onFrontChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFrontFile(e.target.files?.[0] ?? null);
  };

  const onBackChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBackFile(e.target.files?.[0] ?? null);
  };

  const step1 = (
    <div className="space-y-4">
      <label className="block text-sm text-gray-600">ID Type</label>
      <Input placeholder="e.g. Driver's License" />

      <label className="block text-sm text-gray-600">ID Number</label>
      <Input placeholder="e.g. A1234567" />
    </div>
  );

  const step2 = (
    <div className="space-y-3">
      <div>
        <label className="block text-sm text-gray-600">Upload ID (front)</label>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          className="block w-full text-sm"
          onChange={onFrontChange}
        />
        {frontFile ? (
          <p className="text-xs text-gray-500 mt-1">
            Selected: <span className="font-medium">{frontFile.name}</span> (
            {Math.ceil(frontFile.size / 1024)} KB)
          </p>
        ) : (
          <p className="text-xs text-gray-500 mt-1">No file selected.</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-600">Upload ID (back)</label>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          className="block w-full text-sm"
          onChange={onBackChange}
        />
        {backFile ? (
          <p className="text-xs text-gray-500 mt-1">
            Selected: <span className="font-medium">{backFile.name}</span> (
            {Math.ceil(backFile.size / 1024)} KB)
          </p>
        ) : (
          <p className="text-xs text-gray-500 mt-1">No file selected.</p>
        )}
      </div>
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
