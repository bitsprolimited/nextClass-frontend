"use client";

import SearchAndFilter from "@/components/parents/searchFilter";

import { JSX } from "react";

export const Transaction = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center py-10 w-full max-w-6xl mx-auto">
      <SearchAndFilter />
    </div>
  );
};
