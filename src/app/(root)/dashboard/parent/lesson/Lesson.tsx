"use client";
import LearnersSection from "@/components/parents/learnersSection";
import LessonNotesSection from "@/components/parents/lessonNotesSection";
import SearchAndFilter from "@/components/parents/searchFilter";

import { JSX } from "react";

export const Lesson = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center py-10 w-full max-w-6xl mx-auto">
      <SearchAndFilter />
      <LearnersSection />
      <LessonNotesSection />
    </div>
  );
};
