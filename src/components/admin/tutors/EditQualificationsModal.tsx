"use client";

import { useMemo, useState, ChangeEvent } from "react";
import FormWrapper from "./FormWrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tutor } from "@/lib/constants";

type QualificationForm = {
  title: string;
  institution: string;
  notes: string;
  file?: File | null;
};

type Props = {
  tutor: Tutor;
  onClose: () => void;
  /**
   * Optional data to prefill when editing an existing qualification.
   * If omitted, we fall back to tutor.profileData.* (if any) or blanks.
   */
  initialQualification?: Partial<QualificationForm>;
};

export default function EditQualificationsModal({
  tutor,
  onClose,
  initialQualification,
}: Props) {
  // derive safe defaults
  const defaults = useMemo<QualificationForm>(() => {
    return {
      title:
        initialQualification?.title ??
        tutor.profileData?.subjects /* fallback text slot */ ??
        "",
      institution: initialQualification?.institution ?? "",
      notes: initialQualification?.notes ?? "",
      file: undefined,
    };
  }, [tutor, initialQualification]);

  // local state
  const [title, setTitle] = useState<string>(defaults.title);
  const [institution, setInstitution] = useState<string>(defaults.institution);
  const [notes, setNotes] = useState<string>(defaults.notes);
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
  };

  // if FormWrapper supports onSubmit, wire it like this:
  // const handleSubmit = () => {
  //   const payload: QualificationForm = { title, institution, notes, file };
  //   // TODO: call API or lift to parent
  // };

  const step1 = (
    <div className="space-y-4">
      <label className="block text-sm text-gray-600">Qualification Title</label>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Diploma in Education"
      />

      <label className="block text-sm text-gray-600">Institution</label>
      <Input
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
        placeholder="e.g. University of Lagos"
      />

      <label className="block text-sm text-gray-600">Notes</label>
      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Optional notes about the qualification…"
        rows={5}
      />
    </div>
  );

  const step2 = (
    <div className="space-y-2">
      <label className="block text-sm text-gray-600">Upload file</label>
      <input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg,.webp,.doc,.docx"
        className="block w-full text-sm"
        onChange={onFileChange}
      />
      {file ? (
        <p className="text-xs text-gray-500">
          Selected: <span className="font-medium">{file.name}</span> (
          {Math.ceil(file.size / 1024)} KB)
        </p>
      ) : (
        <p className="text-xs text-gray-500">No file selected.</p>
      )}
    </div>
  );

  return (
    <FormWrapper
      title="Edit Tutor's Qualifications"
      steps={[step1, step2]}
      onClose={onClose}
      // onSubmit={handleSubmit}
    />
  );
}
