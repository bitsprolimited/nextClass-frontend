"use client";

import { useMemo, useState } from "react";
import FormWrapper from "./FormWrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tutor } from "@/lib/constants";

type Props = {
  tutor: Tutor;
  onClose: () => void;
};

export default function EditExperienceModal({ tutor, onClose }: Props) {
  // ---- derive safe initial values from tutor or profileData fallback ----
  const initial = useMemo(() => {
    const exp =
      typeof tutor.experience === "number"
        ? String(tutor.experience)
        : tutor.profileData?.experience ?? "";

    const grades =
      typeof tutor.grades === "string"
        ? tutor.grades
        : tutor.profileData?.grades ?? "";

    const subjects =
      typeof tutor.subjects === "string"
        ? tutor.subjects
        : tutor.profileData?.subjects ?? "";

    return {
      experience: exp,
      grades,
      subjects,
    };
  }, [tutor]);

  // ---- local state for the form fields ----
  const [experience, setExperience] = useState<string>(initial.experience);
  const [grades, setGrades] = useState<string>(initial.grades);
  const [curriculumSubjects, setCurriculumSubjects] = useState<string>(
    initial.subjects
  );

  // If FormWrapper supports an onSubmit, you can pass a handler like this:
  // const handleSubmit = () => {
  //   // TODO: call API or lift state up
  //   console.log({ experience, grades, curriculumSubjects });
  // };

  const step1 = (
    <div className="space-y-4">
      <label className="block text-sm text-gray-600">Years of experience</label>
      <Input
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        placeholder="e.g. 5"
        inputMode="numeric"
      />

      <label className="block text-sm text-gray-600">Grades taught</label>
      <Input
        value={grades}
        onChange={(e) => setGrades(e.target.value)}
        placeholder="e.g. Grade 1, Grade 2"
      />
    </div>
  );

  const step2 = (
    <div className="space-y-4">
      <label className="block text-sm text-gray-600">
        Curriculum / subjects
      </label>
      <Textarea
        value={curriculumSubjects}
        onChange={(e) => setCurriculumSubjects(e.target.value)}
        placeholder="e.g. Mathematics, English, Science"
        rows={5}
      />
    </div>
  );

  return (
    <FormWrapper
      title="Edit Tutor's Career & Experience"
      steps={[step1, step2]}
      onClose={onClose}
      // onSubmit={handleSubmit} // <- uncomment if FormWrapper supports it
    />
  );
}
