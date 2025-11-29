"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";

const FILTERS = [
  { label: "Age", value: "age" },
  { label: "Grade", value: "grade" },
  { label: "Subjects", value: "subjects" },
  { label: "Schedule", value: "schedule" },
  { label: "Cost", value: "cost" },
];

type SearchAndFilterProps = {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
};

export default function SearchAndFilter({
  onSearch,
  onFilterChange,
}: SearchAndFilterProps) {
  const handleSearch = () => {
    if (onSearch) onSearch(""); // Replace with actual search logic
  };

  const handleFilterChange = (key: string, value: string) => {
    if (onFilterChange) {
      onFilterChange({ [key]: value });
    }
  };

  return (
    <div className="flex flex-col items-start p-3 md:p-5 gap-1.5 lg:gap-2 bg-[#f5f4f8] w-full">
      {/* Search Row */}
      <div className="flex w-full items-center gap-1.5">
        {/* Input + Search (pilled container on mobile, inline on desktop) */}
        <div className="flex w-full justify-between items-center pl-3 py-2 pr-2 lg:shadow-[0px_4px_4px_#031d9540] focus-within:ring-1 focus-within:ring-primary rounded-[5px] text-xs lg:text-base lg:border-0 border-[0.5px] border-[#7a7f8899] gap-1">
          <Input
            type="text"
            onInput={handleSearch}
            className="lg:h-[50px] p-0 lg:px-4 w-full shadow-none border-none font-medium text-[#757575] text-xs md:text-base lg:text-lg bg-transparent focus-visible:ring-0"
            placeholder="Search Subjects or Tutors here"
          />
          <Button className="px-1.5 sm:px-8 py-2 sm:py-3 rounded-full h-auto font-medium text-xs lg:text-sm sm:text-base hover:bg-secondary">
            <Search className="w-4 h-4 mr-1" /> Search
          </Button>
        </div>

        {/* Filter Button (only visible on mobile) */}
        <Button className="flex sm:hidden flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl bg-[#D9E2FF] text-primary font-medium shadow-sm h-auto">
          <Filter className="w-5 h-5" />
          <span className="text-xs">Filter</span>
        </Button>
      </div>

      {/* Dropdown Filters (hidden on mobile, shown on desktop) */}
      <div className="hidden sm:flex items-start gap-9 pt-5 w-full self-stretch">
        {FILTERS.map((filter, index) => (
          <div className="w-full" key={index}>
            <Select onValueChange={(value) => handleFilterChange(filter.value, value)}>
              <SelectTrigger className="inline-flex h-auto rounded-sm gap-5 pl-5 pr-8 shadow-[0px_2px_4px_#031d9540] bg-white text-[#52565b] font-medium text-lg">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={filter.value}>{filter.label}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
}
