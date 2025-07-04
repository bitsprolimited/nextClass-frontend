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
import { Search } from "lucide-react";

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
    <div className="flex flex-col items-start p-5 gap-2 bg-[#f5f4f8] w-full">
      <div className="flex w-full justify-between items-center py-3 pr-6 shadow-[0px_4px_4px_#031d9540] focus-within:ring-1 focus-within:ring-primary rounded-sm">
        <Input
          type="text"
          className="h-[60px] px-5 py-[20px] w-full shadow-none border-none font-medium text-[#757575] text-2xl bg-transparent focus-visible:ring-0"
          placeholder="Search subjects or tutors here..."
        />
        <Button
          className="px-[50px] py-4 rounded-full h-auto font-medium text-lg hover:bg-secondary"
          onClick={handleSearch}
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>

      <div className="flex items-start gap-9 pt-5 w-full self-stretch">
        {FILTERS.map((filter, index) => (
          <div className="w-full" key={index}>
            <Select
              onValueChange={(val) =>
                handleFilterChange(filter.label.toLowerCase(), val)
              }
            >
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
